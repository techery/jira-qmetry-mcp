import { z } from "zod";
import {
    getQmetryTestPlanFolders,
    createQmetryTestPlanFolder,
    editQmetryTestPlanFolder,
    moveQmetryTestPlanFolder,
    searchQmetryTestPlanFolders
} from "../api/qmetry-test-plan-folders";
import {
    GetTestPlanFoldersParams,
    CreateTestPlanFolderParams,
    EditTestPlanFolderParams,
    MoveTestPlanFolderParams,
    SearchTestPlanFoldersParams,
    ToolDefinition
} from "../interfaces/index";

/**
 * A collection of tools for managing Qmetry test plan folders.
 * Each tool includes a name, definition, and handler.
 * The tools allow you to perform operations such as:
 * - Retrieving all test plan folders for a project.
 * - Creating a new test plan folder.
 * - Editing an existing test plan folder.
 * - Moving a test plan folder to a new parent folder.
 * - Searching for a specific test plan folder by name.
 */
export const testPlanFolderTools: Array<ToolDefinition> = [
    {
        name: "get-qmetry-test-plan-folders",
        definition: {
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
        handler: async ({ projectId, sort, withCount }: GetTestPlanFoldersParams) => {
            const result = await getQmetryTestPlanFolders(projectId, sort, withCount);
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2), },], };
        },
    },
    {
        name: "create-qmetry-test-plan-folder",
        definition: {
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
        handler: async ({ folderName, projectId, parentId, description }: CreateTestPlanFolderParams) => {
            const result = await createQmetryTestPlanFolder(folderName, projectId, parentId, description);
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2), },], };
        },
    },
    {
        name: "edit-qmetry-test-plan-folder",
        definition: {
            title: "Edit a Qmetry test plan folder",
            description: "Edit a Qmetry test plan folder for a given project",
            inputSchema: {
                folderName: z.string().describe("New name of the folder"),
                description: z.string().optional().describe("New description of the folder"),
                folderId: z.number().describe("ID of the folder to update."),
                projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
            },
        },
        handler: async ({ folderName, description, folderId, projectId }: EditTestPlanFolderParams) => {
            const result = await editQmetryTestPlanFolder(folderName, folderId, projectId, description);
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2), },], };
        },
    },
    {
        name: "move-qmetry-test-plan-folder",
        definition: {
            title: "Move a Qmetry test plan folder",
            description: "Move a Qmetry test plan folder to a new parent folder",
            inputSchema: {
                folderId: z.number().describe('Refer id from the response of API "Get test plan folders".'),
                projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
                newParentId: z.number().describe('Folder Id of where you want to move the folder.' +
                    'Refer id from the response of API "Get test plan folders".'),
            },
        },
        handler: async ({ folderId, projectId, newParentId }: MoveTestPlanFolderParams) => {
            const result = await moveQmetryTestPlanFolder(folderId, projectId, newParentId);
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2), },], };
        },
    },
    {
        name: "search-qmetry-test-plan-folder",
        definition: {
            title: "Search a Qmetry test plan folder",
            description: "Search a Qmetry test plan folder for a given project",
            inputSchema: {
                projectId: z.number().describe('Refer id from the response of API "Get qmetry enabled projects".'),
                folderName: z.string().describe("Provide the actual folder name to search its details"),
                mode: z.string().optional().describe('Allowed value - "STRICT",' +
                    'if passed folder search will be absolute otherwise relative.'),
            },
        },
        handler: async ({ projectId, folderName, mode }: SearchTestPlanFoldersParams) => {
            const result = await searchQmetryTestPlanFolders(projectId, folderName, mode);
            return { content: [{ type: "text", text: JSON.stringify(result, null, 2), },], };
        },
    },
];
