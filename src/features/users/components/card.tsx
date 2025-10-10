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
      style={{
        borderLeft: `6px solid ${color || "#007bff"}`,
      }}
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