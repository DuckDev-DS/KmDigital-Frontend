import React, { useState } from "react";
import Button from "../../../components/atoms/Button";
import "../../../styles/pages/Tokens.css";
import "../../../../public/img/profe.jpg"

function Tokens() {
  const [showImage, setShowImage] = useState(false);
  return (
    <div className="tokens-container">
      <h1>¿Cómo se hacen los Tokens?</h1>
      <h2>Según Byron Araya:</h2>

      <img
        className="tokens-image"
        src="https://pbs.twimg.com/media/EQdATjFXUAAVY_E.jpg"
        alt="Imagen de token"
      />

      <Button
        variant="primary"
        onClick={() => setShowImage(true)}
        className="tokens-button"
      >
        Resultados!
      </Button>

      {showImage && (
        <img
          className="tokens-image result-image"
          src= "../../../../public/img/profe.jpg"
          alt="Resultado"
        />
      )}
    </div>
  );
}

export default Tokens;
