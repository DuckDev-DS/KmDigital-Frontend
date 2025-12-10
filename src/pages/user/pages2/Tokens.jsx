import React, { useState } from "react";
import "../../../styles/pages/Token.css";
import profe from"../../../../public/img/profe.png"

function Tokens() {
  return (
    <div className="tokens-container">
      <h1>¿Cómo se hacen los Tokens?</h1>
      <h2>Según Byron Araya:</h2>

      <img
        className="tokens-image"
        src={profe}
        alt="Imagen de token"
      />
    </div>
  );
}

export default Tokens;
