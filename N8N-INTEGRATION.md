# 🔌 N8N Integration Guide

[English](#english) | [Español](#español)

---

## English

### Overview

This MCP server implements the **Model Context Protocol (MCP) with JSON-RPC 2.0**, making it compatible with N8N and other MCP clients.

### Connection URL

```
https://jira-qmetry-mcp-production.up.railway.app/message
```

### Available Endpoints

| Endpoint | Method | Description | Usage |
|----------|--------|-------------|-------|
| `/message` | POST | MCP JSON-RPC 2.0 | **N8N, MCP Clients** |
| `/events` | GET | Server-Sent Events | SSE Streaming |
| `/health` | GET | Health check & info | Monitoring |

### How to Connect with N8N

1. **Open your N8N workflow**
2. **Add a new node**: Search for "MCP" or "Model Context Protocol"
3. **Configure the connection**:
   - **URL**: `https://jira-qmetry-mcp-production.up.railway.app/message`
   - **Protocol**: JSON-RPC 2.0
   - **Protocol Version**: 2024-11-05

4. **Test the connection**: N8N should automatically discover all 50+ available tools

### Supported MCP Methods

#### 1. Initialize
```json
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "params": {},
  "id": 1
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": { "tools": {} },
    "serverInfo": {
      "name": "Jira Qmetry MCP SSE",
      "version": "1.0.0"
    }
  },
  "id": 1
}
```

#### 2. List Tools
```json
{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "params": {},
  "id": 2
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "tools": [
      {
        "name": "get-qmetry-projects",
        "description": "Get all projects from QMetry",
        "inputSchema": {
          "type": "object",
          "properties": { ... },
          "required": []
        }
      },
      ...
    ]
  },
  "id": 2
}
```

#### 3. Call Tool
```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "get-qmetry-projects",
    "arguments": {}
  },
  "id": 3
}
```

**Response:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{ ... project data ... }"
      }
    ]
  },
  "id": 3
}
```

### Available Tools Categories

- **Projects**: Get projects
- **Test Case Folders**: CRUD operations
- **Test Cycle Folders**: CRUD operations
- **Test Plan Folders**: CRUD operations
- **Test Cases**: CRUD, search, copy, move
- **Test Steps**: CRUD operations
- **Priorities**: CRUD operations
- **Labels**: CRUD operations
- **Statuses**: Test Case, Test Cycle, Test Plan statuses

### Testing the Connection

#### Using curl:
```bash
curl -X POST https://jira-qmetry-mcp-production.up.railway.app/message \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "params": {},
    "id": 1
  }'
```

#### Health Check:
```bash
curl https://jira-qmetry-mcp-production.up.railway.app/health
```

### Troubleshooting

#### N8N doesn't show tools
1. Verify the URL is correct (must include `/message`)
2. Check the server is running: `GET /health`
3. Ensure N8N has internet access to Railway
4. Check N8N supports MCP protocol version `2024-11-05`

#### Connection timeout
1. Check Railway deployment is active
2. Verify no firewall blocking the connection
3. Test with curl first

#### Tools execution fails
1. Ensure `QMETRY_API_KEY` environment variable is set in Railway
2. Check QMetry API is accessible
3. Verify tool parameters are correct

### Architecture

```
N8N
  ↓
  POST /message (JSON-RPC 2.0)
  ↓
MCP Server (sse-server.ts)
  ↓
QMetry API (api/*.ts)
  ↓
QMetry for Jira
```

---

## Español

### Resumen

Este servidor MCP implementa el **Model Context Protocol (MCP) con JSON-RPC 2.0**, haciéndolo compatible con N8N y otros clientes MCP.

### URL de Conexión

```
https://jira-qmetry-mcp-production.up.railway.app/message
```

### Endpoints Disponibles

| Endpoint | Método | Descripción | Uso |
|----------|--------|-------------|-----|
| `/message` | POST | MCP JSON-RPC 2.0 | **N8N, Clientes MCP** |
| `/events` | GET | Server-Sent Events | Streaming SSE |
| `/health` | GET | Estado y info del servidor | Monitoreo |

### Cómo Conectar con N8N

1. **Abre tu flujo de N8N**
2. **Agrega un nuevo nodo**: Busca "MCP" o "Model Context Protocol"
3. **Configura la conexión**:
   - **URL**: `https://jira-qmetry-mcp-production.up.railway.app/message`
   - **Protocolo**: JSON-RPC 2.0
   - **Versión del Protocolo**: 2024-11-05

4. **Prueba la conexión**: N8N debería descubrir automáticamente las más de 50 herramientas disponibles

### Métodos MCP Soportados

#### 1. Inicialización
```json
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "params": {},
  "id": 1
}
```

**Respuesta:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": { "tools": {} },
    "serverInfo": {
      "name": "Jira Qmetry MCP SSE",
      "version": "1.0.0"
    }
  },
  "id": 1
}
```

#### 2. Listar Herramientas
```json
{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "params": {},
  "id": 2
}
```

**Respuesta:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "tools": [
      {
        "name": "get-qmetry-projects",
        "description": "Obtener todos los proyectos de QMetry",
        "inputSchema": {
          "type": "object",
          "properties": { ... },
          "required": []
        }
      },
      ...
    ]
  },
  "id": 2
}
```

#### 3. Ejecutar Herramienta
```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "get-qmetry-projects",
    "arguments": {}
  },
  "id": 3
}
```

**Respuesta:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{ ... datos del proyecto ... }"
      }
    ]
  },
  "id": 3
}
```

### Categorías de Herramientas Disponibles

- **Proyectos**: Obtener proyectos
- **Carpetas de Test Cases**: Operaciones CRUD
- **Carpetas de Test Cycles**: Operaciones CRUD
- **Carpetas de Test Plans**: Operaciones CRUD
- **Test Cases**: CRUD, buscar, copiar, mover
- **Test Steps**: Operaciones CRUD
- **Prioridades**: Operaciones CRUD
- **Etiquetas**: Operaciones CRUD
- **Estados**: Estados de Test Case, Test Cycle, Test Plan

### Probar la Conexión

#### Usando curl:
```bash
curl -X POST https://jira-qmetry-mcp-production.up.railway.app/message \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "params": {},
    "id": 1
  }'
```

#### Health Check:
```bash
curl https://jira-qmetry-mcp-production.up.railway.app/health
```

### Solución de Problemas

#### N8N no muestra las herramientas
1. Verifica que la URL sea correcta (debe incluir `/message`)
2. Comprueba que el servidor esté funcionando: `GET /health`
3. Asegúrate de que N8N tenga acceso a internet hacia Railway
4. Verifica que N8N soporte la versión del protocolo MCP `2024-11-05`

#### Timeout en la conexión
1. Verifica que el despliegue en Railway esté activo
2. Comprueba que no haya firewall bloqueando la conexión
3. Prueba primero con curl

#### Falla la ejecución de herramientas
1. Asegúrate de que la variable de entorno `QMETRY_API_KEY` esté configurada en Railway
2. Verifica que la API de QMetry sea accesible
3. Confirma que los parámetros de la herramienta sean correctos

### Arquitectura

```
N8N
  ↓
  POST /message (JSON-RPC 2.0)
  ↓
Servidor MCP (sse-server.ts)
  ↓
API de QMetry (api/*.ts)
  ↓
QMetry for Jira
```

---

## License

Apache License 2.0 - See [LICENSE](LICENSE) for details.

