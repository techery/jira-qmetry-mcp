/**
 * Parameters for creating a QMetry test case folder
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

export default CreateFolderParams;
