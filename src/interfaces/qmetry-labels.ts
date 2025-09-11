/**
 * Interface for the data required to get labels from Qmetry.
 * @interface GetLabelsParams
 * @property {number} projectId - The ID of the project.
 */
export interface GetLabelsParams {
  projectId: number;
}

/**
 * Interface for creating a new label in Qmetry.
 * @interface CreateLabelParams
 * @property {number} projectId - The ID of the project.
 * @property {string} name - The name of the label.
 */
export interface CreateLabelParams {
  projectId: number;
  name: string;
}

/**
 * Interface for updating an existing label in Qmetry.
 * @interface UpdateLabelParams
 * @property {number} projectId - The ID of the project.
 * @property {number} labelId - The ID of the label to update.
 * @property {string} name - The new name of the label.
 */
export interface UpdateLabelParams {
  projectId: number;
  labelId: number;
  name: string;
}

/**
 * Interface for deleting a label from Qmetry.
 * @interface DeleteLabelParams
 * @property {number} projectId - The ID of the project.
 * @property {number} labelId - The ID of the label to delete.
 */
export interface DeleteLabelParams {
  projectId: number;
  labelId: number;
}

/**
 * Interface for getting a label from Qmetry.
 * @interface GetLabelReferenceCountParams
 * @property {number} projectId - The ID of the project.
 * @property {number} labelId - The ID of the label to get.
 */
export interface GetLabelReferenceCountParams {
  projectId: number;
  labelId: number;
}
