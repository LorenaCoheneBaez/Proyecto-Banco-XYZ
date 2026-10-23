# Proyecto Banco XYZ

Aplicación de banca móvil desarrollada con React Native y Expo SDK 58. Consume una API REST alojada en AWS para autenticación, consulta de saldos y transferencias.

## Tecnologías

- **React Native** y **React** para la interfaz de la aplicación.
- **Expo SDK 58** para el entorno de desarrollo y ejecución multiplataforma.
- **TypeScript** para el tipado estático del código.
- **Expo Router** como punto de entrada de la aplicación y **React Navigation Native Stack** para navegar entre las pantallas.
- **React Context API** para compartir el estado de la cuenta y las transferencias.
- **Jest** y **React Native Testing Library** para las pruebas.
- **ESLint** para el análisis estático del código.

## Arquitectura e integración con la API

- Las solicitudes HTTP y las URL base se centralizan en `src/services/api.service.ts`. La aplicación usa `POST /login`, `GET /balance`, `POST /transfer` y `GET /transferList`.
- El inicio de sesión envía `email` y `password`. El historial espera una respuesta con `transfers`; cada transferencia usa `value`, `date`, `currency` y `payeer`, que contiene `name` y `document`.
- `BankContext` comparte el token, el saldo y el historial. Los hooks de las pantallas encapsulan parte de la lógica de presentación y validación.
- Las pruebas automatizadas simulan las respuestas de la API y el almacenamiento seguro; no sustituyen la verificación de disponibilidad ni el contrato del backend real.

### Seguridad y variables de entorno (`.env`)
Las URL base de la API se configuran mediante variables de entorno para no fijarlas en el código fuente. Como son variables `EXPO_PUBLIC_` de una aplicación cliente, sus valores pueden quedar incluidos en el paquete de la app: no deben contener secretos ni credenciales privadas.

El token de sesión se almacena con `expo-secure-store`. Al cerrar sesión, la aplicación elimina el token almacenado y limpia el saldo y el historial del estado global.

### Buenas Prácticas
Este proyecto fue diseñado siguiendo principios de Clean Code y separación de responsabilidades:
- **Gestión de Estado:** Implementación de Context API (`BankContext`) para mantener una única fuente de verdad en el estado global (saldo y transferencias).
- **Custom Hooks:** Parte de la lógica de las pantallas y sus validaciones está en hooks personalizados (`useLogin`, `useTransfer`, `useHistory`).
- **Principio DRY:** Creación de utilidades globales (`currency.utils.ts`, `date.utils.ts`) para formateo de moneda y manejo de fechas.
- **Rendimiento:** Implementación de `useDebounce` en el buscador del historial para optimizar los filtrados en tiempo real.

## Credenciales de prueba
La autenticación se realiza contra la API configurada. Si estas cuentas están habilitadas en ese backend, puedes usar cualquiera de ellas:

| Email | Contraseña | Nombre |
| :--- | :--- | :--- |
| `gabriel@topaz.com` | `1111` | Gabriel Topaz |
| `alejo@topaz.com` | `2222` | Alejo Topaz |
| `wilson@topaz.com` | `3333` | Wilson Topaz |


## Experiencia de Usuario (UX/UI)
- **Monedas:** La interfaz formatea y muestra los importes en ARS o USD según la moneda recibida.

- **Entrada de importes:** El usuario puede escribir decimales con coma; la aplicación normaliza el valor antes de procesar los cálculos.

- Prevención de Errores en Fechas: Se agregó un Switch (interruptor) explícito para habilitar la programación de transferencias a futuro. Esto asegura que el usuario no envíe transferencias diferidas por accidente al tocar el campo de fecha.

- Diferenciación Visual de Transferencias: Las transferencias programadas a futuro se muestran con una interfaz diferenciada (etiquetas y estilos propios) en la lista del historial, permitiendo una rápida lectura del estado de la cuenta.

- Filtros Dinámicos e Inteligentes: Desactivación automática de los inputs de búsqueda en el historial cuando no hay transferencias registradas, evitando interacciones innecesarias y confusión.

- Simulación de Recuperación de Clave: Se incorporó el botón y la alerta de "Olvidé mi contraseña" en el Login. Aunque no hay un endpoint real para esto, se incluyó para ofrecer una experiencia de usuario completa y realista desde el inicio.

- Validaciones Preventivas: Bloqueo de transferencias sin fondos o con moneda incorrecta, prevención de fechas pasadas, y control de formato de correo (Regex).

## Requisitos

- Node.js y npm instalados.
- Para ejecutar en Android o iOS, un emulador configurado o un dispositivo compatible.

## Instalación

Clona el repositorio en la carpeta `ProyectoBancoXYZ`:

```bash
git clone https://github.com/LorenaCoheneBaez/Proyecto-Banco-XYZ.git
cd ProyectoBancoXYZ
```

Instala las dependencias del proyecto:

```bash
npm install
```

## Configurar variables de entorno
En la raíz del proyecto, copia `.env.example` a `.env` y reemplaza las URL de ejemplo por las URL base de los servicios de API que vayas a usar. La aplicación añade a cada URL la ruta indicada:

| Variable | Ruta usada |
| :--- | :--- |
| `EXPO_PUBLIC_API_URL` | `/login` |
| `EXPO_PUBLIC_API_BALANCE` | `/balance` |
| `EXPO_PUBLIC_API_TRANSFER` | `/transfer` |
| `EXPO_PUBLIC_API_TRANSFER_LIST` | `/transferList` |

En PowerShell:

```powershell
Copy-Item .env.example .env
```

## Ejecutar la aplicación

Inicia el servidor de desarrollo de Expo:

```bash
npm run start
```

## Pruebas (Testing)
Hay pruebas automatizadas con Jest y React Native Testing Library para el servicio de API, el contexto de cuenta y las utilidades de fechas.

Ejecutar todas las pruebas:
```bash
npm test
```

## Lint

Para revisar el código con ESLint:
```bash
npm run lint
```
