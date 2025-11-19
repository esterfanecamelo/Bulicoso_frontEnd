import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import { Conversa } from "./models/Conversa";

function App() {
  const [conversas, setConversas] = React.useState<Conversa[]>([]);
  const [conversaAtiva, setConversaAtiva] = React.useState<number | null>(null);
  

  function criarConversa() {
    const nova: Conversa = {
      id: Date.now(),
      mensagens: [],
      titulo: "Nova conversa"
    };
    setConversas(prev => [...prev, nova]);
    setConversaAtiva(nova.id);
  }


  return (
    <div className="app-container">
      <Sidebar 
        conversas={conversas}
        criarConversa={criarConversa}
        setConversaAtiva={setConversaAtiva}
      />
      <MainContent 
        conversaAtiva={conversas.find(c => c.id === conversaAtiva)}
      />
    </div>
  );
}

export default App;
