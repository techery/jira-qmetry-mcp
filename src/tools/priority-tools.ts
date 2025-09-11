import { z } from 'zod';
import {
  getQmetryPriorities,
  getQmetryPriorityReferenceCount,
} from '../api/qmetry-priorities';
import {
  GetPrioritiesParams,
  GetPriorityReferenceCountParams,
} from '../interfaces/qmetry-priorities';
import { ToolDefinition } from '../interfaces';

export const priorityTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-priorities',
    definition: {
      title: 'Get Qmetry priorities',
      description: 'Get Qmetry priorities for a given project',
      inputSchema: {
        projectId: z.number().describe('The ID of the project.'),
        status: z.string().describe('The status of the priority.').optional(),
      },
    },
    handler: async (params: GetPrioritiesParams) => {
      const result = await getQmetryPriorities(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-qmetry-priority-reference-count',
    definition: {
      title: 'Get Qmetry priority reference count',
      description: 'Get Qmetry priority reference count for a given project',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        priorityId: z
          .number()
          .describe('Refer id from the response of API "Get Priorities".'),
      },
    },
    handler: async (params: GetPriorityReferenceCountParams) => {
      const result = await getQmetryPriorityReferenceCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
