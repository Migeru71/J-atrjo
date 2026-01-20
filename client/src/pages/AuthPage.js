import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
    const location = useLocation();
    // Capturamos el modo desde el Navbar/Hero o por defecto 'login'
    const [authMode, setAuthMode] = useState(location.state?.mode || 'login');
    const [userType, setUserType] = useState('guest'); // guest, student, teacher

    // Sincronizar estado si el usuario navega entre login/registro desde el navbar
    useEffect(() => {
        if (location.state?.mode) {
            setAuthMode(location.state.mode);
        }
    }, [location.state]);

    return (
        <div className="...">
            {/* Toggle de Modo (Login/Register) */}
            <div className="bg-[#e7f3e7] p-1.5 rounded-xl flex w-full">
                <button
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2.5 rounded-lg font-semibold ${authMode === 'login' ? 'bg-white shadow-sm' : 'text-text-muted'}`}
                >Log In</button>
                <button
                    onClick={() => {
                        setAuthMode('register');
                        setUserType('guest'); // Forzamos a Guest en registro según requerimiento
                    }}
                    className={`flex-1 py-2.5 rounded-lg font-semibold ${authMode === 'register' ? 'bg-white shadow-sm' : 'text-text-muted'}`}
                >Sign Up</button>
            </div>

            {/* Selector de Usuario: SOLO visible en Login */}
            {authMode === 'login' && (
                <div className="grid grid-cols-3 gap-3 my-4">
                    {/* Botones Estudiante, Maestro y Guest que ya tienes en el código */}
                </div>
            )}

            {/* Renderizado Condicional de Formularios */}
            <form className="flex flex-col gap-4">
                {authMode === 'login' ? (
                    <>
                        {userType === 'student' && (
                            <div className="space-y-4">
                                <p className="text-center font-bold text-primary">Acceso con Código de Clase</p>
                                <input className="auth-input text-center text-2xl" placeholder="ID Estudiante" />
                                <input className="auth-input text-center" type="password" placeholder="PIN (4 dígitos)" />
                            </div>
                        )}
                        {userType === 'teacher' && (
                            <div className="space-y-4">
                                <input className="auth-input" placeholder="Nombre Completo del Maestro" />
                                <input className="auth-input" type="password" placeholder="Contraseña" />
                            </div>
                        )}
                        {userType === 'guest' && (
                            <div className="space-y-4">
                                <input className="auth-input" type="email" placeholder="Email" />
                                <input className="auth-input" type="password" placeholder="Contraseña" />
                            </div>
                        )}
                    </>
                ) : (
                    /* Registro: Solo permite campos para Visitante (Guest) */
                    <div className="space-y-4">
                        <input className="auth-input" placeholder="Nombre Completo" />
                        <input className="auth-input" type="email" placeholder="Email Address" />
                        <input className="auth-input" type="password" placeholder="Create Password" />
                    </div>
                )}

                <button type="button" className="btn-primary mt-4">
                    {authMode === 'login' ? 'Entrar' : 'Crear Cuenta'}
                </button>
            </form>
        </div>
    );
};

export default AuthPage;