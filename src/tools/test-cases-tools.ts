import { z } from "zod";
import { ToolDefinition } from "../interfaces/index";
import { createQmetryTestCase, getQmetryTestCases } from "../api/qmetry-test-case";
import { CreateTestCaseParams, SearchTestCasesParams } from "../interfaces/qmetry-test-cases";

export const testCasesTools: Array<ToolDefinition> = [
    {
        name: "get-qmetry-test-cases",
        definition: {
            title: "Get all Qmetry test cases for a project",
            description: "Get all Qmetry test cases for a project",
            inputSchema: {
                projectId: z.number().describe('Refer id from the response of API "Get QMetry Enabled Projects".'),
                assignee: z.string().optional().describe('Jira user Account ID'),
                components: z.array(z.string()).optional().describe('Array of component names, refer name from ' +
                    'the response of API "Get components".'),
                createdBy: z.string().optional().describe('Jira user Account ID'),
                createdOn: z.string().optional().describe('Comma separated two dates. Pass in ' +
                    '"dd/MMM/yyyy,dd/MMM/yyyy" date format.'),
                description: z.string().optional().describe('Description of Test Case'),
                estimatedTime: z.string().optional().describe('Pass string in HH:MM:SS format'),
                fixVersions: z.array(z.string()).optional().describe('List of JIRA fix version ID'),
                folderId: z.string().optional().describe('Refer id from the response of API ' +
                    ' "Get test case folders"'),
                key: z.string().optional().describe('Key of Test Case'),
                labels: z.array(z.string()).optional().describe('List of label names,Refer name from ' +
                    'the response of API "Get labels".'),
                priority: z.string().optional().describe('Priority of the test case'),
                reporter: z.string().optional().describe('Jira user Account ID'),
                sprint: z.string().optional().describe('Jira sprint ID'),
                status: z.array(z.string()).optional().describe('Refer name from the response of API' +
                    ' "Get Statuses" for its module.'),
                summary: z.string().optional().describe('Name of Test Case.'),
                updatedBy: z.string().optional().describe('Jira user Account ID'),
                updatedOn: z.string().optional().describe('Comma separated two dates. Pass in ' +
                    '"dd/MMM/yyyy,dd/MMM/yyyy" date format.'),
                maxResults: z.number().optional().describe('The maximum number of results to return.'),
                sort: z.string().optional().describe('The sorting criteria.'),
                startAt: z.number().optional().describe('The starting index for pagination.'),
            },
        },
        handler: async (params: SearchTestCasesParams) => {
            const testCases = await getQmetryTestCases(params);
            return { content: [{ type: "text", text: JSON.stringify(testCases, null, 2), },], };
        },
    },
    {
        name: "create-qmetry-test-case",
        definition: {
            title: "Create a Qmetry test case",
            description: "Create a Qmetry test case",
            inputSchema: {
                summary: z.string().describe('Name of Test Case.'),
                projectId: z.string().describe('Refer id from the response of API "Get QMetry Enabled Projects".'),
                folderId: z.string().describe('Refer id from the response of API "Get test case folders". ' +
                    'If you want to create a folder at the root level, pass "-1".'),
                steps: z.array(z.object({
                    stepDetails: z.string().describe('Description of the test step'),
                    testData: z.string().describe('Test data required for the step'),
                    expectedResult: z.string().describe('Expected result of the step'),
                    id: z.number().describe('Unique identifier for the step'),
                    isChecked: z.boolean().default(false).optional().describe('Whether the step is checked/completed'),
                    isExpanded: z.boolean().default(true).optional().describe('Whether the step is expanded in the UI')
                })).describe('Array of test steps with details, test data, and expected results'),
                assignee: z.string().optional().describe('Jira user Account ID'),
                components: z.array(z.string()).optional().describe('Array of component Id and for componentId ' +
                    'refer id from the response of API "Get components".'),
                description: z.string().optional().describe('Description of Test Case'),
                precondition: z.string().optional().describe('Precondition of Test Case'),
                estimatedTime: z.string().optional().describe('Pass string in HH:MM:SS format.'),
                fixVersions: z.array(z.string()).optional().describe('List of JIRA fix version ID'),
                labels: z.array(z.string()).optional().describe('Array of label Ids,Refer id from the response ' +
                    'of API "Get labels".'),
                priority: z.string().optional().describe('Refer id from the response of API "Get Priorities".'),
                reporter: z.string().optional().describe('Jira user Account ID'),
                sprint: z.string().optional().describe('Jira sprint ID'),
                status: z.string().optional().describe('Refer id from the response of API "Get Test Case Status".'),
                isAutomated: z.boolean().optional().describe('Whether testcase is automated or not - true or false'),
            },
        },
        handler: async (params: CreateTestCaseParams) => {
            const testCases = await createQmetryTestCase(params);
            return { content: [{ type: "text", text: JSON.stringify(testCases, null, 2), },], };
        },
    },
];