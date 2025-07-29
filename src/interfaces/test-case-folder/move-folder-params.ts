/**
 * Parameters for moving a QMetry test case folder
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

export default MoveFolderParams;
