
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { cleanObject } from '../utils/object.utils';
import { dirname } from 'path';
import { SearchTestCasesParams, CreateTestCaseParams } from '../interfaces/qmetry-test-cases';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

export async function getQmetryTestCases(filter: SearchTestCasesParams): Promise<{ content: [{ type: string; text: string; }]; }> {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('The environment variable QMETRY_API_KEY is not configured.');
    }

    try {
        const url = new URL(`${qmetry_api_url}testcases/search/`);
        const body = {
            filter,
        };

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Error getting test cases: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
                `\nRequest body: ${JSON.stringify(body)}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getQmetryTestCases:', error);
        throw error;
    }
}

export async function createQmetryTestCase(testCase: CreateTestCaseParams): Promise<{ content: [{ type: string; text: string; }]; }> {
    const api_key = process.env.QMETRY_API_KEY;
    if (!api_key) {
        throw new Error('The environment variable QMETRY_API_KEY is not configured.');
    }

    try {
        const url = new URL(`${qmetry_api_url}testcases/`);
        // Clean the test case object by removing empty, null, or undefined fields
        const body = cleanObject(testCase);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': api_key
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Error creating test case: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}` +
                `\nRequest body: ${JSON.stringify(body)}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createQmetryTestCase:', error);
        throw error;
    }
}