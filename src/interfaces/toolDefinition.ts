/**
 * Defines a tool with a specific operation.
 * @interface ToolDefinition
 * @property {string} name - The unique name of the tool.
 * @property {Object} definition - The details of the tool.
 * @property {string} definition.title - The title of the tool.
 * @property {string} definition.description - A brief description of the tool's purpose.
 * @property {Record<string, any>} definition.inputSchema - The schema defining input parameters.
 * @property {function} handler - The function that performs the tool's operation.
 * @property {Promise<any>} handler - Returns a promise that resolves when the operation is complete.
 */
export interface ToolDefinition {
  name: string;
  definition: {
    title: string;
    description: string;
    inputSchema: Record<string, any>;
  };
  handler: (...args: any[]) => Promise<any>;
}
