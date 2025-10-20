/**
 * Defines the parameters for searching/listing Test Cycles.
 * @interface SearchTestCyclesParams
 * @property {object} filter - Filter criteria for searching test cycles
 * @property {string} [filter.projectId] - The ID of the project
 * @property {number} [filter.folderId] - Folder ID where test cycles are stored
 * @property {string} [filter.summary] - Test Cycle summary/name
 * @property {string[]} [filter.status] - Array of status values
 * @property {string} [filter.priority] - Priority of the test cycle
 * @property {string} [filter.assignee] - Jira user Account ID
 * @property {string} [filter.reporter] - Jira user Account ID
 * @property {string[]} [filter.labels] - Array of label names
 * @property {string[]} [filter.createdBy] - Array of user Account IDs who created
 * @property {string} [filter.createdOn] - Creation date range (dd/MMM/yyyy,dd/MMM/yyyy)
 * @property {string[]} [filter.updatedBy] - Array of user Account IDs who updated
 * @property {string} [filter.updatedOn] - Update date range (dd/MMM/yyyy,dd/MMM/yyyy)
 * @property {string} [filter.plannedStartDate] - Planned start date
 * @property {string} [filter.plannedEndDate] - Planned end date
 * @property {number} [startAt] - Starting index for pagination (default 0)
 * @property {number} [maxResults] - Maximum results per page (default 50, max 100)
 * @property {string} [fields] - Comma separated fields to be fetched
 * @property {string} [sort] - Sort field and order (e.g., key:asc)
 */
export interface SearchTestCyclesParams {
  filter: {
    projectId?: string;
    folderId?: number;
    summary?: string;
    status?: string[];
    priority?: string;
    assignee?: string;
    reporter?: string;
    labels?: string[];
    createdBy?: string[];
    createdOn?: string;
    updatedBy?: string[];
    updatedOn?: string;
    plannedStartDate?: string;
    plannedEndDate?: string;
    customFields?: { id: string; value: string }[];
  };
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
}

/**
 * Defines the parameters for creating a Test Cycle.
 * @interface CreateTestCycleParams
 * @property {string} summary - Test Cycle Summary (required)
 * @property {string} projectId - The ID of the project (required)
 * @property {number} [folderId] - The ID of the folder where test cycle is stored
 * @property {number} [priority] - Priority Id
 * @property {number} [status] - Status Id
 * @property {number} [reporter] - Jira user account uuid
 * @property {number[]} [labels] - List of label Ids (will be sent as {add: [labelId1, labelId2, ...]} to API)
 * @property {string} [testCasesToLink] - Either list of test case Ids or search filter query
 * @property {string} [description] - Test Cycle description
 * @property {string} [plannedStartDate] - Planned start date (dd/MMM/yyyy HH:mm)
 * @property {string} [plannedEndDate] - Planned end date (dd/MMM/yyyy HH:mm)
 * @property {number} [actualTime] - Actual time in milliseconds
 * @property {boolean} [isAutomated] - Whether test cycle is automated or not
 * @property {number} [assignee] - Jira user account uuid to assign test cycle
 * @property {{ id: string; value: string }[]} [customFields] - Custom fields for the test cycle
 */
export interface CreateTestCycleParams {
  summary: string;
  projectId: string;
  folderId?: number;
  priority?: number;
  status?: number;
  reporter?: number;
  labels?: number[];
  testCasesToLink?: string;
  description?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  actualTime?: number;
  isAutomated?: boolean;
  assignee?: number;
  customFields?: { id: string; value: string }[];
}

/**
 * Defines the parameters for updating a Test Cycle.
 * @interface UpdateTestCycleParams
 * @property {string} summary - Test Cycle Summary (required)
 * @property {string} projectId - The ID of the project (required)
 * @property {number} [folderId] - The ID of the folder
 * @property {number} [priority] - Priority Id
 * @property {number} [status] - Status Id
 * @property {number} [reporter] - Jira user account uuid
 * @property {number[]} [labels] - List of label Ids (will be sent as {add: [labelId1, ...]} to API)
 * @property {string} [testCasesToLink] - Either list of test case Ids or search filter query
 * @property {string} [description] - Test Cycle description
 * @property {string} [plannedStartDate] - Planned start date (dd/MMM/yyyy HH:mm)
 * @property {string} [plannedEndDate] - Planned end date (dd/MMM/yyyy HH:mm)
 * @property {number} [actualTime] - Actual time in milliseconds
 * @property {boolean} [isAutomated] - Whether test cycle is automated or not
 * @property {number} [assignee] - Jira user account uuid
 * @property {{ id: string; value: string }[]} [customFields] - Custom fields for the test cycle
 */
export interface UpdateTestCycleParams {
  summary: string;
  projectId: string;
  folderId?: number;
  priority?: number;
  status?: number;
  reporter?: number;
  labels?: number[];
  testCasesToLink?: string;
  description?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  actualTime?: number;
  isAutomated?: boolean;
  assignee?: number;
  customFields?: { id: string; value: string }[];
}

/**
 * Defines the parameters for moving Test Cycles.
 * @interface MoveTestCycleParams
 * @property {string[]} testcycleIds - List of test cycle IDs to move
 * @property {number} targetFolderId - Folder ID where test cycles will be moved
 * @property {number} projectId - The ID of the project
 */
export interface MoveTestCycleParams {
  testcycleIds: string[];
  targetFolderId: number;
  projectId: number;
}

/**
 * Defines the parameters for linking test cases to a test cycle.
 * @interface LinkTestCaseParams
 * @property {string} id - Test Cycle ID
 * @property {object[]} [testCases] - List of test cases to link with format {id: "testCaseId", versionNo: 1}
 * @property {string} [sort] - Sort order for results
 */
export interface LinkTestCaseParams {
  id: string;
  testCases: {
    id: string;
    versionNo: number;
  }[];
  sort?: string;
}

/**
 * Defines the parameters for unlinking test cases from a test cycle.
 * @interface UnlinkTestCaseParams
 * @property {string} id - Test Cycle ID
 * @property {object[]} [testCases] - List of test cases to unlink with format {id: "testCaseId", versionNo: 1}
 * @property {boolean} [unlinkAll] - If true, unlinks all test cases
 */
export interface UnlinkTestCaseParams {
  id: string;
  testCases?: {
    id: string;
    versionNo: number;
  }[];
  unlinkAll?: boolean;
}

/**
 * Defines the parameters for getting linked test plans.
 * @interface GetLinkedTestPlansParams
 * @property {string} id - Test Cycle ID
 * @property {number} [startAt] - Starting index for pagination (default 0)
 * @property {number} [maxResults] - Maximum results per page (default 50, max 100)
 * @property {string} [fields] - Comma separated fields to be fetched
 * @property {string} [sort] - Sort field and order
 */
export interface GetLinkedTestPlansParams {
  id: string;
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
}

/**
 * Defines the parameters for getting linked requirements.
 * @interface GetLinkedRequirementsParams
 * @property {string} id - Test Cycle ID
 * @property {number} [startAt] - Starting index for pagination (default 0)
 * @property {number} [maxResults] - Maximum results per page (default 50, max 100)
 * @property {string} [sort] - Sort field and order
 */
export interface GetLinkedRequirementsParams {
  id: string;
  startAt?: number;
  maxResults?: number;
  sort?: string;
}

/**
 * Defines the parameters for linking requirements to a test cycle.
 * @interface LinkRequirementsParams
 * @property {string} id - Test Cycle ID
 * @property {number[]} [requirementIds] - List of requirement IDs to link
 */
export interface LinkRequirementsParams {
  id: string;
  requirementIds?: number[];
}

/**
 * Defines the parameters for unlinking requirements from a test cycle.
 * @interface UnlinkRequirementsParams
 * @property {string} id - Test Cycle ID
 * @property {number[]} [requirementIds] - List of requirement IDs to unlink
 * @property {boolean} [unLinkAll] - If true, unlinks all requirements
 */
export interface UnlinkRequirementsParams {
  id: string;
  requirementIds?: number[];
  unLinkAll?: boolean;
}

/**
 * Defines the parameters for archiving/unarchiving a Test Cycle.
 * @interface ArchiveTestCycleParams
 * @property {string} idOrKey - Test Cycle ID or key
 */
export interface ArchiveTestCycleParams {
  idOrKey: string;
}

/**
 * Defines the parameters for getting test cycle details.
 * @interface GetTestCycleParams
 * @property {string} idOrKey - Test Cycle ID or Key
 * @property {string} [fields] - Comma separated fields
 */
export interface GetTestCycleParams {
  idOrKey: string;
  fields?: string;
}
