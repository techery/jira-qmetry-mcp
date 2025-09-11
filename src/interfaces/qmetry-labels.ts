/**
 * Interface for the data required to get labels from Qmetry.
 * @interface GetLabelsParams
 * @property {number} projectId - The ID of the project.
 * @property {string} [name] - The name of the label to filter by.
 * @property {number} [maxResults] - Maximum number of results to return.
 * @property {number} [startAt] - Starting index for pagination.
 */
export interface GetLabelsParams {
  projectId: number;
  name?: string;
  maxResults?: number;
  startAt?: number;
}

/**
 * Interface for creating a new label in Qmetry.
 * @interface CreateLabelParams
 * @property {number} projectId - The ID of the project.
 * @property {string} name - The name of the label.
 * @property {string} [description] - Description of the label.
 * @property {string} [color] - Color code for the label (hex format).
 */
export interface CreateLabelParams {
  projectId: number;
  name: string;
  description?: string;
  color?: string;
}

/**
 * Interface for updating an existing label in Qmetry.
 * @interface UpdateLabelParams
 * @property {number} projectId - The ID of the project.
 * @property {number} labelId - The ID of the label to update.
 * @property {string} [name] - The new name of the label.
 * @property {string} [description] - New description of the label.
 * @property {string} [color] - New color code for the label (hex format).
 */
export interface UpdateLabelParams {
  projectId: number;
  labelId: number;
  name?: string;
  description?: string;
  color?: string;
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
