import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetTestPlanStatusesParams,
  CreateTestPlanStatusParams,
  UpdateTestPlanStatusParams,
  DeleteTestPlanStatusParams,
  GetTestPlanStatusReferenceCountParams,
} from '../interfaces/qmetry-status';
import { logger } from '../utils/logger';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Get QMetry test plan statuses for a given project with optional filtering.
 * @param params - Parameters for getting test plan statuses
 * @returns Promise with the test plan statuses data
 */
export async function getQmetryTestPlanStatuses(
  params: GetTestPlanStatusesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testplan-statuses`
    );

    // Add status filter parameter
    if (params.status) {
      url.searchParams.append('status', params.status);
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
        `Error getting test plan statuses: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    };
  } catch (error) {
    logger.error(
      'Error in getQmetryTestPlanStatuses',
      error,
      'getQmetryTestPlanStatuses'
    );
    throw error;
  }
}

/**
 * Create a new test plan status in QMetry.
 * @param params - Parameters for creating a test plan status
 * @returns Promise with the created test plan status data
 */
export async function createQmetryTestPlanStatus(
  params: CreateTestPlanStatusParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testplan-statuses`
    );

    const requestBody: { name: string; color: string; description?: string } = {
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
        `Error creating test plan status: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    };
  } catch (error) {
    logger.error(
      'Error in createQmetryTestPlanStatus',
      error,
      'createQmetryTestPlanStatus'
    );
    throw error;
  }
}

/**
 * Update an existing test plan status in QMetry.
 * @param params - Parameters for updating a test plan status
 * @returns Promise with the updated test plan status data
 */
export async function updateQmetryTestPlanStatus(
  params: UpdateTestPlanStatusParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testplan-statuses/${params.statusId}`
    );

    const requestBody: { name: string; color: string; description?: string } = {
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
        `Error updating test plan status: ${response.status} ${response.statusText} - ${JSON.stringify(
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
                message: 'Test plan status updated successfully',
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
                message: 'Test plan status updated successfully',
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
      'Error in updateQmetryTestPlanStatus',
      error,
      'updateQmetryTestPlanStatus'
    );
    throw error;
  }
}

/**
 * Delete a test plan status from QMetry.
 * @param params - Parameters for deleting a test plan status
 * @returns Promise with the deletion confirmation
 */
export async function deleteQmetryTestPlanStatus(
  params: DeleteTestPlanStatusParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testplan-statuses/${params.statusId}`
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
        `Error deleting test plan status: ${response.status} ${response.statusText} - ${JSON.stringify(
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
                message: 'Test plan status deleted successfully',
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
                message: 'Test plan status deleted successfully',
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
      'Error in deleteQmetryTestPlanStatus',
      error,
      'deleteQmetryTestPlanStatus'
    );
    throw error;
  }
}

/**
 * Get the reference count of a test plan status in QMetry.
 * @param params - Parameters for getting test plan status reference count
 * @returns Promise with the reference count data
 */
export async function getQmetryTestPlanStatusReferenceCount(
  params: GetTestPlanStatusReferenceCountParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/testplan-statuses/${params.statusId}/count`
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
        `Error getting test plan status reference count: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    };
  } catch (error) {
    logger.error(
      'Error in getQmetryTestPlanStatusReferenceCount',
      error,
      'getQmetryTestPlanStatusReferenceCount'
    );
    throw error;
  }
}
