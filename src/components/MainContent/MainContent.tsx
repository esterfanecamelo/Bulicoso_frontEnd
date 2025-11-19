import React from "react";
import "./MainContent.css";
import { Conversa } from "../../models/Conversa";

interface MainContentProps {
  conversaAtiva?: Conversa | null;
}

export default function MainContent({ conversaAtiva }: MainContentProps) {

  const exemplos = [
    { id: 1, likes: "1.2K", text: "sadasdasdasdasdasdasdasdasdasdasdasda" },
    { id: 2, likes: "26.9K", text: "sadasdasdasdasdasdasdasdasdasdasdasda" },
    { id: 3, likes: "800", text: "sadasdasdasdasdasdasdasdasdasdasdasda" },
    { id: 4, likes: "17.2K", text: "sadasdasdasdasdasdasdasdasdasdasdasda" },
    { id: 5, likes: "4.6K", text: "sadasdasdasdasdasdasdasdasdasdasdasda" },
    { id: 6, likes: "21.4K", text: "sadasdasdasdasdasdasdasdasdasdasdasda" },
  ];

  if (!conversaAtiva) {
    return (
      <div className="main-container">

        <div className="initial-search">
          <input className="initial-input-search" type="text" placeholder="conversas" />
          <button className="initial-button-search">+ Iniciar uma conversar</button>
        </div>

        <header className="main-header">
          <h1 className="welcome">Bem vindo, Paulo</h1>
          <p className="subtitle">Exemplo xxx - xxx - xxx</p>

          <div className="input-container">
            <input
              type="text"
              placeholder="Como posso ajudá-lo hoje?"
              className="input-field"
            />
            <button className="send-btn">P</button>
          </div>
        </header>

        <div className="cards-container">
          {exemplos.map((ex) => (
            <div key={ex.id} className="card">
              <div className="card-header"></div>
              <p className="card-text">{ex.text}</p>
              <div className="card-footer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">

      <h2 style={{ marginBottom: "20px" }}>{conversaAtiva.titulo}</h2>

      <div className="chat-box">
        {conversaAtiva.mensagens.length === 0 && (
          <p style={{ color: "#666" }}>Nenhuma mensagem ainda…</p>
        )}

        {conversaAtiva.mensagens.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>

    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Digite sua mensagem..."
        className="chat-input"
      />
      <button className="chat-send-btn">Enviar</button>
    </div>

    </div>
  );
}
