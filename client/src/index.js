import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importante para que Tailwind funcione
import App from './App'; // Llama al componente principal

// Crea la raíz del sitio vinculándola al div 'root' del index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación dentro del modo estricto de React
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);