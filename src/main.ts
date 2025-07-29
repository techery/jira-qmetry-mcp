import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { listQmetryProjects } from "./tools/list-qmetry-projects";
import {
    createQmetryFolder,
    listQmetryFolders,
    updateQmetryFolder,
    copyQmetryFolder,
    moveQmetryFolder
} from "./tools/qmetry-test-case-folders";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    ListProjectsParams,
    ListFoldersParams,
    CreateFolderParams,
    UpdateFolderParams,
    CopyFolderParams,
    MoveFolderParams
} from "./interfaces/index";

const server = new McpServer({
    name: "Jira Qmetry MCP",
    version: "1.0.0",
    title: "Jira Qmetry MCP",
    description: "Jira Qmetry MCP",
});

server.registerTool(
    "list-qmetry-projects",
    {
        title: "List all Qmetry projects",
        description: "List all Qmetry projects",
        inputSchema: {
            projectName: z.string().describe("The name of the project to search for"),
            maxResults: z
                .number()
                .optional()
                .describe("Maximum number of results to return"),
            startAt: z.number().optional().describe("Starting index for pagination"),
        },
    },
    async ({ projectName, maxResults, startAt }: ListProjectsParams) => {
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
    "list-qmetry-folders",
    {
        title: "List all Qmetry folders for a project",
        description: "List all Qmetry folders for a given project key",
        inputSchema: {
            projectId: z
                .string()
                .describe(
                    'Refer id from the response of API "Get qmetry enabled projects".'
                ),
            short: z
                .string()
                .optional()
                .describe(
                    "Possible values - NAME,CREATED_ON,UPDATED_ON Pattern - sortField:sortOrder(asc/desc) " +
                    "For example if want to sorting on createOn in ascending order then need to pass CREATED_ON:asc"
                ),
            withCount: z
                .boolean()
                .optional()
                .describe("Show count of testCases associated with Folder"),
        },
    },
    async ({ projectId, short, withCount }: ListFoldersParams) => {
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

server.registerTool(
    "create-qmetry-folder",
    {
        title: "Create a Qmetry folder",
        description: "Create a Qmetry folder for a given project key",
        inputSchema: {
            folderName: z.string().describe("Name of Folder"),
            description: z.string().optional().describe("Description of Folder"),
            parentId: z
                .string()
                .describe(
                    'Refer id from the response of API "Get test case folders". ' +
                    'If you want to create a folder at the root level, pass "-1".'
                ),
            projectId: z
                .string()
                .describe(
                    'Refer id from the response of API "Get qmetry enabled projects".'
                ),
        },
    },
    async ({ projectId, folderName, description, parentId }: CreateFolderParams) => {
        const result = await createQmetryFolder(
            folderName,
            parentId,
            projectId,
            description
        );
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
    "update-qmetry-folder",
    {
        title: "Update a Qmetry folder",
        description: "Update a Qmetry folder for a given project key",
        inputSchema: {
            folderName: z.string().describe("Name of Folder"),
            description: z.string().optional().describe("Description of Folder"),
            folderId: z
                .string()
                .describe(
                    'Refer id from the response of API "Get test case folders".'
                ),
            projectId: z
                .string()
                .describe(
                    'Refer id from the response of API "Get qmetry enabled projects".'
                ),
        },
    },
    async ({ folderName, folderId, projectId, description }: UpdateFolderParams) => {
        const result = await updateQmetryFolder(
            folderName,
            folderId,
            projectId,
            description
        );
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

// Register the copy folder tool
server.registerTool(
    "copy-qmetry-folder",
    {
        title: "Copy a Qmetry folder",
        description: "Copy a Qmetry folder and optionally its contents to another location",
        inputSchema: {
            folderId: z.string().describe('Refer id from the response of API "Get test case folders".'),
            projectId: z.string().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            newParentId: z.string().describe(
                'Folder Id of where you want to copy the folder.' +
                'Refer id from the response of API "Get test case folders".'
            ),
        },
    },
    async ({
        projectId,
        folderId,
        newParentId
    }: CopyFolderParams) => {
        const result = await copyQmetryFolder(
            projectId,
            folderId,
            newParentId
        );
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

// Register the move folder tool
server.registerTool(
    "move-qmetry-folder",
    {
        title: "Move a Qmetry folder",
        description: "Move a Qmetry folder to a new parent folder",
        inputSchema: {
            folderId: z.string().describe('Refer id from the response of API "Get test case folders".'),
            projectId: z.string().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            newParentId: z.string().describe(
                'Folder Id of where you want to move the folder.' +
                'Refer id from the response of API "Get test case folders".'
            ),
        },
    },
    async ({
        projectId,
        folderId,
        newParentId,
    }: MoveFolderParams) => {
        const result = await moveQmetryFolder(
            projectId,
            folderId,
            newParentId
        );
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

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP server is running...");
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
