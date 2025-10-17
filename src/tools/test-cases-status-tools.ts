import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  GetTestCaseStatusesParams,
  CreateTestCaseStatusParams,
  UpdateTestCaseStatusParams,
  DeleteTestCaseStatusParams,
  GetTestCaseStatusReferenceCountParams,
} from '../interfaces/qmetry-status.js';
import {
  getQmetryTestCaseStatuses,
  createQmetryTestCaseStatus,
  updateQmetryTestCaseStatus,
  deleteQmetryTestCaseStatus,
  getQmetryTestCaseStatusReferenceCount,
} from '../api/qmetry-test-case-status.js';

export const testCaseStatusTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-test-case-statuses',
    definition: {
      title: 'Get Qmetry test case statuses',
      description:
        'Get Qmetry test case statuses for a given project with optional filtering and pagination',
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
    handler: async (params: GetTestCaseStatusesParams) => {
      const result = await getQmetryTestCaseStatuses(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-test-case-status',
    definition: {
      title: 'Create Qmetry test case status',
      description: 'Create a new test case status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        name: z.string().describe('Name of the status to create.'),
        color: z
          .string()
          .describe('Status Color Ex. Hex code of color, refer JSON schema'),
        description: z
          .string()
          .describe('Description of the status.')
          .optional(),
      },
    },
    handler: async (params: CreateTestCaseStatusParams) => {
      const result = await createQmetryTestCaseStatus(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'update-qmetry-test-case-status',
    definition: {
      title: 'Update Qmetry test case status',
      description: 'Update an existing test case status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe('Refer id from the response of API "Get statuses".'),
        name: z.string().describe('Status name'),
        color: z
          .string()
          .describe('New color code for the status (hex format).'),
        description: z
          .string()
          .describe('New description of the status.')
          .optional(),
      },
    },
    handler: async (params: UpdateTestCaseStatusParams) => {
      return await updateQmetryTestCaseStatus(params);
    },
  },
  {
    name: 'delete-qmetry-test-case-status',
    definition: {
      title: 'Delete Qmetry test case status',
      description: 'Delete a test case status from QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe('Refer id from the response of API "Get statuses".'),
      },
    },
    handler: async (params: DeleteTestCaseStatusParams) => {
      return await deleteQmetryTestCaseStatus(params);
    },
  },
  {
    name: 'get-qmetry-test-case-status-reference-count',
    definition: {
      title: 'Get Qmetry test case status reference count',
      description: 'Get the reference count of a test case status in QMetry',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get QMetry Enabled Projects".'
          ),
        statusId: z
          .number()
          .describe('Refer id from the response of API "Get statuses".'),
      },
    },
    handler: async (params: GetTestCaseStatusReferenceCountParams) => {
      const result = await getQmetryTestCaseStatusReferenceCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
