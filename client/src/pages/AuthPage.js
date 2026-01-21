import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
    const location = useLocation();
    const [authMode, setAuthMode] = useState(location.state?.mode || 'login');
    const [userType, setUserType] = useState('student');

    // Estados para el login simplificado del estudiante
    const [classCode, setClassCode] = useState('');
    const [iconSequence, setIconSequence] = useState([]);

    // Iconos disponibles para la contraseña visual
    const visualIcons = [
        { id: 'sun', icon: 'sunny', label: 'Sol' },
        { id: 'flower', icon: 'local_florist', label: 'Flor' },
        { id: 'deer', icon: 'cruelty_free', label: 'Venado' },
        { id: 'moon', icon: 'dark_mode', label: 'Luna' },
        { id: 'tree', icon: 'park', label: 'Árbol' },
        { id: 'bird', icon: 'flutter_dash', label: 'Pájaro' },
    ];

    const handleIconClick = (iconId) => {
        if (iconSequence.length < 3) {
            setIconSequence([...iconSequence, iconId]);
        }
    };

    const clearSequence = () => setIconSequence([]);

    useEffect(() => {
        if (location.state?.mode) setAuthMode(location.state.mode);
    }, [location.state]);

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden bg-white">
            {/* PANEL IZQUIERDO: Visual (Se mantiene igual) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary-dark flex-col justify-center items-center p-12 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: "url('../../../public_html/media/images/Traditional Hungarian Patterns.jpeg')" }}
                ></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent"></div>
                <div className="relative z-20 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-primary text-4xl">language</span>
                        <h3 className="text-white text-xl font-bold uppercase tracking-widest">Mazahua Connect</h3>
                    </div>
                    <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">Preserva el patrimonio.<br />Habla el futuro.</h1>
                </div>
            </div>

            {/* PANEL DERECHO: Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-gray-50 overflow-y-auto">
                <div className="w-full max-w-md flex flex-col gap-8">

                    {/* Toggle Login/Register */}
                    <div className="bg-orange-50 p-1.5 rounded-xl flex w-full border border-primary/10">
                        <button onClick={() => setAuthMode('login')} className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-lg transition-all ${authMode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>Iniciar Sesión</button>
                        <button onClick={() => { setAuthMode('register'); setUserType('guest'); }} className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-lg transition-all ${authMode === 'register' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}>Registrarse</button>
                    </div>

                    <div className="flex flex-col gap-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-primary-dark tracking-tight">{authMode === 'login' ? '¡Hola de nuevo!' : 'Crea una cuenta'}</h2>
                        <p className="text-gray-500">{userType === 'student' ? 'Escribe tu código y elige tus figuras secretas.' : 'Nos alegra verte otra vez.'}</p>
                    </div>

                    {authMode === 'login' && (
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-primary-dark pl-1">Soy un...</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['student', 'teacher', 'guest'].map((type) => (
                                    <button key={type} onClick={() => setUserType(type)} className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all h-28 ${userType === type ? 'border-primary bg-orange-50' : 'border-transparent bg-white shadow-sm hover:border-primary/30'}`}>
                                        <span className={`material-symbols-outlined text-3xl ${userType === type ? 'text-primary' : 'text-gray-400'}`}>{type === 'student' ? 'face' : type === 'teacher' ? 'school' : 'person'}</span>
                                        <span className="text-xs font-medium text-primary-dark">{type === 'student' ? 'Niño' : type === 'teacher' ? 'Maestro' : 'Visitante'}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FORMULARIO DINÁMICO */}
                    <div className="flex flex-col gap-6">
                        {userType === 'student' && authMode === 'login' ? (
                            /* --- LOGIN SIMPLIFICADO NIÑOS --- */
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-primary-dark uppercase tracking-wider">Tu Código de Clase</label>
                                    <input
                                        className="w-full px-4 py-4 bg-white border-2 border-orange-100 rounded-2xl text-2xl text-center font-bold text-primary focus:border-primary focus:ring-0 outline-none transition-all placeholder:text-orange-200"
                                        placeholder="ABC-123"
                                        value={classCode}
                                        onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <label className="text-sm font-bold text-primary-dark uppercase tracking-wider">Tu Llave Mágica</label>
                                        <button onClick={clearSequence} className="text-xs font-bold text-primary hover:underline">Borrar todo</button>
                                    </div>

                                    {/* Slots de la secuencia */}
                                    <div className="flex gap-4 justify-center py-2">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center bg-white ${iconSequence[i] ? 'border-primary bg-orange-50' : 'border-dashed border-orange-200'}`}>
                                                {iconSequence[i] && (
                                                    <span className="material-symbols-outlined text-3xl text-primary animate-in zoom-in duration-300">
                                                        {visualIcons.find(v => v.id === iconSequence[i]).icon}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selector de iconos */}
                                    <div className="grid grid-cols-3 gap-3 pt-4">
                                        {visualIcons.map((v) => (
                                            <button
                                                key={v.id}
                                                onClick={() => handleIconClick(v.id)}
                                                disabled={iconSequence.length >= 3}
                                                className="flex flex-col items-center p-3 bg-white rounded-xl border border-orange-50 hover:bg-orange-50 hover:border-primary/30 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                                            >
                                                <span className="material-symbols-outlined text-2xl text-primary-dark">{v.icon}</span>
                                                <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{v.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* --- LOGIN / REGISTRO ESTÁNDAR --- */
                            <form className="flex flex-col gap-4">
                                {authMode === 'register' && (
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-primary-dark">Nombre Completo</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 material-symbols-outlined">badge</span>
                                            <input className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Ej. Maria Gonzalez" type="text" />
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-primary-dark">Correo Electrónico</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 material-symbols-outlined">mail</span>
                                        <input className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="nombre@ejemplo.com" type="email" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-primary-dark">Contraseña</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 material-symbols-outlined">lock</span>
                                        <input className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="••••••••" type="password" />
                                    </div>
                                </div>
                            </form>
                        )}

                        <button type="button" className="w-full mt-4 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-lg">
                            <span>{authMode === 'login' ? '¡Entrar a Clase!' : 'Crear Cuenta'}</span>
                            <span className="material-symbols-outlined">rocket_launch</span>
                        </button>
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-sm text-gray-400">O continúa con</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white">
                            <img alt="Google" className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white">
                            <span className="material-symbols-outlined text-[22px]">apple</span>
                            <span className="text-sm font-medium">Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;