import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import RoleSelection from '../components/RoleSelection';
import CultureSection from '../components/CultureSection';
import FeaturesGrid from '../components/FeaturesGrid';
import Footer from '../components/Footer';

const Home = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        // 1. Cambiamos la URL a localhost:8000 (puerto de PHP sin XAMPP)
        fetch('http://localhost:8000/api/get_home.php')
            .then(res => {
                if (!res.ok) throw new Error("Servidor no responde");
                return res.json();
            })
            .then(data => setPageData(data))
            .catch(err => {
                console.warn("Usando datos locales por falta de conexión al backend:", err);
                // 2. DATOS DE RESPALDO (Para que la página cargue aunque el PHP esté apagado)
                setPageData({
                    hero: { badge: "Versión de Desarrollo", student_count: "500+" },
                    daily_phrase: { phrase: "Ki jñaa kjo", translation: "Habla bien" }
                });
            });
    }, []);

    if (!pageData) return <div className="p-20 text-center">Cargando herencia Mazahua...</div>;

    return (
        <>
            <Hero stats={pageData} />
            <RoleSelection />
            <CultureSection />
            <FeaturesGrid />
            <Footer />
        </>
    );
};

export default Home;