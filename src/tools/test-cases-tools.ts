import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  createQmetryTestCase,
  searchQmetryTestCases,
  moveQmetryTestCase,
  copyQmetryTestCase,
  updateQmetryTestCaseVersion,
} from '../api/qmetry-test-case.js';
import {
  CreateTestCaseParams,
  SearchTestCasesParams,
  MoveOrCopyTestCaseParams,
  UpdateTestCaseVersionParams,
} from '../interfaces/qmetry-test-cases.js';

export const testCasesTools: Array<ToolDefinition> = [
  {
    name: 'search-qmetry-test-cases',
    definition: {
      title: 'Search Qmetry test cases',
      description: 'Search and list test cases according to filters',
      inputSchema: {
        filter: z
          .object({
            projectId: z
              .number()
              .describe(
                'Refer id from the response of API "Get QMetry Enabled Projects".'
              ),
            assignee: z.string().optional().describe('Jira user Account ID'),
            createdBy: z.string().optional().describe('Jira user Account ID'),
            createdOn: z
              .string()
              .optional()
              .describe(
                'Comma separated two dates. Pass in "dd/MMM/yyyy,dd/MMM/yyyy" date format.'
              ),
            description: z
              .string()
              .optional()
              .describe('Description of Test Case'),
            estimatedTime: z
              .string()
              .optional()
              .describe('Pass string in HH:MM:SS format'),
            folderId: z
              .string()
              .optional()
              .describe(
                'Refer id from the response of API "Get test case folders"'
              ),
            key: z.string().optional().describe('Key of Test Case'),
            labels: z
              .array(z.string())
              .optional()
              .describe(
                'List of label names,Refer name from the response of API "Get labels".'
              ),
            priority: z
              .array(z.string())
              .optional()
              .describe('Priority of the test case'),
            reporter: z.string().optional().describe('Jira user Account ID'),
            status: z
              .array(z.string())
              .optional()
              .describe(
                'Refer name from the response of API "Get Statuses" for its module.'
              ),
            summary: z.string().optional().describe('Name of Test Case.'),
            updatedBy: z.string().optional().describe('Jira user Account ID'),
            updatedOn: z
              .string()
              .optional()
              .describe(
                'Comma separated two dates. Pass in "dd/MMM/yyyy,dd/MMM/yyyy" date format.'
              ),
          })
          .describe('Filter criteria for searching test cases'),
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
          .describe('Sort field and order (e.g., key:asc)'),
        fields: z
          .string()
          .optional()
          .describe(
            'summary,description,priority,status,assignee,isAutomated,reporter,estimatedTime,labels,folders,updated,created,executed'
          ),
      },
    },
    handler: async (params: SearchTestCasesParams) => {
      const testCases = await searchQmetryTestCases(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(testCases, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-test-case',
    definition: {
      title: 'Create a Qmetry test case',
      description: 'Create a Qmetry test case',
      inputSchema: {
        summary: z.string().describe('Name of Test Case.'),
        projectId: z
          .string()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        folderId: z
          .string()
          .describe(
            'Refer id from the response of API "Get test case folders". ' +
              'If you want to create a folder at the root level, pass "-1".'
          ),
        steps: z
          .array(
            z.object({
              stepDetails: z.string().describe('Description of the test step'),
              testData: z.string().describe('Test data required for the step'),
              expectedResult: z
                .string()
                .describe('Expected result of the step'),
              id: z.number().describe('Unique identifier for the step'),
              isChecked: z
                .boolean()
                .default(false)
                .optional()
                .describe('Whether the step is checked/completed'),
              isExpanded: z
                .boolean()
                .default(true)
                .optional()
                .describe('Whether the step is expanded in the UI'),
            })
          )
          .describe(
            'Array of test steps with details, test data, and expected results'
          ),
        assignee: z.string().optional().describe('Jira user Account ID'),
        components: z
          .array(z.string())
          .optional()
          .describe(
            'Array of component Id and for componentId ' +
              'refer id from the response of API "Get components".'
          ),
        description: z.string().optional().describe('Description of Test Case'),
        precondition: z
          .string()
          .optional()
          .describe('Precondition of Test Case'),
        estimatedTime: z
          .string()
          .optional()
          .describe('Pass string in HH:MM:SS format.'),
        fixVersions: z
          .array(z.string())
          .optional()
          .describe('List of JIRA fix version ID'),
        labels: z
          .array(z.string())
          .optional()
          .describe(
            'Array of label Ids,Refer id from the response ' +
              'of API "Get labels".'
          ),
        priority: z
          .string()
          .optional()
          .describe('Refer id from the response of API "Get Priorities".'),
        reporter: z.string().optional().describe('Jira user Account ID'),
        sprint: z.string().optional().describe('Jira sprint ID'),
        status: z
          .string()
          .optional()
          .describe(
            'Refer id from the response of API "Get Test Case Status".'
          ),
        isAutomated: z
          .boolean()
          .optional()
          .describe('Whether testcase is automated or not - true or false'),
      },
    },
    handler: async (params: CreateTestCaseParams) => {
      const testCases = await createQmetryTestCase(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(testCases, null, 2) }],
      };
    },
  },
  {
    name: 'move-qmetry-test-case',
    definition: {
      title: 'Move a Qmetry test case to a different folder',
      description: 'Move a Qmetry test case from one folder to another folder',
      inputSchema: {
        testcaseIds: z
          .array(z.string())
          .describe(
            'The IDs of the test cases to move. Refer id from the response of API "Get test cases".'
          ),
        targetFolderId: z
          .number()
          .describe(
            'The ID of the destination folder. Refer id from the response of API "Get test case folders".'
          ),
        projectId: z
          .number()
          .describe(
            'The ID of the project containing the test case. Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        selectedFolderId: z
          .number()
          .describe(
            'The ID of the folder to move the test cases from. Refer id from the response of API "Get test case folders".'
          ),
      },
    },
    handler: async (params: MoveOrCopyTestCaseParams) => {
      const result = await moveQmetryTestCase(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'copy-qmetry-test-case',
    definition: {
      title: 'Copy a Qmetry test case to a different folder',
      description: 'Copy a Qmetry test case from one folder to another folder',
      inputSchema: {
        testcaseIds: z
          .array(z.string())
          .describe(
            'The IDs of the test cases to move. Refer id from the response of API "Get test cases".'
          ),
        targetFolderId: z
          .number()
          .describe(
            'The ID of the destination folder. Refer id from the response of API "Get test case folders".'
          ),
        projectId: z
          .number()
          .describe(
            'The ID of the project containing the test case. Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        selectedFolderId: z
          .number()
          .describe(
            'The ID of the folder to move the test cases from. Refer id from the response of API "Get test case folders".'
          ),
      },
    },
    handler: async (params: MoveOrCopyTestCaseParams) => {
      const result = await copyQmetryTestCase(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'update-qmetry-test-case',
    definition: {
      title: 'Update a Qmetry test case',
      description: 'Update a Qmetry test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        status: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get Statuses" for its module.'
          ),
        priority: z
          .number()
          .optional()
          .describe('Refer id from the response of API "Get Priorities".'),
        assignee: z.number().optional().describe('Jira user Account ID'),
        description: z.string().optional().describe('Description of Test Case'),
        precondition: z
          .string()
          .optional()
          .describe('precondition of Test Case'),
        estimatedTime: z
          .string()
          .optional()
          .describe('Pass string in HH:MM:SS format'),
        folders: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get test case folders".'
          ),
        labels: z
          .array(z.number())
          .optional()
          .describe('Refer id from the response of API "Get labels".'),
        sprint: z.number().optional().describe('Jira sprint ID'),
        summary: z.string().optional().describe('Name of Test Case.'),
        isAutomated: z
          .boolean()
          .optional()
          .describe('Whether testcase is automated or not - true or false'),
      },
    },
    handler: async (params: UpdateTestCaseVersionParams) => {
      const result = await updateQmetryTestCaseVersion(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
