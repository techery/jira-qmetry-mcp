import { z } from 'zod';
import { getQmetryProjects } from '../api/qmetry-projects';
import { GetProjectsParams, ToolDefinition } from '../interfaces/index';

/**
 * A collection of tools for managing Qmetry projects.
 * Each tool includes a name, definition, and handler.
 * The tools allow you to perform operations such as:
 * - Retrieving all Qmetry projects.
 */
export const projectTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-projects',
    definition: {
      title: 'Get all Qmetry projects',
      description: 'Get all Qmetry projects',
      inputSchema: {
        projectName: z
          .string()
          .describe('The name of the project to search for'),
        maxResults: z
          .number()
          .optional()
          .describe('Maximum number of results to return'),
        startAt: z
          .number()
          .optional()
          .describe('Starting index for pagination'),
      },
    },
    handler: async ({
      projectName,
      maxResults,
      startAt,
    }: GetProjectsParams) => {
      const result = await getQmetryProjects(projectName, maxResults, startAt);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
