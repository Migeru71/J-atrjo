import React from 'react';

/**
 * Tarjetas de estadísticas del estudiante
 */
const StatsCards = ({ stats }) => {
    const defaultStats = {
        level: { value: 'A1 Intro', change: '+5%', changeLabel: 'desde la semana pasada' },
        streak: { value: '12 Días', status: 'On fire!', statusLabel: 'Keep it up' },
        xp: { value: '1,450', change: '+150 XP', changeLabel: 'hoy' },
        time: { value: '4h 20m', change: '+25m', changeLabel: 'hoy' }
    };

    const data = stats || defaultStats;

    const cards = [
        {
            id: 'level',
            label: 'Nivel Actual',
            value: data.level.value,
            subText: data.level.change,
            subLabel: data.level.changeLabel,
            icon: 'verified',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-500',
            accentColor: 'text-green-500'
        },
        {
            id: 'streak',
            label: 'Racha de Días',
            value: data.streak.value,
            subText: data.streak.status,
            subLabel: data.streak.statusLabel,
            icon: 'local_fire_department',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-500',
            accentColor: 'text-orange-500'
        },
        {
            id: 'xp',
            label: 'Total XP',
            value: data.xp.value,
            subText: data.xp.change,
            subLabel: data.xp.changeLabel,
            icon: 'emoji_events',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-500',
            accentColor: 'text-green-500'
        },
        {
            id: 'time',
            label: 'Tiempo Aprendido',
            value: data.time.value,
            subText: data.time.change,
            subLabel: data.time.changeLabel,
            icon: 'schedule',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-500',
            accentColor: 'text-green-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{card.value}</h3>
                            <p className="text-xs mt-2">
                                <span className={`font-semibold ${card.accentColor}`}>{card.subText}</span>
                                <span className="text-gray-400 ml-1">{card.subLabel}</span>
                            </p>
                        </div>
                        <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                            <span className={`material-symbols-outlined ${card.iconColor}`}>
                                {card.icon}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
