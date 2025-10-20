import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  createQmetryTestCase,
  searchQmetryTestCases,
  moveQmetryTestCase,
  copyQmetryTestCase,
  updateQmetryTestCaseVersion,
  getTestCaseVersion,
  addTestCaseVersion,
  deleteTestCaseVersion,
  archiveTestCase,
  unarchiveTestCase,
  cloneTestCase,
  getTestCaseLinkedCycles,
  getTestCaseVersionsList,
} from '../api/qmetry-test-case.js';
import {
  CreateTestCaseParams,
  SearchTestCasesParams,
  MoveOrCopyTestCaseParams,
  UpdateTestCaseVersionParams,
  GetTestCaseVersionParams,
  AddTestCaseVersionParams,
  DeleteTestCaseVersionParams,
  ArchiveTestCaseParams,
  UnarchiveTestCaseParams,
  CloneTestCaseParams,
  GetTestCaseLinkedCyclesParams,
  GetTestCaseVersionsListParams,
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
  {
    name: 'get-test-case-version-details',
    definition: {
      title: 'Get Test Case version details',
      description: 'Get details of a specific test case version',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        fields: z
          .string()
          .optional()
          .describe(
            'Comma separated fields to be fetched. Allowed: description,reporter,estimatedTime,labels,created,updated,executed,folders,passRateScore. Example: fixVersions'
          ),
      },
    },
    handler: async (params: GetTestCaseVersionParams) => {
      const result = await getTestCaseVersion(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'add-test-case-version',
    definition: {
      title: 'Add Test Case version',
      description: 'Create a new version of an existing test case',
      inputSchema: {
        id: z
          .string()
          .describe(
            'Id of Test Case. Refer id from the response of API "Search Test Case".'
          ),
        copyFromVersion: z
          .number()
          .describe(
            'Test Case Version No. Create new testcase version from existing given test case version no.'
          ),
        fields: z
          .object({
            assignee: z.number().optional().describe('Jira user Account ID'),
            description: z
              .string()
              .optional()
              .describe('Description of Test Case'),
            precondition: z
              .string()
              .optional()
              .describe('Precondition of Test Case'),
            estimatedTime: z
              .string()
              .optional()
              .describe('Pass string in HH:MM:SS format.'),
            folderId: z
              .number()
              .optional()
              .describe(
                'Refer id from the response of API "Get test case folders".'
              ),
            labels: z
              .array(z.number())
              .optional()
              .describe(
                'Array of label Ids,Refer id from the response of API "Get labels".'
              ),
            priority: z
              .number()
              .optional()
              .describe('Refer id from the response of API "Get Priorities".'),
            projectId: z
              .number()
              .optional()
              .describe(
                'Refer id from the response of API "Get QMetry Enabled Projects".'
              ),
            reporter: z.number().optional().describe('Jira user Account ID'),
            status: z
              .number()
              .optional()
              .describe(
                'Refer id from the response of API "Get Test Case Status".'
              ),
            steps: z
              .array(
                z.object({
                  stepDetails: z
                    .string()
                    .describe('Description of the test step'),
                  testData: z
                    .string()
                    .describe('Test data required for the step'),
                  expectedResult: z
                    .string()
                    .describe('Expected result of the step'),
                })
              )
              .optional()
              .describe('Array of test steps'),
            summary: z.string().optional().describe('Name of Test Case.'),
            isAutomated: z
              .boolean()
              .optional()
              .describe('Whether testcase is automated or not - true or false'),
            withRequirements: z
              .boolean()
              .optional()
              .describe(
                'If true then it will copy linked stories of the previous version to the newer version.'
              ),
          })
          .optional()
          .describe(
            'Refer Fields Reference Table if the user wants to override existing data in the newly created version.'
          ),
      },
    },
    handler: async (params: AddTestCaseVersionParams) => {
      const result = await addTestCaseVersion(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'delete-test-case-version',
    definition: {
      title: 'Delete Test Case version',
      description: 'Delete a specific test case version',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
      },
    },
    handler: async (params: DeleteTestCaseVersionParams) => {
      const result = await deleteTestCaseVersion(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'archive-qmetry-test-case',
    definition: {
      title: 'Archive Test Case',
      description: 'Archive a test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
      },
    },
    handler: async (params: ArchiveTestCaseParams) => {
      const result = await archiveTestCase(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'unarchive-qmetry-test-case',
    definition: {
      title: 'Unarchive Test Case',
      description: 'Unarchive a test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
      },
    },
    handler: async (params: UnarchiveTestCaseParams) => {
      const result = await unarchiveTestCase(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'clone-qmetry-test-case',
    definition: {
      title: 'Clone Test Case',
      description: 'Clone a test case with optional configurations',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        summary: z.string().describe('Summary to set in cloned Test Case.'),
        folderId: z
          .number()
          .optional()
          .describe(
            'Refer id from the response of API "Get test case folders".'
          ),
        version: z
          .string()
          .optional()
          .describe(
            'Test Case Version Number which want to clone. Pass "*" if want to clone all test case versions. Refer versionNo from the response of API "Get Test Case version details".'
          ),
        withComments: z
          .boolean()
          .optional()
          .describe('If true then all test case comments will get cloned.'),
        withAttachments: z
          .boolean()
          .optional()
          .describe('If true then all attachments gets cloned.'),
        requirementToLink: z
          .number()
          .optional()
          .describe('JIRA Issue Id which want to link with cloned test case.'),
        withRequirements: z
          .boolean()
          .optional()
          .describe(
            'If true testcase will get cloned and the linkage with associated stories will preserve.'
          ),
      },
    },
    handler: async (params: CloneTestCaseParams) => {
      const result = await cloneTestCase(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-test-case-test-cycles',
    definition: {
      title: 'Get Linked Test Cycles',
      description: 'Get test cycles linked to a test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        tcVersionNo: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        fields: z
          .string()
          .optional()
          .describe('Comma separated fields to be fetched.'),
        startAt: z.number().optional().describe('Default 0'),
        maxResults: z.number().optional().describe('Default 50, Max 100'),
        sort: z
          .string()
          .optional()
          .describe(
            'Possible values - key,summary,estimatedTime,actualTime,status,priority,createdOn,updatedOn Pattern - sortField:sortOrder(asc/desc) For example if want to sorting on key in ascending order then need to pass key:asc'
          ),
      },
    },
    handler: async (params: GetTestCaseLinkedCyclesParams) => {
      const result = await getTestCaseLinkedCycles(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-test-case-versions-list',
    definition: {
      title: 'Get Test Case versions list',
      description: 'Get list of all versions of a test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
      },
    },
    handler: async (params: GetTestCaseVersionsListParams) => {
      const result = await getTestCaseVersionsList(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
