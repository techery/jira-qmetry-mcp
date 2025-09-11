import { z } from 'zod';
import {
  getQmetryLabels,
  createQmetryLabel,
  updateQmetryLabel,
  deleteQmetryLabel,
} from '../api/qmetry-labels';
import {
  GetLabelsParams,
  CreateLabelParams,
  UpdateLabelParams,
  DeleteLabelParams,
} from '../interfaces/qmetry-labels';
import { ToolDefinition } from '../interfaces';

export const labelTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-labels',
    definition: {
      title: 'Get Qmetry labels',
      description:
        'Get Qmetry labels for a given project with optional filtering and pagination',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
      },
    },
    handler: async (params: GetLabelsParams) => {
      const result = await getQmetryLabels(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-label',
    definition: {
      title: 'Create Qmetry label',
      description: 'Create a new label in a Qmetry project',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        name: z.string().describe('Name of Label'),
      },
    },
    handler: async (params: CreateLabelParams) => {
      const result = await createQmetryLabel(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'update-qmetry-label',
    definition: {
      title: 'Update Qmetry label',
      description: 'Update an existing label in a Qmetry project',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Name of LabelRefer id from the response of API "Get qmetry enabled projects".'
          ),
        labelId: z
          .number()
          .describe('Refer id from the response of API "Get labels".'),
        name: z.string().describe('Name of Label'),
      },
    },
    handler: async (params: UpdateLabelParams) => {
      const result = await updateQmetryLabel(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'delete-qmetry-label',
    definition: {
      title: 'Delete Qmetry label',
      description: 'Delete a label from a Qmetry project',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        labelId: z
          .number()
          .describe('Refer id from the response of API "Get labels".'),
      },
    },
    handler: async (params: DeleteLabelParams) => {
      const result = await deleteQmetryLabel(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
