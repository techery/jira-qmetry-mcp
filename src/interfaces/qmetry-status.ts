/**
 * Interface for the data required to get statuses from Qmetry.
 * @interface GetTestCaseStatusesParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {string} [status] - Possible values are active, archive. Ex. status=active,archive
 */
export interface GetTestCaseStatusesParams {
  projectId: number;
  status?: string;
}

/**
 * Interface for creating a new status in Qmetry.
 * @interface CreateTestCaseStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {string} name - Status name
 * @property {string} color - Status Color Ex. Hex code of color, refer JSON schema
 * @property {string} [description] - Status Description
 */
export interface CreateTestCaseStatusParams {
  projectId: number;
  name: string;
  color: string;
  description?: string;
}

/**
 * Interface for updating an existing status in Qmetry.
 * @interface UpdateTestCaseStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 * @property {string} [name] - Status name
 * @property {string} color - Status Color Ex. Hex code of color, refer JSON schema
 * @property {string} [description] - Status Description
 */
export interface UpdateTestCaseStatusParams {
  projectId: number;
  statusId: number;
  name: string;
  color: string;
  description?: string;
}

/**
 * Interface for deleting a status from Qmetry.
 * @interface DeleteTestCaseStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 */
export interface DeleteTestCaseStatusParams {
  projectId: number;
  statusId: number;
}

/**
 * Interface for getting the reference count of a status in Qmetry.
 * @interface GetTestCaseStatusReferenceCountParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 */
export interface GetTestCaseStatusReferenceCountParams {
  projectId: number;
  statusId: number;
}

/**
 * Interface for the data required to get statuses from Qmetry.
 * @interface GetTestCycleStatusesParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {string} [status] - Possible values are active, archive. Ex. status=active,archive
 */
export interface GetTestCycleStatusesParams {
  projectId: number;
  status?: string;
}

/**
 * Interface for creating a new status in Qmetry.
 * @interface CreateTestCycleStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {string} name - Status name
 * @property {string} color - Status Color Ex. Hex code of color, refer JSON schema
 * @property {string} [description] - Status Description
 */
export interface CreateTestCycleStatusParams {
  projectId: number;
  name: string;
  color: string;
  description?: string;
}

/**
 * Interface for updating an existing status in Qmetry.
 * @interface UpdateTestCycleStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 * @property {string} [name] - Status name
 * @property {string} color - Status Color Ex. Hex code of color, refer JSON schema
 * @property {string} [description] - Status Description
 */
export interface UpdateTestCycleStatusParams {
  projectId: number;
  statusId: number;
  name: string;
  color: string;
  description?: string;
}

/**
 * Interface for deleting a status from Qmetry.
 * @interface DeleteTestCycleStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 */
export interface DeleteTestCycleStatusParams {
  projectId: number;
  statusId: number;
}

/**
 * Interface for getting the reference count of a status in Qmetry.
 * @interface GetTestCycleStatusReferenceCountParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 */
export interface GetTestCycleStatusReferenceCountParams {
  projectId: number;
  statusId: number;
}

/**
 * Interface for the data required to get statuses from Qmetry.
 * @interface GetTestPlanStatusesParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {string} [status] - Possible values are active, archive. Ex. status=active,archive
 */
export interface GetTestPlanStatusesParams {
  projectId: number;
  status?: string;
}

/**
 * Interface for creating a new status in Qmetry.
 * @interface CreateTestPlanStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {string} name - Status name
 * @property {string} color - Status Color Ex. Hex code of color, refer JSON schema
 * @property {string} [description] - Status Description
 */
export interface CreateTestPlanStatusParams {
  projectId: number;
  name: string;
  color: string;
  description?: string;
}

/**
 * Interface for updating an existing status in Qmetry.
 * @interface UpdateTestPlanStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 * @property {string} [name] - Status name
 * @property {string} color - Status Color Ex. Hex code of color, refer JSON schema
 * @property {string} [description] - Status Description
 */
export interface UpdateTestPlanStatusParams {
  projectId: number;
  statusId: number;
  name: string;
  color: string;
  description?: string;
}

/**
 * Interface for deleting a status from Qmetry.
 * @interface DeleteTestPlanStatusParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 */
export interface DeleteTestPlanStatusParams {
  projectId: number;
  statusId: number;
}

/**
 * Interface for getting the reference count of a status in Qmetry.
 * @interface GetTestPlanStatusReferenceCountParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} statusId - Refer id from the response of API "Get statuses".
 */
export interface GetTestPlanStatusReferenceCountParams {
  projectId: number;
  statusId: number;
}
