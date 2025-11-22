import React, { useState, useRef, useEffect } from "react";
import "./MainContent.css";
import { api } from "../services/api";

export default function MainContent() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Olá! Sou o Bulicoso. Posso te ajudar a agendar remédios ou tirar dúvidas de bulas.' }
  ]);

  // --- NOVO: Estado para controlar o Formulário de Agendamento ---
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    instrucao: "", // Ex: Dipirona de 8 em 8 horas
    inicio: "agora"
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exemplos = [
    { id: 1, text: "Quais as reações da Dipirona?" },
    { id: 2, text: "Quero agendar Losartana" },
    { id: 3, text: "Cancelar meu agendamento" },
  ];

  async function handleEnviar() {
    if (!prompt.trim()) return;

    const textoUsuario = prompt;
    setPrompt("");
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', text: textoUsuario }]);

    try {
      // 1. Classifica a intenção
      const intentData = await api.classifyIntent(textoUsuario);

      if (!intentData) {
        throw new Error("Sem resposta do cérebro.");
      }

      // Adiciona a resposta textual do bot
      setMessages(prev => [...prev, { role: 'bot', text: intentData.message }]);

      // --- LÓGICA DE DECISÃO ---

      if (intentData.intent === 'schedule') {
        // AQUI ESTÁ A MUDANÇA: Se for agendar, abrimos o formulário!
        setShowScheduleForm(true);
        // Se o usuário já digitou o remédio na frase (ex: "Agendar Dipirona"),
        // poderíamos pré-preencher aqui se o backend retornasse o remédio.
      }

      else if (intentData.intent === 'query_rag') {
        setMessages(prev => [...prev, { role: 'bot', text: "🔍 Consultando a bula..." }]);
        const ragResult = await api.queryRag(textoUsuario, intentData.topic);

        let respostaFinal = ragResult.response;
        try {
             const parsed = JSON.parse(ragResult.response);
             respostaFinal = parsed.answer;
        } catch(e) {}
        setMessages(prev => [...prev, { role: 'bot', text: respostaFinal }]);
      }

      else if (intentData.intent === 'cancel') {
          // Futuramente: Listar eventos para cancelar
          setMessages(prev => [...prev, { role: 'bot', text: "⚠️ Funcionalidade de listar eventos para cancelar será implementada em breve na tela." }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Ocorreu um erro ao processar sua mensagem." }]);
    } finally {
      setLoading(false);
    }
  }

  // --- Função para Enviar o Agendamento ---
  const handleConfirmSchedule = async () => {
      if(!scheduleData.instrucao) {
          alert("Por favor, preencha a instrução.");
          return;
      }

      setShowScheduleForm(false); // Fecha o modal
      setLoading(true);
      setMessages(prev => [...prev, { role: 'user', text: `[Agendando]: ${scheduleData.instrucao}` }]);

      try {
          const result = await api.scheduleTreatment(scheduleData.instrucao, scheduleData.inicio);
          setMessages(prev => [...prev, { role: 'bot', text: `✅ Agendamento realizado! ${result.message}` }]);
      } catch (error) {
          setMessages(prev => [...prev, { role: 'bot', text: "❌ Erro ao agendar no Google Calendar." }]);
      } finally {
          setLoading(false);
          setScheduleData({ instrucao: "", inicio: "agora" }); // Limpa form
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEnviar();
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <h1 className="welcome">Bem vindo, Paulo</h1>
        <p className="subtitle">Assistente Inteligente de Medicação</p>
      </header>

      <div className="content-area">
        {messages.length <= 1 ? (
          <div className="cards-container">
             {exemplos.map((ex) => (
              <div key={ex.id} className="card" onClick={() => setPrompt(ex.text)}>
                <p className="card-text">{ex.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="chat-container">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="chat-message bot"><div className="message-bubble">...</div></div>}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* --- MODAL DE AGENDAMENTO --- */}
      {showScheduleForm && (
          <div className="modal-overlay">
              <div className="modal-content">
                  <h3>Novo Agendamento</h3>
                  <p>Descreva o tratamento (Ex: "Dipirona de 8 em 8 horas por 5 dias")</p>

                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Instrução do medicamento..."
                    value={scheduleData.instrucao}
                    onChange={(e) => setScheduleData({...scheduleData, instrucao: e.target.value})}
                  />

                  <p style={{marginTop: 10}}>Quando começar?</p>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Ex: agora ou 25/12/2025 08:00"
                    value={scheduleData.inicio}
                    onChange={(e) => setScheduleData({...scheduleData, inicio: e.target.value})}
                  />

                  <div className="modal-actions">
                      <button className="cancel-btn" onClick={() => setShowScheduleForm(false)}>Cancelar</button>
                      <button className="confirm-btn" onClick={handleConfirmSchedule}>Confirmar Agendamento</button>
                  </div>
              </div>
          </div>
      )}

      <div className="footer-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Como posso ajudá-lo hoje?"
            className="input-field"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button className="send-btn" onClick={handleEnviar} disabled={loading}>P</button>
        </div>
      </div>
    </div>
  );
}