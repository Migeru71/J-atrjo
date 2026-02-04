// client/src/components/Games/Quiz/QuizAccessPanel.js
// Panel de acceso a actividades de Quiz
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockQuiz from '../../../data/mockQuiz';
import './Quiz.css';

function QuizAccessPanel() {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('student');

    useEffect(() => {
        loadActivities();
    }, []);

    const loadActivities = () => {
        setLoading(true);
        setTimeout(() => {
            setActivities(mockQuiz.getAllActivities());
            setLoading(false);
        }, 300);
    };

    const handlePlayQuiz = (activityId) => {
        navigate('/games/quiz/jugar/' + activityId);
    };

    const handleCreateQuiz = () => {
        navigate('/games/quiz/crear');
    };

    const handleEditQuiz = (activityId) => {
        navigate('/games/quiz/editar/' + activityId);
    };

    const handleDeleteQuiz = (activityId, activityName) => {
        if (window.confirm('¿Eliminar "' + activityName + '"? Esta acción no se puede deshacer.')) {
            const result = mockQuiz.deleteActivity(activityId);
            if (result.success) {
                loadActivities();
            }
        }
    };

    const getDifficultyColor = (difficulty) => ({
        'fácil': '#22c55e', 'medio': '#f59e0b', 'difícil': '#ef4444'
    }[difficulty] || '#6b7280');

    const getDifficultyLabel = (difficulty) => ({
        'fácil': '🟢 Fácil', 'medio': '🟡 Medio', 'difícil': '🔴 Difícil'
    }[difficulty] || difficulty);

    return React.createElement('div', { className: 'quiz-access-panel' },
        // Header
        React.createElement('div', { className: 'quiz-panel-header' },
            React.createElement('span', { style: { fontSize: '56px', marginBottom: '8px', display: 'block' } }, '❓'),
            React.createElement('h1', null, 'Centro de Quiz'),
            React.createElement('p', null, 'Pon a prueba tus conocimientos de Mazahua')
        ),

        // Role Selector
        React.createElement('div', { className: 'role-selector', style: { marginBottom: '2rem' } },
            React.createElement('button', {
                className: `role-btn ${userRole === 'student' ? 'active' : ''}`,
                onClick: () => setUserRole('student'),
                style: userRole === 'student' ? { background: '#7c3aed', borderColor: '#7c3aed' } : {}
            }, '👨‍🎓 Soy Alumno'),
            React.createElement('button', {
                className: `role-btn ${userRole === 'teacher' ? 'active' : ''}`,
                onClick: () => setUserRole('teacher'),
                style: userRole === 'teacher' ? { background: '#7c3aed', borderColor: '#7c3aed' } : {}
            }, '👨‍🏫 Soy Docente')
        ),

        // Content based on role
        userRole === 'teacher' ?
            React.createElement('div', { className: 'role-content' },
                // Create section
                React.createElement('div', { className: 'teacher-section', style: { background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' } },
                    React.createElement('div', {
                        style: {
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px', fontSize: '36px', border: '3px solid #c4b5fd'
                        }
                    }, '✨'),
                    React.createElement('h2', { style: { textAlign: 'center', color: '#5b21b6', marginBottom: '0.5rem' } }, 'Crear Nuevo Quiz'),
                    React.createElement('p', { style: { textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' } },
                        'Diseña cuestionarios interactivos para evaluar a tus alumnos.'
                    ),
                    React.createElement('button', {
                        className: 'btn-play-quiz',
                        onClick: handleCreateQuiz,
                        style: { maxWidth: '280px', margin: '0 auto', display: 'block' }
                    }, '🚀 Crear Quiz')
                ),
                // Activities list
                React.createElement('div', { style: { maxWidth: '1200px', margin: '0 auto' } },
                    React.createElement('h3', { style: { color: '#5b21b6', marginBottom: '1rem', textAlign: 'center' } }, '📊 Mis Quizzes Creados'),
                    activities.length === 0 ?
                        React.createElement('p', { style: { textAlign: 'center', color: '#6b7280' } }, 'Aún no has creado quizzes') :
                        React.createElement('div', { className: 'quiz-activities-grid' },
                            activities.map(activity =>
                                React.createElement('div', { key: activity.id, className: 'quiz-activity-card', style: { position: 'relative' } },
                                    // Botones editar/eliminar arriba a la derecha
                                    React.createElement('div', {
                                        style: {
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            display: 'flex',
                                            gap: '6px'
                                        }
                                    },
                                        React.createElement('button', {
                                            onClick: (e) => { e.stopPropagation(); handleEditQuiz(activity.id); },
                                            title: 'Editar',
                                            style: {
                                                padding: '6px 10px',
                                                background: '#f3e8ff',
                                                border: '1px solid #c4b5fd',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                            }
                                        }, '✏️'),
                                        React.createElement('button', {
                                            onClick: (e) => { e.stopPropagation(); handleDeleteQuiz(activity.id, activity.name); },
                                            title: 'Eliminar',
                                            style: {
                                                padding: '6px 10px',
                                                background: '#fef2f2',
                                                border: '1px solid #fecaca',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                            }
                                        }, '🗑️')
                                    ),
                                    React.createElement('div', { className: 'quiz-card-header' },
                                        React.createElement('div', { className: 'quiz-card-icon' }, '❓'),
                                        React.createElement('div', null,
                                            React.createElement('h3', { className: 'quiz-card-title', style: { paddingRight: '70px' } }, activity.name),
                                            React.createElement('span', {
                                                className: 'quiz-card-badge',
                                                style: {
                                                    background: getDifficultyColor(activity.difficulty) + '20',
                                                    color: getDifficultyColor(activity.difficulty)
                                                }
                                            }, getDifficultyLabel(activity.difficulty))
                                        )
                                    ),
                                    React.createElement('p', { className: 'quiz-card-description' }, activity.description),
                                    React.createElement('div', { className: 'quiz-card-stats' },
                                        React.createElement('span', null, '❓ ', (activity.questions?.length || 0), ' preguntas'),
                                        React.createElement('span', null, '⭐ ', activity.recommendedXP, ' XP')
                                    )
                                )
                            )
                        )
                )
            ) :
            // Student view
            React.createElement('div', { className: 'role-content' },
                React.createElement('h2', { style: { textAlign: 'center', color: '#5b21b6', marginBottom: '2rem' } }, '❓ Quizzes Disponibles'),
                loading ?
                    React.createElement('p', { style: { textAlign: 'center', color: '#6b7280' } }, '⏳ Cargando...') :
                    activities.length === 0 ?
                        React.createElement('div', { style: { textAlign: 'center', padding: '3rem' } },
                            React.createElement('span', { style: { fontSize: '64px', display: 'block', marginBottom: '16px' } }, '📚'),
                            React.createElement('p', { style: { color: '#374151', fontSize: '18px' } }, 'No hay quizzes disponibles'),
                            React.createElement('p', { style: { color: '#6b7280' } }, 'Pide a tu maestro que cree un quiz')
                        ) :
                        React.createElement('div', { className: 'quiz-activities-grid' },
                            activities.map(activity =>
                                React.createElement('div', { key: activity.id, className: 'quiz-activity-card' },
                                    React.createElement('div', { className: 'quiz-card-header' },
                                        React.createElement('div', { className: 'quiz-card-icon' }, '❓'),
                                        React.createElement('div', null,
                                            React.createElement('h3', { className: 'quiz-card-title' }, activity.name),
                                            React.createElement('span', {
                                                className: 'quiz-card-badge',
                                                style: {
                                                    background: getDifficultyColor(activity.difficulty) + '20',
                                                    color: getDifficultyColor(activity.difficulty)
                                                }
                                            }, getDifficultyLabel(activity.difficulty))
                                        )
                                    ),
                                    React.createElement('p', { className: 'quiz-card-description' }, activity.description),
                                    React.createElement('div', { className: 'quiz-card-stats' },
                                        React.createElement('span', null, '❓ ', (activity.questions?.length || 0), ' preguntas'),
                                        React.createElement('span', null, '⭐ ', activity.recommendedXP, ' XP')
                                    ),
                                    React.createElement('button', {
                                        className: 'btn-play-quiz',
                                        onClick: () => handlePlayQuiz(activity.id)
                                    }, '▶️ ¡Comenzar Quiz!')
                                )
                            )
                        )
            ),

        // Footer
        React.createElement('div', { className: 'panel-footer', style: { marginTop: '2rem' } },
            React.createElement('small', null, '💡 Tip: Los quizzes tienen múltiples opciones de respuesta')
        )
    );
}

export default QuizAccessPanel;
