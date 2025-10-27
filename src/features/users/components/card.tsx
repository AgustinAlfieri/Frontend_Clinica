import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  subtitle: string;
  color?: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, color, image }) => {
  return (
    <div
      className="card"
      style={{ color: color || '#ffffffff' }}
    >
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;