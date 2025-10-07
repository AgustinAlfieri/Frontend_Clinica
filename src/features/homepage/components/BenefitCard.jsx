const BenefitCard = ({ icon, title, description, className = "" }) => {
    return (
        <div className={`benefit-card ${className}`}>
            <div className="benefit-icon">
                {icon}
            </div>
            <h3 className="benefit-card-title">{title}</h3>
            <p className="benefit-card-description">
                {description}
            </p>
        </div>
    );
};

export default BenefitCard;
