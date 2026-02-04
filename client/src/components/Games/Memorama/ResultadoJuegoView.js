// client/src/components/Games/Memorama/ResultadoJuegoView.js
import React from 'react';
import './Memorama.css';

const ResultadoJuegoView = ({ result, activity }) => {
    // Función auxiliar para renderizar estrellas
    const renderStars = (stars) => {
        return React.createElement('div', { className: 'stars' },
            Array.from({ length: 5 }).map((_, i) =>
                React.createElement('span', {
                    key: i,
                    className: `star ${i < stars ? 'filled' : ''}`
                }, '⭐')
            )
        );
    };

    const getStarMessage = (stars) => {
        const messages = {
            5: '🏆 ¡Excelente! Dominaste completamente',
            4: '🎉 ¡Muy bien! Gran desempeño',
            3: '👍 ¡Bueno! Sigue practicando',
            2: '💪 Necesitas más práctica',
            1: '📚 Sigue intentando',
            0: '❌ Inténtalo nuevamente'
        };
        return messages[stars] || 'Gracias por jugar';
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    // --- RENDERIZADO PRINCIPAL ---
    return React.createElement('div', { className: 'resultado-juego-container' },
        React.createElement('div', { className: 'resultado-content' },

            // 1. Encabezado
            React.createElement('div', { className: 'resultado-header' },
                React.createElement('h1', null, 'Actividad Completada'),
                React.createElement('p', { className: 'activity-name' }, activity.name)
            ),

            // 2. Calificación
            React.createElement('div', { className: 'rating-section' },
                React.createElement('div', { className: 'stars-display' }, renderStars(result.stars)),
                React.createElement('p', { className: 'star-message' }, getStarMessage(result.stars))
            ),

            // 3. Estadísticas del Juego (Grid)
            React.createElement('div', { className: 'stats-grid' },
                // Tiempo
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-icon' }, '⏱️'),
                    React.createElement('div', { className: 'stat-content' },
                        React.createElement('span', { className: 'stat-label' }, 'Tiempo Total'),
                        React.createElement('span', { className: 'stat-value' }, formatTime(result.gameStats.totalTime))
                    )
                ),
                // Intentos
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-icon' }, '🎯'),
                    React.createElement('div', { className: 'stat-content' },
                        React.createElement('span', { className: 'stat-label' }, 'Intentos'),
                        React.createElement('span', { className: 'stat-value' }, result.gameStats.totalAttempts)
                    )
                ),
                // Parejas
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-icon' }, '✅'),
                    React.createElement('div', { className: 'stat-content' },
                        React.createElement('span', { className: 'stat-label' }, 'Parejas Encontradas'),
                        React.createElement('span', { className: 'stat-value' }, `${result.gameStats.correctMatches} / ${result.gameStats.totalPairs}`)
                    )
                ),
                // Precisión
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-icon' }, '📊'),
                    React.createElement('div', { className: 'stat-content' },
                        React.createElement('span', { className: 'stat-label' }, 'Precisión'),
                        React.createElement('span', { className: 'stat-value' }, `${result.successRate}%`)
                    )
                )
            ),

            // 4. Desglose de Puntuación
            React.createElement('div', { className: 'scoring-breakdown' },
                React.createElement('h3', null, '📈 Análisis de Puntuación'),
                // Barra: Éxito
                React.createElement('div', { className: 'breakdown-item' },
                    React.createElement('span', { className: 'breakdown-label' }, 'Éxito en Emparejamiento (40%)'),
                    React.createElement('div', { className: 'breakdown-bar' },
                        React.createElement('div', {
                            className: 'breakdown-fill success',
                            style: { width: `${result.successRate}%` }
                        })
                    ),
                    React.createElement('span', { className: 'breakdown-value' }, `${result.successRate}%`)
                ),
                // Puntuación General
                React.createElement('div', { className: 'breakdown-total' },
                    React.createElement('span', { className: 'breakdown-label' }, 'Puntuación General'),
                    React.createElement('span', { className: 'breakdown-score' }, `${result.score}/100`)
                )
            ),

            // 5. Sección XP
            React.createElement('div', { className: 'xp-section' },
                React.createElement('div', { className: 'xp-card' },
                    React.createElement('div', { className: 'xp-recommended' },
                        React.createElement('span', { className: 'xp-label' }, 'XP Recomendado'),
                        React.createElement('span', { className: 'xp-value' }, result.recommendedXP)
                    ),
                    React.createElement('div', { className: 'xp-arrow' }, '→'),
                    React.createElement('div', { className: 'xp-earned' },
                        React.createElement('span', { className: 'xp-label' }, 'XP Obtenido'),
                        React.createElement('span', { className: 'xp-value highlight' }, result.finalXP)
                    )
                ),
                React.createElement('p', { className: 'xp-info' }, `Ganaste ${result.finalXP} XP basado en ${result.stars} ⭐`)
            ),

            // 6. Retroalimentación (Lógica condicional)
            React.createElement('div', { className: 'feedback-section' },
                React.createElement('h3', null, '💡 Retroalimentación'),
                result.successRate === 100
                    ? React.createElement('p', null, '🎊 ¡Perfecto! Encontraste todos los pares sin errores.')
                    : result.stars >= 3
                        ? React.createElement('p', null, '🌟 Buen trabajo. Si reduces el tiempo y aumentas la precisión, alcanzarás 5 estrellas.')
                        : React.createElement('p', null, '📚 Necesitas más práctica. Intenta memorizar mejor la ubicación de las cartas.')
            ),

            // 7. Botones de Acción
            React.createElement('div', { className: 'action-buttons' },
                React.createElement('button', {
                    className: 'btn btn-primary',
                    onClick: () => window.location.reload()
                }, '🔄 Jugar de Nuevo'),
                React.createElement('button', {
                    className: 'btn btn-secondary',
                    onClick: () => window.history.back()
                }, '← Volver al Menú')
            ),

            // 8. Info de Guardado
            React.createElement('div', { className: 'save-info' },
                React.createElement('p', null, '✅ Tu resultado ha sido guardado correctamente'),
                React.createElement('small', null, `Completado el: ${new Date(result.completedAt).toLocaleString()}`)
            )
        )
    );
};

export default ResultadoJuegoView;