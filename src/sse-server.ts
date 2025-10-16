import express, { Request, Response } from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

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

  const initialEvent: SSEEvent = {
    id: '1',
    event: 'connected',
    data: JSON.stringify({
      clientId,
      message: 'Connected to QMetry MCP SSE server',
      availableTools: Array.from(toolRegistry.keys()),
      timestamp: new Date().toISOString(),
    }),
  };

  res.write(formatSSEEvent(initialEvent));

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
 * Execute QMetry operation endpoint
 */
app.post('/api/qmetry/:operation', async (req: Request, res: Response) => {
  try {
    const { operation } = req.params;
    const params = req.body;

    const result = await executeQMetryOperation(operation, params);

    if (result.success) {
      // Broadcast success event
      broadcastSSEEvent({
        event: 'operation_complete',
        data: JSON.stringify(result),
      });
      res.json(result);
    } else {
      // Broadcast error event
      broadcastSSEEvent({
        event: 'operation_error',
        data: JSON.stringify(result),
      });
      res.status(500).json(result);
    }
  } catch (error) {
    const errorResult: QMetryOperationResult = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      operation: req.params.operation,
      timestamp: new Date().toISOString(),
    };

    broadcastSSEEvent({
      event: 'operation_error',
      data: JSON.stringify(errorResult),
    });

    res.status(500).json(errorResult);
  }
});

/**
 * Get available tools
 */
app.get('/api/tools', (req: Request, res: Response) => {
  const tools = Array.from(toolRegistry.entries()).map(([name, tool]) => ({
    name,
    description: tool.definition.description,
    inputSchema: tool.definition.inputSchema,
  }));

  res.json({ tools });
});

/**
 * Get connected clients info
 */
app.get('/api/clients', (req: Request, res: Response) => {
  const clients = Array.from(sseClients.values()).map(client => ({
    id: client.id,
    lastEventId: client.lastEventId,
  }));

  res.json({ clients, count: clients.length });
});

/**
 * Health check endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    mcpServer: 'connected',
    sseClients: sseClients.size,
    availableTools: toolRegistry.size,
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
 * The main function that starts both MCP and SSE servers
 */
async function main() {
  try {
    // Start MCP server
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log('MCP server connected');

    // Start Express SSE server
    app.listen(PORT, () => {
      console.log(`SSE server running on http://localhost:${PORT}`);
      console.log(`SSE endpoint: http://localhost:${PORT}/events`);
      console.log(
        `API endpoint: http://localhost:${PORT}/api/qmetry/:operation`
      );
      console.log(
        `Available tools: ${Array.from(toolRegistry.keys()).join(', ')}`
      );
    });

    // Broadcast server status
    broadcastSSEEvent({
      event: 'server_status',
      data: JSON.stringify({
        status: 'running',
        mcpServer: 'connected',
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
