import NavBar from "./navBar";
import BenefitCard from "./BenefitCard";
import './Homepage.css';

const Homepage = () => {

    // La IA me recomendó crear esta variable y luego mapearla para evitar repetir código, no sé
    // que pensaran ustedes muchachos
    const benefitsData = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
            ),
            title: "Atención personalizada",
            description: "Profesionales dedicados a tu bienestar con atención individual y seguimiento continuo de tu salud."
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            ),
            title: "Consultorios equipados",
            description: "Instalaciones modernas con la última tecnología para diagnóstico y tratamiento eficaz."
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            ),
            title: "Excelencia médica",
            description: "Equipo de especialistas con amplia experiencia y formación continua en las últimas técnicas."
        }
    ];

    return (
        <div className="homepage">
            <NavBar />
            
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Lo mejor para <span className="hero-highlight">tu salud</span><br />
                        lo encontrás <span className="hero-highlight">acá!</span>
                    </h1>
                    <p className="hero-subtitle">
                        Contamos con los <strong>mejores profesionales, tecnología
                        avanzada, atención humana y estructura moderna,</strong> para cuidarte.
                    </p>
                </div>
                <div className="hero-image">
                    {/* Aquí va la imagen - placeholder por ahora */}
                    <div className="image-placeholder">
                        <img src='src\assets\image.webp' alt="Hero" className="hero-img" />
                        <div className="image-frame">

                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <h2 className="benefits-title">
                    Te ofrecemos <span className="benefits-highlight">beneficios reales.</span>
                </h2>
                
                <div className="benefits-grid">
                    {benefitsData.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
