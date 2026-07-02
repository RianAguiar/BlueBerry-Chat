import { Link } from "react-router-dom";
import { SlArrowRightCircle, SlArrowLeft } from "react-icons/sl";
import { useState } from 'react'
import '../styles/Chat.css'


const chat = {
    "sala": {
        "id": 1321,
        "nome": "Sala Projeto Chat"
    },
    "mensagens": [
        {
            "username": "Carlinhos",
            "conteudo": "A jovem guarda foi um movimento",
            "enviado_as": "01/07/2026, 14:24"
        },
        {
            "username": "Dalva",
            "conteudo": "A cleide faz oq mesmo?",
            "enviado_as": "01/07/2026, 14:23"
        },
        {
            "username": "Cleide",
            "conteudo": "oi, boa tarde",
            "enviado_as": "01/07/2026, 14:34"
        }
    ]
}

function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState(chat.mensagens);


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