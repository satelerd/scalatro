# Scalatro - TODO List

## Configuración Inicial
- [x] Inicializar proyecto Next.js con Bun
- [x] Configurar Tailwind CSS
- [x] Instalar dependencias básicas (zustand, framer-motion, react-konva)
- [x] Crear estructura de carpetas básica (components, store, lib, types, data)
- [x] Configurar README.md con instrucciones del proyecto

## Desarrollo UI Básica
- [ ] Diseñar y crear componente de carta
  - [ ] Estructura visual de carta (frontal/trasera)
  - [ ] Animaciones básicas (volteo, arrastre)
- [ ] Crear tablero de juego
  - [ ] Área para cartas en juego
  - [ ] Área para mazo
  - [ ] Visualización de benchmarks
- [ ] Implementar panel de recursos
  - [ ] Contador de chips
  - [ ] Visualización de multiplicador
  - [ ] Contador de puntuación total
- [ ] Crear tienda básica
  - [ ] Lista de jokers disponibles
  - [ ] Mecánica de compra

## Lógica del Juego
- [ ] Implementar store global con Zustand
  - [ ] Estado para cartas
  - [ ] Estado para recursos
  - [ ] Estado para benchmarks
- [ ] Crear tipos TypeScript para el juego
  - [ ] Interfaces para cartas
  - [ ] Interfaces para jokers
  - [ ] Interfaces para estado del juego
- [ ] Desarrollar lógica de cálculo de puntuaciones
  - [ ] Cálculo básico (chips × multiplicador)
  - [ ] Bonificaciones por combos
- [ ] Sistema de benchmarks
  - [ ] Definir umbrales de puntuación
  - [ ] Manejo de éxito/fracaso en benchmarks

## Mecánicas de Juego
- [ ] Implementar sistema de turnos
  - [ ] Jugar cartas
  - [ ] Calcular puntuación
  - [ ] Verificar benchmarks
  - [ ] Acceder a tienda
- [ ] Desarrollar efectos de jokers
  - [ ] Mejoras de chips
  - [ ] Mejoras de multiplicador
  - [ ] Efectos especiales
- [ ] Sistema de progresión
  - [ ] Dificultad creciente de benchmarks
  - [ ] Desbloqueo de nuevas cartas/jokers

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