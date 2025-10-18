import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  getQmetryLinkedRequirements,
  linkQmetryRequirements,
  unlinkQmetryRequirements,
} from '../api/qmetry-linked-requirements.js';
import {
  GetLinkedRequirementsParams,
  LinkRequirementParams,
  UnlinkRequirementParams,
} from '../interfaces/qmetry-linked-requirements.js';

export const linkedRequirementsTools: Array<ToolDefinition> = [
  {
    name: 'get-qmetry-linked-requirements',
    definition: {
      title: 'Get linked requirements for a test case',
      description:
        'Get all requirements (Jira issues) linked to a specific test case in Qmetry',
      inputSchema: {
        id: z
          .string()
          .describe(
            'Test Case Id. Refer id from the response of API "Search Test Case".'
          ),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        maxResults: z.number().optional().describe('Refer in parameters'),
        startAt: z.number().optional().describe('Refer in parameters'),
      },
    },
    handler: async (params: GetLinkedRequirementsParams) => {
      const linkedRequirements = await getQmetryLinkedRequirements(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(linkedRequirements, null, 2) },
        ],
      };
    },
  },
  {
    name: 'link-qmetry-requirements',
    definition: {
      title: 'Link requirements to a test case',
      description:
        'Link one or more requirements (Jira issues) to a specific test case in Qmetry',
      inputSchema: {
        id: z
          .string()
          .describe(
            'The ID of the test case to link requirements to. Refer id from the response of API "Search Test Case".'
          ),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        requirementIds: z
          .array(z.number())
          .describe(
            'List of JIRA Issue Id which want to link with given test case. Example: [123, 456]'
          ),
      },
    },
    handler: async (params: LinkRequirementParams) => {
      const result = await linkQmetryRequirements(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
  {
    name: 'unlink-qmetry-requirements',
    definition: {
      title: 'Unlink requirements from a test case',
      description:
        'Unlink one or more requirements (Jira issues) from a specific test case in Qmetry',
      inputSchema: {
        id: z
          .string()
          .describe(
            'The ID of the test case to unlink requirements from. Refer id from the response of API "Search Test Case".'
          ),
        no: z
          .number()
          .describe(
            'Test Case version No. Refer {version.versionNo} from the response of API "Search Test Case".'
          ),
        requirementIds: z
          .array(z.number())
          .describe(
            'List of JIRA Issue Id which want to unlink from given test case. Example: [123, 456]'
          ),
      },
    },
    handler: async (params: UnlinkRequirementParams) => {
      const result = await unlinkQmetryRequirements(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    },
  },
];
