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
 * Retrieves a list of folders for test plans in Qmetry.
 * @param projectId The ID of the project to search for folders.
 * @param sort An optional string parameter to sort the folders.
 * @param withCount An optional boolean parameter to include the count of folders.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function getQmetryTestPlanFolders(projectId: number, sort?: string, withCount?: boolean): Promise<{ content: [{ type: string; text: string; }]; }> {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('The environment variable QMETRY_API_KEY is not configured.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testplan-folders`);
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
                'apikey': api_key
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error fetching test plan folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getQmetryTestPlanFolders:', error);
        throw error;
    }
}

/**
 * Creates a new folder for test plans in Qmetry.
 * @param folderName The name of the folder to create.
 * @param projectId The ID of the project where the folder will be created.
 * @param parentId The ID of the parent folder.
 * @param description An optional description for the folder.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function createQmetryTestPlanFolder(folderName: string, projectId: number, parentId: number, description?: string): Promise<{ content: [{ type: string; text: string; }]; }> {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('The environment variable QMETRY_API_KEY is not configured.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testplan-folders`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify({
                folderName,
                parentId,
                description
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error creating test plan folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in createQmetryTestPlanFolder:', error);
        throw error;
    }
}

/**
 * Edits an existing folder for test plans in Qmetry.
 * @param folderName The new name for the folder.
 * @param folderId The ID of the folder to edit.
 * @param projectId The ID of the project where the folder is located.
 * @param description An optional new description for the folder.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function editQmetryTestPlanFolder(folderName: string, folderId: number, projectId: number, description?: string): Promise<{ content: [{ type: string; text: string; }]; }> {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('The environment variable QMETRY_API_KEY is not configured.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testplan-folders/${folderId}`);

        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify({
                folderName,
                description
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error updating test plan folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in editQmetryTestPlanFolder:', error);
        throw error;
    }
}

/**
 * Moves an existing folder for test plans in Qmetry.
 * @param folderId The ID of the folder to move.
 * @param projectId The ID of the project where the folder is located.
 * @param newParentId The ID of the new parent folder.
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function moveQmetryTestPlanFolder(folderId: number, projectId: number, newParentId: number): Promise<{ content: [{ type: string; text: string; }]; }> {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('The environment variable QMETRY_API_KEY is not configured.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testplan-folders/${folderId}/move`);

        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify({
                newParentId,
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error moving test plan folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in moveQmetryTestPlanFolder:', error);
        throw error;
    }
}

/**
 * Searches for folders for test plans in Qmetry.
 * @param projectId The ID of the project to search for folders.
 * @param folderName The name of the folder to search for.
 * @param mode The mode of the search. Can be "name" or "description".
 * @returns {Promise<{content: [{type: string, text: string}]}>} The response from the API.
 * The content property of the response contains an array with a single
 * object that has a type property with value "text" and a text property
 * with the JSON response from the API.
 */
export async function searchQmetryTestPlanFolders(projectId: number, folderName: string, mode?: string): Promise<{ content: [{ type: string; text: string; }]; }> {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('The environment variable QMETRY_API_KEY is not configured.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testplan-folders/search`);

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
                'apikey': api_key
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Error searching folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in searchQmetryTestPlanFolders:', error);
        throw error;
    }
}