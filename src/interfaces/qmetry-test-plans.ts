/**
 * Defines the parameters for searching/listing Test Plans.
 * @interface SearchTestPlansParams
 * @property {object} filter - Filter criteria for searching test plans
 * @property {number} [startAt] - Starting index for pagination (default 0)
 * @property {number} [maxResults] - Maximum results per page (default 50, max 100)
 * @property {string} [fields] - Comma separated fields to be fetched
 * @property {string} [sort] - Sort field and order
 */
export interface SearchTestPlansParams {
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
    createdOn?: string; // dd/MMM/yyyy,dd/MMM/yyyy
    updatedBy?: string[];
    updatedOn?: string; // dd/MMM/yyyy,dd/MMM/yyyy
    customFields?: { id: string; value: string }[];
  };
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
}

/**
 * Defines the parameters for getting a specific Test Plan.
 * @interface GetTestPlanParams
 * @property {string} idOrKey - Test Plan ID or Key
 * @property {string} [fields] - Comma separated fields to be fetched
 */
export interface GetTestPlanParams {
  idOrKey: string;
  fields?: string;
}

/**
 * Defines the parameters for creating a Test Plan.
 * @interface CreateTestPlanParams
 * @property {string} summary - Test Plan Summary (required)
 * @property {string} projectId - The ID of the project (required)
 * @property {number} [folderId] - The ID of the folder
 * @property {number} [priority] - Priority Id
 * @property {number} [status] - Status Id
 * @property {number} [reporter] - Jira user account uuid
 * @property {number[]} [labels] - List of label Ids
 * @property {object} [testcycles] - Test cycles to link
 * @property {string} [description] - Test Plan description
 * @property {{ id: string; value: string }[]} [customFields] - Custom fields for the test plan
 */
export interface CreateTestPlanParams {
  summary: string;
  projectId: string;
  folderId?: number;
  priority?: number;
  status?: number;
  reporter?: number;
  labels?: number[];
  testcycles?: {
    testcycleIds: string[];
  };
  description?: string;
  customFields?: { id: string; value: string }[];
}

/**
 * Defines the parameters for updating a Test Plan.
 * @interface UpdateTestPlanParams
 * @property {string} id - Test Plan ID (required)
 * @property {string} [summary] - Test Plan Summary
 * @property {number} [folderId] - The ID of the folder
 * @property {number} [priority] - Priority Id
 * @property {number} [status] - Status Id
 * @property {number} [reporter] - Jira user account uuid
 * @property {number[]} [labels] - List of label Ids
 * @property {string} [description] - Test Plan description
 * @property {{ id: string; value: string }[]} [customFields] - Custom fields for the test plan
 */
export interface UpdateTestPlanParams {
  id: string;
  summary?: string;
  folderId?: number;
  priority?: number;
  status?: number;
  reporter?: number;
  labels?: number[];
  description?: string;
  customFields?: { id: string; value: string }[];
}

/**
 * Defines the parameters for moving Test Plans.
 * @interface MoveTestPlansParams
 * @property {number} targetFolderId - Folder Id where testplans to be moved (required)
 * @property {string} projectId - The ID of the project (required)
 * @property {string[]} testplanIds - List of test plan IDs to move (required)
 */
export interface MoveTestPlansParams {
  targetFolderId: number;
  projectId: string;
  testplanIds: string[];
}

/**
 * Defines the parameters for getting linked test cycles.
 * @interface GetLinkedTestCyclesParams
 * @property {string} id - Test Plan ID (required)
 * @property {object} [filter] - Filter criteria for searching linked test cycles
 * @property {number} [startAt] - Starting index for pagination
 * @property {number} [maxResults] - Maximum results per page
 * @property {string} [fields] - Comma separated fields to be fetched
 * @property {string} [sort] - Sort field and order
 */
export interface GetLinkedTestCyclesParams {
  id: string;
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
    createdOn?: string; // dd/MMM/yyyy,dd/MMM/yyyy
    updatedBy?: string[];
    updatedOn?: string; // dd/MMM/yyyy,dd/MMM/yyyy
  };
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
}

/**
 * Defines the parameters for linking test cycles to a test plan.
 * @interface LinkTestCyclesToTestPlanParams
 * @property {string} id - Test Plan ID (required)
 * @property {string[]} testcycleIds - List of test cycle IDs to link (required)
 * @property {string} [sort] - Sort order for results
 */
export interface LinkTestCyclesToTestPlanParams {
  id: string;
  testcycleIds: string[];
  sort?: string;
}

/**
 * Defines the parameters for unlinking test cycles from a test plan.
 * @interface UnlinkTestCyclesFromTestPlanParams
 * @property {string} id - Test Plan ID (required)
 * @property {string[]} testcycleIds - List of test cycle IDs to unlink (required)
 */
export interface UnlinkTestCyclesFromTestPlanParams {
  id: string;
  testcycleIds: string[];
}

/**
 * Defines the parameters for archiving/unarchiving a test plan.
 * @interface ArchiveTestPlanParams
 * @property {string} idOrKey - Test Plan ID or Key (required)
 */
export interface ArchiveTestPlanParams {
  idOrKey: string;
}
