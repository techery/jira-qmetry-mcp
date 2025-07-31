import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { ToolDefinition } from "./interfaces/toolDefinition";
import { projectTools } from "./tools/project-tools";
import { testCaseFolderTools } from "./tools/test-case-folder-tools";
import { testCycleFolderTools } from "./tools/test-cycle-folder-tools";
import { testPlanFolderTools } from "./tools/test-plan-folder-tools";
import { testCasesTools } from "./tools/test-cases-tools";

/**
 * Creates a new MCP server instance.
 * @param name The name of the server.
 * @param version The version of the server.
 * @param title The title of the server.
 * @param description The description of the server.
 * @returns A new MCP server instance.
 */
const server = new McpServer({
    name: "Jira Qmetry MCP",
    version: "1.0.0",
    title: "Jira Qmetry MCP",
    description: "Jira Qmetry MCP",
});

/**
 * Registers multiple tools with the server.
 * @param server The server to register the tools with.
 * @param tools An array of tool definitions to register.
 * Each tool definition must contain a unique name, definition and handler.
 * If a tool cannot be registered (for example, if a tool with the same name already exists)
 * an error will be logged and the process will exit with a non-zero status code.
 */
function registerTools(server: McpServer, tools: ToolDefinition[]) {
    tools.forEach(tool => {
        try {
            return server.registerTool(tool.name, tool.definition, tool.handler);
        } catch (error) {
            console.error(`Error registering tool ${tool.name}:`, error);
            throw error;
        }
    });
}

/**
 * Registers multiple tools with the server.
 * @param server The server to register the tools with.
 * @param tools An array of tool definitions to register.
 * Each tool definition must contain a unique name, definition and handler.
 * If a tool cannot be registered (for example, if a tool with the same name already exists)
 * an error will be logged and the process will exit with a non-zero status code.
 */
registerTools(server, [...projectTools, ...testCaseFolderTools, ...testCycleFolderTools, ...testPlanFolderTools, ...testCasesTools]);

/**
 * The main function that starts the server.
 * @returns A promise that resolves when the server is running.
 * @throws An error if the server cannot be started.
 */
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP server is running...");
}

/**
 * Starts the server and handles any errors that may occur.
 * @param main The main function to run.
 * @param error The error to handle.
 */
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});