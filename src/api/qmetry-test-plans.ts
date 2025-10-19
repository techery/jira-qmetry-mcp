import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanObject } from '../utils/object.utils.js';
import { dirname } from 'path';
import {
  SearchTestPlansParams,
  GetTestPlanParams,
  CreateTestPlanParams,
  UpdateTestPlanParams,
  MoveTestPlansParams,
  GetLinkedTestCyclesParams,
  LinkTestCyclesToTestPlanParams,
  UnlinkTestCyclesFromTestPlanParams,
  ArchiveTestPlanParams,
} from '../interfaces/qmetry-test-plans.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Search and list test plans according to filters
 * @param params The search parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function getQmetryTestPlans(
  params: SearchTestPlansParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/search/`);

    // Add query parameters if they exist
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
        `Error searching test plans: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getQmetryTestPlans: ${error}\n`);
    throw error;
  }
}

/**
 * Get a specific test plan by ID or Key
 * @param params The get test plan parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function getQmetryTestPlan(
  params: GetTestPlanParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/${params.idOrKey}`);
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
        `Error getting test plan: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getQmetryTestPlan: ${error}\n`);
    throw error;
  }
}

/**
 * Create a new test plan
 * @param testPlan The test plan data
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function createQmetryTestPlan(
  testPlan: CreateTestPlanParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/`);
    const body: Record<string, unknown> = cleanObject(testPlan);

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
        `Error creating test plan: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in createQmetryTestPlan: ${error}\n`);
    throw error;
  }
}

/**
 * Update an existing test plan
 * @param params The update parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function updateQmetryTestPlan(
  params: UpdateTestPlanParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const { id, ...updateData } = params;
    const url = new URL(`${qmetry_api_url}testplans/${id}`);
    const body: Record<string, unknown> = cleanObject(updateData);

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
        `Error updating test plan: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test plan updated successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in updateQmetryTestPlan: ${error}\n`);
    throw error;
  }
}

/**
 * Move test plans to another folder
 * @param params The move parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function moveQmetryTestPlans(
  params: MoveTestPlansParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/move`);
    const body = cleanObject(params);

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
        `Error moving test plans: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test plans moved successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in moveQmetryTestPlans: ${error}\n`);
    throw error;
  }
}

/**
 * Get linked test cycles from a test plan
 * @param params The get linked test cycles parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function getLinkedTestCycles(
  params: GetLinkedTestCyclesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/${params.id}/testcycles`);

    // Add query parameters if they exist
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

    // Build body with filter
    const body: Record<string, unknown> = {};
    if (params.filter) {
      body.filter = params.filter;
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
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error getting linked test cycles: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getLinkedTestCycles: ${error}\n`);
    throw error;
  }
}

/**
 * Link test cycles to a test plan
 * @param params The link test cycles parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function linkTestCyclesToTestPlan(
  params: LinkTestCyclesToTestPlanParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/${params.id}/testcycles`);
    const body: unknown = cleanObject({
      testcycleIds: params.testcycleIds,
      sort: params.sort,
    });

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
        `Error linking test cycles: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test cycles linked successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in linkTestCyclesToTestPlan: ${error}\n`);
    throw error;
  }
}

/**
 * Unlink test cycles from a test plan
 * @param params The unlink test cycles parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function unlinkTestCyclesFromTestPlan(
  params: UnlinkTestCyclesFromTestPlanParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/${params.id}/testcycles`);
    const body: unknown = cleanObject({
      testcycleIds: params.testcycleIds,
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
        `Error unlinking test cycles: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
          `\nRequest body: ${JSON.stringify(body)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test cycles unlinked successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in unlinkTestCyclesFromTestPlan: ${error}\n`);
    throw error;
  }
}

/**
 * Archive a test plan
 * @param params The archive parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function archiveTestPlan(
  params: ArchiveTestPlanParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testplans/${params.idOrKey}/archive`);

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
        `Error archiving test plan: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test plan archived successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in archiveTestPlan: ${error}\n`);
    throw error;
  }
}

/**
 * Unarchive a test plan
 * @param params The unarchive parameters
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API
 */
export async function unarchiveTestPlan(
  params: ArchiveTestPlanParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testplans/${params.idOrKey}/unarchive`
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
        `Error unarchiving test plan: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return {
        content: [{ type: 'text', text: 'Test plan unarchived successfully' }],
      };
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in unarchiveTestPlan: ${error}\n`);
    throw error;
  }
}
