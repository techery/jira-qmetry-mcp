import { z } from 'zod';
import {
  getCustomFieldTypes,
  getTestCaseCustomFields,
  getTestCaseCustomFieldRefCount,
  getTestCycleCustomFields,
  getTestCycleCustomFieldRefCount,
  getTestPlanCustomFields,
  getTestPlanCustomFieldRefCount,
  getTestExecutionCustomFields,
  getTestExecutionCustomFieldRefCount,
} from '../api/qmetry-custom-fields.js';
import {
  GetTestCaseCustomFieldsParams,
  GetTestCaseCustomFieldRefCountParams,
  GetTestCycleCustomFieldsParams,
  GetTestCycleCustomFieldRefCountParams,
  GetTestPlanCustomFieldsParams,
  GetTestPlanCustomFieldRefCountParams,
  GetTestExecutionCustomFieldsParams,
  GetTestExecutionCustomFieldRefCountParams,
} from '../interfaces/qmetry-custom-fields.js';
import { ToolDefinition } from '../interfaces/index.js';

export const customFieldTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-custom-field-types',
    definition: {
      title: 'Get Custom Field Types',
      description: 'Get all custom field types supported in QMetry',
      inputSchema: {},
    },
    handler: async () => {
      const result = await getCustomFieldTypes();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-qmetry-test-case-custom-fields',
    definition: {
      title: 'Get Test Case Custom Fields',
      description: 'Get all test case custom field details',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
      },
    },
    handler: async (params: GetTestCaseCustomFieldsParams) => {
      const result = await getTestCaseCustomFields(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-tc-custom-field-ref-count',
    definition: {
      title: 'Get Test Case Custom Field Reference Count',
      description:
        'Get reference count for a particular test case custom field',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        id: z
          .string()
          .describe('Refer id from the response of API "Get custom fields".'),
      },
    },
    handler: async (params: GetTestCaseCustomFieldRefCountParams) => {
      const result = await getTestCaseCustomFieldRefCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-qmetry-test-cycle-custom-fields',
    definition: {
      title: 'Get Test Cycle Custom Fields',
      description: 'Get all existing test cycle custom field details',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
      },
    },
    handler: async (params: GetTestCycleCustomFieldsParams) => {
      const result = await getTestCycleCustomFields(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-tcy-custom-field-ref-count',
    definition: {
      title: 'Get Test Cycle Custom Field Reference Count',
      description: 'Get test cycle references for a particular custom field',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        id: z
          .string()
          .describe('Refer id from the response of API "Get custom fields".'),
      },
    },
    handler: async (params: GetTestCycleCustomFieldRefCountParams) => {
      const result = await getTestCycleCustomFieldRefCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-qmetry-test-plan-custom-fields',
    definition: {
      title: 'Get Test Plan Custom Fields',
      description: 'Get custom field details for Test Plan Module',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
      },
    },
    handler: async (params: GetTestPlanCustomFieldsParams) => {
      const result = await getTestPlanCustomFields(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-tp-custom-field-ref-count',
    definition: {
      title: 'Get Test Plan Custom Field Reference Count',
      description:
        'Get test plan reference count for a particular custom field',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
        id: z
          .string()
          .describe('Refer id from the response of API "Get custom fields".'),
      },
    },
    handler: async (params: GetTestPlanCustomFieldRefCountParams) => {
      const result = await getTestPlanCustomFieldRefCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-qmetry-te-custom-fields',
    definition: {
      title: 'Get Test Execution Custom Fields',
      description: 'Get all test execution custom field details',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get qmetry enabled projects".'
          ),
      },
    },
    handler: async (params: GetTestExecutionCustomFieldsParams) => {
      const result = await getTestExecutionCustomFields(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'get-te-custom-field-ref-count',
    definition: {
      title: 'Get Test Execution Custom Field Reference Count',
      description:
        'Get test execution reference count for a particular custom field',
      inputSchema: {
        projectId: z
          .number()
          .describe(
            'Refer id from the response of API "Get Test Execution Custom Fields".'
          ),
        id: z
          .string()
          .describe('Refer id from the response of API "Get custom fields".'),
      },
    },
    handler: async (params: GetTestExecutionCustomFieldRefCountParams) => {
      const result = await getTestExecutionCustomFieldRefCount(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
