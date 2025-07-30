/**
 * Defines the parameters for the copyQmetryFolder function.
 * @interface CopyTestCaseFolderParams
 * @property {string} folderId - The ID of the folder to be copied.
 * @property {string} projectId - The ID of the project containing the folder.
 * @property {string} newParentId - The ID of the parent folder where the folder will be copied.
 */
export interface CopyTestCaseFolderParams {
  folderId: string;
  projectId: string;
  newParentId: string;
}

/**
 * Defines the parameters for the createQmetryFolder function.
 * @interface CreateTestCaseFolderParams
 * @property {string} folderName - The name of the new folder.
 * @property {string} parentId - The ID of the parent folder. Use "-1" for the root.
 * @property {string} projectId - The ID of the project where the folder will be created.
 * @property {string} [description] - An optional description for the folder.
 */
export interface CreateTestCaseFolderParams {
  /** Name of the folder to create */
  folderName: string;
  
  /** 
   * Parent folder ID
   * Use "-1" for root level folders
   */
  parentId: string;
  
  /** Project ID where the folder will be created */
  projectId: string;
  
  /** Optional description for the folder */
  description?: string;
}

/**
 * Defines the parameters for the listQmetryProjects function.
 * @interface GetTestCaseFoldersParams
 * @property {string} projectId - The ID of the project to search for.
 * @property {string} [short] - Possible values - NAME,CREATED_ON,UPDATED_ON
Pattern - sortField:sortOrder(asc/desc)
For example if want to sorting on createOn in ascending order then need to pass CREATED_ON:asc
 * @property {boolean} [withCount] - The starting index for pagination.
 */
export interface GetTestCaseFoldersParams {
  /** The ID of the project to search for */
  projectId: number;
  
  /** Maximum number of results to return */
  short?: string;
  
  /** Starting index for pagination */
  withCount?: boolean;
}

/**
 * Defines the parameters for the moveQmetryFolder function.
 * @interface MoveTestCaseFolderParams
 * @property {string} folderId - The ID of the folder to be moved.
 * @property {string} projectId - The ID of the project containing the folder.
 * @property {string} newParentId - The ID of the new parent folder. Use "-1" to move to the root.
 */
export interface MoveTestCaseFolderParams {
  /** ID of the folder to move */
  folderId: string;
  
  /** Project ID that contains the folder */
  projectId: string;
  
  /** 
   * ID of the new parent folder
   * Use "-1" to move to the root level
   */
  newParentId: string;
}

/**
 * Defines the parameters for the updateQmetryFolder function.
 * @interface EditTestCaseFolderParams
 * @property {string} folderName - The new name for the folder.
 * @property {string} folderId - The ID of the folder to be updated.
 * @property {string} projectId - The ID of the project containing the folder.
 * @property {string} [description] - An optional new description for the folder.
 */
export interface EditTestCaseFolderParams {
  /** New name for the folder */
  folderName: string;
  
  /** ID of the folder to update */
  folderId: string;
  
  /** Project ID that contains the folder */
  projectId: string;
  
  /** Optional new description for the folder */
  description?: string;
}

/**
 * Parameters for the searchQmetryTestCaseFolders function.
 * @interface SearchTestCaseFoldersParams
 * @property {number} projectId - The ID of the project to search in.
 * @property {string} folderName - The name of the folder to search for.
 * @property {string} [mode] - Allowed value - "STRICT", if passed folder 
 * search will be absolute otherwise relative
 */
export interface SearchTestCaseFoldersParams {
    projectId: number;
    folderName: string;
    mode?: string;
}