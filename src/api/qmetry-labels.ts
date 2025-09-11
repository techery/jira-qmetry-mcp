import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetLabelsParams,
  CreateLabelParams,
  UpdateLabelParams,
  DeleteLabelParams,
} from '../interfaces/qmetry-labels';
import { logger } from '../utils/logger';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

export async function getQmetryLabels(
  params: GetLabelsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}projects/${params.projectId}/labels`);

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
        `Error getting labels: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error('Error in getQmetryLabels', error, 'getQmetryLabels');
    throw error;
  }
}

export async function createQmetryLabel(
  params: CreateLabelParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}projects/${params.projectId}/labels`);

    const body = {
      name: params.name,
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
        `Error creating label: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error('Error in createQmetryLabel', error, 'createQmetryLabel');
    throw error;
  }
}

export async function updateQmetryLabel(
  params: UpdateLabelParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/labels/${params.labelId}`
    );

    const body = {
      name: params.name,
    };

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error updating label: ${response.status} ${response.statusText} - ${JSON.stringify(
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
                message: 'Label updated successfully',
                labelId: params.labelId,
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
                message: 'Label updated successfully',
                rawResponse: responseText,
                labelId: params.labelId,
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
    logger.error('Error in updateQmetryLabel', error, 'updateQmetryLabel');
    throw error;
  }
}

export async function deleteQmetryLabel(
  params: DeleteLabelParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${params.projectId}/labels/${params.labelId}`
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
        `Error deleting label: ${response.status} ${response.statusText} - ${JSON.stringify(
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
                message: 'Label deleted successfully',
                labelId: params.labelId,
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
                message: 'Label deleted successfully',
                rawResponse: responseText,
                labelId: params.labelId,
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
    logger.error('Error in deleteQmetryLabel', error, 'deleteQmetryLabel');
    throw error;
  }
}
