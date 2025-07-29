/**
 * Parameters for listing QMetry projects
 */

export interface ListProjectsParams {
  /** The name of the project to search for */
  projectName: string;
  
  /** Maximum number of results to return */
  maxResults?: number;
  
  /** Starting index for pagination */
  startAt?: number;
}

export default ListProjectsParams;
