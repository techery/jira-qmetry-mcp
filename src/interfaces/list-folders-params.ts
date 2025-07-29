/**
 * Parameters for listing QMetry test case folders
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
