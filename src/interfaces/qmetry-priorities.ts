/**
 * Interface for the data required to get priorities from Qmetry.
 * @interface GetPrioritiesParams
 * @property {number} projectId - The ID of the project.
 * @property {string} [status] - The status of the priority.
 */
export interface GetPrioritiesParams {
  projectId: number;
  status?: string;
}

/**
 * Interface for the body of the get priority reference count request.
 * @interface GetPriorityReferenceCountParams
 * @property {number} projectId - Refer id from the response of API "Get QMetry Enabled Projects".
 * @property {number} priorityId - Refer id from the response of API "Get Priorities".
 */
export interface GetPriorityReferenceCountParams {
  projectId: number;
  priorityId: number;
}
