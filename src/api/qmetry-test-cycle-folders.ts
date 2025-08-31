import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Fetches test cycle folders for a given project.
 * @param {number} projectId The ID of the project.
 * @param {string} [sort] The sorting criteria.
 * @param {boolean} [withCount] Whether to include the count of test cases.
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function getQmetryTestCycleFolders(
  projectId: number,
  sort?: string,
  withCount?: boolean
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

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
 * @param {string} folderName The name of the folder.
 * @param {number} projectId The ID of the project.
 * @param {number} parentId The ID of the parent folder.
 * @param {string} [description] The description of the folder.
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function createQmetryTestCycleFolder(
  folderName: string,
  projectId: number,
  parentId: number,
  description?: string
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

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
 * @param {string} folderName The name of the folder.
 * @param {number} projectId The ID of the project.
 * @param {number} folderId The ID of the folder to edit.
 * @param {string} [description] The description of the folder.
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function editQmetryTestCycleFolder(
  folderName: string,
  projectId: number,
  folderId: number,
  description?: string
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

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
 * @param {number} projectId The ID of the project.
 * @param {number} folderId The ID of the folder to move.
 * @param {number} newParentId The ID of the new parent folder.
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function moveQmetryTestCycleFolder(
  projectId: number,
  folderId: number,
  newParentId: number
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

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
 * @param {number} projectId The ID of the project.
 * @param {string} folderName The name of the folder to search for.
 * @param {string} [mode] The search mode.
 * @returns {Promise<{ content: [{ type: string; text: string; }]; }>} The response from the API.
 */
export async function searchQmetryTestCycleFolders(
  projectId: number,
  folderName: string,
  mode?: string
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

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
