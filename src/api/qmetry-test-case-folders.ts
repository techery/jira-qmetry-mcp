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
 * Creates a new folder for test cases in Qmetry.
 * @param folderName The name of the new folder.
 * @param parentId The ID of the parent folder. Use "-1" for the root.
 * @param projectId The ID of the project where the folder will be created.
 * @param description An optional description for the folder.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function createQmetryTestCaseFolder(
  folderName: string,
  parentId: string,
  projectId: string,
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
 * @param projectId The ID of the project to search for folders.
 * @param short An optional boolean parameter to include short information about the folders.
 * @param withCount An optional boolean parameter to include the count of folders.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function getQmetryTestCaseFolders(
  projectId: number,
  short?: string,
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
 * @param folderName The new name for the folder.
 * @param folderId The ID of the folder to edit.
 * @param projectId The ID of the project where the folder is located.
 * @param description An optional new description for the folder.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function editQmetryTestCaseFolder(
  folderName: string,
  folderId: string,
  projectId: string,
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
 * @param projectId The ID of the project where the folder is located.
 * @param folderId The ID of the folder to copy.
 * @param newParentId The ID of the new parent folder.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function copyQmetryTestCaseFolder(
  projectId: string,
  folderId: string,
  newParentId: string
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

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
 * @param projectId The ID of the project where the folder is located.
 * @param folderId The ID of the folder to move.
 * @param newParentId The ID of the new parent folder.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function moveQmetryTestCaseFolder(
  projectId: string,
  folderId: string,
  newParentId: string
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;
  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

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
 * @param projectId The ID of the project to search for folders.
 * @param folderName The name of the folder to search for.
 * @param mode The mode of the search. Can be "name" or "description".
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function searchQmetryTestCaseFolders(
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
