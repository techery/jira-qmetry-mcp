import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listQmetryProjects } from "./tools/list-qmetry-projects";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
    name: "Jira Qmetry MCP",
    version: "1.0.0",
    title: "Jira Qmetry MCP",
    description: "Jira Qmetry MCP",
});

server.tool(
    'list-qmetry-projects',
    'List all Qmetry projects',
    {
        projectName: z.string().describe('The name of the project to search for'),
        maxResults: z.number().optional().describe('Maximum number of results to return'),
        startAt: z.number().optional().describe('Starting index for pagination')
    },
    async ({ projectName, maxResults, startAt }) => {
        const result = await listQmetryProjects(projectName, maxResults, startAt);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);