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

// Corresponds to "Get test plan folders"
export async function getQmetryTestPlanFolders(projectId: number, sort?: string, withCount?: boolean) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
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

// Corresponds to "Create a test plan folder"
export async function createQmetryTestPlanFolder(folderName: string, projectId: number, parentId: number, description?: string) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
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

// Corresponds to "Edit a test plan folder"
export async function editQmetryTestPlanFolder(folderName: string, folderId: number, projectId: number, description?: string) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
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

// Corresponds to "Move a test plan folder"
export async function moveQmetryTestPlanFolder(folderId: number, projectId: number, newParentId: number) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
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