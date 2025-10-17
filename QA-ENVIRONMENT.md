# 🧪 QA Environment - N8N Integration Testing

## 📋 Environment Details

| Property | Value |
|----------|-------|
| **Environment Name** | `n8n-integration` |
| **Purpose** | QA/Testing environment for N8N integration |
| **Branch** | `feature/n8n-jsonrpc-support` |
| **Service Name** | `elegant-success` |
| **Domain** | https://elegant-success-n8n-integration.up.railway.app |
| **Status** | ✅ Active |
| **Protocol** | MCP JSON-RPC 2.0 (v2024-11-05) |

---

## 🔗 Endpoints

### 1. JSON-RPC Endpoint (N8N)
```
POST https://elegant-success-n8n-integration.up.railway.app/message
```

**Use this URL in N8N to connect to the MCP server.**

### 2. Server-Sent Events (SSE)
```
GET https://elegant-success-n8n-integration.up.railway.app/events
```

### 3. Health Check
```
GET https://elegant-success-n8n-integration.up.railway.app/health
```

---

## 🧪 Testing the QA Environment

### Test 1: Health Check
```bash
curl https://elegant-success-n8n-integration.up.railway.app/health | jq .
```

**Expected Response:**
```json
{
  "status": "healthy",
  "mcpServer": "connected",
  "protocol": "MCP JSON-RPC 2.0",
  "protocolVersion": "2024-11-05",
  "sseClients": { "count": 0, "clients": [] },
  "tools": { "count": 47, "available": [...] },
  "endpoints": {
    "jsonrpc": "/message (POST) - MCP JSON-RPC 2.0",
    "sse": "/events (GET) - Server-Sent Events",
    "health": "/health (GET) - Health check and info"
  }
}
```

### Test 2: Initialize MCP Connection
```bash
curl -X POST https://elegant-success-n8n-integration.up.railway.app/message \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "initialize",
    "params": {},
    "id": 1
  }' | jq .
```

**Expected Response:**
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

### Test 3: List Available Tools
```bash
curl -X POST https://elegant-success-n8n-integration.up.railway.app/message \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "params": {},
    "id": 2
  }' | jq '.result.tools | length'
```

**Expected Response:** `47` (number of available tools)

### Test 4: Call a Tool (Example: Get Projects)
```bash
curl -X POST https://elegant-success-n8n-integration.up.railway.app/message \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "get-qmetry-projects",
      "arguments": {}
    },
    "id": 3
  }' | jq .
```

---

## 🔧 N8N Configuration

### Step 1: Add MCP Node in N8N
1. Open your N8N workflow
2. Add a new node (search for "MCP" or "HTTP Request")
3. Configure as follows:

### Step 2: Configure Connection
```yaml
URL: https://elegant-success-n8n-integration.up.railway.app/message
Method: POST
Content Type: application/json
```

### Step 3: Test Connection
Send this JSON body:
```json
{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "params": {},
  "id": 1
}
```

### Step 4: Verify Response
You should receive a list of 47 available tools including:
- `get-qmetry-projects`
- `create-qmetry-test-case`
- `get-qmetry-test-cases`
- And 44 more...

---

## 📊 Available Tools (47 total)

### Projects
- `get-qmetry-projects`

### Test Case Folders
- `get-qmetry-test-case-folders`
- `create-qmetry-test-case-folder`
- `edit-qmetry-test-case-folder`
- `copy-qmetry-test-case-folder`
- `move-qmetry-test-case-folder`
- `search-qmetry-test-case-folders`

### Test Cycle Folders
- `get-qmetry-test-cycle-folders`
- `create-qmetry-test-cycle-folder`
- `edit-qmetry-test-cycle-folder`
- `move-qmetry-test-cycle-folder`
- `search-qmetry-test-cycle-folder`

### Test Plan Folders
- `get-qmetry-test-plan-folders`
- `create-qmetry-test-plan-folder`
- `edit-qmetry-test-plan-folder`
- `move-qmetry-test-plan-folder`
- `search-qmetry-test-plan-folder`

### Test Cases
- `get-qmetry-test-cases`
- `create-qmetry-test-case`
- `move-qmetry-test-case`
- `copy-qmetry-test-case`

### Test Steps
- `get-qmetry-test-steps`
- `create-qmetry-test-step`
- `update-qmetry-test-step`
- `delete-qmetry-test-step`

### Priorities
- `get-qmetry-priorities`
- `get-qmetry-priority-reference-count`

### Labels
- `get-qmetry-labels`
- `create-qmetry-label`
- `update-qmetry-label`
- `delete-qmetry-label`
- `get-qmetry-label-reference-count`

### Statuses
- Test Case Statuses (7 tools)
- Test Cycle Statuses (7 tools)
- Test Plan Statuses (7 tools)

---

## 🆚 Differences from Production

| Feature | QA (n8n-integration) | Production |
|---------|----------------------|------------|
| **Branch** | `feature/n8n-jsonrpc-support` | `main` |
| **Domain** | elegant-success-n8n-integration | jira-qmetry-mcp-production |
| **Purpose** | Testing N8N integration | Stable production use |
| **API Style** | JSON-RPC 2.0 only | May have legacy endpoints |
| **Changes** | Latest features | Stable releases |

---

## ⚠️ Important Notes

1. **This is a QA environment** - Use for testing only
2. **Branch tracking** - Automatically deploys from `feature/n8n-jsonrpc-support`
3. **Breaking changes** - Legacy REST endpoints have been removed
4. **Migration path** - After successful testing, merge to `main` for production

---

## 🚀 Deployment Info

- **Platform**: Railway
- **Region**: us-east4
- **Builder**: Railpack 0.9.1
- **Runtime**: Node.js 22.20.0
- **Package Manager**: npm 10.9.3
- **Start Command**: `npm run start:sse`
- **Healthcheck Path**: `/health`
- **Restart Policy**: ON_FAILURE (max 10 retries)

---

## 🐛 Troubleshooting

### Issue: N8N can't connect
**Solution:** Verify the URL includes `/message` at the end

### Issue: Tools not showing up
**Solution:** Send a `tools/list` request and verify response

### Issue: Tool execution fails
**Solution:** Check that `QMETRY_API_KEY` is configured in Railway environment variables

### Issue: Timeout errors
**Solution:** 
1. Check Railway deployment status
2. Verify `/health` endpoint responds
3. Check Railway logs for errors

---

## 📝 Next Steps

1. ✅ Test all 47 tools individually in N8N
2. ✅ Verify error handling
3. ✅ Test concurrent requests
4. ✅ Monitor performance
5. ⏳ Create PR to merge to `main`
6. ⏳ Deploy to production

---

## 📚 Related Documentation

- [N8N Integration Guide](./N8N-INTEGRATION.md)
- [Main README](./README.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

## 📞 Support

For issues or questions:
1. Check Railway logs: `railway logs --service elegant-success --environment n8n-integration`
2. Review GitHub issues
3. Contact: Alberto Zapata (@albertor03)

---

**Last Updated:** 2025-10-17  
**Status:** ✅ Active and Ready for Testing

