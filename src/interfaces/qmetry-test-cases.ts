/**
 * Defines the parameters for the getQmetryTestCycleFolders function.
 * @interface SearchTestCasesParams
 * @property {number} projectId - The ID of the project.
 * @property {string} [assignee] - Jira user Account ID.
 * @property {string[]} [components] - Array of component names, refer name from the response' +
                    ' of API "Get components".
 * @property {string} [createdBy] - Jira user Account ID.
 * @property {string} [createdOn] - Comma separated two dates. Pass in ' +
                    '"dd/MMM/yyyy,dd/MMM/yyyy" date format.
 * @property {string} [description] - Description of Test Case
 * @property {string} [estimatedTime] - Pass string in HH:MM:SS format.
 * @property {string[]} [fixVersions] - List of JIRA fix version ID.
 * @property {string} [folderId] - Refer id from the response of API ' +
                    ' "Get test case folders"
 * @property {string} [key] - Key of Test Case
 * @property {string[]} [labels] - List of label names,Refer name from ' +
                    'the response of API "Get labels".
 * @property {string} [priority] - Priority of the test case.
 * @property {string} [reporter] - Jira user Account ID.
 * @property {string} [sprint] - Jira sprint ID.
 * @property {string[]} [status] - The status of the test case.
 * @property {string} [summary] - Name of Test Case.
 * @property {string} [updatedBy] - Jira user Account ID.
 * @property {string} [updatedOn] - Comma separated two dates. Pass in ' +
                    '"dd/MMM/yyyy,dd/MMM/yyyy" date format.
 * @property {number} [maxResults] - The maximum number of results to return.
 * @property {string} [sort] - The sorting criteria.
 * @property {number} [startAt] - The starting index for pagination.
 */
export interface SearchTestCasesParams {
  projectId: number;
  assignee?: string;
  components?: string[];
  createdBy?: string;
  createdOn?: string;
  description?: string;
  estimatedTime?: string;
  fixVersions?: string[];
  folderId?: string;
  key?: string;
  labels?: string[];
  priority?: string;
  reporter?: string;
  sprint?: string;
  status?: string[];
  summary?: string;
  updatedBy?: string;
  updatedOn?: string;
  maxResults?: number;
  sort?: string;
  startAt?: number;
}

/**
 * Defines the parameters for moving a test case to a different folder.
 * @interface MoveTestCaseParams
 * @property {string[]} testCaseIds - 	list of test case id or Search filter. For Test case id
 * - Refer id from the response of API "Search Test Case".
 * @property {number} targetFolderId - Folder Id of where you want to move testcases to folder.
 * Refer id from the response of API "Get test case folders".
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} selectedFolderId - Folder Id of where you want to move testcases from folder.
 * Refer id from the response of API "Get test case folders".
 */
export interface MoveOrCopyTestCaseParams {
  testcaseIds: string[];
  targetFolderId: number;
  projectId: number;
  selectedFolderId: number;
}

/**
 * Defines the structure for a test step
 * @interface TestStep
 * @property {string} stepDetails - The description of the test step
 * @property {string} testData - The test data required for the step
 * @property {string} expectedResult - The expected result of the step
 * @property {number} id - Unique identifier for the step
 * @property {boolean} isChecked - Whether the step is checked/completed
 * @property {boolean} isExpanded - Whether the step is expanded in the UI
 */
interface TestStep {
  stepDetails: string;
  testData: string;
  expectedResult: string;
  id: number;
  isChecked?: boolean;
  isExpanded?: boolean;
}

/**
 * Defines the parameters for creating a test case.
 * @interface CreateTestCaseParams
 * @property {string} summary - The summary of the test case.
 * @property {string} projectId - The ID of the project to which the test case belongs.
 * @property {string} [folderId] - The ID of the folder where the test case is stored.
 * @property {string} [assignee] - The Jira user Account ID of the assignee.
 * @property {string[]} [components] - The list of component names associated with the test case.
 * @property {string} [description] - The description of the test case.
 * @property {string} [precondition] - The precondition required for the test case.
 * @property {string} [estimatedTime] - The estimated time to complete the test case, in HH:MM:SS format.
 * @property {string[]} [fixVersions] - The list of JIRA fix version IDs associated with the test case.
 * @property {string[]} [labels] - The list of label names associated with the test case.
 * @property {string} [priority] - The priority level of the test case.
 * @property {string} [reporter] - The Jira user Account ID of the reporter.
 * @property {string} [sprint] - The Jira sprint ID associated with the test case.
 * @property {string} [status] - The status of the test case.
 * @property {TestStep[]} [steps] - The list of test steps with details, test data, and expected results.
 * @property {boolean} [isAutomated] - Indicates whether the test case is automated.
 */
export interface CreateTestCaseParams {
  summary: string;
  projectId: string;
  folderId: string;
  assignee?: string;
  components?: string[];
  description?: string;
  precondition?: string;
  estimatedTime?: string;
  fixVersions?: string[];
  labels?: string[];
  priority?: string;
  reporter?: string;
  sprint?: string;
  status?: string;
  steps?: TestStep[];
  isAutomated?: boolean;
}

/**
 * Defines the parameters for updating a test case version.
 * @interface UpdateTestCaseVersionParams
 * @property {string} id - Test Case ID. Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number} [status] - Status ID. Refer id from the response of API "Get Statuses" for its module.
 * @property {number} [priority] - Priority ID. Refer id from the response of API "Get Priorities".
 * @property {string} [assignee] - Jira user Account ID.
 * @property {string[]} [components] - Array of component IDs. Refer id from the response of API "Get components".
 * @property {object} [customFields] - Custom fields JSON object.
 * @property {string} [description] - Description of Test Case.
 * @property {string} [precondition] - Precondition of Test Case.
 * @property {string} [estimatedTime] - Estimated time in HH:MM:SS format.
 * @property {string[]} [fixVersions] - List of JIRA fix version IDs.
 * @property {string[]} [folders] - Array of folder IDs. Refer id from the response of API "Get test case folders".
 * @property {string[]} [labels] - Array of label IDs. Refer id from the response of API "Get labels".
 * @property {string} [reporter] - Jira user Account ID.
 * @property {string} [sprint] - Jira sprint ID.
 * @property {string} [summary] - Name of Test Case.
 * @property {boolean} [isAutomated] - Whether testcase is automated or not.
 */
export interface UpdateTestCaseVersionParams {
  id: string;
  no: number;
  status?: number;
  priority?: number;
  assignee?: number;
  description?: string;
  precondition?: string;
  estimatedTime?: string;
  folders?: number;
  labels?: number;
  sprint?: number;
  summary?: string;
  isAutomated?: boolean;
}
