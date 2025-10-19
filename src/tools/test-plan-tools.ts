import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  getQmetryTestPlans,
  getQmetryTestPlan,
  createQmetryTestPlan,
  updateQmetryTestPlan,
  moveQmetryTestPlans,
  getLinkedTestCycles,
  linkTestCyclesToTestPlan,
  unlinkTestCyclesFromTestPlan,
  archiveTestPlan,
  unarchiveTestPlan,
} from '../api/qmetry-test-plans.js';
import {
  SearchTestPlansParams,
  GetTestPlanParams,
  CreateTestPlanParams,
  UpdateTestPlanParams,
  MoveTestPlansParams,
  GetLinkedTestCyclesParams,
  LinkTestCyclesToTestPlanParams,
  UnlinkTestCyclesFromTestPlanParams,
  ArchiveTestPlanParams,
} from '../interfaces/qmetry-test-plans.js';

export const testPlanTools: Array<ToolDefinition> = [
  // ============================================
  // CRUD Operations
  // ============================================

  {
    name: 'search-qmetry-test-plans',
    definition: {
      title: 'Search Qmetry test plans',
      description: 'Search and list test plans according to filters',
      inputSchema: {
        filter: z
          .object({
            projectId: z.string().describe('The ID of the project'),
            folderId: z
              .number()
              .optional()
              .describe(
                'Refer id from response of API "Get Test Plan folders"'
              ),
            summary: z.string().optional().describe('Test Plan summary/name'),
            status: z
              .array(z.string())
              .optional()
              .describe('Array of status values'),
            priority: z.string().optional().describe('Priority of test plan'),
            assignee: z.string().optional().describe('Jira user Account ID'),
            reporter: z.string().optional().describe('Jira user Account ID'),
            labels: z
              .array(z.string())
              .optional()
              .describe('Array of label names'),
            createdBy: z
              .array(z.string())
              .optional()
              .describe('Array of user Account IDs who created'),
            createdOn: z
              .string()
              .optional()
              .describe('Creation date range (dd/MMM/yyyy,dd/MMM/yyyy)'),
            updatedBy: z
              .array(z.string())
              .optional()
              .describe('Array of user Account IDs who updated'),
            updatedOn: z
              .string()
              .optional()
              .describe('Update date range (dd/MMM/yyyy,dd/MMM/yyyy)'),
          })
          .describe('Filter criteria for searching test plans'),
        startAt: z
          .number()
          .optional()
          .describe('Starting index for pagination (default 0)'),
        maxResults: z
          .number()
          .optional()
          .describe('Maximum results per page (default 50, max 100)'),
        fields: z
          .string()
          .optional()
          .describe(
            'Comma separated fields to be fetched, allowable fields are id, key, summary, description, projectId, folder, created, updated, labels, priority, status, reporter, testPlanFilterOperators'
          ),
        sort: z
          .string()
          .optional()
          .describe('Sort field and order (e.g., key:asc)'),
      },
    },
    handler: async (params: SearchTestPlansParams) => {
      const testPlans = await getQmetryTestPlans(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(testPlans, null, 2) }],
      };
    },
  },

  {
    name: 'get-qmetry-test-plan',
    definition: {
      title: 'Get a Qmetry test plan',
      description: 'Get details of a specific test plan by ID or Key',
      inputSchema: {
        idOrKey: z.string().describe('Test Plan Id or Test Plan Key'),
        fields: z
          .string()
          .optional()
          .describe(
            'Comma separated fields to be fetched, allowable fields are id, key, summary, description, projectId, folder, created, updated, labels, priority, status, reporter, testPlanFilterOperators'
          ),
      },
    },
    handler: async (params: GetTestPlanParams) => {
      const testPlan = await getQmetryTestPlan(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(testPlan, null, 2) }],
      };
    },
  },

  {
    name: 'create-qmetry-test-plan',
    definition: {
      title: 'Create a Qmetry test plan',
      description: 'Create a new test plan',
      inputSchema: {
        summary: z.string().describe('Test Plan Summary'),
        projectId: z
          .string()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects"'
          ),
        folderId: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get Test Plan folders"'
          ),
        priority: z
          .number()
          .optional()
          .describe('Refer id from the response of API "Get Priorities"'),
        status: z
          .number()
          .optional()
          .describe('Refer id from the response of API "Get Test Plan Status"'),
        reporter: z
          .number()
          .optional()
          .describe('Pass Jira user account uuid to assign reporter'),
        labels: z
          .array(z.number())
          .optional()
          .describe(
            'Refer ids from the response of API "Get Labels". Will be sent as {add: [labelId1, labelId2, ...]} to API'
          ),
        testcycles: z
          .object({
            testcycleIds: z
              .array(z.string())
              .describe('List of test cycle IDs'),
          })
          .optional()
          .describe(
            'Test cycles to link. Format: {testcycleIds: ["id1", "id2"]}'
          ),
        description: z.string().optional().describe('Test Plan description'),
      },
    },
    handler: async (params: CreateTestPlanParams) => {
      const testPlan = await createQmetryTestPlan(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(testPlan, null, 2) }],
      };
    },
  },

  {
    name: 'update-qmetry-test-plan',
    definition: {
      title: 'Update a Qmetry test plan',
      description: 'Update an existing test plan',
      inputSchema: {
        id: z
          .string()
          .describe(
            'Test Plan Id, refer id from response of API "search Test Plans"'
          ),
        summary: z.string().optional().describe('Test Plan Summary'),
        folderId: z.number().optional().describe('The ID of the folder'),
        priority: z.number().optional().describe('Priority Id'),
        status: z.number().optional().describe('Status Id'),
        reporter: z.number().optional().describe('Pass Jira user account uuid'),
        labels: z
          .array(z.number())
          .optional()
          .describe(
            'Refer ids from the response of API "Get Labels". Will be sent as {add: [labelId1, ...]} to API'
          ),
        description: z.string().optional().describe('Test Plan description'),
      },
    },
    handler: async (params: UpdateTestPlanParams) => {
      const testPlan = await updateQmetryTestPlan(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(testPlan, null, 2) }],
      };
    },
  },

  {
    name: 'move-qmetry-test-plans',
    definition: {
      title: 'Move Qmetry test plans',
      description: 'Move test plans to another folder',
      inputSchema: {
        targetFolderId: z
          .number()
          .describe('Folder Id where testplans to be moved'),
        projectId: z
          .string()
          .describe(
            'Refer id from response of API "Get Qmetry enabled projects"'
          ),
        testplanIds: z
          .array(z.string())
          .describe('Refer id from response of API "Search Test Plans"'),
      },
    },
    handler: async (params: MoveTestPlansParams) => {
      const result = await moveQmetryTestPlans(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  // ============================================
  // Test Cycles Management
  // ============================================

  {
    name: 'get-linked-test-cycles-from-test-plan',
    definition: {
      title: 'Get linked test cycles from a test plan',
      description: 'Get test cycles linked to a test plan',
      inputSchema: {
        id: z
          .string()
          .describe(
            'Test Plan Id, refer id from response of API "search Test Plans"'
          ),
        startAt: z.number().optional().describe('Default 0'),
        maxResults: z.number().optional().describe('Default 50, Max 100'),
        fields: z
          .string()
          .optional()
          .describe(
            'Comma separated fields to be fetched, allowable fields are id, key, summary, description, projectId, folder, created, updated, labels, priority, status, reporter, testPlanFilterOperators'
          ),
        sort: z
          .string()
          .optional()
          .describe('Pattern: sortField:order, Example: key:asc'),
      },
    },
    handler: async (params: GetLinkedTestCyclesParams) => {
      const result = await getLinkedTestCycles(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'link-test-cycles-to-test-plan',
    definition: {
      title: 'Link test cycles to a test plan',
      description: 'Link test cycles to a test plan',
      inputSchema: {
        id: z
          .string()
          .describe(
            'Test Plan Id, refer id from response of API "search Test Plans"'
          ),
        testcycleIds: z
          .array(z.string())
          .describe(
            'List of test cycles ids can be found using "search test cycles"'
          ),
        sort: z
          .string()
          .optional()
          .describe(
            '"sort" field is added in request body whenever user selects across all pages to link'
          ),
      },
    },
    handler: async (params: LinkTestCyclesToTestPlanParams) => {
      const result = await linkTestCyclesToTestPlan(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'unlink-test-cycles-from-test-plan',
    definition: {
      title: 'Unlink test cycles from a test plan',
      description: 'Unlink test cycles from a test plan',
      inputSchema: {
        id: z
          .string()
          .describe(
            'Test Plan Id, refer id from response of API "search Test Plans"'
          ),
        testcycleIds: z
          .array(z.string())
          .describe(
            'List of test cycles ids can be found using "search test cycles"'
          ),
      },
    },
    handler: async (params: UnlinkTestCyclesFromTestPlanParams) => {
      const result = await unlinkTestCyclesFromTestPlan(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  // ============================================
  // Archive Operations
  // ============================================

  {
    name: 'archive-qmetry-test-plan',
    definition: {
      title: 'Archive a Qmetry test plan',
      description: 'Archive a test plan',
      inputSchema: {
        idOrKey: z
          .string()
          .describe(
            'Test Plan Id, refer id from response of API "search Test Plans"'
          ),
      },
    },
    handler: async (params: ArchiveTestPlanParams) => {
      const result = await archiveTestPlan(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'unarchive-qmetry-test-plan',
    definition: {
      title: 'Unarchive a Qmetry test plan',
      description: 'Unarchive a test plan',
      inputSchema: {
        idOrKey: z
          .string()
          .describe(
            'Test Plan Id, refer id from response of API "search Test Plans"'
          ),
      },
    },
    handler: async (params: ArchiveTestPlanParams) => {
      const result = await unarchiveTestPlan(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
