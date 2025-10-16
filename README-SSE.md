# QMetry MCP Server with SSE Support

This project provides a Model Context Protocol (MCP) server for QMetry integration with Server-Sent Events (SSE) support, enabling real-time communication and monitoring of QMetry operations.

## Features

- **MCP Server**: Standard Model Context Protocol server for QMetry operations
- **SSE Support**: Real-time event streaming for operation monitoring
- **Web Client**: HTML/JavaScript client for testing and monitoring
- **REST API**: HTTP endpoints for executing QMetry operations
- **Tool Integration**: All existing QMetry tools are available via SSE

## Installation

1. Install dependencies using pnpm:
```bash
pnpm install
```

## Usage

### Running the SSE Server

Start the server with SSE support:
```bash
pnpm run start:sse
```

This will start:
- MCP server (stdio transport)
- HTTP server on port 3000 (or PORT environment variable)
- SSE endpoint at `/events`
- REST API at `/api/qmetry/:operation`

### Running the Standard MCP Server

For standard MCP usage without SSE:
```bash
pnpm start
```

## API Endpoints

### SSE Endpoint
- **GET** `/events` - Connect to Server-Sent Events stream

### REST API Endpoints
- **POST** `/api/qmetry/:operation` - Execute a QMetry operation
- **GET** `/api/tools` - Get list of available tools
- **GET** `/api/clients` - Get connected SSE clients
- **GET** `/health` - Health check endpoint

### Static Files
- **GET** `/client.html` - Web client for testing SSE functionality

## SSE Events

The server broadcasts the following event types:

- `connected` - Client connected to SSE stream
- `server_status` - Server status updates
- `operation_start` - QMetry operation started
- `operation_progress` - Operation progress updates
- `operation_complete` - Operation completed successfully
- `operation_error` - Operation failed
- `server_shutdown` - Server shutting down

## Web Client

Access the web client at `http://localhost:3000/client.html` to:

- Connect/disconnect from SSE stream
- View real-time events
- Execute QMetry operations
- Monitor operation progress
- View available tools

## Available Tools

The server includes all QMetry MCP tools:

- **Project Tools**: Create, read, update, delete projects
- **Test Case Folder Tools**: Manage test case folders
- **Test Cycle Folder Tools**: Manage test cycle folders
- **Test Plan Folder Tools**: Manage test plan folders
- **Test Cases Tools**: Manage test cases
- **Test Step Tools**: Manage test steps
- **Label Tools**: Manage labels
- **Priority Tools**: Manage priorities
- **Status Tools**: Manage test case, cycle, and plan statuses

## Example Usage

### Using the REST API

```bash
# Execute a QMetry operation
curl -X POST http://localhost:3000/api/qmetry/getProjects \
  -H "Content-Type: application/json" \
  -d '{"params": {}}'

# Get available tools
curl http://localhost:3000/api/tools

# Check server health
curl http://localhost:3000/health
```

### Using SSE Client (JavaScript)

```javascript
// Connect to SSE stream
const eventSource = new EventSource('/events');

// Listen for events
eventSource.addEventListener('operation_complete', function(event) {
    const data = JSON.parse(event.data);
    console.log('Operation completed:', data);
});

// Execute operation
fetch('/api/qmetry/getProjects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ params: {} })
});
```

## Configuration

Set environment variables to configure the server:

- `PORT` - HTTP server port (default: 3000)

## Development

### Linting and Formatting

```bash
# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Format code
pnpm run format

# Check formatting
pnpm run format:check
```

### MCP Inspector

Use the MCP inspector to debug the server:

```bash
pnpm run run:inspector
```

## Architecture

The SSE server combines:

1. **MCP Server**: Handles tool registration and execution
2. **Express Server**: Provides HTTP endpoints and SSE functionality
3. **Tool Registry**: Maps tool names to implementations
4. **SSE Manager**: Manages client connections and event broadcasting
5. **Web Client**: Provides a user interface for testing

## Error Handling

- SSE connection errors are logged and clients are removed
- Tool execution errors are broadcast to all clients
- Server errors are logged to stderr
- Graceful shutdown notifies all clients

## Security Considerations

- CORS is enabled for all origins (configure for production)
- No authentication is implemented (add for production)
- SSE connections are not rate-limited (consider for production)

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and formatting
4. Test with the web client
5. Submit a pull request

## License

[Add your license information here]
