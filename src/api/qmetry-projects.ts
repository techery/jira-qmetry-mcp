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
 * Retrieves a list of Qmetry projects matching the given name.
 * @param projectName The name of the project to search for.
 * @param maxResults The maximum number of results to return.
 * @param startAt The starting index for pagination.
 * @returns A promise that resolves to an object with a content property
 * containing an array of objects with type and text properties. The text
 * property contains the JSON response from the API.
 */
export async function getQmetryProjects(
  projectName: string,
  maxResults?: number,
  startAt?: number
): Promise<{ content: [{ type: string; text: string }] }> {
  const api_key = process.env.QMETRY_API_KEY;

  if (!api_key) {
    throw new Error(
      'The environment variable QMETRY_API_KEY is not configured.'
    );
  }

  try {
    const url = new URL(`${qmetry_api_url}projects`);
    url.searchParams.append('search', 'key,name');
    if (maxResults !== undefined) {
      url.searchParams.append('maxResults', maxResults.toString());
    }
    if (startAt !== undefined) {
      url.searchParams.append('startAt', startAt.toString());
    }
    // Note: projectKey is not typically a query parameter for listing all projects.
    // If the API supports filtering by key, it would be a different endpoint or parameter.
    // For now, we'll assume it's handled by projectName or a separate call.

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: api_key,
      },
      body: JSON.stringify({
        search: projectName,
      }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(
        `Error fetching projects: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getQmetryProjects:', error);
    throw error;
  }
}
