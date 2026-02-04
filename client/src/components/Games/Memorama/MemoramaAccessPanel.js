// client/src/components/Games/Memorama/MemoramaAccessPanel.js
// Panel de acceso al Memorama con estilo EduCreator Studio
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityService from '../../../services/ActivityService';
import mockGames from '../../../data/mockGames';
import './MemoramaAccessPanel.css';

function MemoramaAccessPanel() {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('student'); // 'student' o 'teacher'

    // Cargar actividades disponibles
    useEffect(function () {
        loadActivities();
    }, []);

    function loadActivities() {
        setLoading(true);
        setTimeout(function () {
            const allActivities = ActivityService.getAllActivities();
            setActivities(allActivities);
            setLoading(false);
        }, 300);
    }

    function handlePlayGame(activityId) {
        navigate('/games/memorama/jugar/' + activityId);
    }

    function handleCreateActivity() {
        navigate('/games/memorama/crear');
    }

    function handleEditActivity(activityId) {
        navigate('/games/memorama/editar/' + activityId);
    }

    function handleDeleteActivity(activityId, activityName) {
        if (window.confirm('¿Eliminar "' + activityName + '"? Esta acción no se puede deshacer.')) {
            const result = mockGames.deleteActivity(activityId);
            if (result.success) {
                loadActivities();
            }
        }
    }

    function getDifficultyColor(difficulty) {
        const colors = {
            'fácil': '#22c55e',
            'medio': '#f59e0b',
            'difícil': '#ef4444'
        };
        return colors[difficulty] || '#6b7280';
    }

    function getDifficultyLabel(difficulty) {
        const labels = {
            'fácil': '🟢 Fácil',
            'medio': '🟡 Medio',
            'difícil': '🔴 Difícil'
        };
        return labels[difficulty] || difficulty;
    }

    return React.createElement(
        'div',
        { className: 'memorama-access-panel' },

        // Encabezado mejorado
        React.createElement(
            'div',
            { className: 'panel-header' },
            React.createElement('div', {
                style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                }
            },
                React.createElement('span', {
                    style: {
                        fontSize: '48px',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }
                }, '🎮')
            ),
            React.createElement('h1', null, 'Centro de Memorama'),
            React.createElement('p', null, 'Aprende vocabulario mazahua de manera divertida')
        ),

        // Selector de Rol mejorado
        React.createElement(
            'div',
            { className: 'role-selector' },
            React.createElement(
                'button',
                {
                    className: 'role-btn ' + (userRole === 'student' ? 'active' : ''),
                    onClick: function () { setUserRole('student'); }
                },
                '👨‍🎓 Soy Alumno'
            ),
            React.createElement(
                'button',
                {
                    className: 'role-btn ' + (userRole === 'teacher' ? 'active' : ''),
                    onClick: function () { setUserRole('teacher'); }
                },
                '👨‍🏫 Soy Docente'
            )
        ),

        // Contenido según rol
        userRole === 'teacher' ? React.createElement(
            'div',
            { className: 'role-content' },

            // Sección de creación
            React.createElement(
                'div',
                { className: 'teacher-section' },
                React.createElement('div', {
                    style: {
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '36px',
                        border: '3px solid #fed7aa'
                    }
                }, '✨'),
                React.createElement('h2', null, 'Crear Nueva Actividad'),
                React.createElement('p', null, 'Diseña actividades personalizadas de Memorama para tus alumnos usando el nuevo editor visual.'),
                React.createElement(
                    'button',
                    {
                        className: 'btn btn-primary',
                        onClick: handleCreateActivity,
                        style: { maxWidth: '300px', margin: '0 auto' }
                    },
                    '🚀 Abrir Editor de Actividades'
                )
            ),

            // Resumen de actividades
            React.createElement(
                'div',
                { className: 'activities-summary' },
                React.createElement('h3', null, '📊 Mis Actividades Creadas'),
                activities.length === 0 ?
                    React.createElement('div', { className: 'no-activities' },
                        React.createElement('span', { style: { fontSize: '48px', display: 'block', marginBottom: '12px' } }, '📭'),
                        React.createElement('p', null, 'Aún no has creado actividades'),
                        React.createElement('p', { style: { fontSize: '13px', marginTop: '8px' } },
                            'Usa el editor para crear tu primera actividad'
                        )
                    ) :
                    React.createElement(
                        'div',
                        { className: 'activities-list' },
                        activities.map(function (activity) {
                            return React.createElement(
                                'div',
                                { key: activity.id, className: 'activity-item', style: { position: 'relative' } },
                                // Botones de editar y eliminar arriba a la derecha
                                React.createElement('div', {
                                    style: {
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        display: 'flex',
                                        gap: '4px'
                                    }
                                },
                                    React.createElement('button', {
                                        onClick: function (e) { e.stopPropagation(); handleEditActivity(activity.id); },
                                        title: 'Editar',
                                        style: {
                                            padding: '6px 8px',
                                            background: '#fff7ed',
                                            border: '1px solid #fed7aa',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }
                                    }, '✏️'),
                                    React.createElement('button', {
                                        onClick: function (e) { e.stopPropagation(); handleDeleteActivity(activity.id, activity.name); },
                                        title: 'Eliminar',
                                        style: {
                                            padding: '6px 8px',
                                            background: '#fef2f2',
                                            border: '1px solid #fecaca',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }
                                    }, '🗑️')
                                ),
                                React.createElement('span', { className: 'activity-name', style: { paddingRight: '80px' } }, activity.name),
                                React.createElement('span', {
                                    className: 'activity-difficulty',
                                    style: { color: getDifficultyColor(activity.difficulty) }
                                }, getDifficultyLabel(activity.difficulty)),
                                React.createElement('span', { className: 'activity-xp' },
                                    '⭐ ' + activity.recommendedXP + ' XP'
                                ),
                                React.createElement('span', {
                                    style: {
                                        fontSize: '12px',
                                        color: '#6b7280',
                                        paddingTop: '8px',
                                        borderTop: '1px solid rgba(0,0,0,0.1)'
                                    }
                                }, '🎯 ' + (activity.pairs ? activity.pairs.length : 0) + ' pares')
                            );
                        })
                    )
            )
        ) : React.createElement(
            'div',
            { className: 'role-content' },
            React.createElement(
                'div',
                { className: 'student-section' },
                React.createElement('h2', null, '🎮 Actividades Disponibles'),
                loading ?
                    React.createElement('div', { className: 'loading-text' },
                        React.createElement('div', {
                            style: {
                                width: '40px',
                                height: '40px',
                                border: '4px solid #e5e7eb',
                                borderTopColor: '#E65100',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto 16px'
                            }
                        }),
                        React.createElement('p', null, 'Cargando actividades...')
                    ) :
                    activities.length === 0 ?
                        React.createElement('div', { className: 'no-activities' },
                            React.createElement('span', { style: { fontSize: '64px', display: 'block', marginBottom: '16px' } }, '🎒'),
                            React.createElement('p', { style: { fontSize: '18px', color: '#374151', marginBottom: '8px' } },
                                'No hay actividades disponibles'
                            ),
                            React.createElement('p', null, 'Pide a tu maestro que cree una actividad para ti')
                        ) :
                        React.createElement(
                            'div',
                            { className: 'activities-grid' },
                            activities.map(function (activity) {
                                return React.createElement(
                                    'div',
                                    { key: activity.id, className: 'activity-card' },

                                    // Header de la tarjeta con icono
                                    React.createElement('div', {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '12px'
                                        }
                                    },
                                        React.createElement('div', {
                                            style: {
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '24px',
                                                flexShrink: 0,
                                                border: '2px solid #fed7aa'
                                            }
                                        }, '🎴'),
                                        React.createElement('div', null,
                                            React.createElement('h3', null, activity.name),
                                            React.createElement('span', {
                                                style: {
                                                    display: 'inline-block',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    background: getDifficultyColor(activity.difficulty) + '20',
                                                    color: getDifficultyColor(activity.difficulty),
                                                    marginTop: '4px'
                                                }
                                            }, getDifficultyLabel(activity.difficulty))
                                        )
                                    ),

                                    React.createElement('p', { className: 'description' }, activity.description),

                                    React.createElement(
                                        'div',
                                        { className: 'activity-info' },
                                        React.createElement('span', null, '⭐ ' + activity.recommendedXP + ' XP'),
                                        React.createElement('span', null, '🎯 ' + (activity.pairs ? activity.pairs.length : 0) + ' pares'),
                                        React.createElement('span', null, '⏱️ ~' + (activity.pairs ? activity.pairs.length * 30 : 60) + 's')
                                    ),

                                    React.createElement(
                                        'button',
                                        {
                                            className: 'btn btn-play',
                                            onClick: function () { handlePlayGame(activity.id); }
                                        },
                                        '▶️ ¡Jugar Ahora!'
                                    )
                                );
                            })
                        )
            )
        ),

        // Footer mejorado
        React.createElement(
            'div',
            { className: 'panel-footer' },
            React.createElement('small', null,
                '💡 Tip: Los ',
                React.createElement('strong', null, 'docentes'),
                ' pueden crear actividades personalizadas, los ',
                React.createElement('strong', null, 'alumnos'),
                ' pueden jugarlas y ganar XP'
            )
        )
    );
}

export default MemoramaAccessPanel;