/**
 * Defines the parameters for searching linked requirements.
 * @interface SearchLinkedRequirementsParams
 * @property {string} id - Refer id from the response of API "Search Test Case".
 * @property {number} tcVersionNo - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number} [maxResults] - Refer in parameters
 * @property {number} [startAt] - Refer in parameters
 */
export interface GetLinkedRequirementsParams {
  id: string;
  tcVersionNo: number;
  maxResults?: number;
  startAt?: number;
}

/**
 * Defines the parameters for linking a requirement to a test case.
 * @interface LinkRequirementParams
 * @property {string} id - Test Case Id. Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number[]} requirementIds - List of JIRA Issue Id which want to link with given test case.
 */
export interface LinkRequirementParams {
  id: string;
  no: number;
  requirementIds: number[];
}

/**
 * Defines the parameters for unlinking a requirement from a test case.
 * @interface UnlinkRequirementParams
 * @property {string} id - Test Case Id. Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number[]} requirementIds - List of JIRA Issue Id which want to unlink from given test case.
 */
export interface UnlinkRequirementParams {
  id: string;
  no: number;
  requirementIds: number[];
}
