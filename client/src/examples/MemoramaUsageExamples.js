// client/src/examples/MemoramaUsageExamples.js
// Ejemplos de cómo usar el sistema de Memorama

import ActivityService from '../services/ActivityService';
import ExperienceService from '../services/ExperienceService';
import mockGames from '../data/mockGames';

/**
 * EJEMPLO 1: Crear una actividad de Memorama (Vista Docente)
 */
export async function createMemoramaActivityExample() {
    console.log('=== EJEMPLO 1: Crear Actividad ===');

    const activityData = {
        name: 'Frutas en Mazahua',
        description: 'Memorama para aprender los nombres de frutas en idioma Mazahua',
        difficulty: 'medio',
        categoryId: 1, // Categoría "Frutas"
        mediaType: 'Imagen',
        language: 'ESP'
    };

    try {
        const response = await ActivityService.createActivity(activityData);

        if (response.success) {
            console.log('✅ Actividad creada:', response.activity);
            console.log('ID de la actividad:', response.activityId);
            console.log('XP recomendado:', response.activity.recommendedXP);
            return response.activity;
        } else {
            console.error('❌ Error:', response.error);
            console.error('Tipo de error:', response.errorType);
            return null;
        }
    } catch (error) {
        console.error('❌ Excepción no esperada:', error);
    }
}

/**
 * EJEMPLO 2: Validar que una actividad tiene suficientes pares
 */
export function validateActivityCompletenessExample() {
    console.log('=== EJEMPLO 2: Validar Completeness ===');

    try {
        // Validar categoría 1 (Frutas) con dificultad "medio"
        ActivityService.validateActivityCompleteness(1, 'medio');
        console.log('✅ Categoría Frutas tiene suficientes pares para dificultad medio');
    } catch (error) {
        console.error('❌ Validación falló:', error.message);
    }
}

/**
 * EJEMPLO 3: Calcular XP recomendado según configuración
 */
export async function calculateXPExample() {
    console.log('=== EJEMPLO 3: Calcular XP Recomendado ===');

    const configs = [
        { difficulty: 'fácil', mediaType: 'Texto' },
        { difficulty: 'medio', mediaType: 'Imagen' },
        { difficulty: 'difícil', mediaType: 'Audio' }
    ];

    for (const config of configs) {
        const xp = await ExperienceService.calculateRecommendedXP(
            config.difficulty,
            config.mediaType
        );
        console.log(
            `${config.mediaType} + ${config.difficulty}: ${xp} XP`
        );
    }
}

/**
 * EJEMPLO 4: Simular un juego completado y calcular puntuación
 */
export async function completeGameExample() {
    console.log('=== EJEMPLO 4: Completar Juego y Calcular Puntuación ===');

    // Simular estadísticas del juego
    const gameStats = {
        totalTime: 145,           // 2 minutos 25 segundos
        totalAttempts: 12,        // 12 intentos
        correctMatches: 4,        // 4 parejas encontradas
        totalPairs: 4,            // total de 4 parejas
        timeLimit: 300            // 5 minutos
    };

    // Calcular rating
    const ratingData = ExperienceService.calculateStarRating(gameStats);
    console.log('Estadísticas del juego:', gameStats);
    console.log('Rating calculado:', ratingData);
    console.log(`Estrellas obtenidas: ${ratingData.stars}/5`);
    console.log(`Puntuación total: ${ratingData.score}/100`);
}

/**
 * EJEMPLO 5: Calcular XP final basado en estrellas
 */
export function calculateFinalXPExample() {
    console.log('=== EJEMPLO 5: Calcular XP Final ===');

    const recommendedXP = 150;
    const starCombinations = [0, 1, 2, 3, 4, 5];

    console.log(`XP Recomendado: ${recommendedXP}`);
    console.log('Tabla de conversión:');

    starCombinations.forEach(stars => {
        const finalXP = ExperienceService.calculateFinalXP(recommendedXP, stars);
        const percentage = (finalXP / recommendedXP * 100).toFixed(0);
        console.log(`${stars}⭐ → ${finalXP} XP (${percentage}%)`);
    });
}

/**
 * EJEMPLO 6: Validar rango de XP
 */
export function validateXPRangeExample() {
    console.log('=== EJEMPLO 6: Validar Rango de XP ===');

    const testValues = [0, 25, 50, 100, 250, 500, 550, 1000];

    testValues.forEach(xp => {
        try {
            ExperienceService.validateXPRange(xp);
            console.log(`✅ ${xp} XP es válido`);
        } catch (error) {
            console.log(`❌ ${xp} XP es inválido: ${error.message}`);
        }
    });
}

/**
 * EJEMPLO 7: Flujo completo de juego (Docente → Alumno → Resultado)
 */
export async function completeGameFlowExample() {
    console.log('=== EJEMPLO 7: Flujo Completo de Juego ===');

    // PASO 1: Docente crea actividad
    console.log('\n📋 PASO 1: Docente crea actividad');
    const activityData = {
        name: 'Animales en Mazahua',
        description: 'Aprende a identificar animales',
        difficulty: 'fácil',
        categoryId: 2, // Animales
        mediaType: 'Imagen',
        language: 'MAZ'
    };

    const createResponse = await ActivityService.createActivity(activityData);
    if (!createResponse.success) {
        console.error('Error al crear actividad:', createResponse.error);
        return;
    }

    const activity = createResponse.activity;
    console.log('✅ Actividad creada:', activity.name);
    console.log('   ID:', activity.id);
    console.log('   XP Recomendado:', activity.recommendedXP);

    // PASO 2: Alumno obtiene actividad para jugar
    console.log('\n🎮 PASO 2: Alumno obtiene actividad');
    const playResponse = await ActivityService.getActivityForPlay(activity.id);
    if (!playResponse.success) {
        console.error('Error:', playResponse.error);
        return;
    }
    console.log('✅ Actividad lista para jugar');

    // PASO 3: Alumno juega y genera estadísticas
    console.log('\n⏱️ PASO 3: Alumno juega');
    const gameStats = {
        totalTime: 85,              // 1 minuto 25 segundos
        totalAttempts: 8,           // 8 intentos
        correctMatches: 3,          // 3 parejas encontradas
        totalPairs: 3,              // 3 parejas totales
        timeLimit: 300
    };
    console.log('   Tiempo jugado: 1m 25s');
    console.log('   Parejas encontradas: 3/3');
    console.log('   Intentos: 8');

    // PASO 4: Sistema calcula resultado
    console.log('\n📊 PASO 4: Sistema calcula resultado');
    const gameResult = await ExperienceService.processGameCompletion({
        activityId: activity.id,
        studentId: 'student_001',
        recommendedXP: activity.recommendedXP,
        gameStats
    });

    if (!gameResult.success) {
        console.error('Error en cálculo de resultado:', gameResult.error);
        return;
    }

    const result = gameResult.result;
    console.log(`✅ Resultado calculado:`);
    console.log(`   Estrellas: ${result.stars}/5`);
    console.log(`   Puntuación: ${result.score}/100`);
    console.log(`   XP Recomendado: ${result.recommendedXP}`);
    console.log(`   XP Obtenido: ${result.finalXP}`);
    console.log(`   Precisión: ${result.successRate}%`);

    // PASO 5: Guardar resultado
    console.log('\n💾 PASO 5: Guardar resultado');
    const saveResponse = await ActivityService.saveGameResult(result);
    if (saveResponse.success) {
        console.log('✅ Resultado guardado correctamente');
        console.log('   ID del resultado:', saveResponse.result.id);
    }

    return result;
}

/**
 * EJEMPLO 8: Obtener todas las actividades creadas
 */
export function getAllActivitiesExample() {
    console.log('=== EJEMPLO 8: Obtener Todas las Actividades ===');

    const activities = ActivityService.getAllActivities();
    console.log(`Total de actividades: ${activities.length}`);

    activities.forEach((activity, index) => {
        console.log(`\n${index + 1}. ${activity.name}`);
        console.log(`   ID: ${activity.id}`);
        console.log(`   Dificultad: ${activity.difficulty}`);
        console.log(`   XP: ${activity.recommendedXP}`);
        console.log(`   Pares: ${activity.pairs.length}`);
    });
}

/**
 * EJEMPLO 9: Obtener resultados de una actividad
 */
export function getActivityResultsExample() {
    console.log('=== EJEMPLO 9: Obtener Resultados de Actividad ===');

    // Primero, necesitamos crear una actividad y jugarla
    const activities = ActivityService.getAllActivities();
    if (activities.length === 0) {
        console.log('No hay actividades disponibles. Crea una primero.');
        return;
    }

    const activityId = activities[0].id;
    const results = ActivityService.getActivityResults(activityId);

    console.log(`Actividad: ${activities[0].name}`);
    console.log(`Total de resultados: ${results.length}`);

    results.forEach((result, index) => {
        console.log(`\n${index + 1}. Resultado`);
        console.log(`   Alumno: ${result.studentId}`);
        console.log(`   Estrellas: ${result.stars}/5`);
        console.log(`   XP Obtenido: ${result.finalXP}`);
        console.log(`   Fecha: ${new Date(result.timestamp).toLocaleString()}`);
    });
}

/**
 * EJEMPLO 10: Simular errores comunes
 */
export async function errorHandlingExample() {
    console.log('=== EJEMPLO 10: Manejo de Errores ===');

    // ERROR 1: Falta descripción
    console.log('\n❌ Error 1: Falta descripción');
    const errorResponse1 = await ActivityService.createActivity({
        name: 'Test',
        description: '',
        difficulty: 'medio',
        categoryId: 1,
        mediaType: 'Imagen',
        language: 'ESP'
    });
    console.log('Respuesta:', errorResponse1.error);

    // ERROR 2: Categoría sin suficientes pares
    console.log('\n❌ Error 2: Dificultad requiere más pares de lo disponible');
    const errorResponse2 = await ActivityService.createActivity({
        name: 'Colores',
        description: 'Memorama de colores',
        difficulty: 'difícil', // Requiere 5 pares, Colores solo tiene 4
        categoryId: 3,
        mediaType: 'Imagen',
        language: 'ESP'
    });
    console.log('Respuesta:', errorResponse2.error);
    console.log('Tipo de error:', errorResponse2.errorType);

    // ERROR 3: XP fuera de rango (simulado)
    console.log('\n❌ Error 3: XP fuera de rango permitido');
    try {
        ExperienceService.validateXPRange(1000);
    } catch (error) {
        console.log('Error:', error.message);
    }
}

/**
 * Ejecutar todos los ejemplos
 */
export async function runAllExamples() {
    console.clear();
    console.log('🎮 EJECUTANDO TODOS LOS EJEMPLOS DEL SISTEMA MEMORAMA\n');

    await createMemoramaActivityExample();
    validateActivityCompletenessExample();
    await calculateXPExample();
    await completeGameExample();
    calculateFinalXPExample();
    validateXPRangeExample();
    await completeGameFlowExample();
    getAllActivitiesExample();
    getActivityResultsExample();
    await errorHandlingExample();

    console.log('\n✅ TODOS LOS EJEMPLOS HAN SIDO EJECUTADOS');
    console.log('Abre la consola del navegador para ver los detalles');
}

// Exportar para usar en la consola del navegador:
// import { runAllExamples } from './examples/MemoramaUsageExamples';
// runAllExamples();