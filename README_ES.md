# Jira QMetry MCP Server

> 🌐 **Idioma**: [English](README.md) | **Español**

Servidor MCP (Model Context Protocol) para interactuar con la API de QMetry para Jira. Permite que modelos de lenguaje grandes (LLM) y aplicaciones cliente accedan a las funcionalidades de gestión de pruebas de QMetry a través de herramientas bien definidas.

## 📋 Descripción del Proyecto

Este proyecto implementa un servidor basado en el Protocolo de Contexto de Modelo (MCP) que proporciona una interfaz completa para gestionar casos de prueba, ciclos de prueba, planes de prueba y sus configuraciones asociadas en QMetry. El servidor está construido con TypeScript y utiliza el SDK oficial de MCP.

### Características Principales

- ✅ **Gestión completa de Test Cases**: Crear, buscar, editar, mover y copiar casos de prueba
- ✅ **Gestión de Test Steps**: Crear, actualizar, eliminar y obtener pasos de prueba
- ✅ **Organización por Folders**: Gestión de carpetas para test cases, test cycles y test plans
- ✅ **Configuración de Status**: Gestión de estados personalizados para test cases, test cycles y test plans
- ✅ **Gestión de Prioridades**: CRUD completo de prioridades con colores personalizados
- ✅ **Sistema de Labels**: Crear, actualizar y eliminar etiquetas para organización
- ✅ **Linked Requirements**: Vincular y desvincular requisitos (issues de Jira) con casos de prueba
- ✅ **Campos Personalizados**: Soporte para campos personalizados en casos de prueba, ciclos, planes y ejecuciones
- ✅ **Arquitectura robusta**: Sistema de logging, manejo de errores y validación de esquemas con Zod

## 🏗️ Estructura del Proyecto

```
jira-qmetry-mcp/
├── src/
│   ├── api/                          # Funciones de llamadas a la API de QMetry
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
│   │   ├── qmetry-linked-requirements.ts
│   │   └── qmetry-custom-fields.ts
│   ├── interfaces/                   # Definiciones de tipos TypeScript
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
│   │   ├── qmetry-custom-fields.ts
│   │   ├── toolDefinition.ts
│   │   └── index.ts
│   ├── tools/                        # Definiciones de herramientas MCP
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
│   │   ├── linked-requirements-tools.ts
│   │   └── custom-field-tools.ts
│   ├── utils/                        # Utilidades y helpers
│   │   ├── logger.ts
│   │   ├── object.utils.ts
│   │   └── index.ts
│   ├── main.ts                       # Punto de entrada del servidor MCP (stdio)
│   ├── http-server.ts                # Servidor HTTP con transporte Streamable HTTP
│   └── config.json                   # Configuración de la API
├── package.json
├── tsconfig.json
├── eslint.config.js
├── LICENSE
├── NOTICE
├── CONTRIBUTING.md
└── README.md
```

## 🔧 Configuración

### 1. Instalación de Dependencias

```bash
pnpm install
```

### 2. Variable de Entorno

Configura tu clave API de QMetry:

```bash
export QMETRY_API_KEY="tu-clave-de-api-aqui"
```

> 💡 **Nota**: La clave API se genera desde la interfaz de Jira: `QMetry > Configuration > Open API > Generate`

### 4. Ejecución del Servidor

```bash
pnpm start
```

Para usar el inspector MCP:

```bash
pnpm run:inspector
```

## 🛠️ Herramientas Disponibles

### 📁 Proyectos

**Herramienta**: `list-qmetry-projects`

- **Obtener proyectos**: Lista todos los proyectos habilitados en QMetry con filtrado y paginación

---

### 📝 Test Cases

**Herramientas**: `get-qmetry-test-cases`, `create-qmetry-test-case`, `move-qmetry-test-case`, `copy-qmetry-test-case`, `update-qmetry-test-case`

- **Obtener**: Buscar casos de prueba con filtros avanzados (asignado a, estado, etiquetas, etc.)
- **Crear**: Crear nuevos casos de prueba con pasos, descripciones y configuraciones
- **Mover**: Mover casos de prueba entre carpetas
- **Copiar**: Copiar casos de prueba a diferentes ubicaciones
- **Actualizar**: Actualizar información del caso de prueba

---

### 🔄 Versiones de Test Case

**Herramientas**: `get-test-case-version-details`, `add-test-case-version`, `delete-test-case-version`, `get-test-case-versions-list`

- **Obtener detalles de versión**: Recuperar información de versión específica
- **Agregar versión**: Crear nueva versión desde versión existente
- **Eliminar versión**: Remover una versión específica
- **Obtener lista de versiones**: Ver todas las versiones de un caso de prueba

---

### 📦 Ciclo de Vida de Test Case

**Herramientas**: `archive-qmetry-test-case`, `unarchive-qmetry-test-case`, `clone-qmetry-test-case`, `get-test-case-test-cycles`

- **Archivar**: Archivar un caso de prueba
- **Desarchivar**: Restaurar caso de prueba archivado
- **Clonar**: Duplicar caso de prueba con opciones
- **Obtener cycles vinculados**: Ver ciclos de prueba vinculados a un caso de prueba

---

### 📂 Test Case Folders

**Herramientas**: `get-qmetry-test-case-folders`, `create-qmetry-test-case-folder`, `edit-qmetry-test-case-folder`, `copy-qmetry-test-case-folder`, `move-qmetry-test-case-folder`, `search-qmetry-test-case-folders`

- **Obtener**: Listar todas las carpetas de casos de prueba de un proyecto
- **Crear**: Crear nuevas carpetas con jerarquía padre-hijo
- **Editar**: Modificar nombre y descripción de carpetas existentes
- **Copiar**: Copiar carpetas a nuevas ubicaciones
- **Mover**: Mover carpetas a diferentes carpetas padre
- **Buscar**: Buscar carpetas por nombre (modo estricto o relativo)

---

### 🎯 Test Case Status

**Herramientas**: `get-qmetry-test-case-statuses`, `create-qmetry-test-case-status`, `update-qmetry-test-case-status`, `delete-qmetry-test-case-status`, `get-test-case-status-ref-count`

- **Obtener**: Listar todos los estados de casos de prueba (activos/archivados)
- **Crear**: Crear nuevos estados personalizados con colores
- **Actualizar**: Modificar estados existentes
- **Eliminar**: Remover estados del proyecto
- **Contador de referencias**: Verificar cuántos casos usan un estado específico

---

### 🔄 Test Cycles

**Herramientas**: `search-qmetry-test-cycles`, `create-qmetry-test-cycle`, `update-qmetry-test-cycle`, `move-qmetry-test-cycle`, `link-test-case-to-test-cycle`, `unlink-test-case-from-test-cycle`, `get-test-cycle-test-plans`, `link-requirements-to-test-cycle`, `unlink-requirements-from-test-cycle`, `archive-qmetry-test-cycle`, `unarchive-qmetry-test-cycle`

- **Buscar**: Buscar y filtrar ciclos de prueba con criterios avanzados
- **Crear**: Crear nuevos ciclos de prueba con configuración
- **Actualizar**: Modificar ciclos de prueba existentes
- **Mover**: Mover ciclos de prueba a diferentes carpetas
- **Vincular/Desvincular casos de prueba**: Asociar o remover casos de prueba de un ciclo
- **Obtener planes de prueba vinculados**: Ver planes de prueba vinculados a un ciclo
- **Vincular/Desvincular requisitos**: Gestionar requisitos de Jira vinculados a ciclos
- **Archivar**: Archivar o desarchivar ciclos de prueba

---

### 🔄 Test Cycle Status

**Herramientas**: `get-qmetry-test-cycle-statuses`, `create-qmetry-test-cycle-status`, `update-qmetry-test-cycle-status`, `delete-qmetry-test-cycle-status`, `get-test-cycle-status-ref-count`

- **Obtener**: Listar estados de ciclos de prueba
- **Crear**: Crear estados personalizados para ciclos
- **Actualizar**: Modificar estados existentes
- **Eliminar**: Remover estados no utilizados
- **Contador de referencias**: Verificar uso del estado

---

### 📋 Test Plans

**Herramientas**: `search-qmetry-test-plans`, `get-qmetry-test-plan`, `create-qmetry-test-plan`, `update-qmetry-test-plan`, `move-qmetry-test-plans`, `get-test-plan-test-cycles`, `link-test-cycles-to-test-plan`, `unlink-test-cycles-from-test-plan`, `archive-qmetry-test-plan`, `unarchive-qmetry-test-plan`

- **Buscar**: Buscar y filtrar planes de prueba
- **Obtener**: Obtener detalles de un plan de prueba específico
- **Crear**: Crear nuevos planes de prueba
- **Actualizar**: Modificar planes de prueba existentes
- **Mover**: Mover planes de prueba a diferentes carpetas
- **Obtener ciclos de prueba vinculados**: Ver ciclos de prueba vinculados a un plan
- **Vincular/Desvincular ciclos de prueba**: Asociar o remover ciclos de prueba de los planes
- **Archivar**: Archivar o desarchivar planes de prueba

---

### 📋 Test Plan Status

**Herramientas**: `get-qmetry-test-plan-statuses`, `create-qmetry-test-plan-status`, `update-qmetry-test-plan-status`, `delete-qmetry-test-plan-status`, `get-test-plan-status-ref-count`

- **Obtener**: Listar estados de planes de prueba
- **Crear**: Crear estados personalizados
- **Actualizar**: Modificar estados existentes
- **Eliminar**: Remover estados del proyecto
- **Contador de referencias**: Ver uso del estado

---

### 🪜 Test Steps

**Herramientas**: `get-qmetry-test-steps`, `create-qmetry-test-step`, `update-qmetry-test-step`, `delete-qmetry-test-step`

- **Obtener**: Listar todos los pasos de un caso de prueba con paginación
- **Crear**: Crear múltiples pasos con detalles, datos de prueba y resultados esperados
- **Actualizar**: Modificar pasos existentes
- **Eliminar**: Remover pasos de un caso de prueba

---

### ⚡ Prioridades

**Herramientas**: `get-qmetry-priorities`, `create-qmetry-priority`, `update-qmetry-priority`, `delete-qmetry-priority`, `search-qmetry-priorities`

- **Obtener**: Listar todas las prioridades del proyecto
- **Crear**: Crear prioridades personalizadas con colores hexadecimales
- **Actualizar**: Modificar prioridades existentes
- **Eliminar**: Remover prioridades no utilizadas
- **Buscar**: Localizar prioridades por nombre

---

### 🏷️ Labels

**Herramientas**: `get-qmetry-labels`, `create-qmetry-label`, `update-qmetry-label`, `delete-qmetry-label`, `get-qmetry-label-reference-count`

- **Obtener**: Listar todas las etiquetas del proyecto
- **Crear**: Crear nuevas etiquetas para categorización
- **Actualizar**: Modificar nombres de etiquetas
- **Eliminar**: Remover etiquetas del proyecto
- **Contador de referencias**: Ver cuántos elementos usan una etiqueta

---

### 🔗 Linked Requirements

**Herramientas**: `get-qmetry-linked-requirements`, `link-qmetry-requirements`, `unlink-qmetry-requirements`

- **Obtener**: Listar todos los requisitos (issues de Jira) vinculados a un caso de prueba
- **Vincular**: Asociar uno o más issues de Jira con un caso de prueba
- **Desvincular**: Remover la asociación entre requisitos y casos de prueba

---

### 🏷️ Campos Personalizados

**Herramientas**: `get-qmetry-custom-field-types`, `get-qmetry-test-case-custom-fields`, `get-tc-custom-field-ref-count`, `get-qmetry-test-cycle-custom-fields`, `get-tcy-custom-field-ref-count`, `get-qmetry-test-plan-custom-fields`, `get-tp-custom-field-ref-count`, `get-qmetry-te-custom-fields`, `get-te-custom-field-ref-count`

**Campos Personalizados en Test Cases, Cycles y Plans**:
- Agregar/filtrar por campos personalizados al: crear, actualizar, buscar casos de prueba, ciclos y planes
- Estructura de campos personalizados: `[{ id: string; value: string }]`

**Obtener Tipos de Campos Personalizados**: Listar todos los tipos de campos disponibles en QMetry

**Obtener Campos Personalizados por Módulo**:
- **Test Case**: `get-qmetry-test-case-custom-fields` - Obtener detalles de campos personalizados
- **Test Cycle**: `get-qmetry-test-cycle-custom-fields` - Obtener detalles de campos personalizados
- **Test Plan**: `get-qmetry-test-plan-custom-fields` - Obtener detalles de campos personalizados
- **Test Execution**: `get-qmetry-te-custom-fields` - Obtener detalles de campos personalizados

**Contadores de Referencias**: Verificar cuántos elementos referencian cada campo personalizado:
- `get-tc-custom-field-ref-count` - Referencias de test cases
- `get-tcy-custom-field-ref-count` - Referencias de test cycles
- `get-tp-custom-field-ref-count` - Referencias de test plans
- `get-te-custom-field-ref-count` - Referencias de test executions

## 🚨 Solución de Problemas

### Error: QMETRY_API_KEY no configurada

```bash
export QMETRY_API_KEY="tu-clave-api"
```

## 📚 Recursos

- [Documentación oficial de MCP](https://modelcontextprotocol.io/)
- [API de QMetry para Jira](https://qmetry.com/qmetry-for-jira/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)

## 📄 Licencia

Este proyecto está licenciado bajo la **Apache License 2.0**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

### ¿Por qué Apache License 2.0?

- ✅ **Protección de patentes**: Concesión explícita de derechos de patente
- ✅ **Control de marcas**: Protección sobre el uso de marcas registradas
- ✅ **Declaración de cambios**: Requiere documentar modificaciones
- ✅ **Uso empresarial**: Ampliamente aceptada en entornos corporativos
- ✅ **Compatible**: Con la mayoría de licencias de código abierto

### Avisos Importantes

Este software integra con QMetry y Jira a través de sus APIs públicas. QMetry es una marca registrada de Zoho Corporation y Jira es una marca registrada de Atlassian Pty Ltd. Este proyecto no está afiliado, respaldado ni patrocinado por estas empresas.

Consulta el archivo [NOTICE](NOTICE) para información completa sobre atribuciones y avisos legales.

## 👥 Contribución

Para contribuir al proyecto:

1. **Fork y Pull Request**: Haz un fork del proyecto y envía tus cambios mediante pull requests
2. **Código limpio**: Mantén el código limpio usando ESLint y Prettier (`pnpm lint:fix`)
3. **Logging**: Usa el sistema de logging proporcionado (nunca `console.log`)
4. **Documentación**: Documenta todas las funciones con JSDoc
5. **Patrones**: Sigue los patrones establecidos en el proyecto
6. **Testing**: Prueba tus cambios con el MCP Inspector (`pnpm run:inspector`)
7. **Licencia**: Al contribuir, aceptas que tu código se licencie bajo Apache License 2.0
8. **Cambios**: Documenta claramente qué cambios realizaste y por qué

### Encabezado de Licencia

Agrega este encabezado al inicio de los nuevos archivos TypeScript:

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

Para guías detalladas de contribución, consulta [CONTRIBUTING.md](CONTRIBUTING.md).

## 🔄 Versión

**v1.1.0** - Versión actual del servidor MCP
