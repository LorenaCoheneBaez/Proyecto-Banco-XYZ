# Proyecto Banco XYZ

Aplicación de banca móvil desarrollada con React Native y Expo SDK 58. Incluye pantallas de acceso, inicio, transferencias e historial de movimientos.

## Tecnologías

- **React Native** y **React** para la interfaz de la aplicación.
- **Expo SDK 58** para el entorno de desarrollo y ejecución multiplataforma.
- **TypeScript** para el tipado estático del código.
- **Expo Router** para la navegación basada en rutas.
- **React Context API** para compartir el estado de la cuenta y las transferencias.
- **Jest** y **React Native Testing Library** para las pruebas.
- **ESLint** para el análisis estático del código.

## Credenciales de Prueba
Para acceder a la aplicación durante la evaluación, utiliza:
- **Usuario:** usuario@banco.com
- **Contraseña:** password123

## Arquitectura y Buenas Prácticas
Este proyecto fue diseñado siguiendo principios de Clean Code y separación de responsabilidades:
- **Gestión de Estado:** Implementación de Context API (`BankContext`) para mantener una única fuente de verdad en el estado global (saldo y transferencias).
- **Custom Hooks:** Toda la lógica de negocio y validaciones fue extraída de las vistas hacia hooks personalizados (`useLogin`, `useTransfer`, `useHistory`) para facilitar el testing aislado y mantener componentes limpios.
- **Principio DRY:** Creación de utilidades globales (`currency.utils.ts`, `date.utils.ts`) para formateo de moneda y manejo de fechas.
- **Rendimiento:** Implementación de `useDebounce` en el buscador del historial para optimizar los filtrados en tiempo real.

## Experiencia de Usuario (UX/UI)
- **Internacionalización (ARS):** Sistema de inputs adaptado al usuario local. El usuario puede tipear decimales usando la coma (`,`) del teclado, mientras el sistema procesa los cálculos con punto (`.`) internamente sin romper el estado numérico.
- Formato visual estricto para moneda argentina (ej. `$15.000,50`).
- Validaciones preventivas (bloqueo de transferencias sin fondos, prevención de fechas pasadas, control de decimales).

## Requisitos

- Node.js y npm instalados.
- Para ejecutar en Android o iOS, un emulador configurado o un dispositivo compatible.

## Instalación

Clona el repositorio y entra en la carpeta creada:

```bash
git clone https://github.com/LorenaCoheneBaez/Proyecto-Banco-XYZ.git
cd ProyectoBancoXYZ
```

Instala las dependencias del proyecto:

```bash
npm install
```

## Ejecutar la aplicación

Inicia el servidor de desarrollo de Expo:

```bash
npm run start
```

## Pruebas (Testing)
El proyecto cuenta con una suite de pruebas unitarias robusta enfocada en la lógica de negocio usando Jest y React Native Testing Library.

Ejecutar todas las pruebas:
```bash
npm test
```
*(Nota: Las pruebas evalúan el contexto global, formateo de divisas y flujos asíncronos de los Custom Hooks usando `renderHook` y `act`).*

## Lint

Para revisar el código con ESLint:

```bash
npm run lint
```