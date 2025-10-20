import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  searchQmetryTestCycles,
  createQmetryTestCycle,
  updateQmetryTestCycle,
  moveQmetryTestCycle,
  linkTestCaseToTestCycle,
  unlinkTestCaseFromTestCycle,
  getLinkedTestPlans,
  getLinkedRequirements,
  linkRequirementsToTestCycle,
  unlinkRequirementsFromTestCycle,
  archiveTestCycle,
  unarchiveTestCycle,
  getTestCycle,
} from '../api/qmetry-test-cycles.js';
import {
  SearchTestCyclesParams,
  CreateTestCycleParams,
  UpdateTestCycleParams,
  MoveTestCycleParams,
  LinkTestCaseParams,
  UnlinkTestCaseParams,
  GetLinkedTestPlansParams,
  GetLinkedRequirementsParams,
  LinkRequirementsParams,
  UnlinkRequirementsParams,
  ArchiveTestCycleParams,
  GetTestCycleParams,
} from '../interfaces/qmetry-test-cycles.js';

export const testCycleTools: Array<ToolDefinition> = [
  // ============================================
  // CRUD BASIC OPERATIONS
  // ============================================

  {
    name: 'search-qmetry-test-cycles',
    definition: {
      title: 'Search Qmetry test cycles',
      description: 'Search and list test cycles according to filters',
      inputSchema: {
        filter: z
          .object({
            projectId: z.string().describe('The ID of the project'),
            folderId: z
              .number()
              .optional()
              .describe(
                'Refer id from response of API "Get Test Cycle folders"'
              ),
            summary: z.string().optional().describe('Test Cycle summary/name'),
            status: z
              .array(z.string())
              .optional()
              .describe('Array of status values'),
            priority: z
              .string()
              .optional()
              .describe('Priority of the test cycle'),
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
            plannedStartDate: z
              .string()
              .optional()
              .describe('Planned start date'),
            plannedEndDate: z.string().optional().describe('Planned end date'),
            customFields: z
              .array(
                z.object({
                  id: z.string().describe('Custom field ID'),
                  value: z.string().describe('Custom field value'),
                })
              )
              .optional()
              .describe(
                'Custom fields filter as array of objects with id and value. ' +
                  'Refer to "Get Test Cycle Custom Fields" to get available custom fields.'
              ),
          })
          .describe('Filter criteria for searching test cycles'),
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
          .describe('Comma separated fields to be fetched'),
        sort: z
          .string()
          .optional()
          .describe('Sort field and order (e.g., key:asc)'),
      },
    },
    handler: async (params: SearchTestCyclesParams) => {
      const testCycles = await searchQmetryTestCycles(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(testCycles, null, 2) }],
      };
    },
  },

  {
    name: 'create-qmetry-test-cycle',
    definition: {
      title: 'Create a Qmetry test cycle',
      description: 'Create a new test cycle',
      inputSchema: {
        summary: z.string().describe('Test Cycle Summary'),
        projectId: z
          .string()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects"'
          ),
        folderId: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get Test Cycle folders"'
          ),
        priority: z
          .number()
          .optional()
          .describe('Refer id from the response of API "Get Priorities"'),
        status: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get Test Cycle Status"'
          ),
        reporter: z
          .number()
          .optional()
          .describe('Pass Jira user account uuid to assign reporter'),
        labels: z
          .array(z.number())
          .optional()
          .describe(
            'Refer ids from the response of API "Get Labels". Will be sent as {add: [labelId1, ...]} to API'
          ),
        testCasesToLink: z
          .string()
          .optional()
          .describe('Either list of test case Ids or search filter query'),
        description: z.string().optional().describe('Test Cycle description'),
        plannedStartDate: z
          .string()
          .optional()
          .describe(
            'Enter in format dd/MMM/yyyy HH:mm. Example: 18/Oct/2025 09:00'
          ),
        plannedEndDate: z
          .string()
          .optional()
          .describe(
            'Enter in format dd/MMM/yyyy HH:mm. Example: 25/Oct/2025 17:00'
          ),
        actualTime: z
          .number()
          .optional()
          .describe('Enter value in milliseconds'),
        isAutomated: z
          .boolean()
          .optional()
          .describe('Whether test cycle is automated or not - true or false'),
        assignee: z
          .number()
          .optional()
          .describe('Pass Jira user account uuid to assign test cycle'),
        customFields: z
          .array(
            z.object({
              id: z.string().describe('Custom field ID'),
              value: z.string().describe('Custom field value'),
            })
          )
          .optional()
          .describe(
            'Custom fields as array of objects with id and value. ' +
              'Refer to "Get Test Cycle Custom Fields" to get available custom fields.'
          ),
      },
    },
    handler: async (params: CreateTestCycleParams) => {
      const result = await createQmetryTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'update-qmetry-test-cycle',
    definition: {
      title: 'Update a Qmetry test cycle',
      description: 'Update an existing test cycle',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Cycles"'),
        summary: z.string().describe('Test Cycle Summary'),
        projectId: z
          .string()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects"'
          ),
        folderId: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get Test Cycle folders"'
          ),
        priority: z
          .number()
          .optional()
          .describe('Refer id from the response of API "Get Priorities"'),
        status: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get Test Cycle Status"'
          ),
        reporter: z.number().optional().describe('Pass Jira user account uuid'),
        labels: z
          .array(z.number())
          .optional()
          .describe(
            'Refer ids from the response of API "Get Labels". Will be sent as {add: [labelId1, ...]} to API'
          ),
        testCasesToLink: z
          .string()
          .optional()
          .describe('Either list of test case Ids or search filter query'),
        description: z.string().optional().describe('Test Cycle description'),
        plannedStartDate: z
          .string()
          .optional()
          .describe(
            'Enter in format dd/MMM/yyyy HH:mm. Example: 18/Oct/2025 09:00'
          ),
        plannedEndDate: z
          .string()
          .optional()
          .describe(
            'Enter in format dd/MMM/yyyy HH:mm. Example: 25/Oct/2025 17:00'
          ),
        actualTime: z
          .number()
          .optional()
          .describe('Enter value in milliseconds'),
        isAutomated: z
          .boolean()
          .optional()
          .describe('Whether test cycle is automated or not'),
        assignee: z.number().optional().describe('Pass Jira user account uuid'),
        customFields: z
          .array(
            z.object({
              id: z.string().describe('Custom field ID'),
              value: z.string().describe('Custom field value'),
            })
          )
          .optional()
          .describe(
            'Custom fields as array of objects with id and value. ' +
              'Refer to "Get Test Cycle Custom Fields" to get available custom fields.'
          ),
      },
    },
    handler: async (params: UpdateTestCycleParams & { id: string }) => {
      const { id, ...updateParams } = params;
      const result = await updateQmetryTestCycle(id, updateParams);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'move-qmetry-test-cycle',
    definition: {
      title: 'Move Qmetry test cycles to a different folder',
      description: 'Move test cycles from one folder to another folder',
      inputSchema: {
        testcycleIds: z
          .array(z.string())
          .describe('The IDs of the test cycles to move'),
        targetFolderId: z
          .number()
          .describe(
            'The ID of the destination folder. Refer id from the response of API "Get Test Cycle folders"'
          ),
        projectId: z
          .number()
          .describe(
            'The ID of the project containing the test cycles. Refer id from the response of API "Get QMetry Enabled Projects"'
          ),
      },
    },
    handler: async (params: MoveTestCycleParams) => {
      const result = await moveQmetryTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  // ============================================
  // TEST CASES MANAGEMENT
  // ============================================

  {
    name: 'link-test-case-to-test-cycle',
    definition: {
      title: 'Link test cases to a test cycle',
      description: 'Link test cases to a test cycle',
      inputSchema: {
        id: z
          .string()
          .describe('Test Cycle ID - Refer id from "Search Test Cycles"'),
        testCases: z
          .array(
            z.object({
              id: z.string().describe('Test Case ID'),
              versionNo: z.number().describe('Test Case Version Number'),
            })
          )
          .describe(
            'List of test cases to link. Example: [{id: "AYjI5KPIZpxE", versionNo: 1}]'
          ),
        sort: z.string().optional().describe('Sort order for results'),
      },
    },
    handler: async (params: LinkTestCaseParams) => {
      const result = await linkTestCaseToTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'unlink-test-case-from-test-cycle',
    definition: {
      title: 'Unlink test cases from a test cycle',
      description: 'Unlink test cases from a test cycle',
      inputSchema: {
        id: z
          .string()
          .describe('Test Cycle ID - Refer id from "Search Test Cycles"'),
        testCases: z
          .array(
            z.object({
              id: z.string().describe('Test Case ID'),
              versionNo: z.number().describe('Test Case Version Number'),
            })
          )
          .optional()
          .describe(
            'List of test cases to unlink. Example: [{id: "AYjI5KPIZpxE", versionNo: 1}]'
          ),
        unlinkAll: z
          .boolean()
          .optional()
          .describe('If true, unlinks all test cases'),
      },
    },
    handler: async (params: UnlinkTestCaseParams) => {
      const result = await unlinkTestCaseFromTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  // ============================================
  // TEST PLANS MANAGEMENT
  // ============================================

  {
    name: 'get-test-cycle-test-plans',
    definition: {
      title: 'Get linked test plans for a test cycle',
      description: 'Get all test plans linked to a test cycle',
      inputSchema: {
        id: z
          .string()
          .describe('Test Cycle ID - Refer id from "Search Test Cycles"'),
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
          .describe('Comma separated fields to be fetched'),
        sort: z.string().optional().describe('Sort field and order'),
      },
    },
    handler: async (params: GetLinkedTestPlansParams) => {
      const result = await getLinkedTestPlans(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  // ============================================
  // REQUIREMENTS MANAGEMENT
  // ============================================

  {
    name: 'get-test-cycle-requirements',
    definition: {
      title: 'Get linked requirements for a test cycle',
      description: 'Get all requirements (stories) linked to a test cycle',
      inputSchema: {
        id: z
          .string()
          .describe('Test Cycle ID - Refer id from "Search Test Cycles"'),
        startAt: z
          .number()
          .optional()
          .describe('Starting index for pagination (default 0)'),
        maxResults: z
          .number()
          .optional()
          .describe('Maximum results per page (default 50, max 100)'),
        sort: z
          .string()
          .optional()
          .describe(
            'Sort pattern (e.g., key:asc). Possible values: key, status, priority'
          ),
      },
    },
    handler: async (params: GetLinkedRequirementsParams) => {
      const result = await getLinkedRequirements(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'link-requirements-to-test-cycle',
    definition: {
      title: 'Link requirements to a test cycle',
      description:
        'Link requirements (stories) to a test cycle. If any requirement cannot be linked then it will come under warningMessages obj of response.',
      inputSchema: {
        id: z
          .string()
          .describe('Test Cycle ID - Refer id from "Search Test Cycles"'),
        requirementIds: z
          .array(z.number())
          .optional()
          .describe(
            'List of Jira Issue Id which want to link with given test cycle'
          ),
      },
    },
    handler: async (params: LinkRequirementsParams) => {
      const result = await linkRequirementsToTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'unlink-requirements-from-test-cycle',
    definition: {
      title: 'Unlink requirements from a test cycle',
      description:
        'Unlink requirements (stories) from a test cycle. If any requirement cannot be unlinked then it will come under warningMessages obj of response.',
      inputSchema: {
        id: z
          .string()
          .describe('Test Cycle ID - Refer id from "Search Test Cycles"'),
        requirementIds: z
          .array(z.number())
          .optional()
          .describe(
            'List of Jira Issue Id which want to unlink from given test cycle'
          ),
        unLinkAll: z
          .boolean()
          .optional()
          .describe(
            'If it true then all linked requirements unlink with given test cycle'
          ),
      },
    },
    handler: async (params: UnlinkRequirementsParams) => {
      const result = await unlinkRequirementsFromTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  // ============================================
  // ARCHIVE OPERATIONS
  // ============================================

  {
    name: 'archive-qmetry-test-cycle',
    definition: {
      title: 'Archive a Qmetry test cycle',
      description: 'Archive a test cycle',
      inputSchema: {
        idOrKey: z
          .string()
          .describe(
            'Refer id or key from the response of API "Search Test Cycles"'
          ),
      },
    },
    handler: async (params: ArchiveTestCycleParams) => {
      const result = await archiveTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'unarchive-qmetry-test-cycle',
    definition: {
      title: 'Unarchive a Qmetry test cycle',
      description: 'Unarchive a test cycle',
      inputSchema: {
        idOrKey: z
          .string()
          .describe(
            'Refer id or key from the response of API "Search Test Cycles"'
          ),
      },
    },
    handler: async (params: ArchiveTestCycleParams) => {
      const result = await unarchiveTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },

  {
    name: 'get-qmetry-test-cycle',
    definition: {
      title: 'Get Test Cycle',
      description: 'Get details of a specific test cycle',
      inputSchema: {
        idOrKey: z.string().describe('Test Cycle Id or Test Cycle Key'),
        fields: z
          .string()
          .optional()
          .describe(
            'Comma separated field names to be fetched. Allowed: id,key,summary,description,projectId,folder,created,updated,labels,priority,status,assignee,reporter,isRebuildSeqNotRequired,automationRule'
          ),
      },
    },
    handler: async (params: GetTestCycleParams) => {
      const result = await getTestCycle(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
