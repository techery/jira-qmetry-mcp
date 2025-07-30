import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getQmetryProjects } from "./tools/qmetry-projects";
import {
    createQmetryTestCaseFolder,
    copyQmetryTestCaseFolder,
    moveQmetryTestCaseFolder,
    searchQmetryTestCaseFolders,
    getQmetryTestCaseFolders,
    editQmetryTestCaseFolder
} from "./tools/qmetry-test-case-folders";
import {
    getQmetryTestCycleFolders,
    createQmetryTestCycleFolder,
    editQmetryTestCycleFolder,
    moveQmetryTestCycleFolder,
    searchQmetryTestCycleFolders
} from "./tools/qmetry-test-cycle-folders";
import {
    getQmetryTestPlanFolders,
    createQmetryTestPlanFolder,
    editQmetryTestPlanFolder,
    moveQmetryTestPlanFolder,
    searchQmetryTestPlanFolders
} from "./tools/qmetry-test-plan-folders";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    GetProjectsParams,
    GetTestCycleFoldersParams,
    CreateTestCycleFolderParams,
    EditTestCycleFolderParams,
    MoveTestCycleFolderParams,
    GetTestPlanFoldersParams,
    CreateTestPlanFolderParams,
    EditTestPlanFolderParams,
    MoveTestPlanFolderParams,
    SearchTestPlanFoldersParams,
    SearchTestCaseFoldersParams,
    SearchTestCycleFoldersParams,
    GetTestCaseFoldersParams,
    EditTestCaseFolderParams,
    CreateTestCaseFolderParams,
    MoveTestCaseFolderParams,
    CopyTestCaseFolderParams,
} from "./interfaces/index";

const server = new McpServer({
    name: "Jira Qmetry MCP",
    version: "1.0.0",
    title: "Jira Qmetry MCP",
    description: "Jira Qmetry MCP",
});

server.registerTool(
    "get-qmetry-projects",
    {
        title: "Get all Qmetry projects",
        description: "Get all Qmetry projects",
        inputSchema: {
            fields: z.string().describe("Refer Parameters for fields to be fetched for projects"),
            projectName: z.string().describe("The name of the project to search for"),
            maxResults: z
                .number()
                .optional()
                .describe("Maximum number of results to return"),
            startAt: z.number().optional().describe("Starting index for pagination"),
        },
    },
    async ({ fields, projectName, maxResults, startAt }: GetProjectsParams) => {
        const result = await getQmetryProjects(fields, projectName, maxResults, startAt);
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
    "get-qmetry-test-case-folders",
    {
        title: "Get all Qmetry test case folders for a project",
        description: "Get all Qmetry test case folders for a given project key",
        inputSchema: {
            projectId: z
                .number()
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
    async ({ projectId, short, withCount }: GetTestCaseFoldersParams) => {
        const result = await getQmetryTestCaseFolders(projectId, short, withCount);
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
    "create-qmetry-test-case-folder",
    {
        title: "Create a Qmetry test case folder",
        description: "Create a Qmetry test case folder for a given project key",
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
    async ({ projectId, folderName, description, parentId }: CreateTestCaseFolderParams) => {
        const result = await createQmetryTestCaseFolder(
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
    "edit-qmetry-test-case-folder",
    {
        title: "Edit a Qmetry test case folder",
        description: "Edit a Qmetry test case folder for a given project key",
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
    async ({ folderName, folderId, projectId, description }: EditTestCaseFolderParams) => {
        const result = await editQmetryTestCaseFolder(
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
    "copy-qmetry-test-case-folder",
    {
        title: "Copy a Qmetry test case folder",
        description: "Copy a Qmetry test case folder and optionally its contents to another location",
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
    }: CopyTestCaseFolderParams) => {
        const result = await copyQmetryTestCaseFolder(
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
    "move-qmetry-test-case-folder",
    {
        title: "Move a Qmetry test case folder",
        description: "Move a Qmetry test case folder to a new parent folder",
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
    }: MoveTestCaseFolderParams) => {
        const result = await moveQmetryTestCaseFolder(
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

// Register the search test plan folder tool
server.registerTool(
    "search-qmetry-test-case-folders",
    {
        title: "Search a Qmetry test case folder",
        description: "Search a Qmetry test case folder for a given project",
        inputSchema: {
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            folderName: z.string().describe("Provide the actual folder name to search its details"),
            mode: z.string().optional().describe('Allowed value - "STRICT",' +
                'if passed folder search will be absolute otherwise relative.'),
        },
    },
    async ({ projectId, folderName, mode }: SearchTestCaseFoldersParams) => {
        const result = await searchQmetryTestCaseFolders(projectId, folderName, mode);
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

// Register the get test cycle folders tool
server.registerTool(
    "get-qmetry-test-cycle-folders",
    {
        title: "Get Qmetry test cycle folders",
        description: "Get Qmetry test cycle folders for a given project",
        inputSchema: {
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            sort: z.string().optional().describe('Possible values - NAME,CREATED_ON,UPDATED_ON' +
                'Pattern - sortField:sortOrder(asc/desc) ' +
                'For example if want to sorting on createOn in ascending order then need to pass CREATED_ON:asc'),
            withCount: z.boolean().optional().describe('Show count of test cycles associated with Folder'),
        },
    },
    async ({ projectId, sort, withCount }: GetTestCycleFoldersParams) => {
        const result = await getQmetryTestCycleFolders(projectId, sort, withCount);
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

// Register the create test cycle folder tool
server.registerTool(
    "create-qmetry-test-cycle-folder",
    {
        title: "Create a Qmetry test cycle folder",
        description: "Create a Qmetry test cycle folder for a given project",
        inputSchema: {
            folderName: z.string().describe("Name of Folder"),
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            parentId: z.number().describe('Refer id from the response of API \"Get test cycle folders\".' +
                'If you want to create a folder at the root level, pass "-1".'),
            description: z.string().optional().describe("Description of Folder"),
        },
    },
    async ({ folderName, projectId, parentId, description }: CreateTestCycleFolderParams) => {
        const result = await createQmetryTestCycleFolder(folderName, projectId, parentId, description);
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

// Register the update test cycle folder tool
server.registerTool(
    "edit-qmetry-test-cycle-folder",
    {
        title: "Edit a Qmetry test cycle folder",
        description: "Edit a Qmetry test cycle folder for a given project",
        inputSchema: {
            folderName: z.string().describe("Name of Folder"),
            description: z.string().optional().describe("Description of Folder"),
            projectId: z.number().describe('Refer id from the response of API "Get test cycle folders".'),
            folderId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
        },
    },
    async ({ folderName, description, projectId, folderId }: EditTestCycleFolderParams) => {
        const result = await editQmetryTestCycleFolder(folderName, projectId, folderId, description);
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

// Register the move test cycle folder tool
server.registerTool(
    "move-qmetry-test-cycle-folder",
    {
        title: "Move a Qmetry test cycle folder",
        description: "Move a Qmetry test cycle folder to a new parent folder",
        inputSchema: {
            folderId: z.number().describe('Refer id from the response of API "Get test cycle folders".'),
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            newParentId: z.number().describe('Folder Id of where you want to move the folder.' +
                'Refer id from the response of API "Get test cycle folders".'),
        },
    },
    async ({ projectId, folderId, newParentId }: MoveTestCycleFolderParams) => {
        const result = await moveQmetryTestCycleFolder(projectId, folderId, newParentId);
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

// Register the search test cycle folder tool
server.registerTool(
    "search-qmetry-test-cycle-folder",
    {
        title: "Search a Qmetry test cycle folder",
        description: "Search a Qmetry test cycle folder for a given project",
        inputSchema: {
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            folderName: z.string().describe("Provide the actual folder name to search its details"),
            mode: z.string().optional().describe('Allowed value - "STRICT",' +
                'if passed folder search will be absolute otherwise relative.'),
        },
    },
    async ({ projectId, folderName, mode }: SearchTestCycleFoldersParams) => {
        const result = await searchQmetryTestCycleFolders(projectId, folderName, mode);
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

// Register the get test plan folders tool
server.registerTool(
    "get-qmetry-test-plan-folders",
    {
        title: "Get Qmetry test plan folders",
        description: "Get Qmetry test plan folders for a given project",
        inputSchema: {
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            sort: z.string().optional().describe('Possible values - NAME,CREATED_ON,UPDATED_ON' +
                'Pattern - sortField:sortOrder(asc/desc)' +
                'For example if want to sorting on createOn in ascending order then need to pass CREATED_ON:asc'),
            withCount: z.boolean().optional().describe('Show count of test plans associated with Folder'),
        },
    },
    async ({ projectId, sort, withCount }: GetTestPlanFoldersParams) => {
        const result = await getQmetryTestPlanFolders(projectId, sort, withCount);
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

// Register the create test plan folder tool
server.registerTool(
    "create-qmetry-test-plan-folder",
    {
        title: "Create a Qmetry test plan folder",
        description: "Create a Qmetry test plan folder for a given project",
        inputSchema: {
            folderName: z.string().describe("Name of the folder"),
            description: z.string().optional().describe("Description of the folder"),
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            parentId: z.number().describe('Refer id from the response of API "Get test plan folders".' +
                'If you want to create a folder at the root level, pass "-1".'),
        },
    },
    async ({ folderName, projectId, parentId, description }: CreateTestPlanFolderParams) => {
        const result = await createQmetryTestPlanFolder(folderName, projectId, parentId, description);
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

// Register the update test plan folder tool
server.registerTool(
    "edit-qmetry-test-plan-folder",
    {
        title: "Edit a Qmetry test plan folder",
        description: "Edit a Qmetry test plan folder for a given project",
        inputSchema: {
            folderName: z.string().describe("New name of the folder"),
            description: z.string().optional().describe("New description of the folder"),
            folderId: z.number().describe("ID of the folder to update."),
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
        },
    },
    async ({ folderName, description, folderId, projectId }: EditTestPlanFolderParams) => {
        const result = await editQmetryTestPlanFolder(folderName, folderId, projectId, description);
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

// Register the move test plan folder tool
server.registerTool(
    "move-qmetry-test-plan-folder",
    {
        title: "Move a Qmetry test plan folder",
        description: "Move a Qmetry test plan folder to a new parent folder",
        inputSchema: {
            folderId: z.number().describe('Refer id from the response of API "Get test plan folders".'),
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            newParentId: z.number().describe('Folder Id of where you want to move the folder.' +
                'Refer id from the response of API "Get test plan folders".'),
        },
    },
    async ({ folderId, projectId, newParentId }: MoveTestPlanFolderParams) => {
        const result = await moveQmetryTestPlanFolder(folderId, projectId, newParentId);
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

// Register the search test plan folder tool
server.registerTool(
    "search-qmetry-test-plan-folder",
    {
        title: "Search a Qmetry test plan folder",
        description: "Search a Qmetry test plan folder for a given project",
        inputSchema: {
            projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            folderName: z.string().describe("Provide the actual folder name to search its details"),
            mode: z.string().optional().describe('Allowed value - "STRICT",' +
                'if passed folder search will be absolute otherwise relative.'),
        },
    },
    async ({ projectId, folderName, mode }: SearchTestPlanFoldersParams) => {
        const result = await searchQmetryTestPlanFolders(projectId, folderName, mode);
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
