import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanObject } from '../utils/object.utils.js';
import { dirname } from 'path';
import {
  SearchTestCasesParams,
  CreateTestCaseParams,
  MoveOrCopyTestCaseParams,
  UpdateTestCaseVersionParams,
  GetTestCaseVersionParams,
  AddTestCaseVersionParams,
  DeleteTestCaseVersionParams,
  ArchiveTestCaseParams,
  UnarchiveTestCaseParams,
  CloneTestCaseParams,
  GetTestCaseLinkedCyclesParams,
  GetTestCaseVersionsListParams,
} from '../interfaces/qmetry-test-cases.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

export async function searchQmetryTestCases(
  params: SearchTestCasesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/search/`);

    // Add query parameters if they exist
    if (params.startAt !== undefined) {
      url.searchParams.append('startAt', params.startAt.toString());
    }
    if (params.maxResults !== undefined) {
      url.searchParams.append('maxResults', params.maxResults.toString());
    }
    if (params.sort) {
      url.searchParams.append('sort', params.sort);
    }
    if (params.fields) {
      url.searchParams.append('fields', params.fields);
    }

    const body = {
      filter: params.filter,
    };

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error getting test cases: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in searchQmetryTestCases: ${error}\n`);
    throw error;
  }
}

export async function createQmetryTestCase(
  testCase: CreateTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/`);
    // Clean the test case object by removing empty, null, or undefined fields
    const body = cleanObject(testCase);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error creating test case: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in createQmetryTestCase: ${error}\n`);
    throw error;
  }
}

/**
 * Moves a test case to a different folder in Qmetry.
 * @param testCaseId The ID of the test case to move.
 * @param newFolderId The ID of the destination folder.
 * @param projectId The ID of the project containing the test case.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function moveQmetryTestCase(
  params: MoveOrCopyTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/move`);

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error moving test case: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(params)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in moveOrCopyQmetryTestCase: ${error}\n`);
    throw error;
  }
}

/**
 * Moves a test case to a different folder in Qmetry.
 * @param testCaseId The ID of the test case to move.
 * @param newFolderId The ID of the destination folder.
 * @param projectId The ID of the project containing the test case.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function copyQmetryTestCase(
  params: MoveOrCopyTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/reuse`);

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error copying test case: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(params)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in copyQmetryTestCase: ${error}\n`);
    throw error;
  }
}

/**
 * Updates a test case version in Qmetry.
 * @param params The parameters for updating the test case version.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function updateQmetryTestCaseVersion(
  params: UpdateTestCaseVersionParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const { id, no, ...bodyParams } = params;
    const url = new URL(`${qmetry_api_url}testcases/${id}/versions/${no}`);

    const body = cleanObject(bodyParams);
    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error updating test case version: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    } // Handle empty response (common for PUT operations)
    const responseText = await response.text();
    if (responseText.trim() === '') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                message: 'Test case updated successfully',
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // Try to parse JSON if there's content
    try {
      const jsonResponse = JSON.parse(responseText);
      return {
        content: [
          { type: 'text', text: JSON.stringify(jsonResponse, null, 2) },
        ],
      };
    } catch {
      // If JSON parsing fails, return the raw text
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                message: 'Test case updated successfully',
              },
              null,
              2
            ),
          },
        ],
      };
    }
  } catch (error) {
    process.stderr.write(`Error in updateQmetryTestCaseVersion: ${error}\n`);
    throw error;
  }
}

export async function getTestCaseVersion(
  params: GetTestCaseVersionParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcases/${params.id}/versions/${params.no}`
    );

    if (params.fields) {
      url.searchParams.append('fields', params.fields);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error getting test case version: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getTestCaseVersion: ${error}\n`);
    throw error;
  }
}

export async function addTestCaseVersion(
  params: AddTestCaseVersionParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/${params.id}/versions`);

    const body = {
      copyFromVersion: params.copyFromVersion,
      ...(params.fields && { fields: params.fields }),
    };

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error adding test case version: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in addTestCaseVersion: ${error}\n`);
    throw error;
  }
}

export async function deleteTestCaseVersion(
  params: DeleteTestCaseVersionParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcases/${params.id}/versions/${params.no}`
    );

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error deleting test case version: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                message: 'Test case version deleted successfully',
              },
              null,
              2
            ),
          },
        ],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in deleteTestCaseVersion: ${error}\n`);
    throw error;
  }
}

export async function archiveTestCase(
  params: ArchiveTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/${params.id}/archive`);

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error archiving test case: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              { success: true, message: 'Test case archived successfully' },
              null,
              2
            ),
          },
        ],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in archiveTestCase: ${error}\n`);
    throw error;
  }
}

export async function unarchiveTestCase(
  params: UnarchiveTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/${params.id}/unarchive`);

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error unarchiving test case: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              { success: true, message: 'Test case unarchived successfully' },
              null,
              2
            ),
          },
        ],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in unarchiveTestCase: ${error}\n`);
    throw error;
  }
}

export async function cloneTestCase(
  params: CloneTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/${params.id}/clone`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...cloneData } = params;
    const body = cloneData;

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error cloning test case: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in cloneTestCase: ${error}\n`);
    throw error;
  }
}

export async function getTestCaseLinkedCycles(
  params: GetTestCaseLinkedCyclesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/${params.id}/testcycles`);

    url.searchParams.append('tcVersionNo', params.tcVersionNo.toString());

    if (params.startAt !== undefined) {
      url.searchParams.append('startAt', params.startAt.toString());
    }
    if (params.maxResults !== undefined) {
      url.searchParams.append('maxResults', params.maxResults.toString());
    }
    if (params.fields) {
      url.searchParams.append('fields', params.fields);
    }
    if (params.sort) {
      url.searchParams.append('sort', params.sort);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error getting test case linked cycles: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getTestCaseLinkedCycles: ${error}\n`);
    throw error;
  }
}

export async function getTestCaseVersionsList(
  params: GetTestCaseVersionsListParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/${params.id}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error getting test case versions list: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getTestCaseVersionsList: ${error}\n`);
    throw error;
  }
}
