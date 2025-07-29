/**
 * Defines the parameters for the copyQmetryFolder function.
 * @interface CopyFolderParams
 * @property {string} folderId - The ID of the folder to be copied.
 * @property {string} projectId - The ID of the project containing the folder.
 * @property {string} newParentId - The ID of the parent folder where the folder will be copied.
 */
export interface CopyFolderParams {
  folderId: string;
  projectId: string;
  newParentId: string;
}

/**
 * Defines the parameters for the createQmetryFolder function.
 * @interface CreateFolderParams
 * @property {string} folderName - The name of the new folder.
 * @property {string} parentId - The ID of the parent folder. Use "-1" for the root.
 * @property {string} projectId - The ID of the project where the folder will be created.
 * @property {string} [description] - An optional description for the folder.
 */
export interface CreateFolderParams {
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
 * @interface ListProjectsParams
 * @property {string} projectName - The name of the project to search for.
 * @property {number} [maxResults] - The maximum number of results to return.
 * @property {number} [startAt] - The starting index for pagination.
 */
export interface ListProjectsParams {
  /** The name of the project to search for */
  projectName: string;
  
  /** Maximum number of results to return */
  maxResults?: number;
  
  /** Starting index for pagination */
  startAt?: number;
}

/**
 * Defines the parameters for the moveQmetryFolder function.
 * @interface MoveFolderParams
 * @property {string} folderId - The ID of the folder to be moved.
 * @property {string} projectId - The ID of the project containing the folder.
 * @property {string} newParentId - The ID of the new parent folder. Use "-1" to move to the root.
 */
export interface MoveFolderParams {
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
 * @interface UpdateFolderParams
 * @property {string} folderName - The new name for the folder.
 * @property {string} folderId - The ID of the folder to be updated.
 * @property {string} projectId - The ID of the project containing the folder.
 * @property {string} [description] - An optional new description for the folder.
 */
export interface UpdateFolderParams {
  /** New name for the folder */
  folderName: string;
  
  /** ID of the folder to update */
  folderId: string;
  
  /** Project ID that contains the folder */
  projectId: string;
  
  /** Optional new description for the folder */
  description?: string;
}
