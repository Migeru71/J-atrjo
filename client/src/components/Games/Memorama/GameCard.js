import React from 'react';

function GameCard(props) {
    var card = props.card;
    var isFlipped = props.isFlipped;
    var isMatched = props.isMatched;
    var onClick = props.onClick;

    return React.createElement(
        'div',
        {
            className: 'game-card ' + (isFlipped ? 'flipped' : '') + ' ' + (isMatched ? 'matched' : ''),
            onClick: onClick,
            role: 'button',
            tabIndex: 0,
            onKeyPress: function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }
        },
        React.createElement(
            'div',
            { className: 'card-inner' },
            // Dorso
            React.createElement(
                'div',
                { className: 'card-back' },
                React.createElement('span', { className: 'card-icon' }, '❓')
            ),
            // Frente
            React.createElement(
                'div',
                { className: 'card-front' },
                card.type === 'image' ?
                    React.createElement(
                        'div',
                        { className: 'card-image' },
                        React.createElement('img', {
                            src: card.content,
                            alt: card.label
                        })
                    ) :
                    React.createElement(
                        'div',
                        { className: 'card-word' },
                        React.createElement('span', { className: 'word-text' }, card.content),
                        React.createElement('span', { className: 'word-label' }, card.label)
                    )
            ),
            // Overlay
            isMatched ?
                React.createElement(
                    'div',
                    { className: 'card-matched-overlay' },
                    React.createElement('span', { className: 'matched-icon' }, '✅')
                ) :
                null
        )
    );
}

export default GameCard;