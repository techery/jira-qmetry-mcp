import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanObject } from '../utils/object.utils';
import { dirname } from 'path';
import {
  SearchTestCasesParams,
  CreateTestCaseParams,
  MoveTestCaseParams,
} from '../interfaces/qmetry-test-cases';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

export async function getQmetryTestCases(
  filter: SearchTestCasesParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}testcases/search/`);
    const body = {
      filter,
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
    console.error('Error in getQmetryTestCases:', error);
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
    console.error('Error in createQmetryTestCase:', error);
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
  params: MoveTestCaseParams
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
          `\nRequest body: ${JSON.stringify(params)}, api_key: ${api_key}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error in moveQmetryTestCase:', error);
    throw error;
  }
}
