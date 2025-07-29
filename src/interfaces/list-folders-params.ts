/**
 * Defines the parameters for the listQmetryFolders function.
 * @interface ListFoldersParams
 * @property {string} projectId - The ID of the project in QMetry.
 * @property {string} [short] - Sorting options in the format "FIELD:ORDER" (e.g., "NAME:asc").
 * @property {boolean} [withCount] - Whether to include test case counts in the response.
 */
export interface ListFoldersParams {
  /** Project ID from QMetry */
  projectId: string;
  
  /** 
   * Sorting options in the format "FIELD:ORDER"
   * Example: "NAME:asc" or "CREATED_ON:desc"
   */
  short?: string;
  
  /** Whether to include test case counts in the response */
  withCount?: boolean;
}

export default ListFoldersParams;
