import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import ConfiguracionActividadView from './components/Games/Memorama/ConfiguracionActividadView';
import MemoramaGameView from './components/Games/Memorama/MemoramaGameView';
import MemoramaAccessPanel from './components/Games/Memorama/MemoramaAccessPanel';
// Quiz imports
import QuizAccessPanel from './components/Games/Quiz/QuizAccessPanel';
import QuizConfigView from './components/Games/Quiz/QuizConfigView';
import QuizGameView from './components/Games/Quiz/QuizGameView';
// Student Dashboard
import StudentDashboard from './pages/StudentDashboard';
import StudentActivities from './pages/StudentActivities';
// Teacher Dashboard
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
    // Datos simulados (Mock) actualizados para coincidir con la estructura del Hero
    const mockStats = {
        hero: {
            badge: "Nuevo Curso Interactivo Disponible",
            student_count: "500+"
        },
        daily_phrase: {
            phrase: "Ki jñaa kjo",
            translation: "Habla bien / Saludo",
            context: "Frase de cortesía tradicional."
        }
    };

    return React.createElement(
        Router,
        null,
        React.createElement(
            'div',
            { className: 'min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark' },
            React.createElement(Navbar),
            React.createElement(
                Routes,
                null,
                // Ruta Raíz: Página de inicio
                React.createElement(
                    Route,
                    { path: '/', element: React.createElement(Home, { stats: mockStats }) }
                ),

                // Ruta de autenticación
                React.createElement(
                    Route,
                    { path: '/auth', element: React.createElement(AuthPage) }
                ),

                // Ruta alternativa de registro
                React.createElement(
                    Route,
                    { path: '/registro', element: React.createElement(AuthPage) }
                ),

                // ==========================================
                // RUTAS DEL ESTUDIANTE
                // ==========================================

                // Dashboard del estudiante
                React.createElement(
                    Route,
                    {
                        path: '/estudiante/dashboard',
                        element: React.createElement(StudentDashboard)
                    }
                ),

                // Actividades del estudiante
                React.createElement(
                    Route,
                    {
                        path: '/estudiante/actividades',
                        element: React.createElement(StudentActivities)
                    }
                ),

                // ==========================================
                // RUTAS DEL MAESTRO
                // ==========================================

                // Dashboard del maestro
                React.createElement(
                    Route,
                    {
                        path: '/maestro/dashboard',
                        element: React.createElement(TeacherDashboard)
                    }
                ),

                // ==========================================
                // RUTAS DEL MEMORAMA
                // ==========================================

                // Ruta principal del Memorama (Panel de Acceso)
                React.createElement(
                    Route,
                    {
                        path: '/games/memorama',
                        element: React.createElement(MemoramaAccessPanel)
                    }
                ),

                // Ruta para crear actividades (Vista Docente - Memorama)
                React.createElement(
                    Route,
                    {
                        path: '/games/memorama/crear',
                        element: React.createElement(ConfiguracionActividadView, {
                            onActivityCreated: function (activity) {
                                console.log('✅ Actividad creada:', activity);
                                window.location.href = `/games/memorama/jugar/${activity.id}`;
                            }
                        })
                    }
                ),

                // Ruta para editar actividades (Vista Docente - Memorama)
                React.createElement(
                    Route,
                    {
                        path: '/games/memorama/editar/:editId',
                        element: React.createElement(ConfiguracionActividadView, {
                            onActivityCreated: function (activity) {
                                console.log('✅ Actividad actualizada:', activity);
                                window.location.href = `/games/memorama`;
                            }
                        })
                    }
                ),

                // Ruta para jugar (Vista Alumno)
                React.createElement(
                    Route,
                    {
                        path: '/games/memorama/jugar/:activityId',
                        element: React.createElement(MemoramaGameView, {
                            studentId: localStorage.getItem('currentStudentId') || 'student_001'
                        })
                    }
                ),

                // ==========================================
                // RUTAS DEL QUIZ
                // ==========================================

                // Ruta principal del Quiz (Panel de Acceso)
                React.createElement(
                    Route,
                    {
                        path: '/games/quiz',
                        element: React.createElement(QuizAccessPanel)
                    }
                ),

                // Ruta para crear quiz (Vista Docente)
                React.createElement(
                    Route,
                    {
                        path: '/games/quiz/crear',
                        element: React.createElement(QuizConfigView, {
                            onActivityCreated: function (activity) {
                                console.log('✅ Quiz creado:', activity);
                            }
                        })
                    }
                ),

                // Ruta para EDITAR quiz (Apuntando al Editor Unificado como solicitó el usuario)
                React.createElement(
                    Route,
                    {
                        path: '/games/quiz/editar/:editId',
                        element: React.createElement(ConfiguracionActividadView, {
                            onActivityCreated: function (activity) {
                                console.log('✅ Quiz actualizado:', activity);
                                window.location.href = `/games/quiz`;
                            }
                        })
                    }
                ),

                // Ruta para jugar quiz (Vista Alumno)
                React.createElement(
                    Route,
                    {
                        path: '/games/quiz/jugar/:activityId',
                        element: React.createElement(QuizGameView)
                    }
                )
            )
        )
    );
}

export default App;