import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanObject } from '../utils/object.utils.js';
import { dirname } from 'path';
import {
  SearchTestCyclesParams,
  CreateTestCycleParams,
  UpdateTestCycleParams,
  MoveTestCycleParams,
  LinkTestCaseParams,
  UnlinkTestCaseParams,
  GetLinkedTestPlansParams,
  GetLinkedRequirementsParams,
  LinkRequirementsParams,
  UnlinkRequirementsParams,
  ArchiveTestCycleParams,
} from '../interfaces/qmetry-test-cycles.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Search and list test cycles according to filters
 * @param params The search parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function getQmetryTestCycles(
  params: SearchTestCyclesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcycles/search/`);
    const body = {
      filter: params.filter,
      startAt: params.startAt,
      maxResults: params.maxResults,
      fields: params.fields,
      sort: params.sort,
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
        `Error searching test cycles: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getQmetryTestCycles: ${error}\n`);
    throw error;
  }
}

/**
 * Create a new test cycle
 * @param testCycle The test cycle parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function createQmetryTestCycle(
  testCycle: CreateTestCycleParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcycles/`);
    const body: Record<string, unknown> = cleanObject(testCycle);

    // Convert labels array to {add: []} format
    if (body.labels && Array.isArray(body.labels)) {
      body.labels = { add: body.labels };
    }

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
        `Error creating test cycle: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in createQmetryTestCycle: ${error}\n`);
    throw error;
  }
}

/**
 * Update an existing test cycle
 * @param id The test cycle ID
 * @param params The update parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function updateQmetryTestCycle(
  id: string,
  params: UpdateTestCycleParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcycles/${id}`);
    const body: Record<string, unknown> = cleanObject(params);

    // Convert labels array to {add: []} format
    if (body.labels && Array.isArray(body.labels)) {
      body.labels = { add: body.labels };
    }

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
        `Error updating test cycle: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle empty response (common for PUT operations)
    const responseText = await response.text();
    if (responseText.trim() === '') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                message: 'Test cycle updated successfully',
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
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                message: 'Test cycle updated successfully',
              },
              null,
              2
            ),
          },
        ],
      };
    }
  } catch (error) {
    process.stderr.write(`Error in updateQmetryTestCycle: ${error}\n`);
    throw error;
  }
}

/**
 * Move test cycles to a different folder
 * @param params The move parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function moveQmetryTestCycle(
  params: MoveTestCycleParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcycles/move`);

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
        `Error moving test cycle: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(params)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test cycle moved successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in moveQmetryTestCycle: ${error}\n`);
    throw error;
  }
}

/**
 * Link test cases to a test cycle
 * @param params The link test cases parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function linkTestCaseToTestCycle(
  params: LinkTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcycles/${params.id}/testcases`);
    const body = cleanObject({
      testCases: params.testCases,
      sort: params.sort,
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
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
        `Error linking test cases: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test cases linked successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in linkTestCaseToTestCycle: ${error}\n`);
    throw error;
  }
}

/**
 * Unlink test cases from a test cycle
 * @param params The unlink test cases parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function unlinkTestCaseFromTestCycle(
  params: UnlinkTestCaseParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcycles/${params.id}/testcases`);
    const body = cleanObject({
      testCases: params.testCases,
      unlinkAll: params.unlinkAll,
    });

    const response = await fetch(url.toString(), {
      method: 'DELETE',
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
        `Error unlinking test cases: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test cases unlinked successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in unlinkTestCaseFromTestCycle: ${error}\n`);
    throw error;
  }
}

/**
 * Get linked test plans for a test cycle
 * @param params The parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function getLinkedTestPlans(
  params: GetLinkedTestPlansParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcycles/${params.id}/testplans`);
    const body = cleanObject({
      startAt: params.startAt,
      maxResults: params.maxResults,
      fields: params.fields,
      sort: params.sort,
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
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
        `Error getting linked test plans: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getLinkedTestPlans: ${error}\n`);
    throw error;
  }
}

/**
 * Get linked requirements for a test cycle
 * @param params The parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function getLinkedRequirements(
  params: GetLinkedRequirementsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcycles/${params.id}/requirements`
    );
    const query = new URLSearchParams();

    if (params.startAt !== undefined)
      query.append('startAt', params.startAt.toString());
    if (params.maxResults !== undefined)
      query.append('maxResults', params.maxResults.toString());
    if (params.sort !== undefined) query.append('sort', params.sort);

    const fullUrl = query.toString()
      ? `${url.toString()}?${query.toString()}`
      : url.toString();

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error getting linked requirements: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getLinkedRequirements: ${error}\n`);
    throw error;
  }
}

/**
 * Link requirements to a test cycle
 * @param params The link requirements parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function linkRequirementsToTestCycle(
  params: LinkRequirementsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcycles/${params.id}/requirements/link`
    );
    const body = cleanObject({
      requirementIds: params.requirementIds,
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
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
        `Error linking requirements: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in linkRequirementsToTestCycle: ${error}\n`);
    throw error;
  }
}

/**
 * Unlink requirements from a test cycle
 * @param params The unlink requirements parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function unlinkRequirementsFromTestCycle(
  params: UnlinkRequirementsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcycles/${params.id}/requirements/unlink`
    );
    const body = cleanObject({
      requirementIds: params.requirementIds,
      unLinkAll: params.unLinkAll,
    });

    const response = await fetch(url.toString(), {
      method: 'POST',
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
        `Error unlinking requirements: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Requirements unlinked successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(
      `Error in unlinkRequirementsFromTestCycle: ${error}\n`
    );
    throw error;
  }
}

/**
 * Archive a test cycle
 * @param params The archive parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function archiveTestCycle(
  params: ArchiveTestCycleParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcycles/${params.idOrKey}/archive`
    );

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error archiving test cycle: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test cycle archived successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in archiveTestCycle: ${error}\n`);
    throw error;
  }
}

/**
 * Unarchive a test cycle
 * @param params The unarchive parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function unarchiveTestCycle(
  params: ArchiveTestCycleParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcycles/${params.idOrKey}/unarchive`
    );

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error unarchiving test cycle: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test cycle unarchived successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in unarchiveTestCycle: ${error}\n`);
    throw error;
  }
}
