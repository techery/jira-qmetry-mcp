import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listQmetryProjects } from "./tools/list-qmetry-projects";
import { listQmetryFolders } from "./tools/list-qmetry-folders";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
    name: "Jira Qmetry MCP",
    version: "1.0.0",
    title: "Jira Qmetry MCP",
    description: "Jira Qmetry MCP",
});

server.registerTool(
    'list-qmetry-projects',
    {
        title: "List all Qmetry projects",
        description: "List all Qmetry projects",
        inputSchema: {
            projectName: z.string().describe('The name of the project to search for'),
            maxResults: z.number().optional().describe('Maximum number of results to return'),
            startAt: z.number().optional().describe('Starting index for pagination')
        }
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

server.registerTool(
    'list-qmetry-folders',
    {
        title: "List all Qmetry folders for a project",
        description: "List all Qmetry folders for a given project key",
        inputSchema: {
            projectId: z.string().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            short: z.string().optional().describe('Possible values - NAME,CREATED_ON,UPDATED_ON Pattern - sortField:sortOrder(asc/desc) ' +
                'For example if want to sorting on createOn in ascending order then need to pass CREATED_ON:asc'),
            withCount: z.boolean().optional().describe('Show count of testCases associated with Folder'),
        }
    },
    async ({ projectId, short, withCount }) => {
        const result = await listQmetryFolders(projectId, short, withCount);
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