import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetTestCaseStatusesParams,
  CreateTestCaseStatusParams,
  UpdateTestCaseStatusParams,
  DeleteTestCaseStatusParams,
  GetTestCaseStatusReferenceCountParams,
} from '../interfaces/qmetry-status.js';
import { logger } from '../utils/logger.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;
/**
 * Get QMetry test case statuses for a given project with optional filtering and pagination.
 * @param params - Parameters for getting test case statuses
 * @returns Promise with the test case statuses data
 */
export async function getQmetryTestCaseStatuses(
  params: GetTestCaseStatusesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-statuses`
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
        `Error getting test case statuses: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getQmetryTestCaseStatuses',
      error,
      'getQmetryTestCaseStatuses'
    );
    throw error;
  }
}

/**
 * Create a new test case status in QMetry.
 * @param params - Parameters for creating a test case status
 * @returns Promise with the created test case status data
 */
export async function createQmetryTestCaseStatus(
  params: CreateTestCaseStatusParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-statuses`
    );

    const requestBody: any = {
      name: params.name,
      color: params.color,
    };

    // Add optional parameters if provided
    if (params.description) {
      requestBody.description = params.description;
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error creating test case status: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in createQmetryTestCaseStatus',
      error,
      'createQmetryTestCaseStatus'
    );
    throw error;
  }
}

/**
 * Update an existing test case status in QMetry.
 * @param params - Parameters for updating a test case status
 * @returns Promise with the updated test case status data
 */
export async function updateQmetryTestCaseStatus(
  params: UpdateTestCaseStatusParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-statuses/${params.statusId}`
    );

    const requestBody: any = {
      name: params.name,
      color: params.color,
    };

    // Add optional parameters if provided
    if (params.description) {
      requestBody.description = params.description;
    }

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error updating test case status: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
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
                message: 'Test case status updated successfully',
                statusId: params.statusId,
                projectId: params.projectId,
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
                message: 'Test case status updated successfully',
                statusId: params.statusId,
                projectId: params.projectId,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  } catch (error) {
    logger.error(
      'Error in updateQmetryTestCaseStatus',
      error,
      'updateQmetryTestCaseStatus'
    );
    throw error;
  }
}

/**
 * Delete a test case status from QMetry.
 * @param params - Parameters for deleting a test case status
 * @returns Promise with the deletion confirmation
 */
export async function deleteQmetryTestCaseStatus(
  params: DeleteTestCaseStatusParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-statuses/${params.statusId}`
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
        `Error deleting test case status: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    // Handle empty response (common for DELETE operations)
    const responseText = await response.text();
    if (responseText.trim() === '') {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                message: 'Test case status deleted successfully',
                statusId: params.statusId,
                projectId: params.projectId,
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
                message: 'Test case status deleted successfully',
                rawResponse: responseText,
                statusId: params.statusId,
                projectId: params.projectId,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  } catch (error) {
    logger.error(
      'Error in deleteQmetryTestCaseStatus',
      error,
      'deleteQmetryTestCaseStatus'
    );
    throw error;
  }
}

/**
 * Get the reference count of a test case status in QMetry.
 * @param params - Parameters for getting test case status reference count
 * @returns Promise with the reference count data
 */
export async function getQmetryTestCaseStatusReferenceCount(
  params: GetTestCaseStatusReferenceCountParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testcase-statuses/${params.statusId}/count`
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
        `Error getting test case status reference count: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getQmetryTestCaseStatusReferenceCount',
      error,
      'getQmetryTestCaseStatusReferenceCount'
    );
    throw error;
  }
}
