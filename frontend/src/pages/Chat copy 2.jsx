import { Link } from "react-router-dom";
import { SlArrowRightCircle, SlArrowLeft } from "react-icons/sl";
import { useEffect, useState } from 'react'
import '../styles/Chat.css'

export default function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);

    async function BuscarMensagens() {
        try {
            const resposta = await fetch ('http://localhost:8000/sala/<int:chat_id>/')

        if (!resposta.ok) {throw new Error('erro ao buscar mensagens')}
        const dados = await resposta.json();
        setMessages(dados);
        }
        catch (erro) {console.log(erro);}
    }

    useEffect(()=>{BuscarMensagens();},[])























    const handleSend = () => {
        if (message.trim() !== '') {
            const novaMensagem = {
                id: Date.now(),
                username: "Você",
                conteudo: message,
                enviado_as: new Date().toLocaleString()
            };

            setMessages([...messages, novaMensagem]);
            setMessage('');
        }
    }

    return (
        <>
            <div className="exit">
                <Link to="/"><SlArrowLeft /></Link>
            </div>

            <div className="chat-container">
                <div className="chat-box">
                    <div className="messages">
                        {messages.map((mensagem) => (
                            <div key={mensagem.id} className="message">
                                <strong>{mensagem.username}</strong><br />
                                {mensagem.conteudo}<br />
                                <small>{mensagem.enviado_as}</small>
                            </div>
                        ))}
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Digite uma mensagem..."
                        />
                        <SlArrowRightCircle onClick={handleSend} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat