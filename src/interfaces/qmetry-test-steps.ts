/**
 * Defines the parameters for the createTestStep function.
 * @interface CreateTestStepParams
 * @property {string} id - Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {string} stepDetails - Test step Details
 * @property {string} testData - Test step expected Result
 * @property {string} expectedResult - Test step test data
 */
export interface CreateTestStepParams {
  id: string;
  no: number;
  steps: {
    stepDetails: string;
    testData: string;
    expectedResult: string;
  }[];
}

/**
 * Defines the parameters for the updateTestStep function.
 * @interface UpdateTestStepParams
 * @property {string} testCaseId - Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number} id - Test Step Id. Refer id from the response of API "Get Test Steps".
 * @property {string} stepDetails - Test step Details
 * @property {string} testData - Test step expected Result
 * @property {string} expectedResult - Test step test data
 * @property {number} seqNo - Test step Sequence Number
 */
export interface UpdateTestStepParams {
  testCaseId: string;
  no: number;
  steps: {
    id: number;
    stepDetails: string;
    testData: string;
    expectedResult: string;
  }[];
}

/**
 * Defines the parameters for the deleteTestStep function.
 * @interface DeleteTestStepParams
 * @property {string} id - Refer id from the response of API "Search Test Case".
 * @property {string} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {Array<number>} stepIds - Refer id from the response of API "Get Test Steps".
 */
export interface DeleteTestStepParams {
  id: string;
  no: number;
  stepIds: number[];
}

/**
 * Defines the parameters for the getTestSteps function.
 * @interface GetTestStepsParams
 * @property {string} id - Refer id from the response of API "Search Test Case".
 * @property {number} no - Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".
 * @property {number} maxResults - Refer parameters.
 * @property {string} sort - Possible values - stepDetails,testData,seqNo,expectedResult
    Pattern - sortField:sortOrder(asc/desc)
    For example if want to sorting on sequence number in ascending order then need to pass seqNo:asc
 * @property {number} startAt - Refer parameters.
 */
export interface GetTestStepsParams {
  id: string;
  no: number;
  maxResults: number;
  sort: string;
  startAt: number;
}
