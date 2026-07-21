import { AnimatePresence } from "framer-motion"
import MessageItem from "./MessageItem"

export function MessageList({ messages, chatRef, onReply, onDelete }) {
    return (
        <div className="messages" ref={chatRef}>
            <AnimatePresence>
                {messages.map((mensagem) => (
                    <MessageItem
                        key={mensagem.id}
                        mensagem={mensagem}
                        onReply={onReply}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}

export default MessageList