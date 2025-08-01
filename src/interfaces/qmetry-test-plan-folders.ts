/**
 * Defines the parameters for the getQmetryTestPlanFolders function.
 * @interface GetTestPlanFoldersParams
 * @property {number} projectId - The ID of the project.
 * @property {string} [sort] - The sorting criteria.
 * @property {boolean} [withCount] - Whether to include the count of test cases.
 */
export interface GetTestPlanFoldersParams {
  projectId: number;
  sort?: string;
  withCount?: boolean;
}

/**
 * Defines the parameters for the createQmetryTestPlanFolder function.
 * @interface CreateTestPlanFolderParams
 * @property {string} folderName - The name of the new folder.
 * @property {string} [description] - An optional description for the folder.
 * @property {number} projectId - The ID of the project where the folder will be created.
 * @property {number} [parentId] - The ID of the parent folder (optional).
 */
export interface CreateTestPlanFolderParams {
  folderName: string;
  description?: string;
  projectId: number;
  parentId?: number;
}

/**
 * Defines the parameters for the updateQmetryTestPlanFolder function.
 * @interface EditTestPlanFolderParams
 * @property {string} folderName - The new name for the folder.
 * @property {string} description - An optional new description for the folder.
 * @property {number} folderId - The ID of the folder to be updated.
 * @property {number} projectId - The ID of the project containing the folder.
 */
export interface EditTestPlanFolderParams {
  folderName: string;
  description?: string;
  folderId: number;
  projectId: number;
}

/**
 * Defines the parameters for the moveQmetryTestPlanFolder function.
 * @interface MoveTestPlanFolderParams
 * @property {number} folderId - The ID of the folder to move.
 * @property {number} projectId - The ID of the project containing the folder.
 * @property {number} newParentId - The ID of the new parent folder.
 */
export interface MoveTestPlanFolderParams {
  folderId: number;
  projectId: number;
  newParentId: number;
}

/**
 * Parameters for the searchQmetryTestPlanFolders function.
 * @interface SearchTestPlanFoldersParams
 * @property {number} projectId - The ID of the project to search in.
 * @property {string} folderName - The name of the folder to search for.
 * @property {string} [mode] - Allowed value - "STRICT", if passed folder
 * search will be absolute otherwise relative.
 */
export interface SearchTestPlanFoldersParams {
  projectId: number;
  folderName: string;
  mode?: string;
}
