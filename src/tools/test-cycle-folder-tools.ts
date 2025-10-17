import { z } from 'zod';
import {
  getQmetryTestCycleFolders,
  createQmetryTestCycleFolder,
  editQmetryTestCycleFolder,
  moveQmetryTestCycleFolder,
  searchQmetryTestCycleFolders,
} from '../api/qmetry-test-cycle-folders';
import {
  GetTestCycleFoldersParams,
  CreateTestCycleFolderParams,
  EditTestCycleFolderParams,
  MoveTestCycleFolderParams,
  SearchTestCycleFoldersParams,
  ToolDefinition,
} from '../interfaces/index';

/**
 * A collection of tools for managing Qmetry test cycle folders.
 * Each tool includes a name, definition, and handler.
 * The tools allow you to perform operations such as:
 * - Retrieving all test cycle folders for a project.
 * - Creating a new test cycle folder.
 * - Editing an existing test cycle folder.
 * - Moving a test cycle folder to a new parent folder.
 * - Searching for a specific test cycle folder by name.
 */
export const testCycleFolderTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-test-cycle-folders',
    definition: {
      title: 'Get Qmetry test cycle folders',
      description: 'Get Qmetry test cycle folders for a given project',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        sort: z
          .string()
          .optional()
          .describe(
            'Possible values - NAME,CREATED_ON,UPDATED_ON' +
              'Pattern - sortField:sortOrder(asc/desc) ' +
              'For example if want to sorting on createOn in ascending order then need to pass CREATED_ON:asc'
          ),
        withCount: z
          .boolean()
          .optional()
          .describe('Show count of test cycles associated with Folder'),
      },
    },
    handler: async (params: GetTestCycleFoldersParams) => {
      const result = await getQmetryTestCycleFolders(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-test-cycle-folder',
    definition: {
      title: 'Create a Qmetry test cycle folder',
      description: 'Create a Qmetry test cycle folder for a given project',
      inputSchema: {
        folderName: z.string().describe('Name of Folder'),
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        parentId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test cycle folders".' +
              'If you want to create a folder at the root level, pass "-1".'
          ),
        description: z.string().optional().describe('Description of Folder'),
      },
    },
    handler: async (params: CreateTestCycleFolderParams) => {
      const result = await createQmetryTestCycleFolder(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'edit-qmetry-test-cycle-folder',
    definition: {
      title: 'Edit a Qmetry test cycle folder',
      description: 'Edit a Qmetry test cycle folder for a given project',
      inputSchema: {
        folderName: z.string().describe('Name of Folder'),
        description: z.string().optional().describe('Description of Folder'),
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test cycle folders".'
          ),
        folderId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
      },
    },
    handler: async (params: EditTestCycleFolderParams) => {
      const result = await editQmetryTestCycleFolder(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'move-qmetry-test-cycle-folder',
    definition: {
      title: 'Move a Qmetry test cycle folder',
      description: 'Move a Qmetry test cycle folder to a new parent folder',
      inputSchema: {
        folderId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test cycle folders".'
          ),
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        newParentId: z
          .number()
          .describe(
            'Folder Id of where you want to move the folder.' +
              'Refer id from the response of API "Get test cycle folders".'
          ),
      },
    },
    handler: async (params: MoveTestCycleFolderParams) => {
      const result = await moveQmetryTestCycleFolder(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'search-qmetry-test-cycle-folder',
    definition: {
      title: 'Search a Qmetry test cycle folder',
      description: 'Search a Qmetry test cycle folder for a given project',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        folderName: z
          .string()
          .describe('Provide the actual folder name to search its details'),
        mode: z
          .string()
          .optional()
          .describe(
            'Allowed value - "STRICT"  ,' +
              'if passed folder search will be absolute otherwise relative.'
          ),
      },
    },
    handler: async (params: SearchTestCycleFoldersParams) => {
      const result = await searchQmetryTestCycleFolders(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
