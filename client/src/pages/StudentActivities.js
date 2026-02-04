import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';

/**
 * Página de actividades de aprendizaje para estudiantes
 * Muestra actividades organizadas por categoría (Pronunciación, Gramática, Vocabulario)
 */
const StudentActivities = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Mock user data
    const user = {
        id: 'student_001',
        name: 'Maria Gonzalez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        level: 'A1'
    };

    // Filtros disponibles
    const filters = [
        { id: 'all', label: 'Todas' },
        { id: 'not-started', label: 'Sin Iniciar' },
        { id: 'in-progress', label: 'En Progreso' },
        { id: 'completed', label: 'Completadas' }
    ];

    // Categorías y actividades
    const categories = [
        {
            id: 'pronunciation',
            title: 'Pronunciación',
            icon: '🗣️',
            activities: [
                {
                    id: 'memorama_pronunciation',
                    title: 'Memorama de Pronunciación',
                    gameType: 'memorama',
                    difficulty: 'FÁCIL',
                    difficultyColor: 'bg-green-100 text-green-600',
                    description: 'Practica la pronunciación correcta del Mazahua con tarjetas de memoria interactivas.',
                    xp: 50,
                    progress: 75,
                    status: 'in-progress',
                    icon: '🎴',
                    iconBg: 'bg-purple-100',
                    path: '/games/memorama'
                },
                {
                    id: 'quiz_pronunciation',
                    title: 'Quiz de Pronunciación',
                    gameType: 'quiz',
                    difficulty: 'MEDIA',
                    difficultyColor: 'bg-amber-100 text-amber-600',
                    description: 'Pon a prueba tu conocimiento de la pronunciación con preguntas interactivas.',
                    xp: 75,
                    progress: 0,
                    status: 'not-started',
                    icon: '❓',
                    iconBg: 'bg-amber-100',
                    path: '/games/quiz'
                }
            ]
        },
        {
            id: 'grammar',
            title: 'Gramática',
            icon: '📖',
            activities: [
                {
                    id: 'memorama_grammar',
                    title: 'Memorama de Gramática',
                    gameType: 'memorama',
                    difficulty: 'MEDIA',
                    difficultyColor: 'bg-amber-100 text-amber-600',
                    description: 'Aprende las reglas gramaticales del Mazahua emparejando tarjetas.',
                    xp: 60,
                    progress: 100,
                    status: 'completed',
                    icon: '🎴',
                    iconBg: 'bg-teal-100',
                    path: '/games/memorama'
                },
                {
                    id: 'quiz_grammar',
                    title: 'Quiz de Gramática',
                    gameType: 'quiz',
                    difficulty: 'DIFÍCIL',
                    difficultyColor: 'bg-red-100 text-red-600',
                    description: 'Evalúa tu dominio de la gramática Mazahua con preguntas desafiantes.',
                    xp: 120,
                    progress: 45,
                    status: 'in-progress',
                    icon: '❓',
                    iconBg: 'bg-indigo-100',
                    path: '/games/quiz'
                }
            ]
        },
        {
            id: 'vocabulary',
            title: 'Vocabulario',
            icon: '📚',
            activities: [
                {
                    id: 'memorama_vocabulary',
                    title: 'Memorama de Vocabulario',
                    gameType: 'memorama',
                    difficulty: 'FÁCIL',
                    difficultyColor: 'bg-green-100 text-green-600',
                    description: 'Expande tu vocabulario en Mazahua con tarjetas de memoria divertidas.',
                    xp: 40,
                    progress: 60,
                    status: 'in-progress',
                    icon: '�',
                    iconBg: 'bg-orange-100',
                    path: '/games/memorama'
                },
                {
                    id: 'quiz_vocabulary',
                    title: 'Quiz de Vocabulario',
                    gameType: 'quiz',
                    difficulty: 'FÁCIL',
                    difficultyColor: 'bg-green-100 text-green-600',
                    description: 'Demuestra tu conocimiento del vocabulario Mazahua en este quiz.',
                    xp: 55,
                    progress: 100,
                    status: 'completed',
                    icon: '❓',
                    iconBg: 'bg-rose-100',
                    path: '/games/quiz'
                }
            ]
        }
    ];

    // Filtrar actividades según el filtro activo
    const filterActivities = (activities) => {
        if (activeFilter === 'all') return activities;
        return activities.filter(a => a.status === activeFilter);
    };

    // Obtener label y estilo del botón según el estado
    const getActionButton = (activity) => {
        if (activity.status === 'completed') {
            return { label: 'Ver Resultados', style: 'outline' };
        } else if (activity.status === 'in-progress') {
            return { label: 'Continuar', style: 'filled' };
        } else {
            return { label: 'Iniciar Actividad', style: 'filled' };
        }
    };

    // Componente de tarjeta de actividad
    const ActivityCard = ({ activity }) => {
        const actionBtn = getActionButton(activity);

        return (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${activity.iconBg} flex items-center justify-center text-2xl`}>
                        {activity.icon}
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-500">
                        <span className="material-symbols-outlined text-base">emoji_events</span>
                        <span className="text-sm font-bold">+{activity.xp} XP</span>
                    </div>
                </div>

                {/* Title and Difficulty */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-bold text-gray-800">{activity.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activity.difficultyColor}`}>
                        {activity.difficulty}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {activity.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Progreso</span>
                        <span className={`font-semibold ${activity.progress === 100 ? 'text-green-500' : 'text-amber-500'}`}>
                            {activity.progress}%
                        </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${activity.progress === 100 ? 'bg-green-400' : 'bg-amber-400'
                                }`}
                            style={{ width: `${activity.progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Action Button - Goes to Memorama or Quiz */}
                <Link
                    to={activity.path}
                    className={`block w-full py-3 text-center font-semibold rounded-xl transition-all ${actionBtn.style === 'filled'
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    {actionBtn.label}
                </Link>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background-start to-background-end">
            {/* Sidebar */}
            <DashboardSidebar user={user} />

            {/* Main Content */}
            <main className="pl-64 min-h-screen">
                <div className="max-w-4xl mx-auto p-8">
                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Actividades de Aprendizaje</h1>
                                <p className="text-gray-500 mt-1">Selecciona una categoría para practicar y ganar XP.</p>
                            </div>

                            {/* Filter Pills */}
                            <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-gray-200 shadow-sm">
                                {filters.map((filter) => (
                                    <button
                                        key={filter.id}
                                        onClick={() => setActiveFilter(filter.id)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeFilter === filter.id
                                            ? 'bg-amber-400 text-white'
                                            : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </header>

                    {/* Categories */}
                    {categories.map((category) => {
                        const filteredActivities = filterActivities(category.activities);
                        if (filteredActivities.length === 0) return null;

                        return (
                            <section key={category.id} className="mb-10">
                                {/* Section Header */}
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <span className="text-xl">{category.icon}</span>
                                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                                        {category.title}
                                    </h2>
                                </div>

                                {/* Activity Cards Grid - 2 cards per row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredActivities.map((activity) => (
                                        <ActivityCard key={activity.id} activity={activity} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {/* Empty State */}
                    {categories.every(cat => filterActivities(cat.activities).length === 0) && (
                        <div className="text-center py-16">
                            <span className="text-6xl mb-4 block">🔍</span>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No se encontraron actividades</h3>
                            <p className="text-gray-500">Intenta seleccionar un filtro diferente.</p>
                        </div>
                    )}

                    {/* Challenge Banner */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">¿Listo para un desafío?</h3>
                                <p className="text-sm text-gray-500">¡Completa 3 actividades más hoy para mantener tu racha de 12 días!</p>
                            </div>
                        </div>
                        <Link
                            to="/estudiante/leaderboard"
                            className="px-6 py-3 bg-amber-400 text-white font-semibold rounded-xl hover:bg-amber-500 transition-colors whitespace-nowrap"
                        >
                            Ver Tabla de Líderes
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentActivities;
