/**
 * Defines the parameters for the getQmetryTestCycleFolders function.
 * @interface GetTestCycleFoldersParams
 * @property {number} projectId - The ID of the project.
 * @property {string} [sort] - The sorting criteria.
 * @property {boolean} [withCount] - Whether to include the count of test cases.
 */
export interface GetTestCycleFoldersParams {
  projectId: number;
  sort?: string;
  withCount?: boolean;
}

/**
 * Defines the parameters for the createQmetryTestCycleFolder function.
 * @interface CreateTestCycleFolderParams
 * @property {string} folderName - The name of the new folder.
 * @property {string} [description] - An optional description for the folder.
 * @property {number} projectId - The ID of the project where the folder will be created.
 * @property {number} parentId - The ID of the parent folder.
 */
export interface CreateTestCycleFolderParams {
  folderName: string;
  description?: string;
  projectId: number;
  parentId: number;
}

/**
 * Defines the parameters for the updateQmetryTestCycleFolder function.
 * @interface EditTestCycleFolderParams
 * @property {string} folderName - The new name for the folder.
 * @property {string} [description] - An optional new description for the folder.
 * @property {number} projectId - The ID of the project containing the folder.
 * @property {number} folderId - The ID of the folder to be updated.
 */
export interface EditTestCycleFolderParams {
  folderName: string;
  description?: string;
  projectId: number;
  folderId: number;
}

/**
 * Defines the parameters for the moveQmetryTestCycleFolder function.
 * @interface MoveTestCycleFolderParams
 * @property {number} projectId - The ID of the project containing the folder.
 * @property {number} folderId - The ID of the folder to be moved.
 * @property {number} newParentId - The ID of the new parent folder.
 */
export interface MoveTestCycleFolderParams {
  projectId: number;
  folderId: number;
  newParentId: number;
}

/**
 * Parameters for the searchQmetryTestCycleFolders function.
 * @interface SearchTestCycleFoldersParams
 * @property {number} projectId - The ID of the project to search in.
 * @property {string} folderName - The name of the folder to search for.
 * @property {string} [mode] - Allowed value - "STRICT", if passed folder
 * search will be absolute otherwise relative.
 */
export interface SearchTestCycleFoldersParams {
  projectId: number;
  folderName: string;
  mode?: string;
}
