import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  CreateTestCaseFolderParams,
  GetTestCaseFoldersParams,
  EditTestCaseFolderParams,
  CopyTestCaseFolderParams,
  MoveTestCaseFolderParams,
  SearchTestCaseFoldersParams,
} from '../interfaces/qmetry-test-case-folders';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

/**
 * Creates a new folder for test cases in Qmetry.
 * @param params The parameters for creating a test case folder
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function createQmetryTestCaseFolder(
  params: CreateTestCaseFolderParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;

  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { folderName, parentId, projectId, description } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testcase-folders`
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
        `Error creating folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in createQmetryFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Retrieves a list of folders for test cases in Qmetry.
 * @param params The parameters for getting test case folders
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function getQmetryTestCaseFolders(
  params: GetTestCaseFoldersParams
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;

  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  const { projectId, short, withCount } = params;

  try {
    const url = new URL(
      `${qmetry_api_url}projects/${projectId}/testcase-folders`
    );

    if (short !== undefined) {
      url.searchParams.append('short', short.toString());
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
        `Error fetching folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in listQmetryFolders: ${error}\n`);
    throw error;
  }
}

/**
 * Edits an existing folder for test cases in Qmetry.
 * @param params The parameters for editing a test case folder
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function editQmetryTestCaseFolder(
  params: EditTestCaseFolderParams
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
      `${qmetry_api_url}projects/${projectId}/testcase-folders/${folderId}`
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
        `Error updating folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in updateQmetryFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Copies an existing folder for test cases in Qmetry.
 * @param params The parameters for copying a test case folder
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function copyQmetryTestCaseFolder(
  params: CopyTestCaseFolderParams
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
      `${qmetry_api_url}projects/${projectId}/testcase-folders/${folderId}/copy`
    );

    const requestBody: any = {
      newParentId,
    };

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
        `Error copying folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in copyQmetryFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Moves an existing folder for test cases in Qmetry.
 * @param params The parameters for moving a test case folder
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function moveQmetryTestCaseFolder(
  params: MoveTestCaseFolderParams
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
      `${qmetry_api_url}projects/${projectId}/testcase-folders/${folderId}/move`
    );

    const requestBody: any = {
      newParentId,
    };

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
        `Error moving folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    process.stderr.write(`Error in moveQmetryFolder: ${error}\n`);
    throw error;
  }
}

/**
 * Searches for folders for test cases in Qmetry.
 * @param params The parameters for searching test case folders
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function searchQmetryTestCaseFolders(
  params: SearchTestCaseFoldersParams
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
      `${qmetry_api_url}projects/${projectId}/testcase-folders/search`
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
    process.stderr.write(`Error in searchQmetryTestCaseFolders: ${error}\n`);
    throw error;
  }
}
