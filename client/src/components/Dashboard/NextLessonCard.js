import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Tarjeta de la próxima lección con preview
 */
const NextLessonCard = ({ lesson }) => {
    const defaultLesson = {
        id: 1,
        title: 'Saludos y Despedidas',
        description: 'Aprende las frases esenciales para saludar a los ancianos y amigos en la cultura Mazahua, incluyendo la forma correcta...',
        timeLeft: '5 min restantes',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        participants: [
            'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
        ],
        extraParticipants: 3
    };

    const data = lesson || defaultLesson;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Lesson Image */}
                <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>

                {/* Lesson Content */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                                Próxima Lección
                            </span>
                            <span className="text-xs text-gray-400">{data.timeLeft}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{data.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{data.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        {/* Participants */}
                        <div className="flex items-center">
                            <div className="flex -space-x-2">
                                {data.participants.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        alt={`Participante ${index + 1}`}
                                        className="w-8 h-8 rounded-full border-2 border-white"
                                    />
                                ))}
                            </div>
                            {data.extraParticipants > 0 && (
                                <span className="ml-2 text-xs text-gray-400 font-medium">
                                    +{data.extraParticipants}
                                </span>
                            )}
                        </div>

                        {/* Resume Button */}
                        <Link
                            to={`/games/memorama/jugar/${data.id}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm"
                        >
                            <span>Continuar</span>
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NextLessonCard;
