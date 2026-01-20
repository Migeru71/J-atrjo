import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Panel Izquierdo Visual (Mantenido del código base) */}
            <div className="hidden lg:flex w-1/2 relative bg-background-dark flex-col justify-end p-12 overflow-hidden group">
                <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('path_to_mazahua_pattern')" }}></div>
                <div className="relative z-20">
                    <h1 className="text-4xl font-extrabold text-white leading-tight">Preserve heritage.<br />Speak the future.</h1>
                </div>
            </div>

            {/* Panel Derecho de Interacción */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-[480px] flex flex-col gap-8">

                    {/* Selector de Modo: Login / Sign Up */}
                    <div className="bg-[#e7f3e7] dark:bg-[#1a331a] p-1.5 rounded-xl flex w-full">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${isLogin ? 'bg-white shadow-sm text-text-main' : 'text-text-muted'}`}
                        >Log In</button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${!isLogin ? 'bg-white shadow-sm text-text-main' : 'text-text-muted'}`}
                        >Sign Up</button>
                    </div>

                    {isLogin ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;