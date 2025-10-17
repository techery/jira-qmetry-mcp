import { z } from 'zod';
import {
  createQmetryTestCaseFolder,
  copyQmetryTestCaseFolder,
  moveQmetryTestCaseFolder,
  searchQmetryTestCaseFolders,
  getQmetryTestCaseFolders,
  editQmetryTestCaseFolder,
} from '../api/qmetry-test-case-folders';
import {
  GetTestCaseFoldersParams,
  EditTestCaseFolderParams,
  CreateTestCaseFolderParams,
  MoveTestCaseFolderParams,
  CopyTestCaseFolderParams,
  SearchTestCaseFoldersParams,
  ToolDefinition,
} from '../interfaces/index';

/**
 * A collection of tools for managing Qmetry test case folders.
 * Each tool includes a name, definition, and handler.
 * The tools allow you to perform operations such as:
 * - Retrieving all test case folders for a project.
 * - Creating a new test case folder.
 * - Editing an existing test case folder.
 * - Copying a test case folder to a new location.
 * - Moving a test case folder to a new parent folder.
 * - Searching for a specific test case folder by name.
 */
export const testCaseFolderTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-test-case-folders',
    definition: {
      title: 'Get all Qmetry test case folders for a project',
      description: 'Get all Qmetry test case folders for a given project key',
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
            'Possible values - NAME,CREATED_ON,UPDATED_ON Pattern ' +
              '- sortField:sortOrder(asc/desc) For example if want to sorting on createOn in ascending ' +
              'order then need to pass CREATED_ON:asc'
          ),
        withCount: z
          .boolean()
          .optional()
          .describe('Show count of testCases associated with Folder'),
      },
    },
    handler: async (params: GetTestCaseFoldersParams) => {
      const result = await getQmetryTestCaseFolders(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-test-case-folder',
    definition: {
      title: 'Create a Qmetry test case folder',
      description: 'Create a Qmetry test case folder for a given project key',
      inputSchema: {
        folderName: z.string().describe('Name of Folder'),
        description: z.string().optional().describe('Description of Folder'),
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
    handler: async (params: CreateTestCaseFolderParams) => {
      const result = await createQmetryTestCaseFolder(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'edit-qmetry-test-case-folder',
    definition: {
      title: 'Edit a Qmetry test case folder',
      description: 'Edit a Qmetry test case folder for a given project key',
      inputSchema: {
        folderName: z.string().describe('Name of Folder'),
        description: z.string().optional().describe('Description of Folder'),
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
    handler: async (params: EditTestCaseFolderParams) => {
      const result = await editQmetryTestCaseFolder(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'copy-qmetry-test-case-folder',
    definition: {
      title: 'Copy a Qmetry test case folder',
      description:
        'Copy a Qmetry test case folder and optionally its contents to another location',
      inputSchema: {
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
        newParentId: z
          .string()
          .describe(
            'Folder Id of where you want to copy the folder.' +
              'Refer id from the response of API "Get test case folders".'
          ),
      },
    },
    handler: async (params: CopyTestCaseFolderParams) => {
      const result = await copyQmetryTestCaseFolder(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'move-qmetry-test-case-folder',
    definition: {
      title: 'Move a Qmetry test case folder',
      description: 'Move a Qmetry test case folder to a new parent folder',
      inputSchema: {
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
        newParentId: z
          .string()
          .describe(
            'Folder Id of where you want to move the folder.' +
              'Refer id from the response of API "Get test case folders".'
          ),
      },
    },
    handler: async (params: MoveTestCaseFolderParams) => {
      const result = await moveQmetryTestCaseFolder(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'search-qmetry-test-case-folders',
    definition: {
      title: 'Search a Qmetry test case folder',
      description: 'Search a Qmetry test case folder for a given project',
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
            'Allowed value - "STRICT",' +
              'if passed folder search will be absolute otherwise relative.'
          ),
      },
    },
    handler: async (params: SearchTestCaseFoldersParams) => {
      const result = await searchQmetryTestCaseFolders(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
