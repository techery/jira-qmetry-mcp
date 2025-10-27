# Claude Desktop Integration

This guide explains how to integrate the Jira QMetry MCP Server with Claude Desktop.

## Prerequisites

Before configuring Claude Desktop, make sure you have:

1. Built the Docker image:
   ```bash
   docker build -t jira-qmetry-mcp .
   ```

2. A valid QMetry API key (generated from Jira: `QMetry > Configuration > Open API > Generate`)

## Configuration

To use this MCP server with Claude Desktop via Docker, add the following configuration to your Claude Desktop config file:

**Config File Location**:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Configuration**:

```json
{
    "mcpServers": {
        "jira-qmetry": {
            "command": "docker",
            "args": [
                "run",
                "--rm",
                "-i",
                "-e", "QMETRY_API_KEY",
                "jira-qmetry-mcp"
            ],
            "env": {
                "QMETRY_API_KEY": "your-qmetry-api-key"
            }
        }
    }
}
```

> 💡 **Note**: Replace `your-qmetry-api-key` with your actual QMetry API key

After updating the configuration, restart Claude Desktop for the changes to take effect.
