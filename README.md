# Proyecto de Protocolo de Contexto de Modelo (MCP) para QMetry

Este proyecto implementa un Protocolo de Contexto de Modelo (MCP) diseñado para interactuar con la API de QMetry para Jira. Permite que los modelos de lenguaje grandes (LLM) o cualquier aplicación cliente accedan a funcionalidades de QMetry a través de un conjunto de herramientas bien definidas.

## Configuración de Desarrollo

### ESLint y Prettier

Este proyecto está configurado con ESLint y Prettier para mantener un código consistente y de alta calidad.

#### Scripts Disponibles

```bash
# Ejecutar el linter para verificar problemas
pnpm lint

# Ejecutar el linter y arreglar automáticamente los problemas
pnpm lint:fix

# Formatear el código con Prettier
pnpm format

# Verificar si el código está formateado correctamente
pnpm format:check
```

#### Configuración del Editor

El proyecto incluye configuraciones de VS Code para:

- Formateo automático al guardar
- Corrección automática de problemas de ESLint
- Validación de TypeScript

Asegúrate de tener instaladas las siguientes extensiones de VS Code:

- Prettier - Code formatter
- ESLint
- TypeScript and JavaScript Language Features

## Estructura del Proyecto

El proyecto está organizado en los siguientes componentes principales:

- **`src/`**: Contiene la implementación del servidor MCP.
  - **`src/main.ts`**: El punto de entrada principal del servidor MCP, donde se inicializa el servidor y se registran las herramientas.
  - **`src/tools/`**: Contiene los módulos TypeScript que implementan las herramientas específicas para interactuar con la API de QMetry.
- **`config.json`**: Archivo de configuración para la URL base de la API de QMetry (ubicado en la raíz del proyecto).

## Configuración

Antes de iniciar la aplicación, asegúrate de configurar lo siguiente:

### 1. Variable de Entorno

- `QMETRY_API_KEY`: Tu clave de API para la autenticación con QMetry. Esta clave debe generarse desde la interfaz de Jira (QMetry > Configuration > Open API > Generate).

```bash
export QMETRY_API_KEY="tu-clave-de-api-aqui"
```

### 2. Archivo de Configuración (`config.json`)

Verifica que la URL de la API de QMetry esté configurada correctamente en `config.json` (ubicado en la raíz del proyecto):

```json
{
  "qmetry_api_url": "https://qtmcloud.qmetry.com/rest/api/latest/"
}
```

## Cómo Empezar

### 1. Instalación de Dependencias

Para instalar las dependencias de cada componente, ejecuta `pnpm install` en sus respectivos directorios:

```bash
# En el directorio raíz del proyecto
pnpm install
```

### 2. Ejecución del Servidor MCP

Desde el directorio `src/`, inicia el servidor MCP. Asegúrate de que la variable de entorno `QMETRY_API_KEY` esté configurada.

```bash
cd src
pnpm start
# O para usar el inspector del SDK (si está configurado):
# npx tsx main.ts
```

## Herramientas MCP Disponibles

El servidor MCP expone las siguientes herramientas para interactuar con QMetry:

## 🎯 **Prioridades (NUEVO)**

- **Obtener prioridades**: Listar todas las prioridades de un proyecto
- **Crear prioridades**: Crear nuevas prioridades con nombre, descripción y color
- **Actualizar prioridades**: Modificar prioridades existentes
- **Eliminar prioridades**: Remover prioridades del proyecto
- **Buscar prioridades**: Encontrar prioridades por nombre
- **Gestión de colores**: Soporte para códigos de color hexadecimales
- **Prioridad por defecto**: Configurar prioridades predeterminadas
- **Ordenamiento**: Control del orden de visualización de prioridades

### `list-qmetry-projects`

Obtiene una lista de proyectos habilitados en QMetry, con opciones de filtrado y paginación.

- **Descripción:** Consulta la API de QMetry para obtener proyectos. Permite filtrar por nombre o clave del proyecto y controlar la paginación.
- **Parámetros:**
  - `projectName` (opcional, `string`): Nombre o clave del proyecto para filtrar la búsqueda.
  - `maxResults` (opcional, `number`): Número máximo de resultados a devolver (por defecto 50, máximo 100).
  - `startAt` (opcional, `number`): Índice inicial de los resultados (por defecto 0).

## 🎯 Herramientas de Prioridades

### `get_qmetry_priorities`

Obtiene todas las prioridades de un proyecto específico.

- **Descripción:** Lista todas las prioridades disponibles en un proyecto de QMetry.
- **Parámetros:**
  - `projectId` (requerido, `number`): ID del proyecto.

### `create_qmetry_priority`

Crea una nueva prioridad en el proyecto.

- **Descripción:** Permite crear prioridades personalizadas con nombre, descripción, color y configuración adicional.
- **Parámetros:**
  - `name` (requerido, `string`): Nombre de la prioridad (ej: "High", "Medium", "Low").
  - `description` (requerido, `string`): Descripción de la prioridad.
  - `color` (requerido, `string`): Código de color en formato hex (ej: "#FF0000").
  - `projectId` (requerido, `number`): ID del proyecto.
  - `iconUrl` (opcional, `string`): URL del icono de la prioridad.
  - `isDefault` (opcional, `boolean`): Si debe ser la prioridad por defecto.
  - `orderIndex` (opcional, `number`): Índice de orden para clasificación.

### `update_qmetry_priority`

Actualiza una prioridad existente.

- **Descripción:** Permite modificar los campos de una prioridad existente.
- **Parámetros:**
  - `priorityId` (requerido, `string`): ID de la prioridad a actualizar.
  - Todos los campos de `create_qmetry_priority` son opcionales para actualización.

### `delete_qmetry_priority`

Elimina una prioridad del proyecto.

- **Descripción:** Remueve permanentemente una prioridad del proyecto.
- **Parámetros:**
  - `priorityId` (requerido, `string`): ID de la prioridad a eliminar.
  - `projectId` (requerido, `number`): ID del proyecto.

### `search_qmetry_priorities`

Busca prioridades por nombre en un proyecto.

- **Descripción:** Encuentra prioridades que coincidan con un patrón de nombre específico.
- **Parámetros:**
  - `projectId` (requerido, `number`): ID del proyecto.
  - `priorityName` (requerido, `string`): Patrón de nombre a buscar.

> 📖 **Documentación Detallada**: Para más información sobre la gestión de prioridades, consulta [PRIORITIES_README.md](./PRIORITIES_README.md).

## 🧪 Herramientas de Test Steps

### `get-qmetry-test-steps`

Obtiene los pasos de prueba de un caso de prueba específico.

- **Descripción:** Lista todos los pasos de prueba asociados a un caso de prueba de QMetry, con opciones de filtrado, ordenamiento y paginación.
- **Parámetros:**
  - `id` (requerido, `string`): ID del caso de prueba (obtenido de la respuesta de la API "Search Test Case").
  - `no` (requerido, `number`): Número de versión del caso de prueba (obtenido de `{version.versionNo}` en la respuesta de la API "Search Test Case").
  - `maxResults` (opcional, `number`): Número máximo de resultados a devolver.
  - `sort` (opcional, `string`): Campo y orden de clasificación. Valores posibles: `stepDetails`, `testData`, `seqNo`, `expectedResult`. Formato: `campo:orden(asc/desc)`. Ejemplo: `seqNo:asc`.
  - `startAt` (opcional, `number`): Índice inicial para paginación.

### `create-qmetry-test-step`

Crea nuevos pasos de prueba para un caso de prueba.

- **Descripción:** Permite crear múltiples pasos de prueba con detalles, datos de prueba y resultados esperados.
- **Parámetros:**
  - `id` (requerido, `string`): ID del caso de prueba (obtenido de la respuesta de la API "Search Test Case").
  - `no` (requerido, `number`): Número de versión del caso de prueba.
  - `steps` (requerido, `array`): Array de objetos de pasos de prueba, cada uno con:
    - `stepDetails` (requerido, `string`): Detalles del paso de prueba.
    - `testData` (requerido, `string`): Datos de prueba para el paso.
    - `expectedResult` (requerido, `string`): Resultado esperado del paso.

### `update-qmetry-test-step`

Actualiza pasos de prueba existentes.

- **Descripción:** Permite modificar los detalles, datos de prueba y resultados esperados de pasos de prueba existentes.
- **Parámetros:**
  - `testCaseId` (requerido, `string`): ID del caso de prueba.
  - `no` (requerido, `number`): Número de versión del caso de prueba.
  - `steps` (requerido, `array`): Array de objetos de pasos de prueba a actualizar, cada uno con:
    - `id` (requerido, `number`): ID del paso de prueba (obtenido de la respuesta de la API "Get Test Steps").
    - `stepDetails` (requerido, `string`): Nuevos detalles del paso de prueba.
    - `testData` (requerido, `string`): Nuevos datos de prueba.
    - `expectedResult` (requerido, `string`): Nuevo resultado esperado.

### `delete-qmetry-test-step`

Elimina pasos de prueba de un caso de prueba.

- **Descripción:** Remueve permanentemente uno o más pasos de prueba de un caso de prueba específico.
- **Parámetros:**
  - `id` (requerido, `string`): ID del caso de prueba.
  - `no` (requerido, `number`): Número de versión del caso de prueba.
  - `stepIds` (requerido, `array`): Array de IDs de los pasos de prueba a eliminar (obtenidos de la respuesta de la API "Get Test Steps").

## 📋 Ejemplos de Uso

### Obtener pasos de prueba

```json
{
  "id": "test-case-123",
  "no": 1,
  "maxResults": 50,
  "sort": "seqNo:asc",
  "startAt": 0
}
```

### Crear pasos de prueba

```json
{
  "id": "test-case-123",
  "no": 1,
  "steps": [
    {
      "stepDetails": "Navegar a la página de login",
      "testData": "URL: https://example.com/login",
      "expectedResult": "La página de login se carga correctamente"
    },
    {
      "stepDetails": "Ingresar credenciales",
      "testData": "Usuario: test@example.com, Contraseña: password123",
      "expectedResult": "El usuario se autentica exitosamente"
    }
  ]
}
```

### Actualizar pasos de prueba

```json
{
  "testCaseId": "test-case-123",
  "no": 1,
  "steps": [
    {
      "id": 456,
      "stepDetails": "Navegar a la página de login actualizada",
      "testData": "URL: https://new-example.com/login",
      "expectedResult": "La página de login se carga correctamente"
    }
  ]
}
```

### Eliminar pasos de prueba

```json
{
  "id": "test-case-123",
  "no": 1,
  "stepIds": [456, 457]
}
```

## 🔧 Sistema de Logging

El proyecto incluye un sistema de logging robusto diseñado específicamente para servidores MCP que no interfiere con el protocolo JSON.

### Características del Logger

- **✅ Compatible con MCP**: Todos los logs van a stderr para no interferir con la comunicación JSON
- **✅ Estructurado**: Logs en formato JSON con timestamp y contexto
- **✅ Niveles de log**: debug, info, warn, error
- **✅ Contexto**: Incluye función/módulo donde ocurrió el evento
- **✅ Datos opcionales**: Soporte para objetos complejos en los logs

### Uso del Logger

```typescript
import { logger } from '../utils/logger';

// Diferentes niveles de logging
logger.debug('Información de debug', { userId: 123 }, 'functionName');
logger.info('Operación exitosa', { result: 'created' }, 'createUser');
logger.warn('Advertencia', { remaining: 5 }, 'apiCall');
logger.error('Error ocurrido', error, 'createUser');

// Para debugging rápido durante desarrollo
import { debug } from '../utils/logger';
debug('Debug rápido', { data: 'value' }); // Solo en NODE_ENV=development
```

### Estructura de los Logs

Los logs se escriben en formato JSON estructurado:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "Test step created successfully",
  "data": { "testCaseId": "123" },
  "context": "createQmetryTestStep"
}
```

### Configuración

El logger está configurado automáticamente para:

- Escribir a stderr (no interfiere con MCP)
- Incluir timestamps ISO
- Proporcionar contexto de función
- Soporte para datos estructurados
- Modo debug solo en desarrollo

> ⚠️ **Importante**: Nunca uses `console.log()` o `console.error()` en servidores MCP, ya que interfieren con el protocolo JSON.

## 🚨 Solución de Problemas

### Error de Sintaxis JSON

**Síntoma**: `SyntaxError: Unexpected token 'M', "MCP server"... is not valid JSON`

**Causa**: El servidor está imprimiendo texto plano al stdout, interfiriendo con el protocolo MCP.

**Solución**:

- Asegúrate de que no hay `console.log()` o `console.error()` en el código
- Usa el sistema de logging proporcionado: `logger.info()`, `logger.error()`, etc.
- Todos los logs deben ir a stderr, no a stdout

### Error de Autenticación

**Síntoma**: `Error: The environment variable QMETRY_API_KEY is not configured`

**Solución**:

```bash
export QMETRY_API_KEY="tu-clave-de-api-aqui"
```

### Error de Configuración de API

**Síntoma**: Errores 404 o 500 al hacer llamadas a la API

**Solución**:

- Verifica que la URL en `config.json` sea correcta
- Asegúrate de que la API key tenga los permisos necesarios
- Revisa los logs para más detalles del error

### Problemas de Compilación

**Síntoma**: Errores de TypeScript al compilar

**Solución**:

```bash
# Verificar errores de linting
pnpm lint

# Corregir automáticamente problemas de formato
pnpm lint:fix

# Formatear código
pnpm format
```

## 📚 Recursos Adicionales

- [Documentación oficial de MCP](https://modelcontextprotocol.io/)
- [API de QMetry para Jira](https://qmetry.com/qmetry-for-jira/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
