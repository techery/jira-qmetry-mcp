/**
 * Interface for getting custom field types.
 * @interface GetCustomFieldTypesParams
 */
export type GetCustomFieldTypesParams = object;

/**
 * Interface for getting test case custom fields.
 * @interface GetTestCaseCustomFieldsParams
 * @property {number} projectId - The ID of the project
 */
export interface GetTestCaseCustomFieldsParams {
  projectId: number;
}

/**
 * Interface for getting test case custom field reference count.
 * @interface GetTestCaseCustomFieldRefCountParams
 * @property {number} projectId - The ID of the project
 * @property {string} id - The ID of the custom field
 */
export interface GetTestCaseCustomFieldRefCountParams {
  projectId: number;
  id: string;
}

/**
 * Interface for getting test cycle custom fields.
 * @interface GetTestCycleCustomFieldsParams
 * @property {number} projectId - The ID of the project
 */
export interface GetTestCycleCustomFieldsParams {
  projectId: number;
}

/**
 * Interface for getting test cycle custom field reference count.
 * @interface GetTestCycleCustomFieldRefCountParams
 * @property {number} projectId - The ID of the project
 * @property {string} id - The ID of the custom field
 */
export interface GetTestCycleCustomFieldRefCountParams {
  projectId: number;
  id: string;
}

/**
 * Interface for getting test plan custom fields.
 * @interface GetTestPlanCustomFieldsParams
 * @property {number} projectId - The ID of the project
 */
export interface GetTestPlanCustomFieldsParams {
  projectId: number;
}

/**
 * Interface for getting test plan custom field reference count.
 * @interface GetTestPlanCustomFieldRefCountParams
 * @property {number} projectId - The ID of the project
 * @property {string} id - The ID of the custom field
 */
export interface GetTestPlanCustomFieldRefCountParams {
  projectId: number;
  id: string;
}

/**
 * Interface for getting test execution custom fields.
 * @interface GetTestExecutionCustomFieldsParams
 * @property {number} projectId - The ID of the project
 */
export interface GetTestExecutionCustomFieldsParams {
  projectId: number;
}

/**
 * Interface for getting test execution custom field reference count.
 * @interface GetTestExecutionCustomFieldRefCountParams
 * @property {number} projectId - The ID of the project
 * @property {string} id - The ID of the custom field
 */
export interface GetTestExecutionCustomFieldRefCountParams {
  projectId: number;
  id: string;
}
