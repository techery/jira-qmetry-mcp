# Guía de Contribución

> 🌐 **Idioma**: [English](CONTRIBUTING.md) | **Español**

¡Gracias por tu interés en contribuir al Jira QMetry MCP Server! Este documento proporciona las pautas para contribuir al proyecto.

## 📋 Código de Conducta

- Sé respetuoso y profesional en todas las interacciones
- Acepta críticas constructivas con mente abierta
- Enfócate en lo que es mejor para la comunidad
- Muestra empatía hacia otros miembros de la comunidad

## 🚀 Cómo Contribuir

### 1. Fork y Clonar el Repositorio

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/albertor03/jira-qmetry-mcp
cd jira-qmetry-mcp
```

### 2. Configurar el Entorno de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Configurar variable de entorno
export QMETRY_API_KEY="tu-clave-de-api"

# Verificar que todo funcione
pnpm start
```

### 3. Crear una Rama para tu Contribución

```bash
# Usa nombres descriptivos para tus ramas
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 4. Realizar tus Cambios

#### Estándares de Código

- **TypeScript**: Todo el código debe estar en TypeScript
- **ESLint**: Ejecuta `pnpm lint` antes de commit
- **Prettier**: Ejecuta `pnpm format` para formatear el código
- **JSDoc**: Documenta todas las funciones públicas

#### Estructura de Archivos

Si agregas una nueva funcionalidad, sigue esta estructura:

```
src/
├── api/
│   └── qmetry-nueva-funcionalidad.ts    # Llamadas a la API
├── interfaces/
│   └── qmetry-nueva-funcionalidad.ts    # Tipos TypeScript
└── tools/
    └── nueva-funcionalidad-tools.ts      # Definiciones MCP
```

#### Encabezado de Licencia

Agrega este encabezado a todos los archivos nuevos:

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
# Ejecutar linter
pnpm lint

# Probar con el MCP Inspector
pnpm run:inspector

# Verificar formato
pnpm format:check
```

### 6. Commit y Push

```bash
# Staging de archivos
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar soporte para nuevas funcionalidades de QMetry"

# Push a tu fork
git push origin feature/nueva-funcionalidad
```

#### Formato de Mensajes de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin afectar código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Cambios en build, CI, etc.

**Ejemplos:**

```
feat: agregar herramienta para gestionar test suites
fix: corregir error en creación de test cases
docs: actualizar README con ejemplos de uso
refactor: mejorar manejo de errores en API calls
```

### 7. Crear Pull Request

1. Ve a tu fork en GitHub
2. Haz clic en "Pull Request"
3. Describe tus cambios claramente:
   - **Qué** cambiaste
   - **Por qué** lo cambiaste
   - **Cómo** lo probaste

**Template de PR:**

```markdown
## Descripción

[Descripción clara de los cambios]

## Tipo de Cambio

- [ ] Nueva funcionalidad (feat)
- [ ] Corrección de bug (fix)
- [ ] Cambio de documentación (docs)
- [ ] Refactorización (refactor)
- [ ] Otro: [especificar]

## Checklist

- [ ] He ejecutado `pnpm lint` sin errores
- [ ] He ejecutado `pnpm format` para formatear el código
- [ ] He agregado documentación JSDoc
- [ ] He probado mis cambios con MCP Inspector
- [ ] He agregado el encabezado de licencia a archivos nuevos
- [ ] He actualizado el README si es necesario
- [ ] He documentado los cambios en archivos modificados

## Testing

[Describe cómo probaste tus cambios]

## Screenshots (si aplica)

[Agrega capturas de pantalla si es relevante]
```

## 📝 Guías de Estilo

### TypeScript

```typescript
// ✅ Bueno
interface TestCaseParams {
  summary: string;
  projectId: number;
  description?: string;
}

export async function createTestCase(
  params: TestCaseParams
): Promise<TestCaseResponse> {
  // Implementación
}

// ❌ Malo
function createTestCase(summary, projectId, description) {
  // Sin tipos
}
```

### Logging

```typescript
// ✅ Bueno
import { logger } from '../utils/logger';

logger.info('Test case created', { testCaseId: '123' }, 'createTestCase');

// ❌ Malo
console.log('Test case created');
```

### Manejo de Errores

```typescript
// ✅ Bueno
try {
  const result = await apiCall();
  return result;
} catch (error) {
  logger.error('Failed to create test case', error, 'createTestCase');
  throw error;
}

// ❌ Malo
try {
  return await apiCall();
} catch (error) {
  console.error(error);
}
```

## 🔍 Revisión de Código

Tu pull request será revisado considerando:

1. **Calidad del código**: Sigue las mejores prácticas de TypeScript
2. **Documentación**: JSDoc completo y README actualizado si es necesario
3. **Testing**: Los cambios han sido probados adecuadamente
4. **Consistencia**: Sigue los patrones existentes en el proyecto
5. **Licencia**: Incluye el encabezado de Apache License 2.0

## 📜 Licencia y Derechos de Autor

Al contribuir a este proyecto, aceptas que:

1. Tu contribución se licenciará bajo **Apache License 2.0**
2. Otorgas derechos de patente según los términos de Apache License 2.0
3. Tu contribución es tu trabajo original o tienes derechos para contribuirlo
4. Comprendes que tu contribución es pública y será atribuida a ti

### Declaración de Contribución

Cada commit que hagas implica que estás de acuerdo con la siguiente declaración:

> "Certifico que esta contribución fue creada total o parcialmente por mí y tengo
> el derecho de enviarla bajo la licencia de código abierto indicada en el archivo;
> o la contribución se basa en trabajos anteriores que, según mi mejor conocimiento,
> están cubiertos bajo una licencia de código abierto apropiada y tengo el derecho
> de enviar ese trabajo con modificaciones bajo la misma licencia (a menos que esté
> permitido enviar bajo una licencia diferente), como lo indica el archivo; o la
> contribución fue proporcionada directamente a mí por alguna otra persona que
> certificó (a) o (b) y no la he modificado."

Esto se conoce como el [Certificado de Origen del Desarrollador (DCO)](https://developercertificate.org/).

## 🆘 ¿Necesitas Ayuda?

Si tienes preguntas sobre cómo contribuir:

1. Revisa la documentación existente
2. Busca en issues cerrados para ver si tu pregunta ya fue respondida
3. Abre un nuevo issue con la etiqueta "question"

## 🎯 Áreas donde Puedes Contribuir

- **Nuevas herramientas**: Implementar más endpoints de la API de QMetry
- **Documentación**: Mejorar ejemplos y guías
- **Testing**: Agregar tests automatizados
- **Optimización**: Mejorar el rendimiento del código
- **Bugs**: Reportar y/o corregir bugs
- **Traducciones**: Traducir documentación a otros idiomas

## 🙏 Agradecimientos

¡Gracias por contribuir al proyecto! Cada contribución, grande o pequeña, es valiosa y apreciada.
