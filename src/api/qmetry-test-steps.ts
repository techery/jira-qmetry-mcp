import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetTestStepsParams,
  CreateTestStepParams,
  UpdateTestStepParams,
  DeleteTestStepParams,
} from '../interfaces/qmetry-test-steps.js';
import { logger } from '../utils/logger.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

export async function getQmetryTestSteps(
  params: GetTestStepsParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcases/${params.id}/versions/${params.no}/teststeps/search/`
    );
    if (params.maxResults) {
      url.searchParams.append('maxResults', params.maxResults.toString());
    }
    if (params.sort) {
      url.searchParams.append('sort', params.sort);
    }
    if (params.startAt) {
      url.searchParams.append('startAt', params.startAt.toString());
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error getting test steps: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    logger.error('Error in getQmetryTestSteps', error, 'getQmetryTestSteps');
    throw error;
  }
}

export async function updateQmetryTestStep(
  params: UpdateTestStepParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcases/${params.testCaseId}/versions/${params.no}/teststeps`
    );

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(params.steps),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error updating test step: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}, ${JSON.stringify(params.steps)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in updateQmetryTestStep: ${error}\n`);
    throw error;
  }
}

export async function createQmetryTestStep(
  params: CreateTestStepParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcases/${params.id}/versions/${params.no}/teststeps`
    );

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify(params.steps),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error creating test step: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in createQmetryTestStep: ${error}\n`);
    throw error;
  }
}

export async function deleteQmetryTestStep(
  params: DeleteTestStepParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(
      `${qmetry_api_url}testcases/${params.id}/versions/${params.no}/teststeps`
    );
    // Debug logging removed to avoid interfering with MCP protocol
    logger.debug('url', url.toString(), 'deleteQmetryTestStep');
    logger.debug(
      'params.stepIds',
      JSON.stringify(params.stepIds, null, 2),
      'deleteQmetryTestStep'
    );

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({ stepIds: params.stepIds }),
    });
    logger.debug('response', response.bodyUsed, 'deleteQmetryTestStep');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error deleting test step: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in deleteQmetryTestStep: ${error}\n`);
    throw error;
  }
}
