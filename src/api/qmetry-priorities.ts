import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetPrioritiesParams,
  GetPriorityReferenceCountParams,
} from '../interfaces/qmetry-priorities';
import { logger } from '../utils/logger';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

export async function getQmetryPriorities(
  params: GetPrioritiesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}/projects/${params.projectId}/priorities`
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
        `Error getting priorities: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error('Error in getQmetryPriorities', error, 'getQmetryPriorities');
    throw error;
  }
}

export async function getQmetryPriorityReferenceCount(
  params: GetPriorityReferenceCountParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETry_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}/priorities/${params.priorityId}/references`
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
        `Error getting priority reference count: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error(
      'Error in getQmetryPriorityReferenceCount',
      error,
      'getQmetryPriorityReferenceCount'
    );
    throw error;
  }
}
