import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ stats }) => {
    return (
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div className="flex flex-col gap-6 max-w-2xl">
                        {/* Badge de Novedades */}
                        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-dark dark:text-primary w-fit">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                            Nuevo Curso Interactivo Disponible
                        </div>

                        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl text-text-main-light dark:text-white leading-[1.1]">
                            Revitaliza tus Raíces: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-primary">Aprende Mazahua</span> hoy
                        </h1>

                        <p className="text-lg text-text-sub-light dark:text-text-sub-dark leading-relaxed max-w-lg">
                            Conéctate con la tradición a través de una experiencia de aprendizaje moderna diseñada para estudiantes, educadores y entusiastas de la cultura. El Jñatrjo vive en ti.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="flex items-center justify-center h-12 px-6 bg-primary text-surface-dark font-bold text-base rounded-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25">
                                Comenzar a aprender ahora
                            </button>
                            <Link
                                to="/auth"
                                state={{ mode: 'register' }}
                                className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-primary/25"
                            >
                                Comienza a aprender ahora
                            </Link>
                        </div>

                        {/* Estadísticas dinámicas del Backend */}
                        <div className="flex items-center gap-4 pt-4 text-sm text-text-sub-light dark:text-text-sub-dark">
                            <p>Únete a más de <span className="font-bold text-text-main-light dark:text-white">{stats.active_learners}+</span> aprendices activos hoy.</p>
                        </div>
                    </div>

                    {/* Tarjeta de Frase Diaria */}
                    <div className="relative lg:h-full min-h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 group">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/textil-mazahua.jpg')" }}></div>
                        <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 dark:bg-surface-dark/95 backdrop-blur p-4 rounded-xl border border-white/20 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary-dark">
                                    <span className="material-symbols-outlined">translate</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Frase del día</p>
                                    <p className="text-lg font-medium text-primary-dark">"{stats.daily_phrase.mazahua}"</p>
                                    <p className="text-xs text-text-sub-light">Significa "{stats.daily_phrase.spanish}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;