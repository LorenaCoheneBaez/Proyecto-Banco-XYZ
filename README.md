# Proyecto Banco XYZ

Aplicación de banca móvil desarrollada con React Native y Expo SDK 58. Integrada completamente con una API REST alojada en AWS para el manejo real de autenticación, saldos y transferencias.

## Tecnologías

- **React Native** y **React** para la interfaz de la aplicación.
- **Expo SDK 58** para el entorno de desarrollo y ejecución multiplataforma.
- **TypeScript** para el tipado estático del código.
- **Expo Router** para la navegación basada en rutas.
- **React Context API** para compartir el estado de la cuenta y las transferencias.
- **Jest** y **React Native Testing Library** para las pruebas.
- **ESLint** para el análisis estático del código.

## Arquitectura y Justificación Técnica

### Mock-Driven Development (MDD)
El desarrollo de esta aplicación comenzó aislando la lógica de negocio utilizando datos simulados (Mocks) locales antes de integrar la API real. Como desarrollador Semi-Senior, elegí este enfoque por las siguientes razones:
*   **Desacoplamiento Front-Back:** Permitió avanzar con el diseño de interfaces y la lógica de validación sin depender de la disponibilidad o estabilidad de los endpoints en la nube.
*   **Pruebas de Casos Extremos:** Facilitó la simulación de escenarios críticos (saldos insuficientes, listas vacías, errores de red) que son riesgosos o difíciles de replicar en un entorno de producción real.
*   **Escalabilidad:** Gracias a la separación de responsabilidades usando Custom Hooks y Context API, la transición final a la API REST de AWS requirió modificar únicamente la capa de servicios, sin alterar los componentes visuales ni la experiencia del usuario.

### Seguridad y Variables de Entorno (`.env`)
Los endpoints de la API están centralizados y protegidos de la base de código usando variables de entorno. 
*   **¿Por qué usamos `.env`?** Permite cambiar fácilmente entre entornos (Desarrollo, Staging, Producción) sin modificar el código fuente. Aunque en aplicaciones cliente (frontend/móvil) las variables de entorno no brindan seguridad criptográfica absoluta, son una excelente práctica de arquitectura para no *hardcodear* (escribir en duro) URLs en el código.
*   **Almacenamiento Seguro:** El Token JWT de sesión no se guarda en memoria volátil, sino que se almacena utilizando `expo-secure-store`, lo que garantiza que esté encriptado en el Keystore/Keychain del hardware del dispositivo.

### Buenas Prácticas
Este proyecto fue diseñado siguiendo principios de Clean Code y separación de responsabilidades:
- **Gestión de Estado:** Implementación de Context API (`BankContext`) para mantener una única fuente de verdad en el estado global (saldo y transferencias).
- **Custom Hooks:** Toda la lógica de negocio y validaciones fue extraída de las vistas hacia hooks personalizados (`useLogin`, `useTransfer`, `useHistory`) para facilitar el testing aislado y mantener componentes limpios.
- **Principio DRY:** Creación de utilidades globales (`currency.utils.ts`, `date.utils.ts`) para formateo de moneda y manejo de fechas.
- **Rendimiento:** Implementación de `useDebounce` en el buscador del historial para optimizar los filtrados en tiempo real.

## Credenciales de Prueba
Para acceder a la aplicación, utiliza cualquiera de los siguientes usuarios:

| Email | Contraseña | Nombre |
| :--- | :--- | :--- |
| `gabriel@topaz.com` | `1111` | Gabriel Topaz |
| `alejo@topaz.com` | `2222` | Alejo Topaz |
| `wilson@topaz.com` | `3333` | Wilson Topaz |


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

## Configurar Variables de Entorno:**
En la raíz del proyecto, debes crear un archivo `.env` tomando como base el archivo `.env.example`. Este paso es obligatorio para que la app se comunique con AWS.
Crea el archivo `.env` y agrega lo siguiente:
```env
EXPO_PUBLIC_API_URL=https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default
EXPO_PUBLIC_API_BALANCE=https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default
EXPO_PUBLIC_API_TRANSFER=https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default
EXPO_PUBLIC_API_TRANSFER_LIST=https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default
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

## Lint

Para revisar el código con ESLint:

```bash
npm run lint
```