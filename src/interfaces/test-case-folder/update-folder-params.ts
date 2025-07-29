/**
 * Parameters for updating a QMetry test case folder
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

export default UpdateFolderParams;
