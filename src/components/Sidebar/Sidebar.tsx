import React from "react";
import "./Sidebar.css";

export interface Conversa {
  id: number;
  titulo: string;
  mensagens: string[];
}

interface SidebarProps {
  conversas: Conversa[];
  criarConversa: () => void;
  setConversaAtiva: (id: number) => void;
  conversaAtivaId?: number | null;
}

export default function Sidebar({
  conversas,
  criarConversa,
  setConversaAtiva,
  conversaAtivaId = null,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h2 className="user-name">Paulo Henrique</h2>
      </div>

      <nav className="nav-section">
        <input
          className="nav-search"
          type="text"
          placeholder="Pesquisar por conversas..."
        />

        <button className={`nav-btn ${!conversaAtivaId ? "active" : ""}`}>
          <span className="label">Conversas</span>
        </button>

        <button className="nav-btn">
          <span className="label">Modo de usar</span>
        </button>

        <button className="nav-btn">
          <span className="label">Preferência</span>
        </button>
      </nav>

      <div className="section">
        <h3 className="section-title">EXEMPLOS DE USO</h3>
        <ul className="list">
          <li>Exemplo 01</li>
          <li>Exemplo 02</li>
          <li>Exemplo 03</li>
          <li>Exemplo 04</li>
        </ul>
      </div>

      <div className="section">
        <h3 className="section-title">HISTÓRICO DE CONVERSA</h3>
        <ul className="list">
          {conversas.map((c) => (
            <li
              key={c.id}
              className={`nav-btn ${conversaAtivaId === c.id ? "active" : ""}`}
              onClick={() => setConversaAtiva(c.id)}
              style={{ cursor: "pointer" }}
            >
              {c.titulo}
            </li>
          ))}
          {conversas.length === 0 && <li className="list-empty">Nenhuma conversa</li>}
        </ul>
      </div>

      <button className="new-chat" onClick={criarConversa}>
        ＋ Iniciar uma nova conversa
      </button>
    </aside>
  );
}
