import { useParams, useNavigate } from "react-router-dom"
import { useState, useRef, useLayoutEffect } from 'react'
import { handleEnterKey } from "../components/handleEnterKey"
import debounce from "../components/debounce"
import pop from "../components/pop"
import { useChatSocket } from "../hooks/useChatSocket"
import ChatHeader from "../components/ChatHeader"
import MessageList from "../components/MessageList"
import ReplyPreview from "../components/ReplyPreview"
import TypingIndicator from "../components/TypingIndicator"
import JoinNotification from "../components/JoinNotification"
import ChatInput from "../components/ChatInput"
import '../styles/Chat.css'

export function Chat() {
    const { nome } = useParams()
    const navigate = useNavigate()
    const username = localStorage.getItem('username')

    const [inputc, setInputc] = useState('')
    const [reply, setReply] = useState(null)
    const chatRef = useRef(null)

    const { messages, typing, join, sendMessage, deleteMessage, notifyTyping } =
        useChatSocket(nome, username)

    useLayoutEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }, [messages])

    const handleSend = () => {
        sendMessage(inputc, reply)
        pop()
        setInputc('')
        setReply(null)
    }

    const handleKeyDown = (e) => handleEnterKey(e, inputc, handleSend)

    const messageTypingDebounce = useRef(debounce(notifyTyping, 505)).current

    const excluirSala = async () => {
        try {
            const resposta = await fetch(`http://127.0.0.1:8000/api/sala/${nome}/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            if (resposta.ok) {
                navigate(`/`)
            } else {
                throw new Error("Erro ao excluir sala")
            }
        } catch (erro) {
            console.error(erro)
        }
    }

    return (
        <>
            <ChatHeader nome={nome} username={username} onDeleteRoom={excluirSala} />

            <div className="chat-container">
                <div className="chat-box">
                    <MessageList
                        messages={messages}
                        chatRef={chatRef}
                        onReply={setReply}
                        onDelete={deleteMessage}
                    />

                    <ReplyPreview reply={reply} onCancel={() => setReply(null)} />
                    <TypingIndicator typing={typing} />
                    <JoinNotification join={join} />

                    <ChatInput
                        value={inputc}
                        onChange={(e) => {
                            setInputc(e.target.value)
                            messageTypingDebounce()
                        }}
                        onKeyDown={handleKeyDown}
                        onSend={handleSend}
                    />
                </div>
            </div>
        </>
    )
}

export default Chat