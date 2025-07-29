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

export async function listQmetryFolders(projectId: string, short?: string, withCount?: boolean) {
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
