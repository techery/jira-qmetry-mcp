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

*   **`src/`**: Contiene la implementación del servidor MCP.
    *   **`src/main.ts`**: El punto de entrada principal del servidor MCP, donde se inicializa el servidor y se registran las herramientas.
    *   **`src/tools/`**: Contiene los módulos TypeScript que implementan las herramientas específicas para interactuar con la API de QMetry.
*   **`config.json`**: Archivo de configuración para la URL base de la API de QMetry (ubicado en la raíz del proyecto).

## Configuración

Antes de iniciar la aplicación, asegúrate de configurar lo siguiente:

### 1. Variable de Entorno

*   `QMETRY_API_KEY`: Tu clave de API para la autenticación con QMetry. Esta clave debe generarse desde la interfaz de Jira (QMetry > Configuration > Open API > Generate).

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

### `list-qmetry-projects`

Obtiene una lista de proyectos habilitados en QMetry, con opciones de filtrado y paginación.

*   **Descripción:** Consulta la API de QMetry para obtener proyectos. Permite filtrar por nombre o clave del proyecto y controlar la paginación.
*   **Parámetros:**
    *   `projectName` (opcional, `string`): Nombre o clave del proyecto para filtrar la búsqueda.
    *   `maxResults` (opcional, `number`): Número máximo de resultados a devolver (por defecto 50, máximo 100).
    *   `startAt` (opcional, `number`): Índice inicial de los resultados (por defecto 0).
