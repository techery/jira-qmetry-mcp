import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetTestCaseCustomFieldsParams,
  GetTestCaseCustomFieldRefCountParams,
  GetTestCycleCustomFieldsParams,
  GetTestCycleCustomFieldRefCountParams,
  GetTestPlanCustomFieldsParams,
  GetTestPlanCustomFieldRefCountParams,
  GetTestExecutionCustomFieldsParams,
  GetTestExecutionCustomFieldRefCountParams,
} from '../interfaces/qmetry-custom-fields.js';
import { logger } from '../utils/logger.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Get custom field types from Qmetry
 * @param params - The parameters for the request
 * @returns The custom field types
 */
export async function getCustomFieldTypes(): Promise<{
  content: [{ type: string; text: string }];
}> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}custom-fields/types`);

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
        `Error getting custom field types: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error('Error in getCustomFieldTypes', error, 'getCustomFieldTypes');
    throw error;
  }
}

/**
 * Get test case custom fields from Qmetry
 * @param params - The parameters for the request
 * @returns The test case custom fields
 */
export async function getTestCaseCustomFields(
  params: GetTestCaseCustomFieldsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-custom-fields`
    );

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
        `Error getting test case custom fields: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestCaseCustomFields',
      error,
      'getTestCaseCustomFields'
    );
    throw error;
  }
}

/**
 * Get test case custom field reference count from Qmetry
 * @param params - The parameters for the request
 * @returns The reference count
 */
export async function getTestCaseCustomFieldRefCount(
  params: GetTestCaseCustomFieldRefCountParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-custom-fields/${params.id}/count`
    );

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
        `Error getting test case custom field reference count: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestCaseCustomFieldRefCount',
      error,
      'getTestCaseCustomFieldRefCount'
    );
    throw error;
  }
}

/**
 * Get test cycle custom fields from Qmetry
 * @param params - The parameters for the request
 * @returns The test cycle custom fields
 */
export async function getTestCycleCustomFields(
  params: GetTestCycleCustomFieldsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcycle-custom-fields`
    );

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
        `Error getting test cycle custom fields: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestCycleCustomFields',
      error,
      'getTestCycleCustomFields'
    );
    throw error;
  }
}

/**
 * Get test cycle custom field reference count from Qmetry
 * @param params - The parameters for the request
 * @returns The reference count
 */
export async function getTestCycleCustomFieldRefCount(
  params: GetTestCycleCustomFieldRefCountParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcycle-custom-fields/${params.id}/count`
    );

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
        `Error getting test cycle custom field reference count: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestCycleCustomFieldRefCount',
      error,
      'getTestCycleCustomFieldRefCount'
    );
    throw error;
  }
}

/**
 * Get test plan custom fields from Qmetry
 * @param params - The parameters for the request
 * @returns The test plan custom fields
 */
export async function getTestPlanCustomFields(
  params: GetTestPlanCustomFieldsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testplan-custom-fields`
    );

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
        `Error getting test plan custom fields: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestPlanCustomFields',
      error,
      'getTestPlanCustomFields'
    );
    throw error;
  }
}

/**
 * Get test plan custom field reference count from Qmetry
 * @param params - The parameters for the request
 * @returns The reference count
 */
export async function getTestPlanCustomFieldRefCount(
  params: GetTestPlanCustomFieldRefCountParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testplan-custom-fields/${params.id}/count`
    );

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
        `Error getting test plan custom field reference count: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestPlanCustomFieldRefCount',
      error,
      'getTestPlanCustomFieldRefCount'
    );
    throw error;
  }
}

/**
 * Get test execution custom fields from Qmetry
 * @param params - The parameters for the request
 * @returns The test execution custom fields
 */
export async function getTestExecutionCustomFields(
  params: GetTestExecutionCustomFieldsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-execution-custom-fields`
    );

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
        `Error getting test execution custom fields: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestExecutionCustomFields',
      error,
      'getTestExecutionCustomFields'
    );
    throw error;
  }
}

/**
 * Get test execution custom field reference count from Qmetry
 * @param params - The parameters for the request
 * @returns The reference count
 */
export async function getTestExecutionCustomFieldRefCount(
  params: GetTestExecutionCustomFieldRefCountParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-execution-custom-fields/${params.id}/count`
    );

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
        `Error getting test execution custom field reference count: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getTestExecutionCustomFieldRefCount',
      error,
      'getTestExecutionCustomFieldRefCount'
    );
    throw error;
  }
}
