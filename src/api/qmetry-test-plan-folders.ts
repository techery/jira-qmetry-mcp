import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetTestPlanFoldersParams,
  CreateTestPlanFolderParams,
  EditTestPlanFolderParams,
  MoveTestPlanFolderParams,
  SearchTestPlanFoldersParams,
} from '../interfaces/qmetry-test-plan-folders.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Retrieves a list of folders for test plans in Qmetry.
 * @param params The parameters for getting test plan folders
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function getQmetryTestPlanFolders(
  params: GetTestPlanFoldersParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { projectId, sort, withCount } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testplan-folders`
    );
    if (sort) {
      url.searchParams.append('sort', sort);
    }
    if (withCount) {
      url.searchParams.append('withCount', withCount.toString());
    }

    const response = await fetch(url.toString(), {
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
        `Error fetching test plan folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getQmetryTestPlanFolders: ${error}\n`);
    throw error;
  }
}

/**
 * Creates a new folder for test plans in Qmetry.
 * @param params The parameters for creating a test plan folder
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function createQmetryTestPlanFolder(
  params: CreateTestPlanFolderParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { folderName, projectId, parentId, description } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testplan-folders`
    );

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({
        folderName,
        parentId,
        description,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error creating test plan folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in createQmetryTestPlanFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Edits an existing folder for test plans in Qmetry.
 * @param params The parameters for editing a test plan folder
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function editQmetryTestPlanFolder(
  params: EditTestPlanFolderParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { folderName, folderId, projectId, description } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testplan-folders/${folderId}`
    );

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({
        folderName,
        description,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error updating test plan folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in editQmetryTestPlanFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Moves an existing folder for test plans in Qmetry.
 * @param params The parameters for moving a test plan folder
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function moveQmetryTestPlanFolder(
  params: MoveTestPlanFolderParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { folderId, projectId, newParentId } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testplan-folders/${folderId}/move`
    );

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({
        newParentId,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error moving test plan folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in moveQmetryTestPlanFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Searches for folders for test plans in Qmetry.
 * @param params The parameters for searching test plan folders
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function searchQmetryTestPlanFolders(
  params: SearchTestPlanFoldersParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { projectId, folderName, mode } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testplan-folders/search`
    );

    if (folderName !== undefined) {
      url.searchParams.append('folderName', folderName.toString());
    }
    if (mode !== undefined) {
      url.searchParams.append('mode', mode.toString());
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
        `Error searching folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in searchQmetryTestPlanFolders: ${error}\n`);
    throw error;
  }
}
