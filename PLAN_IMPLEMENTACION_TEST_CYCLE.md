# Plan de Implementación: Test Cycle Tools

## Descripción General

Este documento describe el plan de implementación para agregar funcionalidad de gestión de ciclos de prueba (Test Cycles) al proyecto Jira QMetry MCP.

## Objetivo

Implementar herramientas para crear, buscar, actualizar y gestionar ciclos de prueba en QMetry, siguiendo la estructura y patrones existentes en el proyecto.

---

## 1. Análisis de Campos Requeridos

Según la documentación de la API de QMetry, los campos para crear un Test Cycle son:

### Campos Obligatorios

- `summary` (string): Test Cycle Summary
- `projectId` (number): Refer id from response of API "Get Qmetry enabled projects"

### Campos Opcionales

- `folderId` (number): Refer id from response of API "Get Test Cycle folders"
- `priority` (number): Priority Id, refer id from response of API "Get priorities"
- `status` (number): Status Id, refer id from response of API "Get Test Cycle Status"
- `reporter` (number): Pass Jira user account uuid to assign reporter to test cycle
- `labels` (array): List of label Ids, can be fetched from API "Get Labels"
- `testCasesToLink` (string): Either list of test case Ids or search filter query
- `description` (string): Test Plan description
- `plannedStartDate` (string): Enter in format 'dd/MMM/yyyy HH:mm'
- `plannedEndDate` (string): Enter in format 'dd/MMM/yyyy HH:mm'
- `actualTime` (number): Enter value in miliseconds
- `isAutomated` (boolean): Whether testcycle is automated or not - true or false
- `assignee` (number): Pass Jira user account uuid to assign test cycle to user

---

## 2. Estructura de Archivos a Crear

### 2.1 Interface (`src/interfaces/qmetry-test-cycles.ts`)

**Propósito**: Definir los tipos TypeScript para las operaciones de Test Cycles.

**Interfaces a crear**:

```typescript
// Parámetros para buscar/listar test cycles
export interface SearchTestCyclesParams {
  filter: {
    projectId?: string;
    folderId?: number;
    summary?: string;
    status?: string[];
    priority?: string;
    assignee?: string;
    reporter?: string;
    labels?: string[];
    createdBy?: string[];
    createdOn?: string;
    updatedBy?: string[];
    updatedOn?: string;
    plannedStartDate?: string;
    plannedEndDate?: string;
  };
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
}

// Parámetros para crear un test cycle
export interface CreateTestCycleParams {
  summary: string;
  projectId: string;
  folderId?: number;
  priority?: number;
  status?: number;
  reporter?: number;
  labels?: number[];
  testCasesToLink?: string;
  description?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  actualTime?: number;
  isAutomated?: boolean;
  assignee?: number;
}

// Parámetros para actualizar un test cycle
export interface UpdateTestCycleParams {
  summary: string;
  projectId: string;
  folderId?: number;
  priority?: number;
  status?: number;
  reporter?: number;
  labels?: number[];
  testCasesToLink?: string;
  description?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  actualTime?: number;
  isAutomated?: boolean;
  assignee?: number;
}

// Parámetros para mover test cycles
export interface MoveTestCycleParams {
  testcycleIds: string[];
  targetFolderId: number;
  projectId: number;
}

// Parámetros para vincular/desvincular test cases
export interface LinkTestCaseParams {
  id: string;
  testCases?: string[];
  sort?: string;
}

// Parámetros para desvincular test cases
export interface UnlinkTestCaseParams {
  id: string;
  testCases?: string[];
  unlinkAll?: boolean;
}

// Parámetros para obtener test plans vinculados
export interface GetLinkedTestPlansParams {
  id: string;
  startAt?: number;
  maxResults?: number;
  fields?: string;
  sort?: string;
}

// Parámetros para vincular/desvincular test plans
export interface LinkTestPlanParams {
  id: string;
  testPlanIds?: string[];
}

// Parámetros para desvincular test plans
export interface UnlinkTestPlanParams {
  id: string;
  testPlanIds?: string[];
  isUnlinkAll?: boolean;
}

// Parámetros para obtener requirements vinculados
export interface GetLinkedRequirementsParams {
  id: string;
  startAt?: number;
  maxResults?: number;
  sort?: string;
}

// Parámetros para vincular requirements
export interface LinkRequirementsParams {
  id: string;
  requirementIds?: number[];
}

// Parámetros para desvincular requirements
export interface UnlinkRequirementsParams {
  id: string;
  requirementIds?: number[];
  unLinkAll?: boolean;
}

// Parámetros para sincronizar test cases vinculados
export interface SyncLinkedTestCasesParams {
  id: string;
  addOnly?: boolean;
  rebuild?: boolean;
}

// Parámetros para archivar/desarchivar test cycle
export interface ArchiveTestCycleParams {
  idOrKey: string;
}
```

**Dependencias**: Ninguna adicional

---

### 2.2 API Layer (`src/api/qmetry-test-cycles.ts`)

**Propósito**: Implementar las llamadas HTTP a la API de QMetry para operaciones de Test Cycles.

**Funciones a implementar**:

#### Operaciones CRUD Básicas

1. **`getQmetryTestCycles(params: SearchTestCyclesParams)`**
   - Método: POST
   - Endpoint: `/testcycles/search/`
   - Descripción: Buscar y listar test cycles según filtros

2. **`createQmetryTestCycle(testCycle: CreateTestCycleParams)`**
   - Método: POST
   - Endpoint: `/testcycles/`
   - Descripción: Crear un nuevo test cycle
   - Nota: Usar `cleanObject()` para remover campos vacíos

3. **`updateQmetryTestCycle(params: UpdateTestCycleParams)`**
   - Método: PUT
   - Endpoint: `/testcycles/{id}`
   - Descripción: Actualizar un test cycle existente
   - Nota: Manejar respuestas vacías (204 No Content)

4. **`moveQmetryTestCycle(params: MoveTestCycleParams)`**
   - Método: PUT
   - Endpoint: `/testcycles/move`
   - Descripción: Mover test cycles a otra carpeta

#### Gestión de Test Cases

5. **`linkTestCaseToTestCycle(params: LinkTestCaseParams)`**
   - Método: POST
   - Endpoint: `/testcycles/{id}/testcases`
   - Descripción: Vincular test cases a un test cycle
   - Nota: Requiere `testCases` o `filter`

6. **`unlinkTestCaseFromTestCycle(params: UnlinkTestCaseParams)`**
   - Método: DELETE
   - Endpoint: `/testcycles/{id}/testcases`
   - Descripción: Desvincular test cases de un test cycle
   - Nota: Puede desvincular todos con `unlinkAll: true`

7. **`syncLinkedTestCases(params: SyncLinkedTestCasesParams)`**
   - Método: POST
   - Endpoint: `/testcycles/{id}/testcases/sync`
   - Descripción: Sincronizar test cases vinculados con requirements

#### Gestión de Test Plans

8. **`getLinkedTestPlans(params: GetLinkedTestPlansParams)`**
   - Método: POST
   - Endpoint: `/testcycles/{id}/testplans`
   - Descripción: Obtener test plans vinculados a un test cycle

9. **`linkTestPlanToTestCycle(params: LinkTestPlanParams)`**
   - Método: PUT
   - Endpoint: `/testcycles/{id}/testplans`
   - Descripción: Vincular test plans a un test cycle

10. **`unlinkTestPlanFromTestCycle(params: UnlinkTestPlanParams)`**
    - Método: DELETE
    - Endpoint: `/testcycles/{id}/testplans`
    - Descripción: Desvincular test plans de un test cycle

#### Gestión de Requirements

11. **`getLinkedRequirements(params: GetLinkedRequirementsParams)`**
    - Método: GET
    - Endpoint: `/testcycles/{id}/requirements`
    - Descripción: Obtener requirements vinculados a un test cycle

12. **`linkRequirementsToTestCycle(params: LinkRequirementsParams)`**
    - Método: POST
    - Endpoint: `/testcycles/{id}/requirements/link`
    - Descripción: Vincular requirements a un test cycle

13. **`unlinkRequirementsFromTestCycle(params: UnlinkRequirementsParams)`**
    - Método: POST
    - Endpoint: `/testcycles/{id}/requirements/unlink`
    - Descripción: Desvincular requirements de un test cycle

#### Operaciones de Archivo

14. **`archiveTestCycle(params: ArchiveTestCycleParams)`**
    - Método: PUT
    - Endpoint: `/testcycles/{idOrKey}/archive`
    - Descripción: Archivar un test cycle

15. **`unarchiveTestCycle(params: ArchiveTestCycleParams)`**
    - Método: PUT
    - Endpoint: `/testcycles/{idOrKey}/unarchive`
    - Descripción: Desarchivar un test cycle

**Dependencias**:

- `node-fetch`
- `../utils/object.utils.js` (cleanObject)
- `../interfaces/qmetry-test-cycles.js`
- `config.json` (qmetry_api_url)
- Variable de entorno: `QMETRY_API_KEY`

**Patrón de implementación**:

```typescript
import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanObject } from '../utils/object.utils.js';
import { dirname } from 'path';
import {
  SearchTestCyclesParams,
  CreateTestCycleParams,
  UpdateTestCycleParams,
  MoveTestCycleParams,
  LinkTestCaseParams,
  UnlinkTestCaseParams,
  GetLinkedTestPlansParams,
  LinkTestPlanParams,
  UnlinkTestPlanParams,
  GetLinkedRequirementsParams,
  LinkRequirementsParams,
  UnlinkRequirementsParams,
  SyncLinkedTestCasesParams,
  ArchiveTestCycleParams,
} from '../interfaces/qmetry-test-cycles.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Read config file
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const qmetry_api_url = config.qmetry_api_url;

// Implementar funciones...
```

---

### 2.3 Tools Layer (`src/tools/test-cycle-tools.ts`)

**Propósito**: Definir las herramientas MCP que exponen las funcionalidades de Test Cycles.

**Tools a implementar**:

#### Operaciones CRUD Básicas

1. **`get-qmetry-test-cycles`**
   - Handler: `getQmetryTestCycles()`
   - Descripción: "Search Qmetry test cycles"
   - Input Schema: Basado en `SearchTestCyclesParams`

2. **`create-qmetry-test-cycle`**
   - Handler: `createQmetryTestCycle()`
   - Descripción: "Create a Qmetry test cycle"
   - Input Schema: Basado en `CreateTestCycleParams`

3. **`update-qmetry-test-cycle`**
   - Handler: `updateQmetryTestCycle()`
   - Descripción: "Update a Qmetry test cycle"
   - Input Schema: Basado en `UpdateTestCycleParams`

4. **`move-qmetry-test-cycle`**
   - Handler: `moveQmetryTestCycle()`
   - Descripción: "Move Qmetry test cycles to a different folder"
   - Input Schema: Basado en `MoveTestCycleParams`

#### Gestión de Test Cases

5. **`link-test-case-to-test-cycle`**
   - Handler: `linkTestCaseToTestCycle()`
   - Descripción: "Link test cases to a test cycle"
   - Input Schema: Basado en `LinkTestCaseParams`

6. **`unlink-test-case-from-test-cycle`**
   - Handler: `unlinkTestCaseFromTestCycle()`
   - Descripción: "Unlink test cases from a test cycle"
   - Input Schema: Basado en `UnlinkTestCaseParams`

7. **`sync-linked-test-cases-with-test-cycle`**
   - Handler: `syncLinkedTestCases()`
   - Descripción: "Sync linked test cases of requirement with test cycle"
   - Input Schema: Basado en `SyncLinkedTestCasesParams`

#### Gestión de Test Plans

8. **`get-linked-test-plans-from-test-cycle`**
   - Handler: `getLinkedTestPlans()`
   - Descripción: "Get linked test plans for a test cycle"
   - Input Schema: Basado en `GetLinkedTestPlansParams`

9. **`link-test-plan-to-test-cycle`**
   - Handler: `linkTestPlanToTestCycle()`
   - Descripción: "Link test plans to a test cycle"
   - Input Schema: Basado en `LinkTestPlanParams`

10. **`unlink-test-plan-from-test-cycle`**
    - Handler: `unlinkTestPlanFromTestCycle()`
    - Descripción: "Unlink test plans from a test cycle"
    - Input Schema: Basado en `UnlinkTestPlanParams`

#### Gestión de Requirements

11. **`get-linked-requirements-from-test-cycle`**
    - Handler: `getLinkedRequirements()`
    - Descripción: "Get linked requirements for a test cycle"
    - Input Schema: Basado en `GetLinkedRequirementsParams`

12. **`link-requirements-to-test-cycle`**
    - Handler: `linkRequirementsToTestCycle()`
    - Descripción: "Link requirements to a test cycle"
    - Input Schema: Basado en `LinkRequirementsParams`

13. **`unlink-requirements-from-test-cycle`**
    - Handler: `unlinkRequirementsFromTestCycle()`
    - Descripción: "Unlink requirements from a test cycle"
    - Input Schema: Basado en `UnlinkRequirementsParams`

#### Operaciones de Archivo

14. **`archive-qmetry-test-cycle`**
    - Handler: `archiveTestCycle()`
    - Descripción: "Archive a Qmetry test cycle"
    - Input Schema: Basado en `ArchiveTestCycleParams`

15. **`unarchive-qmetry-test-cycle`**
    - Handler: `unarchiveTestCycle()`
    - Descripción: "Unarchive a Qmetry test cycle"
    - Input Schema: Basado en `ArchiveTestCycleParams`

**Dependencias**:

- `zod` (para validación de schemas)
- `../interfaces/index.js` (ToolDefinition)
- `../api/qmetry-test-cycles.js` (funciones API)
- `../interfaces/qmetry-test-cycles.js` (tipos)

**Estructura**:

```typescript
import { z } from 'zod';
import { ToolDefinition } from '../interfaces/index.js';
import {
  getQmetryTestCycles,
  createQmetryTestCycle,
  updateQmetryTestCycle,
  moveQmetryTestCycle,
  linkTestCaseToTestCycle,
  unlinkTestCaseFromTestCycle,
  syncLinkedTestCases,
  getLinkedTestPlans,
  linkTestPlanToTestCycle,
  unlinkTestPlanFromTestCycle,
  getLinkedRequirements,
  linkRequirementsToTestCycle,
  unlinkRequirementsFromTestCycle,
  archiveTestCycle,
  unarchiveTestCycle,
} from '../api/qmetry-test-cycles.js';
import {
  SearchTestCyclesParams,
  CreateTestCycleParams,
  UpdateTestCycleParams,
  MoveTestCycleParams,
  LinkTestCaseParams,
  UnlinkTestCaseParams,
  SyncLinkedTestCasesParams,
  GetLinkedTestPlansParams,
  LinkTestPlanParams,
  UnlinkTestPlanParams,
  GetLinkedRequirementsParams,
  LinkRequirementsParams,
  UnlinkRequirementsParams,
  ArchiveTestCycleParams,
} from '../interfaces/qmetry-test-cycles.js';

export const testCycleTools: Array<ToolDefinition> = [
  // Definir 15 tools...
];
```

---

### 2.4 Registro en Main (`src/main.ts`)

**Cambios requeridos**:

1. **Importar el nuevo módulo** (línea ~11):

```typescript
import { testCycleTools } from './tools/test-cycle-tools.js';
```

2. **Registrar las tools** (línea ~63-76):

```typescript
registerTools(server, [
  ...projectTools,
  ...testCaseFolderTools,
  ...testCycleFolderTools,
  ...testPlanFolderTools,
  ...testCasesTools,
  ...testCycleTools, // ← AGREGAR AQUÍ
  ...testStepTools,
  ...priorityTools,
  ...labelTools,
  ...testCaseStatusTools,
  ...testCycleStatusTools,
  ...testPlanStatusTools,
  ...linkedRequirementsTools,
]);
```

---

### 2.5 Registro en HTTP Server (`src/http-server.ts`)

**Cambios requeridos**:

1. **Importar el nuevo módulo** (línea ~11):

```typescript
import { testCycleTools } from './tools/test-cycle-tools.js';
```

2. **Registrar las tools** (línea ~135-148):

```typescript
registerTools(server, [
  ...projectTools,
  ...testCaseFolderTools,
  ...testCycleFolderTools,
  ...testPlanFolderTools,
  ...testCasesTools,
  ...testCycleTools, // ← AGREGAR AQUÍ
  ...testStepTools,
  ...priorityTools,
  ...labelTools,
  ...testCaseStatusTools,
  ...testCycleStatusTools,
  ...testPlanStatusTools,
  ...linkedRequirementsTools,
]);
```

---

## 3. Orden de Implementación

### Fase 1: Interfaces

1. Crear archivo `src/interfaces/qmetry-test-cycles.ts`
2. Definir todas las interfaces necesarias
3. Exportar las interfaces en `src/interfaces/index.ts` (si es necesario)

### Fase 2: API Layer

1. Crear archivo `src/api/qmetry-test-cycles.ts`
2. **Operaciones CRUD Básicas**:
   - Implementar `getQmetryTestCycles()`
   - Implementar `createQmetryTestCycle()`
   - Implementar `updateQmetryTestCycle()`
   - Implementar `moveQmetryTestCycle()`
3. **Gestión de Test Cases**:
   - Implementar `linkTestCaseToTestCycle()`
   - Implementar `unlinkTestCaseFromTestCycle()`
   - Implementar `syncLinkedTestCases()`
4. **Gestión de Test Plans**:
   - Implementar `getLinkedTestPlans()`
   - Implementar `linkTestPlanToTestCycle()`
   - Implementar `unlinkTestPlanFromTestCycle()`
5. **Gestión de Requirements**:
   - Implementar `getLinkedRequirements()`
   - Implementar `linkRequirementsToTestCycle()`
   - Implementar `unlinkRequirementsFromTestCycle()`
6. **Operaciones de Archivo**:
   - Implementar `archiveTestCycle()`
   - Implementar `unarchiveTestCycle()`
7. Agregar manejo de errores y logging apropiado

### Fase 3: Tools Layer

1. Crear archivo `src/tools/test-cycle-tools.ts`
2. **Operaciones CRUD Básicas** (4 tools):
   - Implementar tool `get-qmetry-test-cycles`
   - Implementar tool `create-qmetry-test-cycle`
   - Implementar tool `update-qmetry-test-cycle`
   - Implementar tool `move-qmetry-test-cycle`
3. **Gestión de Test Cases** (3 tools):
   - Implementar tool `link-test-case-to-test-cycle`
   - Implementar tool `unlink-test-case-from-test-cycle`
   - Implementar tool `sync-linked-test-cases-with-test-cycle`
4. **Gestión de Test Plans** (3 tools):
   - Implementar tool `get-linked-test-plans-from-test-cycle`
   - Implementar tool `link-test-plan-to-test-cycle`
   - Implementar tool `unlink-test-plan-from-test-cycle`
5. **Gestión de Requirements** (3 tools):
   - Implementar tool `get-linked-requirements-from-test-cycle`
   - Implementar tool `link-requirements-to-test-cycle`
   - Implementar tool `unlink-requirements-from-test-cycle`
6. **Operaciones de Archivo** (2 tools):
   - Implementar tool `archive-qmetry-test-cycle`
   - Implementar tool `unarchive-qmetry-test-cycle`
7. Definir schemas de validación con Zod para todas las tools (Total: 15 tools)

### Fase 4: Registro

1. Actualizar `src/main.ts` para importar y registrar `testCycleTools`
2. Actualizar `src/http-server.ts` para importar y registrar `testCycleTools`

### Fase 5: Compilación y Pruebas

1. Compilar TypeScript: `pnpm run build`
2. Verificar que no hay errores de compilación
3. Probar cada endpoint con datos de prueba
4. Validar respuestas de la API

---

## 4. Consideraciones Técnicas

### 4.1 Validación de Datos

- Usar `cleanObject()` para remover campos vacíos antes de enviar a la API
- Validar campos requeridos con Zod schemas
- Manejar conversiones de tipos (string ↔ number) según necesidad de la API

### 4.2 Manejo de Errores

- Capturar y formatear errores de la API de QMetry
- Incluir el request body en mensajes de error para debugging
- Escribir errores a `stderr` para no interferir con el protocolo MCP

### 4.3 Formato de Fechas

- Las fechas deben estar en formato: `'dd/MMM/yyyy HH:mm'`
- Ejemplo: `'18/Oct/2025 14:30'`
- Validar formato antes de enviar a la API

### 4.4 Respuestas Vacías

- Algunas operaciones PUT pueden retornar 204 No Content
- Manejar respuestas vacías retornando un objeto de éxito:

```typescript
{
  success: true,
  message: 'Test cycle updated successfully'
}
```

### 4.5 Paginación

- Implementar soporte para `maxResults` y `startAt`
- Documentar límites de la API en las descripciones de las tools

---

## 5. Endpoints de la API QMetry

### Operaciones CRUD Básicas

| Operación  | Método | Endpoint              | Descripción                      |
| ---------- | ------ | --------------------- | -------------------------------- |
| Buscar     | POST   | `/testcycles/search/` | Buscar test cycles con filtros   |
| Crear      | POST   | `/testcycles/`        | Crear nuevo test cycle           |
| Actualizar | PUT    | `/testcycles/{id}`    | Actualizar test cycle existente  |
| Mover      | PUT    | `/testcycles/move`    | Mover test cycles a otra carpeta |

### Gestión de Test Cases

| Operación   | Método | Endpoint                          | Descripción                                        |
| ----------- | ------ | --------------------------------- | -------------------------------------------------- |
| Vincular    | POST   | `/testcycles/{id}/testcases`      | Vincular test cases a un test cycle                |
| Desvincular | DELETE | `/testcycles/{id}/testcases`      | Desvincular test cases de un test cycle            |
| Sincronizar | POST   | `/testcycles/{id}/testcases/sync` | Sincronizar test cases vinculados con requirements |

### Gestión de Test Plans

| Operación   | Método | Endpoint                     | Descripción                             |
| ----------- | ------ | ---------------------------- | --------------------------------------- |
| Obtener     | POST   | `/testcycles/{id}/testplans` | Obtener test plans vinculados           |
| Vincular    | PUT    | `/testcycles/{id}/testplans` | Vincular test plans a un test cycle     |
| Desvincular | DELETE | `/testcycles/{id}/testplans` | Desvincular test plans de un test cycle |

### Gestión de Requirements

| Operación   | Método | Endpoint                        | Descripción                               |
| ----------- | ------ | ------------------------------- | ----------------------------------------- |
| Obtener     | GET    | `/testcycles/{id}/requirements` | Obtener requirements vinculados           |
| Vincular    | POST   | `/testcycles/{id}/requirements` | Vincular requirements a un test cycle     |
| Desvincular | DELETE | `/testcycles/{id}/requirements` | Desvincular requirements de un test cycle |

### Operaciones de Archivo

| Operación   | Método | Endpoint                          | Descripción               |
| ----------- | ------ | --------------------------------- | ------------------------- |
| Archivar    | PUT    | `/testcycles/{idOrKey}/archive`   | Archivar un test cycle    |
| Desarchivar | PUT    | `/testcycles/{idOrKey}/unarchive` | Desarchivar un test cycle |

---

## 6. Dependencias Existentes

No se requieren nuevas dependencias. El proyecto ya tiene:

- ✅ `node-fetch` - Para llamadas HTTP
- ✅ `zod` - Para validación de schemas
- ✅ `@modelcontextprotocol/sdk` - Para MCP server
- ✅ `express` - Para HTTP server
- ✅ Utilidades existentes (`cleanObject`, logger, etc.)

---

## 7. Testing y Validación

### 7.1 Pruebas Manuales

#### Operaciones CRUD Básicas

1. **Health Check**: Verificar que las 15 tools aparecen en `/health`
2. **Get Test Cycles**: Buscar test cycles existentes con filtros
3. **Create Test Cycle**: Crear un test cycle de prueba
4. **Update Test Cycle**: Actualizar el test cycle creado
5. **Move Test Cycle**: Mover test cycles a otra carpeta

#### Gestión de Test Cases

6. **Link Test Cases**: Vincular test cases al test cycle
7. **Unlink Test Cases**: Desvincular test cases del test cycle
8. **Sync Test Cases**: Sincronizar test cases vinculados

#### Gestión de Test Plans

9. **Get Linked Test Plans**: Obtener test plans vinculados
10. **Link Test Plans**: Vincular test plans al test cycle
11. **Unlink Test Plans**: Desvincular test plans del test cycle

#### Gestión de Requirements

12. **Get Linked Requirements**: Obtener requirements vinculados
13. **Link Requirements**: Vincular requirements al test cycle
14. **Unlink Requirements**: Desvincular requirements del test cycle

#### Operaciones de Archivo

15. **Archive Test Cycle**: Archivar el test cycle
16. **Unarchive Test Cycle**: Desarchivar el test cycle

### 7.2 Validaciones

- ✅ Compilación TypeScript sin errores
- ✅ Tools registradas correctamente en MCP server
- ✅ Endpoints HTTP responden correctamente
- ✅ Manejo apropiado de errores de API
- ✅ Validación de campos requeridos
- ✅ Formato correcto de fechas

---

## 8. Checklist de Implementación

- [ ] **Fase 1: Interfaces**
  - [ ] Crear `src/interfaces/qmetry-test-cycles.ts`
  - [ ] Definir `SearchTestCyclesParams`
  - [ ] Definir `CreateTestCycleParams`
  - [ ] Definir `UpdateTestCycleParams`
  - [ ] Definir `MoveTestCycleParams`
  - [ ] Definir `LinkTestCaseParams`
  - [ ] Definir `UnlinkTestCaseParams`
  - [ ] Definir `SyncLinkedTestCasesParams`
  - [ ] Definir `GetLinkedTestPlansParams`
  - [ ] Definir `LinkTestPlanParams`
  - [ ] Definir `UnlinkTestPlanParams`
  - [ ] Definir `GetLinkedRequirementsParams`
  - [ ] Definir `LinkRequirementsParams`
  - [ ] Definir `UnlinkRequirementsParams`
  - [ ] Definir `ArchiveTestCycleParams`

- [ ] **Fase 2: API Layer**
  - [ ] Crear `src/api/qmetry-test-cycles.ts`
  - [ ] **CRUD Básico (4 funciones)**
    - [ ] Implementar `getQmetryTestCycles()`
    - [ ] Implementar `createQmetryTestCycle()`
    - [ ] Implementar `updateQmetryTestCycle()`
    - [ ] Implementar `moveQmetryTestCycle()`
  - [ ] **Test Cases (3 funciones)**
    - [ ] Implementar `linkTestCaseToTestCycle()`
    - [ ] Implementar `unlinkTestCaseFromTestCycle()`
    - [ ] Implementar `syncLinkedTestCases()`
  - [ ] **Test Plans (3 funciones)**
    - [ ] Implementar `getLinkedTestPlans()`
    - [ ] Implementar `linkTestPlanToTestCycle()`
    - [ ] Implementar `unlinkTestPlanFromTestCycle()`
  - [ ] **Requirements (3 funciones)**
    - [ ] Implementar `getLinkedRequirements()`
    - [ ] Implementar `linkRequirementsToTestCycle()`
    - [ ] Implementar `unlinkRequirementsFromTestCycle()`
  - [ ] **Archivo (2 funciones)**
    - [ ] Implementar `archiveTestCycle()`
    - [ ] Implementar `unarchiveTestCycle()`

- [ ] **Fase 3: Tools Layer**
  - [ ] Crear `src/tools/test-cycle-tools.ts`
  - [ ] **CRUD Básico (4 tools)**
    - [ ] Implementar tool `get-qmetry-test-cycles`
    - [ ] Implementar tool `create-qmetry-test-cycle`
    - [ ] Implementar tool `update-qmetry-test-cycle`
    - [ ] Implementar tool `move-qmetry-test-cycle`
  - [ ] **Test Cases (3 tools)**
    - [ ] Implementar tool `link-test-case-to-test-cycle`
    - [ ] Implementar tool `unlink-test-case-from-test-cycle`
    - [ ] Implementar tool `sync-linked-test-cases-with-test-cycle`
  - [ ] **Test Plans (3 tools)**
    - [ ] Implementar tool `get-linked-test-plans-from-test-cycle`
    - [ ] Implementar tool `link-test-plan-to-test-cycle`
    - [ ] Implementar tool `unlink-test-plan-from-test-cycle`
  - [ ] **Requirements (3 tools)**
    - [ ] Implementar tool `get-linked-requirements-from-test-cycle`
    - [ ] Implementar tool `link-requirements-to-test-cycle`
    - [ ] Implementar tool `unlink-requirements-from-test-cycle`
  - [ ] **Archivo (2 tools)**
    - [ ] Implementar tool `archive-qmetry-test-cycle`
    - [ ] Implementar tool `unarchive-qmetry-test-cycle`

- [ ] **Fase 4: Registro**
  - [ ] Actualizar `src/main.ts`
  - [ ] Actualizar `src/http-server.ts`

- [ ] **Fase 5: Compilación y Pruebas**
  - [ ] Ejecutar `pnpm run build`
  - [ ] Verificar compilación exitosa
  - [ ] Probar cada tool manualmente (15 tools)
  - [ ] Validar respuestas de API

---

## 9. Ejemplos de Uso

### Crear un Test Cycle

```json
{
  "summary": "Sprint 10 Regression Tests",
  "projectId": "12345",
  "folderId": "67890",
  "description": "Regression testing for Sprint 10 release",
  "plannedStartDate": "18/Oct/2025 09:00",
  "plannedEndDate": "25/Oct/2025 17:00",
  "status": 1,
  "priority": 2,
  "assignee": 123456,
  "isAutomated": false,
  "testCasesToLink": "TC-001,TC-002,TC-003"
}
```

### Buscar Test Cycles

```json
{
  "filter": {
    "projectId": 12345,
    "status": ["Open", "In Progress"],
    "plannedStartDate": "01/Oct/2025 00:00,31/Oct/2025 23:59"
  },
  "maxResults": 50,
  "startAt": 0,
  "sort": "key:asc"
}
```

### Actualizar un Test Cycle

```json
{
  "id": "TC-123",
  "summary": "Sprint 10 Regression Tests - Updated",
  "status": 2,
  "priority": 1,
  "plannedEndDate": "26/Oct/2025 17:00"
}
```

### Vincular Test Cases a un Test Cycle

```json
{
  "id": "TC-123",
  "testCases": ["10001", "10002", "10003"]
}
```

### Vincular Requirements a un Test Cycle

```json
{
  "id": "TC-123",
  "requirementIds": [5001, 5002, 5003]
}
```

### Archivar un Test Cycle

```json
{
  "idOrKey": "TC-123"
}
```

---

## 10. Referencias

- **Documentación QMetry API**: [QMetry API Docs](https://api.qmetry.com/)
- **Patrón de implementación**: Basado en `test-cases-tools.ts`
- **Estructura del proyecto**: Ver `project_layout` en el workspace
- **Configuración**: `src/config.json`

---

## 11. Resumen Ejecutivo

### Alcance del Proyecto

Este plan de implementación cubre la creación completa de herramientas para gestionar **Test Cycles** en QMetry, incluyendo:

- **15 herramientas MCP** distribuidas en 5 categorías
- **15 funciones API** para interactuar con QMetry
- **10 interfaces TypeScript** para tipado fuerte
- **5 categorías funcionales**: CRUD, Test Cases, Test Plans, Requirements, Archivo

### Estadísticas

- **Total de archivos a crear**: 3 archivos nuevos
- **Total de archivos a modificar**: 2 archivos existentes
- **Total de funciones API**: 15 funciones
- **Total de herramientas MCP**: 15 tools
- **Total de interfaces**: 10 interfaces
- **Tiempo estimado**: 4-6 horas de desarrollo + 2-3 horas de testing

### Categorías de Herramientas

1. **CRUD Básico** (4 tools): Crear, buscar, actualizar y mover test cycles
2. **Test Cases** (3 tools): Vincular, desvincular y sincronizar test cases
3. **Test Plans** (3 tools): Obtener, vincular y desvincular test plans
4. **Requirements** (3 tools): Obtener, vincular y desvincular requirements
5. **Archivo** (2 tools): Archivar y desarchivar test cycles

### Beneficios

- ✅ Gestión completa del ciclo de vida de test cycles
- ✅ Integración con test cases, test plans y requirements
- ✅ Operaciones de archivo para mantener organización
- ✅ Validación de datos con Zod
- ✅ Manejo robusto de errores
- ✅ Consistencia con el patrón existente del proyecto

---

## Notas Adicionales

1. **Consistencia**: Seguir el mismo patrón de implementación que `test-cases-tools.ts`
2. **Nomenclatura**: Usar nombres descriptivos y consistentes con el resto del proyecto
3. **Documentación**: Agregar JSDoc comments a todas las funciones e interfaces
4. **Manejo de tipos**: Los campos numéricos (priority, status, assignee, reporter, components, labels) deben ser `number`, no `string`
5. **Logging**: Usar `process.stderr.write()` para logs, no `console.log()`
6. **Validación**: El campo `filter` en SearchTestCyclesParams debe ser un objeto anidado
7. **Endpoints**: Algunos endpoints usan `{id}` y otros `{idOrKey}` - verificar documentación

---

**Fecha de creación**: 18 de Octubre, 2025  
**Versión**: 2.0  
**Estado**: Actualizado con todas las herramientas adicionales  
**Última actualización**: 18 de Octubre, 2025
