import { Link } from "react-router-dom";
import { SlArrowRightCircle, SlArrowLeft } from "react-icons/sl";
import { useState } from 'react'
import '../styles/Chat.css'


const ExemploDeDados ={
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
    const [chat, setChat] = useState([])

    const handleSend = () => {
        if (message.trim() !== '') {
            setChat([...chat, message])
            setMessage('')
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
                        {chat.map((msg, index) => (<div key={index} className="message">{msg}</div>))}
                    </div>
                    
                    <div className="input-container">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Digite uma mensagem..."
                        />
                        <SlArrowRightCircle onClick={handleSend}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat