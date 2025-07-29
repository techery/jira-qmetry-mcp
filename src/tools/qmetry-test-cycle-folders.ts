
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

// Corresponds to "Get test cycle folders"
export async function getQmetryTestCycleFolders(projectId: number, sort?: string, withCount?: boolean) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcycle-folders`);
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
                'apikey': api_key
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error fetching test cycle folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getQmetryTestCycleFolders:', error);
        throw error;
    }
}

// Corresponds to "Create a test cycle folder"
export async function createQmetryTestCycleFolder(folderName: string, projectId: number, parentId: number, description?: string) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcycle-folders`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify({
                folderName,
                description,
                parentId
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error creating test cycle folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in createQmetryTestCycleFolder:', error);
        throw error;
    }
}

// Corresponds to "Edit a test cycle folder"
export async function editQmetryTestCycleFolder(folderName: string, projectId: number, folderId: number, description?: string) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcycle-folders/${folderId}`);

        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify({ folderName, description })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error updating test cycle folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in updateQmetryTestCycleFolder:', error);
        throw error;
    }
}

// Corresponds to "Move a test cycle folder"
export async function moveQmetryTestCycleFolder(projectId: number, folderId: number, newParentId: number) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcycle-folders/${folderId}/move`);

        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify({ newParentId })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error moving test cycle folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in moveQmetryTestCycleFolder:', error);
        throw error;
    }
}
