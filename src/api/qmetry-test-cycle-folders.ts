import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  GetTestCycleFoldersParams,
  CreateTestCycleFolderParams,
  EditTestCycleFolderParams,
  MoveTestCycleFolderParams,
  SearchTestCycleFoldersParams,
} from '../interfaces/qmetry-test-cycle-folders.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Fetches test cycle folders for a given project.
 * @param {GetTestCycleFoldersParams} params The parameters for getting test cycle folders
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function getQmetryTestCycleFolders(
  params: GetTestCycleFoldersParams
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
      `${qmetry_api_url}projects/${projectId}/testcycle-folders`
    );
    if (sort !== undefined) {
      url.searchParams.append('sort', sort.toString());
    }
    if (withCount !== undefined) {
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
        `Error fetching test cycle folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in getQmetryTestCycleFolders: ${error}\n`);
    throw error;
  }
}

/**
 * Creates a new test cycle folder.
 * @param {CreateTestCycleFolderParams} params The parameters for creating a test cycle folder
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function createQmetryTestCycleFolder(
  params: CreateTestCycleFolderParams
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
      `${qmetry_api_url}projects/${projectId}/testcycle-folders`
    );

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({
        folderName,
        description,
        parentId,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error creating test cycle folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in createQmetryTestCycleFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Edits an existing test cycle folder.
 * @param {EditTestCycleFolderParams} params The parameters for editing a test cycle folder
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function editQmetryTestCycleFolder(
  params: EditTestCycleFolderParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { folderName, projectId, folderId, description } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testcycle-folders/${folderId}`
    );

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({ folderName, description }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error updating test cycle folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in updateQmetryTestCycleFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Moves an existing test cycle folder.
 * @param {MoveTestCycleFolderParams} params The parameters for moving a test cycle folder
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function moveQmetryTestCycleFolder(
  params: MoveTestCycleFolderParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { projectId, folderId, newParentId } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testcycle-folders/${folderId}/move`
    );

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({ newParentId }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error moving test cycle folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in moveQmetryTestCycleFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Searches for test cycle folders.
 * @param {SearchTestCycleFoldersParams} params The parameters for searching test cycle folders
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function searchQmetryTestCycleFolders(
  params: SearchTestCycleFoldersParams
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
      `${qmetry_api_url}projects/${projectId}/testcycle-folders/search`
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
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error searching test cycle folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }
    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in searchQmetryTestCycleFolders: ${error}\n`);
    throw error;
  }
}
