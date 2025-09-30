import { z } from 'zod';
import { ToolDefinition } from '../interfaces';
import {
  GetTestPlanStatusesParams,
  CreateTestPlanStatusParams,
  UpdateTestPlanStatusParams,
  DeleteTestPlanStatusParams,
  GetTestPlanStatusReferenceCountParams,
} from '../interfaces/qmetry-status';
import {
  getQmetryTestPlanStatuses,
  createQmetryTestPlanStatus,
  updateQmetryTestPlanStatus,
  deleteQmetryTestPlanStatus,
  getQmetryTestPlanStatusReferenceCount,
} from '../api/qmetry-test-plan-status';

export const testPlanStatusTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-test-plan-statuses',
    definition: {
      title: 'Get Qmetry test plan statuses',
      description:
        'Get Qmetry test plan statuses for a given project with optional filtering',
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
    handler: async (params: GetTestPlanStatusesParams) => {
      const result = await getQmetryTestPlanStatuses(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-test-plan-status',
    definition: {
      title: 'Create Qmetry test plan status',
      description: 'Create a new test plan status in QMetry',
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
    handler: async (params: CreateTestPlanStatusParams) => {
      const result = await createQmetryTestPlanStatus(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'update-qmetry-test-plan-status',
    definition: {
      title: 'Update Qmetry test plan status',
      description: 'Update an existing test plan status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test plan statuses".'
          ),
        name: z.string().describe('Status name'),
        color: z
          .string()
          .describe('Status Color Ex. Hex code of color, refer JSON schema'),
        description: z.string().describe('Status Description').optional(),
      },
    },
    handler: async (params: UpdateTestPlanStatusParams) => {
      return await updateQmetryTestPlanStatus(params);
    },
  },
  {
    name: 'delete-qmetry-test-plan-status',
    definition: {
      title: 'Delete Qmetry test plan status',
      description: 'Delete a test plan status from QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test plan statuses".'
          ),
      },
    },
    handler: async (params: DeleteTestPlanStatusParams) => {
      return await deleteQmetryTestPlanStatus(params);
    },
  },
  {
    name: 'get-qmetry-test-plan-status-reference-count',
    definition: {
      title: 'Get Qmetry test plan status reference count',
      description: 'Get the reference count of a test plan status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe(
            'Refer id from the response of API "Get test plan statuses".'
          ),
      },
    },
    handler: async (params: GetTestPlanStatusReferenceCountParams) => {
      const result = await getQmetryTestPlanStatusReferenceCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
