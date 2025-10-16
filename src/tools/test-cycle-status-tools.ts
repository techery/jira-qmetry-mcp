import { z } from 'zod';
import { ToolDefinition } from '../interfaces';
import {
  GetTestCycleStatusesParams,
  CreateTestCycleStatusParams,
  UpdateTestCycleStatusParams,
  DeleteTestCycleStatusParams,
  GetTestCycleStatusReferenceCountParams,
} from '../interfaces/qmetry-status';
import {
  getQmetryTestCycleStatuses,
  createQmetryTestCycleStatus,
  updateQmetryTestCycleStatus,
  deleteQmetryTestCycleStatus,
  getQmetryTestCycleStatusReferenceCount,
} from '../api/qmetry-test-cycle-status';

export const testCycleStatusTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-test-cycle-statuses',
    definition: {
      title: 'Get Qmetry test cycle statuses',
      description:
        'Get Qmetry test cycle statuses for a given project with optional filtering',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        status: z
          .string()
          .describe(
            'Possible values are active, archive. Ex. status=active,archive'
          )
          .optional(),
      },
    },
    handler: async (params: GetTestCycleStatusesParams) => {
      const result = await getQmetryTestCycleStatuses(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-test-cycle-status',
    definition: {
      title: 'Create Qmetry test cycle status',
      description: 'Create a new test cycle status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        name: z.string().describe('Status name'),
        color: z
          .string()
          .describe('Status Color Ex. Hex code of color, refer JSON schema'),
        description: z.string().describe('Status Description').optional(),
      },
    },
    handler: async (params: CreateTestCycleStatusParams) => {
      const result = await createQmetryTestCycleStatus(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'update-qmetry-test-cycle-status',
    definition: {
      title: 'Update Qmetry test cycle status',
      description: 'Update an existing test cycle status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test cycle statuses".'
          ),
        name: z.string().describe('Status name'),
        color: z
          .string()
          .describe('Status Color Ex. Hex code of color, refer JSON schema'),
        description: z.string().describe('Status Description').optional(),
      },
    },
    handler: async (params: UpdateTestCycleStatusParams) => {
      return await updateQmetryTestCycleStatus(params);
    },
  },
  {
    name: 'delete-qmetry-test-cycle-status',
    definition: {
      title: 'Delete Qmetry test cycle status',
      description: 'Delete a test cycle status from QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test cycle statuses".'
          ),
      },
    },
    handler: async (params: DeleteTestCycleStatusParams) => {
      return await deleteQmetryTestCycleStatus(params);
    },
  },
  {
    name: 'get-qmetry-test-cycle-status-reference-count',
    definition: {
      title: 'Get Qmetry test cycle status reference count',
      description: 'Get the reference count of a test cycle status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test cycle statuses".'
          ),
      },
    },
    handler: async (params: GetTestCycleStatusReferenceCountParams) => {
      const result = await getQmetryTestCycleStatusReferenceCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
