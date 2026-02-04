// client/src/services/ActivityService.js
// Servicio encargado de crear, validar y gestionar actividades

import mockGames from '../data/mockGames';

// Excepciones personalizadas
class ActivityIncompleteException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ActivityIncompleteException';
    }
}

class ActivityService {
    /**
     * CU-013: Crear Actividad
     * Paso 2: Completa datos base (nombre, descripción, dificultad)
     */
    validateActivityData(activityData) {
        const { name, description, difficulty, categoryId } = activityData;

        if (!name || name.trim().length === 0) {
            throw new Error('El nombre de la actividad es requerido');
        }

        if (!description || description.trim().length === 0) {
            throw new Error('La descripción es requerida');
        }

        if (!difficulty || !['fácil', 'medio', 'difícil'].includes(difficulty)) {
            throw new Error('La dificultad debe ser: fácil, medio o difícil');
        }

        if (!categoryId) {
            throw new Error('Debes seleccionar una categoría');
        }

        return true;
    }

    /**
     * Valida que la categoría tenga suficientes pares según la dificultad
     * CU-013: Paso 3 (simulado)
     */
    validateActivityCompleteness(categoryId, difficulty) {
        // Convertimos a número para asegurar la comparación
        const idNum = parseInt(categoryId);
        const category = mockGames.getCategory(idNum);

        // Verificamos si la categoría existe antes de leer .pairs
        if (!category) {
            throw new ActivityIncompleteException(`Categoría con ID ${categoryId} no encontrada.`);
        }

        const requiredPairs = { fácil: 3, medio: 4, difícil: 5 };
        const required = requiredPairs[difficulty];

        if (category.pairs.length < required) {
            throw new ActivityIncompleteException(
                `No hay suficientes palabras. Se requieren ${required} pares, pero la categoría solo tiene ${category.pairs.length}`
            );
        }

        return true;
    }

    /**
     * CU-013: Crear la actividad
     * Simula el paso 4: POST /api/activities/calculate-score
     */
    async createActivity(activityData) {
        try {
            // Paso 2: Validar datos base
            this.validateActivityData(activityData);

            // Paso 3: Validar completeness (suficientes palabras)
            this.validateActivityCompleteness(activityData.categoryId, activityData.difficulty);

            // Paso 4: Calcular puntuación recomendada (delegado a ExperienceService)
            const experienceService = await import('./ExperienceService').then(m => m.default);
            const recommendedXP = await experienceService.calculateRecommendedXP(
                activityData.difficulty,
                activityData.mediaType
            );

            // Crear objeto de actividad
            const activity = {
                ...activityData,
                recommendedXP,
                pairs: this._getPairsForDifficulty(
                    activityData.categoryId,
                    activityData.difficulty
                ),
                status: 'created'
            };

            // Guardar actividad
            const savedActivity = mockGames.saveActivity(activity);

            // Paso 12: POST /api/activities
            return {
                success: true,
                activityId: savedActivity.id,
                activity: savedActivity,
                message: 'Actividad creada exitosamente'
            };

        } catch (error) {
            if (error instanceof ActivityIncompleteException) {
                return {
                    success: false,
                    error: error.message,
                    errorType: 'ActivityIncompleteException',
                    code: 400
                };
            }

            return {
                success: false,
                error: error.message,
                code: 400
            };
        }
    }

    /**
     * Obtiene los pares según la dificultad
     */
    _getPairsForDifficulty(categoryId, difficulty) {
        const idNum = parseInt(categoryId); // Conversión necesaria
        const category = mockGames.getCategory(idNum);

        if (!category || !category.pairs) return []; // Seguridad extra

        const requiredPairs = { fácil: 3, medio: 4, difícil: 5 };
        const count = requiredPairs[difficulty];

        return category.pairs.slice(0, count);
    }

    /**
     * CU-014: Validar antes de iniciar el juego
     * Paso 18: validateXP(value, config)
     */
    validateXPRange(xpValue, minXP = 50, maxXP = 500) {
        if (xpValue < minXP || xpValue > maxXP) {
            return {
                valid: false,
                error: `El XP debe estar entre ${minXP} y ${maxXP}`,
                errorType: 'InvalidXPException'
            };
        }
        return { valid: true };
    }

    /**
     * Obtener una actividad para jugar
     * CU-014: Validación inicial
     */
    // client/src/services/ActivityService.js

    async getActivityForPlay(activityId) {
        try {
            // CONVERSIÓN CRUCIAL: Aseguramos que el ID sea un número
            const idNum = parseInt(activityId);
            const activity = mockGames.getActivity(idNum);

            if (!activity) {
                // Este es el error que estás viendo actualmente
                throw new ActivityIncompleteException('Actividad no encontrada');
            }

            // Resto de las validaciones de pares y XP...
            if (!activity.pairs || activity.pairs.length < 2) {
                throw new ActivityIncompleteException('La actividad no tiene suficientes pares para jugar');
            }

            return {
                success: true,
                activity,
                message: 'Actividad lista para jugar'
            };

        } catch (error) {
            return {
                success: false,
                error: error.message,
                errorType: error.name
            };
        }
    }

    /**
     * CU-014: Guardar resultado del juego
     */
    async saveGameResult(result) {
        try {
            const savedResult = mockGames.saveGameResult(result);

            return {
                success: true,
                result: savedResult,
                message: 'Resultado guardado exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Obtener todas las actividades
     */
    getAllActivities() {
        return mockGames.getAllActivities();
    }

    /**
     * Obtener resultados de una actividad
     */
    getActivityResults(activityId) {
        return mockGames.getActivityResults(activityId);
    }
}

export default new ActivityService();
export { ActivityIncompleteException };