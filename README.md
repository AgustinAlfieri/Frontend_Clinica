# 🏥 Frontend Clínica - Sistema de Gestión de Turnos Médicos

Sistema web frontend para la gestión integral de turnos médicos, desarrollado con tecnologías modernas y diseño responsive.

## 📋 Tabla de Contenidos

- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Características](#-características)

## 🛠 Tecnologías Utilizadas

### Core
- **React 19.1.10** - Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript 5.6.2** - Superset tipado de JavaScript
- **Vite 6.0.7** - Build tool y dev server de última generación

### Estilos
- **CSS3** - Estilos personalizados con enfoque Mobile-First
- **Tailwind CSS 4.1.14** - Framework de utilidades CSS (usado en componentes específicos)

### Routing & Estado
- **React Router DOM 7.1.3** - Enrutamiento del lado del cliente
- **Context API** - Manejo de estado global (Authentication, UpdateStatus)

### Herramientas de Desarrollo
- **ESLint 9.17.0** - Linter para identificar y reportar patrones en código
- **TypeScript ESLint 8.20.0** - Plugin de ESLint para TypeScript
- **Vite Plugin React SWC** - Plugin de Vite con SWC para Fast Refresh

### Gestor de Paquetes
- **pnpm** - Gestor de paquetes rápido y eficiente

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.x o superior)
- **pnpm** (versión 8.x o superior)
  ```bash
  npm install -g pnpm
  ```

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
# HTTPS
git clone https://github.com/AgustinAlfieri/Frontend_Clinica.git

# SSH
git clone git@github.com:AgustinAlfieri/Frontend_Clinica.git

# GitHub CLI
gh repo clone AgustinAlfieri/Frontend_Clinica
```

### 2. Navegar al Directorio del Proyecto

```bash
cd Frontend_Clinica
```

### 3. Instalar Dependencias

```bash
pnpm install
```

Este comando instalará todas las dependencias listadas en `package.json`:
- Dependencias de producción
- Dependencias de desarrollo
- Peer dependencies

## ⚙ Configuración

### Variables de Entorno

El proyecto utiliza variables de entorno para configurar la URL de la API backend.

#### 1. Crear archivo `.env`

En la raíz del proyecto, crea un archivo `.env`:

```bash
# Windows (PowerShell)
New-Item .env

# Linux/macOS
touch .env
```

#### 2. Configurar Variables

Abre el archivo `.env` y agrega la siguiente configuración:

```env
# URL del Backend API
VITE_API_URL=http://localhost:3000/api

# Otros entornos (ejemplos)
# VITE_API_URL=https://api-staging.clinica.com
# VITE_API_URL=https://api.clinica.com
```

#### 3. Estructura de Variables Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base de la API backend | `http://localhost:3000/api` |

> ⚠️ **Importante**: Las variables de entorno en Vite deben tener el prefijo `VITE_` para ser expuestas al cliente.

#### 4. Acceso en el Código

Las variables se acceden mediante `import.meta.env`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

## 🎯 Scripts Disponibles

### Desarrollo

```bash
pnpm dev
```
- Inicia el servidor de desarrollo
- Hot Module Replacement (HMR) habilitado
- Disponible en: `http://localhost:5173`
- El puerto puede variar si 5173 está ocupado

### Build de Producción

```bash
pnpm build
```
- Compila TypeScript
- Genera bundle optimizado en `/dist`
- Minifica código CSS y JavaScript
- Tree-shaking automático
- Code splitting

### Vista Previa de Producción

```bash
pnpm preview
```
- Sirve el build de producción localmente
- Útil para probar antes de desplegar
- Disponible en: `http://localhost:4173`

### Linting

```bash
pnpm lint
```
- Ejecuta ESLint en todo el proyecto
- Verifica calidad y estilo del código
- Detecta errores potenciales

## 🌐 Acceso al Proyecto

### Modo Desarrollo
Después de ejecutar `pnpm dev`:
```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

### Modo Producción (Preview)
Después de ejecutar `pnpm build` y `pnpm preview`:
```
➜  Local:   http://localhost:4173/
```

## 📁 Estructura del Proyecto

```
Frontend_Clinica/
├── public/                      # Archivos estáticos
├── src/
│   ├── assets/                  # Imágenes y recursos
│   ├── core/                    # Componentes y lógica core
│   │   ├── components/          # Componentes reutilizables
│   │   ├── context/             # Context providers
│   │   ├── hooks/               # Custom hooks
│   │   └── utils/               # Utilidades
│   ├── features/                # Módulos por funcionalidad
│   │   ├── appointment/         # Gestión de turnos
│   │   ├── homepage/            # Página principal
│   │   └── users/               # Gestión de usuarios
│   │       ├── administrative/  # Módulo administrativo
│   │       ├── medic/          # Módulo médicos
│   │       └── patients/       # Módulo pacientes
│   ├── Router/                  # Configuración de rutas
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Punto de entrada
│   └── index.css                # Estilos globales
├── .env                         # Variables de entorno
├── index.html                   # HTML principal
├── package.json                 # Dependencias y scripts
├── tsconfig.json                # Configuración TypeScript
├── vite.config.ts              # Configuración Vite
└── README.md                    # Este archivo
```

## ✨ Características

### Autenticación
- Login con roles (Paciente, Médico, Administrativo)
- Registro de usuarios por rol
- Protección de rutas
- Persistencia de sesión

### Gestión de Turnos
- Solicitud de turnos por especialidad
- Visualización de turnos disponibles
- Filtrado por médico, fecha y estado
- Actualización de estados de turno

### Roles de Usuario

#### 👤 Paciente
- Ver turnos solicitados
- Solicitar nuevos turnos
- Dashboard personalizado

#### 👨‍⚕️ Médico
- Ver agenda de turnos
- Gestionar disponibilidad

#### 👔 Administrativo
- Gestionar todos los turnos
- Actualizar estados
- Panel de administración completo

### Diseño Responsive
- Mobile-First approach
- Breakpoints: 481px, 641px, 769px, 1025px, 1200px
- Adaptable a todos los dispositivos

## 🔧 Solución de Problemas

### Puerto en uso
Si el puerto 5173 está ocupado:
```bash
# Vite automáticamente usará el siguiente puerto disponible
# O puedes especificar uno:
pnpm dev -- --port 3000
```

### Error de instalación de dependencias
```bash
# Limpiar cache de pnpm
pnpm store prune

# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error de TypeScript
```bash
# Verificar configuración
pnpm tsc --noEmit
```

## 📝 Notas Adicionales

- El proyecto usa **CSS puro** con metodología Mobile-First
- Algunos componentes específicos usan **Tailwind CSS**
- Las rutas están protegidas mediante **AuthContext**
- El estado global se maneja con **Context API**

## 👥 Autor

**Agustin Alfieri**
- GitHub: [@AgustinAlfieri](https://github.com/AgustinAlfieri)

## 📄 Licencia

Este proyecto es parte de un sistema de gestión clínica y está protegido por derechos de autor.

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
