// client/src/data/mockQuiz.js
// Base de datos simulada para Quiz con persistencia en localStorage

const STORAGE_KEY_QUIZ_ACTIVITIES = 'mazahua_quiz_activities';
const STORAGE_KEY_QUIZ_RESULTS = 'mazahua_quiz_results';
const STORAGE_KEY_QUIZ_CATEGORIES = 'mazahua_quiz_categories';

// Categorías por defecto para Quiz
const defaultQuizCategories = [
    {
        id: 1,
        name: "Animales",
        language: "ESP",
        questions: [
            {
                id: 1,
                question: "¿Cómo se dice 'Perro' en Mazahua?",
                questionLang: "ESP",
                image: null,
                audio: null,
                options: [
                    { id: 1, text: "Thogo", isCorrect: true },
                    { id: 2, text: "Jatu", isCorrect: false },
                    { id: 3, text: "Jomba", isCorrect: false },
                    { id: 4, text: "Kunejo", isCorrect: false }
                ]
            },
            {
                id: 2,
                question: "¿Qué animal es 'Jatu'?",
                questionLang: "ESP",
                image: null,
                audio: null,
                options: [
                    { id: 1, text: "Perro", isCorrect: false },
                    { id: 2, text: "Gato", isCorrect: true },
                    { id: 3, text: "Pájaro", isCorrect: false },
                    { id: 4, text: "Conejo", isCorrect: false }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Colores",
        language: "ESP",
        questions: [
            {
                id: 1,
                question: "¿Cómo se dice 'Rojo' en Mazahua?",
                questionLang: "ESP",
                options: [
                    { id: 1, text: "Xiño", isCorrect: true },
                    { id: 2, text: "Jatje", isCorrect: false },
                    { id: 3, text: "Xote", isCorrect: false },
                    { id: 4, text: "Xañatje", isCorrect: false }
                ]
            }
        ]
    }
];

// Actividades de Quiz por defecto
const defaultQuizActivities = [
    {
        id: 99999,
        name: "Quiz de Animales",
        description: "Identifica los nombres de animales en Mazahua",
        difficulty: "fácil",
        categoryId: 1,
        questions: defaultQuizCategories[0].questions,
        recommendedXP: 150,
        createdAt: new Date().toISOString()
    }
];

// Funciones de localStorage
const loadQuizActivities = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_QUIZ_ACTIVITIES);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.warn('Error cargando quiz activities:', e);
    }
    return [...defaultQuizActivities];
};

const saveQuizActivitiesToStorage = (activities) => {
    try {
        localStorage.setItem(STORAGE_KEY_QUIZ_ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
        console.warn('Error guardando quiz activities:', e);
    }
};

const loadQuizCategories = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_QUIZ_CATEGORIES);
        if (stored) {
            const custom = JSON.parse(stored);
            return [...defaultQuizCategories, ...custom];
        }
    } catch (e) {
        console.warn('Error cargando quiz categories:', e);
    }
    return [...defaultQuizCategories];
};

const saveQuizCategoriesToStorage = (categories) => {
    try {
        const defaultIds = defaultQuizCategories.map(c => c.id);
        const custom = categories.filter(c => !defaultIds.includes(c.id));
        localStorage.setItem(STORAGE_KEY_QUIZ_CATEGORIES, JSON.stringify(custom));
    } catch (e) {
        console.warn('Error guardando quiz categories:', e);
    }
};

const loadQuizResults = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_QUIZ_RESULTS);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.warn('Error cargando quiz results:', e);
    }
    return [];
};

const saveQuizResultsToStorage = (results) => {
    try {
        localStorage.setItem(STORAGE_KEY_QUIZ_RESULTS, JSON.stringify(results));
    } catch (e) {
        console.warn('Error guardando quiz results:', e);
    }
};

const mockQuiz = {
    categories: loadQuizCategories(),
    activities: loadQuizActivities(),
    results: loadQuizResults(),

    // ========== VALIDACIÓN ==========
    validateQuizActivity(activityData) {
        const errors = [];

        if (!activityData.name || activityData.name.trim().length < 3) {
            errors.push('El nombre debe tener al menos 3 caracteres');
        }

        if (!activityData.questions || activityData.questions.length < 1) {
            errors.push('Se requiere al menos 1 pregunta');
        }

        if (activityData.questions) {
            activityData.questions.forEach((q, index) => {
                if (!q.question || q.question.trim().length < 3) {
                    errors.push(`Pregunta ${index + 1}: texto requerido`);
                }

                const validOptions = q.options?.filter(o => o.text && o.text.trim()) || [];
                if (validOptions.length < 2) {
                    errors.push(`Pregunta ${index + 1}: mínimo 2 opciones`);
                }

                const hasCorrect = q.options?.some(o => o.isCorrect);
                if (!hasCorrect) {
                    errors.push(`Pregunta ${index + 1}: debe tener respuesta correcta`);
                }
            });
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    },

    // ========== CATEGORÍAS ==========
    createCategory(categoryData) {
        const newCategory = {
            id: Date.now(),
            name: categoryData.name,
            language: categoryData.language || 'ESP',
            questions: categoryData.questions || [],
            createdAt: new Date().toISOString(),
            isCustom: true
        };
        this.categories.push(newCategory);
        saveQuizCategoriesToStorage(this.categories);
        return newCategory;
    },

    getCategory(categoryId) {
        return this.categories.find(c => c.id === categoryId);
    },

    getAllCategories() {
        return this.categories;
    },

    // ========== ACTIVIDADES ==========
    createActivity(activityData) {
        const validation = this.validateQuizActivity(activityData);
        if (!validation.isValid) {
            return { success: false, errors: validation.errors };
        }

        const newActivity = {
            ...activityData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'created'
        };

        this.activities.push(newActivity);
        saveQuizActivitiesToStorage(this.activities);

        return { success: true, activity: newActivity };
    },

    createActivityWithCategory(activityData, categoryName) {
        // Crear categoría con las preguntas
        const newCategory = this.createCategory({
            name: categoryName,
            language: activityData.language || 'ESP',
            questions: activityData.questions || []
        });

        // Crear actividad
        const newActivity = {
            ...activityData,
            categoryId: newCategory.id,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'created'
        };

        this.activities.push(newActivity);
        saveQuizActivitiesToStorage(this.activities);

        return { activity: newActivity, category: newCategory };
    },

    getActivity(activityId) {
        return this.activities.find(a => a.id === activityId);
    },

    getAllActivities() {
        return this.activities;
    },

    // Eliminar actividad
    deleteActivity(activityId) {
        const index = this.activities.findIndex(a => a.id === activityId);
        if (index !== -1) {
            const deleted = this.activities.splice(index, 1)[0];
            saveQuizActivitiesToStorage(this.activities);
            console.log('🗑️ Quiz eliminado:', deleted.name);
            return { success: true, deleted };
        }
        return { success: false, error: 'Quiz no encontrado' };
    },

    // Actualizar actividad
    updateActivity(activityId, updates) {
        const activity = this.activities.find(a => a.id === activityId);
        if (activity) {
            Object.assign(activity, updates, { updatedAt: new Date().toISOString() });
            saveQuizActivitiesToStorage(this.activities);
            console.log('✏️ Quiz actualizado:', activity.name);
            return { success: true, activity };
        }
        return { success: false, error: 'Quiz no encontrado' };
    },

    // ========== RESULTADOS ==========
    saveResult(result) {
        const newResult = {
            ...result,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        this.results.push(newResult);
        saveQuizResultsToStorage(this.results);
        return newResult;
    },

    getActivityResults(activityId) {
        return this.results.filter(r => r.activityId === activityId);
    },

    // ========== XP ==========
    calculateXP(difficulty, questionCount) {
        const baseXP = { 'fácil': 50, 'medio': 100, 'difícil': 150 };
        const base = baseXP[difficulty] || 100;
        return base + (questionCount * 25);
    }
};

export default mockQuiz;
