import express, { Request, Response } from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { ToolDefinition } from './interfaces/toolDefinition';
import { projectTools } from './tools/project-tools';
import { testCaseFolderTools } from './tools/test-case-folder-tools';
import { testCycleFolderTools } from './tools/test-cycle-folder-tools';
import { testPlanFolderTools } from './tools/test-plan-folder-tools';
import { testCasesTools } from './tools/test-cases-tools';
import { testStepTools } from './tools/test-step-tools';
import { labelTools } from './tools/label-tools';
import { priorityTools } from './tools/priority-tools';
import { testCaseStatusTools } from './tools/test-cases-status-tools';
import { testCycleStatusTools } from './tools/test-cycle-status-tools';
import { testPlanStatusTools } from './tools/test-plan-status-tools';

/**
 * SSE Event types for QMetry operations
 */
export interface SSEEvent {
  id?: string;
  event?: string;
  data: string;
  retry?: number;
}

/**
 * SSE Client connection interface
 */
interface SSEClient {
  id: string;
  response: Response;
  lastEventId?: string;
}

/**
 * QMetry Operation Result interface
 */
interface QMetryOperationResult {
  success: boolean;
  data?: unknown;
  error?: string;
  operation: string;
  timestamp: string;
}

/**
 * Global SSE clients storage
 */
const sseClients: Map<string, SSEClient> = new Map();

/**
 * Tool registry for executing QMetry operations
 */
const toolRegistry: Map<string, ToolDefinition> = new Map();

/**
 * Creates a new MCP server instance.
 */
const server = new McpServer({
  name: 'Jira Qmetry MCP SSE',
  version: '1.0.0',
  title: 'Jira Qmetry MCP with SSE Support',
  description: 'Jira Qmetry MCP with Server-Sent Events support',
});

/**
 * Registers multiple tools with the server and builds tool registry
 */
function registerTools(server: McpServer, tools: ToolDefinition[]) {
  tools.forEach(tool => {
    try {
      server.registerTool(tool.name, tool.definition, tool.handler);
      toolRegistry.set(tool.name, tool);
    } catch (error) {
      process.stderr.write(`Error registering tool ${tool.name}: ${error}\n`);
      throw error;
    }
  });
}

/**
 * Broadcast SSE event to all connected clients
 */
function broadcastSSEEvent(event: SSEEvent): void {
  const eventData = formatSSEEvent(event);

  sseClients.forEach((client, clientId) => {
    try {
      client.response.write(eventData);
    } catch (error) {
      console.error(`Error sending SSE event to client ${clientId}:`, error);
      sseClients.delete(clientId);
    }
  });
}

/**
 * Format SSE event according to SSE specification
 */
function formatSSEEvent(event: SSEEvent): string {
  let formatted = '';

  if (event.id) {
    formatted += `id: ${event.id}\n`;
  }

  if (event.event) {
    formatted += `event: ${event.event}\n`;
  }

  if (event.retry) {
    formatted += `retry: ${event.retry}\n`;
  }

  const dataLines = event.data.split('\n');
  dataLines.forEach(line => {
    formatted += `data: ${line}\n`;
  });

  formatted += '\n';

  return formatted;
}

/**
 * Generate unique client ID
 */
function generateClientId(): string {
  return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Execute QMetry operation using registered tools
 */
async function executeQMetryOperation(
  operation: string,
  params: unknown
): Promise<QMetryOperationResult> {
  const tool = toolRegistry.get(operation);

  if (!tool) {
    throw new Error(`Tool '${operation}' not found`);
  }

  try {
    // Broadcast operation start
    broadcastSSEEvent({
      event: 'operation_start',
      data: JSON.stringify({
        operation,
        params,
        timestamp: new Date().toISOString(),
      }),
    });

    // Execute the tool
    const result = await tool.handler(params);

    // Broadcast operation progress
    broadcastSSEEvent({
      event: 'operation_progress',
      data: JSON.stringify({
        operation,
        progress: 'completed',
        timestamp: new Date().toISOString(),
      }),
    });

    return {
      success: true,
      data: result,
      operation,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return {
      success: false,
      error: errorMessage,
      operation,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Setup Express app with SSE endpoints
 */
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('src'));

/**
 * SSE endpoint for clients to connect
 * Also handles MCP protocol over SSE for N8N compatibility
 */
app.get('/events', (req: Request, res: Response) => {
  const clientId = generateClientId();

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  });

  sseClients.set(clientId, {
    id: clientId,
    response: res,
    lastEventId: req.headers['last-event-id'] as string,
  });

  // Send initial connection event
  const initialEvent: SSEEvent = {
    id: '1',
    event: 'connected',
    data: JSON.stringify({
      clientId,
      message: 'Connected to QMetry MCP SSE server',
      protocol: 'MCP JSON-RPC 2.0',
      protocolVersion: '2024-11-05',
      timestamp: new Date().toISOString(),
    }),
  };

  res.write(formatSSEEvent(initialEvent));

  // Send server info for MCP initialization
  const initEvent: SSEEvent = {
    id: '2',
    event: 'message',
    data: JSON.stringify({
      jsonrpc: '2.0',
      method: 'notifications/initialized',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'Jira Qmetry MCP SSE',
          version: '1.0.0',
        },
      },
    }),
  };

  res.write(formatSSEEvent(initEvent));

  // Send available tools list (simplified for SSE)
  const toolsList = Array.from(toolRegistry.keys()).map(name => ({
    name,
    description: toolRegistry.get(name)?.definition.description || '',
  }));

  const toolsEvent: SSEEvent = {
    id: '3',
    event: 'tools',
    data: JSON.stringify({
      tools: toolsList,
      count: toolsList.length,
    }),
  };

  res.write(formatSSEEvent(toolsEvent));

  req.on('close', () => {
    console.log(`SSE client ${clientId} disconnected`);
    sseClients.delete(clientId);
  });

  req.on('error', error => {
    console.error(`SSE client ${clientId} error:`, error);
    sseClients.delete(clientId);
  });
});

/**
 * SSE POST endpoint for tool execution
 */
app.post('/events', async (req: Request, res: Response) => {
  try {
    const { jsonrpc, method, params, id } = req.body;

    // Validate JSON-RPC 2.0 format
    if (jsonrpc !== '2.0') {
      return res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32600,
          message: 'Invalid Request',
        },
        id: id || null,
      });
    }

    // Handle different MCP methods
    switch (method) {
      case 'tools/call': {
        const { name: toolName, arguments: toolArgs } = params;
        const result = await executeQMetryOperation(toolName, toolArgs);

        if (result.success) {
          res.json({
            jsonrpc: '2.0',
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result.data, null, 2),
                },
              ],
            },
            id,
          });
        } else {
          res.json({
            jsonrpc: '2.0',
            error: {
              code: -32000,
              message: result.error,
            },
            id,
          });
        }
        break;
      }

      default:
        res.status(400).json({
          jsonrpc: '2.0',
          error: {
            code: -32601,
            message: 'Method not found',
          },
          id,
        });
    }
  } catch (error) {
    res.status(500).json({
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: error instanceof Error ? error.message : 'Internal error',
      },
      id: req.body.id || null,
    });
  }
});

/**
 * MCP JSON-RPC endpoint for N8N compatibility
 */
app.post('/message', async (req: Request, res: Response) => {
  try {
    const { jsonrpc, method, params, id } = req.body;

    // Validate JSON-RPC 2.0 format
    if (jsonrpc !== '2.0') {
      return res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32600,
          message: 'Invalid Request',
        },
        id: id || null,
      });
    }

    // Handle different MCP methods
    switch (method) {
      case 'initialize':
        res.json({
          jsonrpc: '2.0',
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: 'Jira Qmetry MCP SSE',
              version: '1.0.0',
            },
          },
          id,
        });
        break;

      case 'tools/list': {
        const toolsList = Array.from(toolRegistry.entries()).map(
          ([name, tool]) => ({
            name,
            description: tool.definition.description,
            inputSchema: {
              type: 'object',
              properties: tool.definition.inputSchema,
              required: Object.keys(tool.definition.inputSchema).filter(
                key => !tool.definition.inputSchema[key].isOptional()
              ),
            },
          })
        );

        res.json({
          jsonrpc: '2.0',
          result: {
            tools: toolsList,
          },
          id,
        });
        break;
      }

      case 'tools/call': {
        const { name: toolName, arguments: toolArgs } = params;
        const result = await executeQMetryOperation(toolName, toolArgs);

        if (result.success) {
          res.json({
            jsonrpc: '2.0',
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result.data, null, 2),
                },
              ],
            },
            id,
          });
        } else {
          res.json({
            jsonrpc: '2.0',
            error: {
              code: -32000,
              message: result.error,
            },
            id,
          });
        }
        break;
      }

      default:
        res.status(400).json({
          jsonrpc: '2.0',
          error: {
            code: -32601,
            message: 'Method not found',
          },
          id,
        });
    }
  } catch (error) {
    res.status(500).json({
      jsonrpc: '2.0',
      error: {
        code: -32603,
        message: error instanceof Error ? error.message : 'Internal error',
      },
      id: req.body.id || null,
    });
  }
});

/**
 * Health check and server info endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  const clients = Array.from(sseClients.values()).map(client => ({
    id: client.id,
    lastEventId: client.lastEventId,
  }));

  const tools = Array.from(toolRegistry.keys());

  res.json({
    status: 'healthy',
    mcpServer: 'connected',
    protocol: 'MCP JSON-RPC 2.0',
    protocolVersion: '2024-11-05',
    sseClients: {
      count: sseClients.size,
      clients: clients,
    },
    tools: {
      count: toolRegistry.size,
      available: tools,
    },
    endpoints: {
      jsonrpc: '/message (POST) - MCP JSON-RPC 2.0',
      sse: '/events (GET) - Server-Sent Events',
      health: '/health (GET) - Health check and info',
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * Register all tools with the MCP server
 */
registerTools(server, [
  ...projectTools,
  ...testCaseFolderTools,
  ...testCycleFolderTools,
  ...testPlanFolderTools,
  ...testCasesTools,
  ...testStepTools,
  ...priorityTools,
  ...labelTools,
  ...testCaseStatusTools,
  ...testCycleStatusTools,
  ...testPlanStatusTools,
]);

/**
 * The main function that starts the SSE server
 * Note: MCP server is initialized but not connected to stdio transport
 * to allow running in Railway/cloud environments without terminal
 */
async function main() {
  try {
    // Start Express SSE server
    app.listen(PORT, () => {
      console.log(`\n🚀 MCP Server running on http://localhost:${PORT}`);
      console.log(`\n📡 Endpoints:`);
      console.log(`   • JSON-RPC: http://localhost:${PORT}/message (POST)`);
      console.log(`   • SSE:      http://localhost:${PORT}/events (GET)`);
      console.log(`   • Health:   http://localhost:${PORT}/health (GET)`);
      console.log(`\n🔧 Available tools: ${toolRegistry.size}`);
      console.log(
        `   ${Array.from(toolRegistry.keys()).slice(0, 5).join(', ')}...`
      );
      console.log(`\n✅ MCP Protocol: JSON-RPC 2.0 (v2024-11-05)`);
      console.log(`✅ Ready for N8N integration\n`);
    });

    // Broadcast server status
    broadcastSSEEvent({
      event: 'server_status',
      data: JSON.stringify({
        status: 'running',
        protocol: 'MCP JSON-RPC 2.0',
        sseServer: `running on port ${PORT}`,
        availableTools: Array.from(toolRegistry.keys()),
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

/**
 * Graceful shutdown handling
 */
process.on('SIGINT', () => {
  console.log('Shutting down servers...');

  broadcastSSEEvent({
    event: 'server_shutdown',
    data: JSON.stringify({
      message: 'Server is shutting down',
      timestamp: new Date().toISOString(),
    }),
  });

  sseClients.forEach(client => {
    client.response.end();
  });

  process.exit(0);
});

/**
 * Starts the servers and handles any errors that may occur
 */
main().catch(error => {
  process.stderr.write(`Server error: ${error}\n`);
  process.exit(1);
});
