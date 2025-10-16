# Contributing Guide

> 🌐 **Language**: **English** | [Español](CONTRIBUTING_ES.md)

Thank you for your interest in contributing to Jira QMetry MCP Server! This document provides guidelines for contributing to the project.

## 📋 Code of Conduct

- Be respectful and professional in all interactions
- Accept constructive criticism with an open mind
- Focus on what's best for the community
- Show empathy towards other community members

## 🚀 How to Contribute

### 1. Fork and Clone the Repository

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/albertor03/jira-qmetry-mcp
cd jira-qmetry-mcp
```

### 2. Set Up Development Environment

```bash
# Install dependencies
pnpm install

# Set environment variable
export QMETRY_API_KEY="your-api-key"

# Verify everything works
pnpm start
```

### 3. Create a Branch for Your Contribution

```bash
# Use descriptive names for your branches
git checkout -b feature/new-functionality
# or
git checkout -b fix/bug-correction
```

### 4. Make Your Changes

#### Code Standards

- **TypeScript**: All code must be in TypeScript
- **ESLint**: Run `pnpm lint` before committing
- **Prettier**: Run `pnpm format` to format code
- **JSDoc**: Document all public functions

#### File Structure

If adding new functionality, follow this structure:

```
src/
├── api/
│   └── qmetry-new-functionality.ts    # API calls
├── interfaces/
│   └── qmetry-new-functionality.ts    # TypeScript types
└── tools/
    └── new-functionality-tools.ts      # MCP definitions
```

#### License Header

Add this header to all new files:

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

### 5. Testing

```bash
# Run linter
pnpm lint

# Test with MCP Inspector
pnpm run:inspector

# Verify formatting
pnpm format:check
```

### 6. Commit and Push

```bash
# Stage files
git add .

# Commit with descriptive message
git commit -m "feat: add support for new QMetry features"

# Push to your fork
git push origin feature/new-functionality
```

#### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting changes (no code effect)
- `refactor:` Code refactoring
- `test:` Add or modify tests
- `chore:` Changes to build, CI, etc.

**Examples:**

```
feat: add tool to manage test suites
fix: correct error in test case creation
docs: update README with usage examples
refactor: improve error handling in API calls
```

### 7. Create Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Describe your changes clearly:
   - **What** you changed
   - **Why** you changed it
   - **How** you tested it

**PR Template:**

```markdown
## Description

[Clear description of changes]

## Type of Change

- [ ] New feature (feat)
- [ ] Bug fix (fix)
- [ ] Documentation change (docs)
- [ ] Refactoring (refactor)
- [ ] Other: [specify]

## Checklist

- [ ] I have run `pnpm lint` without errors
- [ ] I have run `pnpm format` to format the code
- [ ] I have added JSDoc documentation
- [ ] I have tested my changes with MCP Inspector
- [ ] I have added license header to new files
- [ ] I have updated README if necessary
- [ ] I have documented changes in modified files

## Testing

[Describe how you tested your changes]

## Screenshots (if applicable)

[Add screenshots if relevant]
```

## 📝 Style Guides

### TypeScript

```typescript
// ✅ Good
interface TestCaseParams {
  summary: string;
  projectId: number;
  description?: string;
}

export async function createTestCase(
  params: TestCaseParams
): Promise<TestCaseResponse> {
  // Implementation
}

// ❌ Bad
function createTestCase(summary, projectId, description) {
  // No types
}
```

### Logging

```typescript
// ✅ Good
import { logger } from '../utils/logger';

logger.info('Test case created', { testCaseId: '123' }, 'createTestCase');

// ❌ Bad
console.log('Test case created');
```

### Error Handling

```typescript
// ✅ Good
try {
  const result = await apiCall();
  return result;
} catch (error) {
  logger.error('Failed to create test case', error, 'createTestCase');
  throw error;
}

// ❌ Bad
try {
  return await apiCall();
} catch (error) {
  console.error(error);
}
```

## 🔍 Code Review

Your pull request will be reviewed considering:

1. **Code quality**: Follows TypeScript best practices
2. **Documentation**: Complete JSDoc and updated README if necessary
3. **Testing**: Changes have been adequately tested
4. **Consistency**: Follows existing patterns in the project
5. **License**: Includes Apache License 2.0 header

## 📜 License and Copyright

By contributing to this project, you agree that:

1. Your contribution will be licensed under **Apache License 2.0**
2. You grant patent rights according to Apache License 2.0 terms
3. Your contribution is your original work or you have rights to contribute it
4. You understand that your contribution is public and will be attributed to you

### Contribution Declaration

Each commit you make implies that you agree with the following statement:

> "I certify that this contribution was created in whole or in part by me and I have
> the right to submit it under the open source license indicated in the file;
> or the contribution is based on previous work that, to the best of my knowledge,
> is covered under an appropriate open source license and I have the right
> to submit that work with modifications under the same license (unless I am
> permitted to submit under a different license), as indicated in the file; or the
> contribution was provided directly to me by some other person who
> certified (a) or (b) and I have not modified it."

This is known as the [Developer Certificate of Origin (DCO)](https://developercertificate.org/).

## 🆘 Need Help?

If you have questions about contributing:

1. Review existing documentation
2. Search closed issues to see if your question was already answered
3. Open a new issue with the "question" label

## 🎯 Areas Where You Can Contribute

- **New tools**: Implement more QMetry API endpoints
- **Documentation**: Improve examples and guides
- **Testing**: Add automated tests
- **Optimization**: Improve code performance
- **Bugs**: Report and/or fix bugs
- **Translations**: Translate documentation to other languages

## 🙏 Acknowledgments

Thank you for contributing to the project! Every contribution, large or small, is valuable and appreciated.
