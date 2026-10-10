https://tayrodriguez04.github.io/gestor-tareas/
🚀 TaskFlow — Sistema de Gestión de Tareas y Productividad

Portafolio Profesional — Ingeniera de Sistemas orientada a Desarrollo Web, Análisis de Datos y Automatización.

TaskFlow es una aplicación web responsive diseñada para la gestión, priorización y análisis cualitativo de actividades diarias. El proyecto demuestra buenas prácticas en desarrollo frontend nativo, manipulación segura del DOM, prevención de vulnerabilidades de seguridad comunes (XSS), persistencia en el cliente y arquitectura de software modular escalable hacia entornos Full-Stack.

📌 Tabla de Contenidos

Demostración en Vivo

Problema que Resuelve

Funcionalidades Clave

Decisiones de Arquitectura y Seguridad

Stack Tecnológico

Instalación y Uso Local

Roadmap de Evolución (Nivel Full-Stack & Analytics)

Competencias Demostradas

🌐 Demostración en Vivo

Puedes probar la aplicación desplegada en GitHub Pages:
👉 Ver Aplicación TaskFlow en Línea (Reemplazar con tu enlace)

💡 Problema que Resuelve

La acumulación desordenada de pendientes dificulta el seguimiento de proyectos personales y profesionales. TaskFlow centraliza la captura de tareas, asigna prioridades y fechas límite, calcula indicadores clave de rendimiento (KPIs de cumplimiento) en tiempo real y alerta visualmente sobre tareas vencidas antes de que comprometan entregables.

✨ Funcionalidades Clave

🔄 Operaciones CRUD Completas: Creación, lectura, edición interactiva y eliminación de tareas.

🏷️ Categorización y Priorización: Asignación de categorías (Trabajo, Estudio, Personal, Proyectos) y niveles de prioridad (Baja, Media, Alta).

🚨 Manejo de Fechas Límite e Indicador de Vencimiento: Detección automática y resaltado dinámico de actividades vencidas.

🔍 Búsqueda y Filtrado Multicriterio: Filtrado simultáneo por búsqueda textual, estado (Pendiente, Completada, Vencida) y categoría.

📊 Dashboard de Métricas en Tiempo Real: Contadores sincronizados de tareas totales, pendientes y completadas.

💾 Persistencia Local: Uso eficiente de la Web Storage API (localStorage) para conservar la información entre sesiones.

📱 Diseño Responsive: Interfaz adaptativa construida con CSS Grid y Flexbox para dispositivos móviles y escritorio.

🛡️ Decisiones de Arquitectura y Seguridad

Durante el desarrollo se aplicaron estándares de ingeniería de software para prevenir errores comunes de aplicaciones web de nivel inicial:

Prevención de Vulnerabilidades XSS (Cross-Site Scripting):

Decisión: Se eliminó la inyección masiva de HTML mediante innerHTML con datos ingresados por el usuario.

Implementación: Se utilizó manipulación nativa del DOM con createElement() y asignación explícita mediante textContent, asegurando la sanitización nativa de entradas.

Identificadores Únicos Robustos:

Decisión: Se reemplazó el uso tradicional de Date.now() por crypto.randomUUID().

Razón: Garantiza identificadores universales únicos (UUID v4) para prevenir colisiones en ambientes concurrentes o creaciones aceleradas.

Manejo Desacoplado de Eventos (Clean Events):

Decisión: Eliminación total de manipuladores de eventos inline (onclick="...") dentro del HTML.

Implementación: Uso de addEventListener dinámicos adjuntados al ciclo de vida de cada elemento creado por el DOM.

🛠️ Stack Tecnológico

Frontend: HTML5 Semántico, CSS3 (Variables CSS, Flexbox, CSS Grid).

Lógica: JavaScript ES6+ (Módulos, Arrow Functions, Array Methods, Async/DOM API).

Persistencia: Web Storage API (localStorage).

Control de Versiones: Git & GitHub.

Despliegue: GitHub Pages.

💻 Instalación y Uso Local

No requiere dependencias externas ni compilación previa.

Clonar el repositorio:

git clone https://github.com/TU_USUARIO/gestor-tareas.git


Acceder al directorio del proyecto:

cd gestor-tareas


Ejecutar:

Abre el archivo index.html en tu navegador web.

O bien, abre la carpeta en Visual Studio Code y presiona Go Live con la extensión Live Server.

🗺️ Roadmap de Evolución

Este proyecto está diseñado para evolucionar progresivamente a una solución empresarial:

[x] Fase 1 (Actual): Cliente Frontend MVP con persistencia local y lógica segura de DOM.

[ ] Fase 2 (Full-Stack): Desarrollo de una API REST con Node.js + Express y persistencia relacional en PostgreSQL.

[ ] Fase 3 (Autenticación): Implementación de seguridad con JWT (JSON Web Tokens) e inicio de sesión multiusuario.

[ ] Fase 4 (Data Analytics & ETL): Integración de un pipeline de datos en Python (Pandas) / KNIME para exportar reportes de productividad, tasas de completado por categoría y tiempo medio de resolución.

🎓 Competencias Demostradas

Ingeniería de Frontend: Manipulación avanzada del DOM, maquetación adaptativa, estructuración limpia de archivos.

Seguridad Web Básica: Sanitización de inputs y prevención de OWASP Top 10 (XSS).

Lógica de Programación y Estructura de Datos: Métodos de array (filter, map), gestión de estados del cliente.

Orientación a Negocio y Datos: Diseño centrado en métricas clave (KPIs) y previsión de flujos de automatización analítica.

Desarrollado con enfoque de calidad y arquitectura por Taimi Rodriguez, Ingeniera de Sistemas.
