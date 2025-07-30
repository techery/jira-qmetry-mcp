/**
 * Parameters for the getQmetryProjects function.
 * @interface GetProjectsParams
 * @property {string} fields - The fields to include in the response.
 * @property {string} projectName - The name of the project to search for.
 * @property {number} [maxResults] - The maximum number of results to return.
 * @property {number} [startAt] - The starting index for pagination.
 */
export interface GetProjectsParams {
    fields: string;
    projectName: string;
    maxResults?: number;
    startAt?: number;
}