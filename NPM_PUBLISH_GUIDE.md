# Guía para Publicar en npm

## 📦 Preparación Completada

Tu proyecto ya está listo para ser publicado en npm. Se han realizado los siguientes cambios:

### ✅ Cambios Realizados

1. **package.json actualizado**:
   - `main` apunta a `dist/main.js` (código compilado)
   - Agregado `bin` para ejecutable CLI: `jira-qmetry-mcp`
   - Agregado campo `files` para especificar qué se publica
   - Agregado script `build` para compilar TypeScript
   - Agregado script `prepublishOnly` que compila automáticamente antes de publicar

2. **Archivos nuevos**:
   - `.npmignore` creado para excluir archivos innecesarios del paquete
   - Shebang `#!/usr/bin/env node` agregado a `src/main.ts`

3. **Errores corregidos**:
   - Error de TypeScript en `qmetry-test-plan-folders.ts` corregido
   - Proyecto compilado exitosamente

## 🚀 Pasos para Publicar

### Paso 1: Verificar tu cuenta de npm

```bash
# Verifica si estás logueado
npm whoami

# Si no estás logueado, inicia sesión
npm login
```

### Paso 2: Actualizar el repositorio en package.json

Antes de publicar, actualiza la URL del repositorio en `package.json`:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/TU_USUARIO/jira-qmetry-mcp"
}
```

### Paso 3: Verificar el nombre del paquete

Verifica que el nombre `jira-qmetry-mcp-server` esté disponible:

```bash
npm search jira-qmetry-mcp-server
```

Si ya existe, considera cambiar el nombre en `package.json` a algo único como:

- `@tu-usuario/jira-qmetry-mcp-server`
- `jira-qmetry-mcp-server-v2`

### Paso 4: Probar el paquete localmente

Antes de publicar, prueba que todo funciona:

```bash
# Simula lo que se publicará (sin publicar realmente)
npm pack

# Esto creará un archivo .tgz que puedes inspeccionar
# Para ver el contenido:
tar -tzf jira-qmetry-mcp-server-1.0.0.tgz
```

### Paso 5: Publicar

Una vez que estés seguro:

```bash
# Para primera publicación
npm publish

# Si usas un scoped package (@tu-usuario/...)
npm publish --access public
```

### Paso 6: Verificar la publicación

Verifica que tu paquete esté disponible:

```bash
npm view jira-qmetry-mcp-server
```

## 📝 Gestión de Versiones

Para futuras actualizaciones, usa semantic versioning:

```bash
# Para cambios menores (bug fixes)
npm version patch  # 1.0.0 -> 1.0.1

# Para nuevas características
npm version minor  # 1.0.0 -> 1.1.0

# Para cambios que rompen compatibilidad
npm version major  # 1.0.0 -> 2.0.0

# Luego publica
npm publish
```

## 🔧 Instalación del Paquete

Una vez publicado, los usuarios podrán instalarlo con:

```bash
npm install -g jira-qmetry-mcp-server

# O con pnpm
pnpm add -g jira-qmetry-mcp-server

# O con yarn
yarn global add jira-qmetry-mcp-server
```

## 🎯 Uso del Paquete

Los usuarios podrán ejecutar tu servidor MCP de estas formas:

```bash
# Como comando global (después de instalación global)
jira-qmetry-mcp

# O ejecutar directamente con npx (sin instalar)
npx jira-qmetry-mcp-server

# O agregarlo a su configuración MCP
```

## ⚠️ Consideraciones Importantes

1. **Primera vez**: Si es tu primera publicación, npm te pedirá verificar tu email
2. **Nombre del paquete**: Los nombres deben ser únicos en npm
3. **Versión**: No puedes republicar la misma versión, debes incrementarla
4. **2FA**: Si tienes autenticación de dos factores habilitada, necesitarás el código

## 📦 Contenido del Paquete

El paquete incluirá:

- `dist/` - Código compilado JavaScript
- `README.md` y `README_ES.md` - Documentación
- `LICENSE` y `NOTICE` - Información legal
- `CONTRIBUTING.md` y `CONTRIBUTING_ES.md` - Guías de contribución

**NO incluirá** (gracias a `.npmignore`):

- `src/` - Código fuente TypeScript
- `node_modules/`
- Archivos de configuración de desarrollo
- Archivos de git

## 🔍 Comandos Útiles

```bash
# Ver qué archivos se publicarán
npm pack --dry-run

# Ver información del paquete
npm view jira-qmetry-mcp-server

# Despublicar (solo dentro de las primeras 72 horas)
npm unpublish jira-qmetry-mcp-server@1.0.0

# Ver versiones publicadas
npm view jira-qmetry-mcp-server versions
```

## ✨ Mejoras Futuras Recomendadas

1. Agregar tests automatizados
2. Configurar CI/CD para publicación automática
3. Agregar badges al README (npm version, downloads, etc.)
4. Crear CHANGELOG.md para trackear cambios entre versiones
5. Considerar agregar un GitHub Action para publicar automáticamente en releases

---

¡Tu proyecto está listo para npm! 🎉
