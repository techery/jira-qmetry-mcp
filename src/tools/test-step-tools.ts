import { z } from 'zod';
import {
  getQmetryTestSteps,
  createQmetryTestStep,
  updateQmetryTestStep,
  deleteQmetryTestStep,
} from '../api/qmetry-test-steps.js';
import {
  GetTestStepsParams,
  CreateTestStepParams,
  UpdateTestStepParams,
  DeleteTestStepParams,
} from '../interfaces/qmetry-test-steps.js';
import { ToolDefinition } from '../interfaces/index.js';

export const testStepTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-test-steps',
    definition: {
      title: 'Get Qmetry test steps',
      description: 'Get Qmetry test steps for a given test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        maxResults: z.number().describe('Refer parameters.').optional(),
        sort: z
          .string()
          .describe(
            'Possible values - stepDetails,testData,seqNo,expectedResult Pattern - sortField:sortOrder(asc/desc) For example if want to sorting on sequence number in ascending order then need to pass seqNo:asc'
          )
          .optional(),
        startAt: z.number().describe('Refer parameters.').optional(),
      },
    },
    handler: async (params: GetTestStepsParams) => {
      const result = await getQmetryTestSteps(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'create-qmetry-test-step',
    definition: {
      title: 'Create a Qmetry test step',
      description: 'Create a Qmetry test step for a given test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        steps: z.array(
          z.object({
            stepDetails: z.string().describe('Test step Details'),
            testData: z.string().describe('Test step expected Result'),
            expectedResult: z.string().describe('Test step test data'),
          })
        ),
      },
    },
    handler: async (params: CreateTestStepParams) => {
      const result = await createQmetryTestStep(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'update-qmetry-test-step',
    definition: {
      title: 'Update a Qmetry test step',
      description: 'Update a Qmetry test step for a given test case',
      inputSchema: {
        testCaseId: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        steps: z.array(
          z.object({
            id: z
              .number()
              .describe(
                'Test Step Id. Refer id from the response of API "Get Test Steps".'
              ),
            stepDetails: z.string().describe('Test step Details'),
            testData: z.string().describe('Test step expected Result'),
            expectedResult: z.string().describe('Test step test data'),
          })
        ),
      },
    },
    handler: async (params: UpdateTestStepParams) => {
      const result = await updateQmetryTestStep(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'delete-qmetry-test-step',
    definition: {
      title: 'Delete a Qmetry test step',
      description: 'Delete a Qmetry test step for a given test case',
      inputSchema: {
        id: z
          .string()
          .describe('Refer id from the response of API "Search Test Case".'),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        stepIds: z
          .array(z.number())
          .describe('Refer id from the response of API "Get Test Steps".'),
      },
    },
    handler: async (params: DeleteTestStepParams) => {
      const result = await deleteQmetryTestStep(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
