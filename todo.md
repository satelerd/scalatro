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