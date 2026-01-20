import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage'; // 1. IMPORTACIÓN CRÍTICA

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

    return (
        <Router>
            <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark">
                <Navbar />

                <Routes>
                    {/* Ruta Raíz: Página de inicio */}
                    <Route path="/" element={<Home stats={mockStats} />} />

                    {/* 2. RUTA DE AUTENTICACIÓN: Esta es la que faltaba */}
                    {/* Aquí es donde llegarán los usuarios al pulsar Login o Register */}
                    <Route path="/auth" element={<AuthPage />} />

                    {/* Puedes mantener /registro si lo deseas, o borrarlo si usarás solo /auth */}
                    <Route path="/registro" element={<AuthPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;