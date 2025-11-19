import React from "react";

type CardProps = {
  likes: string | number;
};

function Card({ likes }: CardProps) {
  return (
    <div className="card">
      <h3>
        Exemplo <span style={{ cursor: "pointer" }}>×</span>
      </h3>
      <p>sadasdasdasdasdasdasdasdasdasdasdasdasdasd...</p>
      <div className="card-footer">
        <span>❤️ {likes}</span>
        <span>🔗</span>
      </div>
    </div>
  );
}

export default Card;
