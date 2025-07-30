
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

export async function createQmetryTestCaseFolder(folderName: string, parentId: string, projectId: string, description?: string) {
    const api_key = process.env.QMETRY_API_KEY;

    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcase-folders`);

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
            throw new Error(`Error creating folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    } catch (error) {
        console.error('Error in createQmetryFolder:', error);
        return {
            content: [
                {
                    type: "text",
                    text: error,
                },
            ],
        };
    }
}

export async function getQmetryTestCaseFolders(projectId: number, short?: string, withCount?: boolean) {
    const api_key = process.env.QMETRY_API_KEY;

    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcase-folders`);

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
                'apikey': api_key
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
            throw new Error(`Error fetching folders: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    } catch (error) {
        console.error('Error in listQmetryFolders:', error);
        return {
            content: [
                {
                    type: "text",
                    text: error,
                },
            ],
        };
    }
}

export async function editQmetryTestCaseFolder(folderName: string, folderId: string, projectId: string, description?: string) {
    const api_key = process.env.QMETRY_API_KEY;

    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcase-folders/${folderId}`);

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
            throw new Error(`Error updating folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    } catch (error) {
        console.error('Error in updateQmetryFolder:', error);
        return {
            content: [
                {
                    type: "text",
                    text: error,
                },
            ],
        };
    }
}

export async function copyQmetryTestCaseFolder(
    projectId: string,
    folderId: string,
    newParentId: string
) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcase-folders/${folderId}/copy`);

        const requestBody: any = {
            newParentId
        };

        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Error copying folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    } catch (error) {
        console.error('Error in copyQmetryFolder:', error);
        return {
            content: [
                {
                    type: "text",
                    text: error instanceof Error ? error.message : String(error),
                },
            ],
        };
    }
}

export async function moveQmetryTestCaseFolder(projectId: string, folderId: string, newParentId: string) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcase-folders/${folderId}/move`);

        const requestBody: any = {
            newParentId
        };

        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Error moving folder: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    } catch (error) {
        console.error('Error in moveQmetryFolder:', error);
        return {
            content: [
                {
                    type: "text",
                    text: error instanceof Error ? error.message : String(error),
                },
            ],
        };
    }
}

export async function searchQmetryTestCaseFolders(projectId: number, folderName: string, mode?: string) {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('La variable de entorno QMETRY_API_KEY no está configurada.');
    }

    try {
        const url = new URL(`${qmetry_api_url}projects/${projectId}/testcase-folders/search`);

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

        const data = await response.json();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    } catch (error) {
        console.error('Error in searchQmetryTestCaseFolders:', error);
        return {
            content: [
                {
                    type: "text",
                    text: error instanceof Error ? error.message : String(error),
                },
            ],
        };
    }
}