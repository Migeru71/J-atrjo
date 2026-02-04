import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente de tabla de líderes
 */
const TopLearners = ({ learners, currentUserId }) => {
    const defaultLearners = [
        { id: 1, name: 'Carlos M.', xp: 2100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
        { id: 2, name: 'Elena R.', xp: 1950, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
        { id: 3, name: 'Tú', xp: 1450, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', isCurrentUser: true }
    ];

    const data = learners || defaultLearners;

    const getPositionStyle = (position, isCurrentUser) => {
        if (isCurrentUser) {
            return 'text-amber-500 font-bold';
        }
        switch (position) {
            case 1: return 'text-amber-500';
            case 2: return 'text-gray-400';
            case 3: return 'text-amber-600';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Mejores Estudiantes</h3>
                <Link to="/estudiante/leaderboard" className="text-sm font-medium text-amber-500 hover:text-amber-600">
                    Ver todos
                </Link>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-3">
                {data.map((learner, index) => (
                    <div
                        key={learner.id}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${learner.isCurrentUser ? 'bg-amber-50' : 'hover:bg-gray-50'
                            }`}
                    >
                        {/* Position */}
                        <span className={`w-6 text-center font-bold ${getPositionStyle(index + 1, learner.isCurrentUser)}`}>
                            {index + 1}
                        </span>

                        {/* Avatar */}
                        <img
                            src={learner.avatar}
                            alt={learner.name}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />

                        {/* Name */}
                        <span className={`flex-1 font-medium ${learner.isCurrentUser ? 'text-gray-800' : 'text-gray-600'}`}>
                            {learner.name}
                        </span>

                        {/* XP */}
                        <span className="text-sm font-bold text-amber-500">
                            {learner.xp.toLocaleString()} XP
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopLearners;
