# Jira QMetry MCP Server

> 🌐 **Language**: **English** | [Español](README_ES.md)

MCP (Model Context Protocol) server to interact with the QMetry for Jira API. Allows large language models (LLMs) and client applications to access QMetry test management functionalities through well-defined tools.

## 📋 Project Description

This project implements a server based on the Model Context Protocol (MCP) that provides a complete interface to manage test cases, test cycles, test plans, and their associated configurations in QMetry. The server is built with TypeScript and uses the official MCP SDK.

### Key Features

- ✅ **Complete Test Case Management**: Create, search, edit, move, and copy test cases
- ✅ **Test Steps Management**: Create, update, delete, and retrieve test steps
- ✅ **Folder Organization**: Manage folders for test cases, test cycles, and test plans
- ✅ **Status Configuration**: Manage custom statuses for test cases, test cycles, and test plans
- ✅ **Priority Management**: Full CRUD of priorities with custom colors
- ✅ **Label System**: Create, update, and delete labels for organization
- ✅ **Linked Requirements**: Link and unlink requirements (Jira issues) with test cases
- ✅ **Robust Architecture**: Logging system, error handling, and schema validation with Zod

## 🏗️ Project Structure

```
jira-qmetry-mcp/
├── src/
│   ├── api/                          # QMetry API call functions
│   │   ├── qmetry-projects.ts
│   │   ├── qmetry-test-case.ts
│   │   ├── qmetry-test-case-folders.ts
│   │   ├── qmetry-test-case-status.ts
│   │   ├── qmetry-test-cycle-folders.ts
│   │   ├── qmetry-test-cycle-status.ts
│   │   ├── qmetry-test-plan-folders.ts
│   │   ├── qmetry-test-plan-status.ts
│   │   ├── qmetry-test-steps.ts
│   │   ├── qmetry-priorities.ts
│   │   ├── qmetry-labels.ts
│   │   ├── qmetry-components.ts
│   │   └── qmetry-linked-requirements.ts
│   ├── interfaces/                   # TypeScript type definitions
│   │   ├── qmetry-projects.ts
│   │   ├── qmetry-test-cases.ts
│   │   ├── qmetry-test-case-folders.ts
│   │   ├── qmetry-test-cycle-folders.ts
│   │   ├── qmetry-test-plan-folders.ts
│   │   ├── qmetry-test-steps.ts
│   │   ├── qmetry-priorities.ts
│   │   ├── qmetry-labels.ts
│   │   ├── qmetry-status.ts
│   │   ├── qmetry-linked-requirements.ts
│   │   ├── toolDefinition.ts
│   │   └── index.ts
│   ├── tools/                        # MCP tool definitions
│   │   ├── project-tools.ts
│   │   ├── test-cases-tools.ts
│   │   ├── test-case-folder-tools.ts
│   │   ├── test-cases-status-tools.ts
│   │   ├── test-cycle-folder-tools.ts
│   │   ├── test-cycle-status-tools.ts
│   │   ├── test-plan-folder-tools.ts
│   │   ├── test-plan-status-tools.ts
│   │   ├── test-step-tools.ts
│   │   ├── priority-tools.ts
│   │   ├── label-tools.ts
│   │   └── linked-requirements-tools.ts
│   ├── utils/                        # Utilities and helpers
│   │   ├── logger.ts
│   │   ├── object.utils.ts
│   │   └── index.ts
│   ├── main.ts                       # MCP server entry point (stdio)
│   ├── http-server.ts                # HTTP server with Streamable HTTP transport
│   └── config.json                   # API configuration
├── package.json
├── tsconfig.json
├── eslint.config.js
├── LICENSE
├── NOTICE
├── CONTRIBUTING.md
└── README.md
```

## 🔧 Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variable

Configure your QMetry API key:

```bash
export QMETRY_API_KEY="your-api-key-here"
```

> 💡 **Note**: The API key is generated from the Jira interface: `QMetry > Configuration > Open API > Generate`

### 4. Run the Server

```bash
pnpm start
```

To use the MCP inspector:

```bash
pnpm run:inspector
```

## 🛠️ Available Tools

### 📁 Projects

**Tool**: `list-qmetry-projects`

- **Get projects**: List all QMetry-enabled projects with filtering and pagination

---

### 📝 Test Cases

**Tools**: `get-qmetry-test-cases`, `create-qmetry-test-case`, `move-qmetry-test-case`, `copy-qmetry-test-case`

- **Get**: Search test cases with advanced filters (assignee, status, labels, etc.)
- **Create**: Create new test cases with steps, descriptions, and configurations
- **Move**: Move test cases between folders
- **Copy**: Copy test cases to different locations

---

### 📂 Test Case Folders

**Tools**: `get-qmetry-test-case-folders`, `create-qmetry-test-case-folder`, `edit-qmetry-test-case-folder`, `copy-qmetry-test-case-folder`, `move-qmetry-test-case-folder`, `search-qmetry-test-case-folders`

- **Get**: List all test case folders in a project
- **Create**: Create new folders with parent-child hierarchy
- **Edit**: Modify name and description of existing folders
- **Copy**: Copy folders to new locations
- **Move**: Move folders to different parent folders
- **Search**: Search folders by name (strict or relative mode)

---

### 🎯 Test Case Status

**Tools**: `get-qmetry-test-case-statuses`, `create-qmetry-test-case-status`, `update-qmetry-test-case-status`, `delete-qmetry-test-case-status`, `get-qmetry-test-case-status-reference-count`

- **Get**: List all test case statuses (active/archived)
- **Create**: Create custom statuses with colors
- **Update**: Modify existing statuses
- **Delete**: Remove statuses from project
- **Reference count**: Check how many cases use a specific status

---

### 🔄 Test Cycle Folders

**Tools**: `get-qmetry-test-cycle-folders`, `create-qmetry-test-cycle-folder`, `edit-qmetry-test-cycle-folder`, `move-qmetry-test-cycle-folder`, `search-qmetry-test-cycle-folder`

- **Get**: List test cycle folders with optional count
- **Create**: Create new cycle folders with hierarchy
- **Edit**: Update name and description of folders
- **Move**: Relocate folders in the hierarchy
- **Search**: Locate folders by name

---

### 🔄 Test Cycle Status

**Tools**: `get-qmetry-test-cycle-statuses`, `create-qmetry-test-cycle-status`, `update-qmetry-test-cycle-status`, `delete-qmetry-test-cycle-status`, `get-qmetry-test-cycle-status-reference-count`

- **Get**: List test cycle statuses
- **Create**: Create custom statuses for cycles
- **Update**: Modify existing statuses
- **Delete**: Remove unused statuses
- **Reference count**: Check status usage

---

### 📋 Test Plan Folders

**Tools**: `get-qmetry-test-plan-folders`, `create-qmetry-test-plan-folder`, `edit-qmetry-test-plan-folder`, `move-qmetry-test-plan-folder`, `search-qmetry-test-plan-folder`

- **Get**: List test plan folders
- **Create**: Create organizational folders for plans
- **Edit**: Update folder information
- **Move**: Reorganize folder hierarchy
- **Search**: Search for specific folders

---

### 📋 Test Plan Status

**Tools**: `get-qmetry-test-plan-statuses`, `create-qmetry-test-plan-status`, `update-qmetry-test-plan-status`, `delete-qmetry-test-plan-status`, `get-qmetry-test-plan-status-reference-count`

- **Get**: List test plan statuses
- **Create**: Create custom statuses
- **Update**: Modify existing statuses
- **Delete**: Remove statuses from project
- **Reference count**: View status usage

---

### 🪜 Test Steps

**Tools**: `get-qmetry-test-steps`, `create-qmetry-test-step`, `update-qmetry-test-step`, `delete-qmetry-test-step`

- **Get**: List all steps of a test case with pagination
- **Create**: Create multiple steps with details, test data, and expected results
- **Update**: Modify existing steps
- **Delete**: Remove steps from a test case

---

### ⚡ Priorities

**Tools**: `get-qmetry-priorities`, `create-qmetry-priority`, `update-qmetry-priority`, `delete-qmetry-priority`, `search-qmetry-priorities`

- **Get**: List all project priorities
- **Create**: Create custom priorities with hexadecimal colors
- **Update**: Modify existing priorities
- **Delete**: Remove unused priorities
- **Search**: Locate priorities by name

---

### 🏷️ Labels

**Tools**: `get-qmetry-labels`, `create-qmetry-label`, `update-qmetry-label`, `delete-qmetry-label`, `get-qmetry-label-reference-count`

- **Get**: List all project labels
- **Create**: Create new labels for categorization
- **Update**: Modify label names
- **Delete**: Remove labels from project
- **Reference count**: See how many items use a label

---

### 🔗 Linked Requirements

**Tools**: `get-qmetry-linked-requirements`, `link-qmetry-requirements`, `unlink-qmetry-requirements`

- **Get**: List all requirements (Jira issues) linked to a test case
- **Link**: Associate one or more Jira issues with a test case
- **Unlink**: Remove association between requirements and test cases

## 🚨 Troubleshooting

### Error: QMETRY_API_KEY not configured

```bash
export QMETRY_API_KEY="your-api-key"
```

## 📚 Resources

- [Official MCP Documentation](https://modelcontextprotocol.io/)
- [QMetry for Jira API](https://qmetry.com/qmetry-for-jira/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)

## 📄 License

This project is licensed under **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

### Why Apache License 2.0?

- ✅ **Patent protection**: Explicit grant of patent rights
- ✅ **Trademark control**: Protection over trademark usage
- ✅ **Change declaration**: Requires documenting modifications
- ✅ **Enterprise use**: Widely accepted in corporate environments
- ✅ **Compatible**: With most open source licenses

### Important Notices

This software integrates with QMetry and Jira through their public APIs. QMetry is a registered trademark of Zoho Corporation and Jira is a registered trademark of Atlassian Pty Ltd. This project is not affiliated with, endorsed by, or sponsored by these companies.

See the [NOTICE](NOTICE) file for complete information about attributions and legal notices.

## 👥 Contributing

To contribute to the project:

1. **Fork & Pull Request**: Fork the project and submit your changes via pull requests
2. **Clean code**: Keep code clean using ESLint and Prettier (`pnpm lint:fix`)
3. **Logging**: Use the provided logging system (never `console.log`)
4. **Documentation**: Document all functions with JSDoc
5. **Patterns**: Follow established patterns in the project
6. **Testing**: Test your changes with MCP Inspector (`pnpm run:inspector`)
7. **License**: By contributing, you agree that your code will be licensed under Apache License 2.0
8. **Changes**: Clearly document what changes you made and why

### License Header

Add this header at the beginning of new TypeScript files:

```typescript
/**
 * Copyright 2025 Alberto Zapata
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 🔄 Version

**v1.0.0** - Current MCP server version
