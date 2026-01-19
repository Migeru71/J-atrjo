import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
    // Datos simulados (Mock) para no depender de la BD aún
    const mockStats = {
        active_learners: "500+",
        daily_phrase: {
            mazahua: "Ki jñaa kjo",
            spanish: "Habla bien / Saludo",
            context: "Frase de cortesía tradicional."
        }
    };

    return (
        <Router>
            <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark">
                {/* El Navbar se mantiene arriba en todas las vistas */}
                <Navbar />

                <Routes>
                    {/* Ruta Raíz: Página de inicio */}
                    <Route path="/" element={<Home stats={mockStats} />} />

                    {/* Ruta de Registro: La pantalla de la imagen que enviaste */}
                    <Route path="/registro" element={<Register />} />

                    {/* Podrás agregar /login o /cursos más adelante */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;