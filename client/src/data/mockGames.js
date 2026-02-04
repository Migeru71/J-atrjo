// client/src/data/mockGames.js
// Base de datos simulada con categorías de palabras para el Memorama
// Usa localStorage para persistir actividades y categorías entre recargas

const STORAGE_KEY_ACTIVITIES = 'mazahua_activities';
const STORAGE_KEY_RESULTS = 'mazahua_game_results';
const STORAGE_KEY_CATEGORIES = 'mazahua_categories';
const STORAGE_KEY_MEDIA = 'mazahua_media';

// Categorías por defecto
const defaultCategories = [
    {
        id: 1,
        name: "Frutas",
        language: "ESP",
        pairs: [
            { id: 1, spanish: "Manzana", mazahua: "Xanua", image: "/images/apple.jpg" },
            { id: 2, spanish: "Plátano", mazahua: "Jamba", image: "/images/banana.jpg" },
            { id: 3, spanish: "Naranja", mazahua: "Nalanja", image: "/images/orange.jpg" },
            { id: 4, spanish: "Fresa", mazahua: "Jresa", image: "/images/strawberry.jpg" },
            { id: 5, spanish: "Uva", mazahua: "Uba", image: "/images/grape.jpg" },
        ]
    },
    {
        id: 2,
        name: "Animales",
        language: "MAZ",
        pairs: [
            { id: 6, spanish: "Perro", mazahua: "Thogo", image: "/images/dog.jpg" },
            { id: 7, spanish: "Gato", mazahua: "Jatu", image: "/images/cat.jpg" },
            { id: 8, spanish: "Pájaro", mazahua: "Jomba", image: "/images/bird.jpg" },
            { id: 9, spanish: "Conejo", mazahua: "Kunejo", image: "/images/rabbit.jpg" },
            { id: 10, spanish: "Mariposa", mazahua: "Papaxo", image: "/images/butterfly.jpg" },
        ]
    },
    {
        id: 3,
        name: "Colores",
        language: "ESP",
        pairs: [
            { id: 11, spanish: "Rojo", mazahua: "Xiño", image: "/images/red.jpg" },
            { id: 12, spanish: "Azul", mazahua: "Jatje", image: "/images/blue.jpg" },
            { id: 13, spanish: "Verde", mazahua: "Xote", image: "/images/green.jpg" },
            { id: 14, spanish: "Amarillo", mazahua: "Xañatje", image: "/images/yellow.jpg" },
        ]
    }
];

// Actividad de prueba por defecto
const defaultActivities = [
    {
        id: 12345,
        name: "Frutas de Prueba",
        description: "Aprende los nombres de frutas en mazahua",
        difficulty: "fácil",
        activityMode: "wordPairs",
        pairs: [
            { id: 1, spanish: "Manzana", mazahua: "Xanua", image: "/images/apple.jpg" },
            { id: 2, spanish: "Plátano", mazahua: "Jamba", image: "/images/banana.jpg" },
            { id: 3, spanish: "Naranja", mazahua: "Nalanja", image: "/images/orange.jpg" }
        ],
        recommendedXP: 100
    }
];

// Función para cargar actividades desde localStorage
const loadActivities = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Error cargando actividades de localStorage:', e);
    }
    return [...defaultActivities];
};

// Función para guardar actividades en localStorage
const saveActivitiesToStorage = (activities) => {
    try {
        localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
        console.warn('Error guardando actividades en localStorage:', e);
    }
};

// Función para cargar categorías desde localStorage
const loadCategories = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_CATEGORIES);
        if (stored) {
            const customCategories = JSON.parse(stored);
            // Combinar categorías por defecto con las personalizadas
            return [...defaultCategories, ...customCategories];
        }
    } catch (e) {
        console.warn('Error cargando categorías de localStorage:', e);
    }
    return [...defaultCategories];
};

// Función para guardar categorías personalizadas en localStorage
const saveCategoriesToStorage = (categories) => {
    try {
        // Solo guardamos las categorías que no están en las por defecto
        const defaultIds = defaultCategories.map(c => c.id);
        const customCategories = categories.filter(c => !defaultIds.includes(c.id));
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(customCategories));
    } catch (e) {
        console.warn('Error guardando categorías en localStorage:', e);
    }
};

// Función para cargar resultados desde localStorage
const loadGameResults = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_RESULTS);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Error cargando resultados de localStorage:', e);
    }
    return [];
};

// Función para guardar resultados en localStorage
const saveResultsToStorage = (results) => {
    try {
        localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(results));
    } catch (e) {
        console.warn('Error guardando resultados en localStorage:', e);
    }
};

// Función para guardar media (imágenes/audio) en localStorage
const saveMediaToStorage = (mediaId, mediaData) => {
    try {
        const existingMedia = JSON.parse(localStorage.getItem(STORAGE_KEY_MEDIA) || '{}');
        existingMedia[mediaId] = mediaData;
        localStorage.setItem(STORAGE_KEY_MEDIA, JSON.stringify(existingMedia));
        return mediaId;
    } catch (e) {
        console.warn('Error guardando media en localStorage:', e);
        return null;
    }
};

// Función para cargar media desde localStorage
const loadMediaFromStorage = (mediaId) => {
    try {
        const existingMedia = JSON.parse(localStorage.getItem(STORAGE_KEY_MEDIA) || '{}');
        return existingMedia[mediaId] || null;
    } catch (e) {
        console.warn('Error cargando media de localStorage:', e);
        return null;
    }
};

const mockGames = {
    // Categorías cargadas desde localStorage
    categories: loadCategories(),

    // Actividades cargadas desde localStorage
    activities: loadActivities(),

    // Resultados de juegos cargados desde localStorage
    gameResults: loadGameResults(),

    // ========== MÉTODOS PARA CATEGORÍAS ==========

    // Crear nueva categoría
    createCategory(categoryData) {
        const newCategory = {
            id: Date.now(),
            name: categoryData.name,
            language: categoryData.language || 'ESP',
            pairs: categoryData.pairs || [],
            createdAt: new Date().toISOString(),
            isCustom: true
        };
        this.categories.push(newCategory);
        saveCategoriesToStorage(this.categories);
        console.log('✅ Categoría creada:', newCategory.id, newCategory.name);
        return newCategory;
    },

    // Agregar pares a una categoría existente
    addPairsToCategory(categoryId, pairs) {
        const category = this.categories.find(c => c.id === categoryId);
        if (category) {
            const maxId = Math.max(...category.pairs.map(p => p.id), 0);
            const newPairs = pairs.map((pair, index) => ({
                ...pair,
                id: maxId + index + 1
            }));
            category.pairs = [...category.pairs, ...newPairs];
            saveCategoriesToStorage(this.categories);
            return category;
        }
        return null;
    },

    // Obtener categoría
    getCategory(categoryId) {
        return this.categories.find(c => c.id === categoryId);
    },

    // Obtener todas las categorías
    getAllCategories() {
        return this.categories;
    },

    // ========== MÉTODOS PARA ACTIVIDADES ==========

    // Guardar actividad
    saveActivity(activity) {
        const newActivity = {
            ...activity,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: "created"
        };
        this.activities.push(newActivity);
        saveActivitiesToStorage(this.activities);
        console.log('✅ Actividad guardada:', newActivity.id, newActivity.name);
        return newActivity;
    },

    // Crear actividad con nueva categoría
    createActivityWithCategory(activityData, categoryName) {
        // Primero crear la categoría con los pares
        const pairs = activityData.wordPairs ? activityData.wordPairs.map((wp, index) => ({
            id: index + 1,
            spanish: wp.stimulus,
            mazahua: wp.response,
            image: wp.image || null,
            audio: wp.audio || null
        })) : [];

        const newCategory = this.createCategory({
            name: categoryName,
            language: activityData.language || 'ESP',
            pairs: pairs
        });

        // Luego crear la actividad asociada a esa categoría
        const newActivity = {
            ...activityData,
            categoryId: newCategory.id,
            pairs: pairs,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: "created"
        };

        this.activities.push(newActivity);
        saveActivitiesToStorage(this.activities);
        console.log('✅ Actividad con categoría creada:', newActivity.id, newActivity.name);

        return { activity: newActivity, category: newCategory };
    },

    // Obtener una actividad
    getActivity(activityId) {
        console.log('🔍 Buscando actividad con ID:', activityId);
        const activity = this.activities.find(a => a.id === activityId);
        console.log('📦 Actividad encontrada:', activity ? activity.name : 'NO ENCONTRADA');
        return activity;
    },

    // Obtener todas las actividades
    getAllActivities() {
        return this.activities;
    },

    // Eliminar actividad
    deleteActivity(activityId) {
        const index = this.activities.findIndex(a => a.id === activityId);
        if (index !== -1) {
            const deleted = this.activities.splice(index, 1)[0];
            saveActivitiesToStorage(this.activities);
            console.log('🗑️ Actividad eliminada:', deleted.name);
            return { success: true, deleted };
        }
        return { success: false, error: 'Actividad no encontrada' };
    },

    // Actualizar actividad
    updateActivity(activityId, updates) {
        const activity = this.activities.find(a => a.id === activityId);
        if (activity) {
            Object.assign(activity, updates, { updatedAt: new Date().toISOString() });
            saveActivitiesToStorage(this.activities);
            console.log('✏️ Actividad actualizada:', activity.name);
            return { success: true, activity };
        }
        return { success: false, error: 'Actividad no encontrada' };
    },

    // ========== MÉTODOS PARA RESULTADOS ==========

    // Guardar resultado de juego
    saveGameResult(result) {
        const newResult = {
            ...result,
            id: Date.now(),
            timestamp: new Date().toISOString()
        };
        this.gameResults.push(newResult);
        saveResultsToStorage(this.gameResults);
        return newResult;
    },

    // Obtener resultados de una actividad
    getActivityResults(activityId) {
        return this.gameResults.filter(r => r.activityId === activityId);
    },

    // ========== MÉTODOS PARA MEDIA ==========

    // Guardar imagen en localStorage (base64)
    saveImage(imageData) {
        const mediaId = 'img_' + Date.now();
        saveMediaToStorage(mediaId, {
            type: 'image',
            data: imageData,
            createdAt: new Date().toISOString()
        });
        return mediaId;
    },

    // Guardar audio en localStorage (base64)
    saveAudio(audioData) {
        const mediaId = 'audio_' + Date.now();
        saveMediaToStorage(mediaId, {
            type: 'audio',
            data: audioData,
            createdAt: new Date().toISOString()
        });
        return mediaId;
    },

    // Obtener media por ID
    getMedia(mediaId) {
        return loadMediaFromStorage(mediaId);
    },

    // Convertir File a base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
};

export default mockGames;