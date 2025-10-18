import express, { Request, Response } from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import { ToolDefinition } from './interfaces/toolDefinition.js';
import { projectTools } from './tools/project-tools.js';
import { testCaseFolderTools } from './tools/test-case-folder-tools.js';
import { testCycleFolderTools } from './tools/test-cycle-folder-tools.js';
import { testPlanFolderTools } from './tools/test-plan-folder-tools.js';
import { testCasesTools } from './tools/test-cases-tools.js';
import { testStepTools } from './tools/test-step-tools.js';
import { labelTools } from './tools/label-tools.js';
import { priorityTools } from './tools/priority-tools.js';
import { testCaseStatusTools } from './tools/test-cases-status-tools.js';
import { testCycleStatusTools } from './tools/test-cycle-status-tools.js';
import { testPlanStatusTools } from './tools/test-plan-status-tools.js';
import { linkedRequirementsTools } from './tools/linked-requirements-tools.js';

/**
 * Tool registry for executing QMetry operations
 */
const toolRegistry: Map<string, ToolDefinition> = new Map();

/**
 * Creates a new MCP server instance.
 */
const server = new McpServer({
  name: 'Jira Qmetry MCP HTTP',
  version: '1.1.0',
  title: 'Jira Qmetry MCP with Streamable HTTP Support',
  description: 'Jira Qmetry MCP with Streamable HTTP support',
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
 * Setup Express app with Streamable HTTP endpoints
 */
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('src'));

/**
 * Create a single transport instance for the server
 * Using stateless mode (sessionIdGenerator: undefined) for simpler N8N integration
 */
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined, // Stateless mode - no session management
});

/**
 * MCP Streamable HTTP endpoint (POST)
 * This endpoint handles JSON-RPC POST requests
 */
app.post('/mcp', async (req: Request, res: Response) => {
  try {
    // Handle the incoming request using the transport
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP POST request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: {
          message: error instanceof Error ? error.message : 'Internal error',
        },
      });
    }
  }
});

/**
 * MCP Streamable HTTP endpoint (GET)
 * This endpoint handles SSE stream requests for bidirectional communication
 */
app.get('/mcp', async (req: Request, res: Response) => {
  try {
    // Handle the SSE stream request using the transport
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error('Error handling MCP GET request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: {
          message: error instanceof Error ? error.message : 'Internal error',
        },
      });
    }
  }
});

/**
 * Health check and server info endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  const tools = Array.from(toolRegistry.keys());

  res.json({
    status: 'healthy',
    mcpServer: 'connected',
    protocol: 'MCP Streamable HTTP',
    protocolVersion: '2024-11-05',
    tools: {
      count: toolRegistry.size,
      available: tools,
    },
    endpoints: {
      mcp: '/mcp (POST) - MCP Streamable HTTP',
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
  ...linkedRequirementsTools,
]);

/**
 * The main function that starts the HTTP server
 * Note: MCP server uses Streamable HTTP transport for each request
 */
async function main() {
  try {
    // Connect the MCP server to the transport
    await server.connect(transport);

    // Start Express HTTP server
    app.listen(PORT, () => {
      console.log(`\n🚀 MCP Server running on http://localhost:${PORT}`);
      console.log(`\n📡 Endpoints:`);
      console.log(`   • MCP HTTP (POST): http://localhost:${PORT}/mcp`);
      console.log(`   • MCP SSE (GET):   http://localhost:${PORT}/mcp`);
      console.log(`   • Health:          http://localhost:${PORT}/health`);
      console.log(`\n🔧 Available tools: ${toolRegistry.size}`);
      console.log(
        `   ${Array.from(toolRegistry.keys()).slice(0, 5).join(', ')}...`
      );
      console.log(`\n✅ MCP Protocol: Streamable HTTP (v2024-11-05)`);
      console.log(`✅ Ready for client integration (stateless mode)\n`);
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
  console.log('Shutting down server...');
  process.exit(0);
});

/**
 * Starts the servers and handles any errors that may occur
 */
main().catch(error => {
  process.stderr.write(`Server error: ${error}\n`);
  process.exit(1);
});
