# Scalatro - TODO List

## Configuración Inicial
- [x] Inicializar proyecto Next.js con Bun
- [x] Configurar Tailwind CSS
- [x] Instalar dependencias básicas (zustand, framer-motion, react-konva)
- [x] Crear estructura de carpetas básica (components, store, lib, types, data)
- [x] Configurar README.md con instrucciones del proyecto

## Desarrollo UI Básica
- [x] Diseñar y crear componente de carta
  - [x] Estructura visual de carta (frontal/trasera)
  - [x] Animaciones básicas (volteo, arrastre)
- [x] Crear tablero de juego
  - [x] Área para cartas en juego
  - [x] Área para mazo
  - [x] Visualización de benchmarks
- [x] Implementar panel de recursos
  - [x] Contador de chips
  - [x] Visualización de multiplicador
  - [x] Contador de puntuación total
- [x] Crear tienda básica
  - [x] Lista de jokers disponibles
  - [x] Mecánica de compra

## Lógica del Juego
- [x] Implementar store global con Zustand
  - [x] Estado para cartas
  - [x] Estado para recursos
  - [x] Estado para benchmarks
- [x] Crear tipos TypeScript para el juego
  - [x] Interfaces para cartas
  - [x] Interfaces para jokers
  - [x] Interfaces para estado del juego
- [x] Desarrollar lógica de cálculo de puntuaciones
  - [x] Cálculo básico (chips × multiplicador)
  - [x] Bonificaciones por combos
- [x] Sistema de benchmarks
  - [x] Definir umbrales de puntuación
  - [x] Manejo de éxito/fracaso en benchmarks

## Mecánicas de Juego
- [x] Implementar sistema de turnos
  - [x] Jugar cartas
  - [x] Calcular puntuación
  - [x] Verificar benchmarks
  - [x] Acceder a tienda
- [x] Desarrollar efectos de jokers
  - [x] Mejoras de chips
  - [x] Mejoras de multiplicador
  - [x] Efectos especiales
- [x] Sistema de progresión
  - [x] Dificultad creciente de benchmarks
  - [x] Desbloqueo de nuevas cartas/jokers

## Mejoras y Correcciones
- [x] Corregir problemas de robado automático de cartas
  - [x] Implementar sistema para mantener siempre 3 cartas en mano
  - [x] Agregar robado automático después de jugar/descartar carta
  - [x] Agregar robado automático después de terminar turno
- [x] Mejorar interfaz de usuario
  - [x] Optimizar layout de acciones disponibles
  - [x] Mejorar presentación de carta seleccionada
- [x] Corregir problemas con compras de la tienda
  - [x] Asegurar que los jokers comprados se apliquen correctamente
  - [x] Generar IDs únicos para evitar conflictos de jokers duplicados
  - [x] Mejorar verificación de compra y aplicación de efectos

## Internacionalización
- [x] Traducir la interfaz al inglés
  - [x] Componentes principales (Board, Shop, Card)
  - [x] Textos del juego (instrucciones, descripciones)
  - [x] Benchmarks y nombres de objetos
  - [x] Mensajes del sistema y logs

## Proyectos Actuales

### Rediseño del Sistema de Story Points
- [ ] Modificar el sistema de Story Points
  - [ ] Aumentar la cantidad inicial de Story Points (de 2 a 5)
  - [ ] Implementar que cada carta consuma una cantidad específica de Story Points
  - [ ] Asignar costos de Story Points a las cartas según su color/tipo
  - [ ] Crear mejoras en la tienda que aumenten el máximo de Story Points por sprint disponibles y otros de storypoints de backlog disponible
- [ ] Mejorar la UI de Story Points
  - [ ] Mover indicador de Story Points disponibles al área de Story Points
  - [ ] Lo mismo opara backlog, Rediseñar área de Backlog para mostrar espacio disponible dentro del área
  - [ ] Renombrar "Available Story Points" a "Max Story Points for this Sprint"
  - [ ] Actualizar visualización para reflejar mejor el sistema renovado

### Corrección de la Tienda
- [ ] Identificar y corregir problemas en la funcionalidad de la tienda
  - [ ] Depurar el proceso de compra para identificar fallos
  - [ ] Verificar la correcta aplicación de efectos al comprar mejoras
  - [ ] Asegurar que los jokers aparecen correctamente en el inventario
  - [ ] Comprobar la correcta actualización de recursos después de compras
- [ ] Implementar nuevas mejoras relacionadas con Story Points
  - [ ] Crear objetos que aumenten el máximo de Story Points por sprint
  - [ ] Añadir descuentos de Story Points para ciertos tipos de cartas
  - [ ] Implementar bonificaciones especiales para el uso eficiente de Story Points
- [ ] Implementar nuevas mejoras relacionadas con pre-training y test-time copute

## Pulido Visual y Experiencia
- [ ] Mejorar animaciones
  - [ ] Efectos para combos grandes
  - [ ] Transiciones entre estados
- [ ] Implementar efectos sonoros
  - [ ] Sonidos para cartas
  - [ ] Sonidos para efectos y jokers
- [ ] Agregar efectos visuales avanzados
  - [ ] Shaders o efectos CSS avanzados
  - [ ] Partículas para momentos especiales

## Testing y Optimización
- [ ] Pruebas de jugabilidad
  - [ ] Balance de dificultad
  - [ ] Flujo de juego
- [ ] Optimizaciones de rendimiento
  - [ ] Renderizado condicional
  - [ ] Memoización de componentes

## Despliegue
- [ ] Preparar para producción
- [ ] Desplegar versión de prueba 