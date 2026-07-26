import { AnimatePresence } from "framer-motion"
import MessageItem from "./MessageItem"

export function MessageList({ messages, chatRef, onReply, onDelete, image}) {
    return (
        <div className="messages" ref={chatRef}>
            <AnimatePresence>
                {messages.map((mensagem) => (
                    <MessageItem
                        key={mensagem.id}
                        mensagem={mensagem}
                        onReply={onReply}
                        image={mensagem.image}
                        onDelete={onDelete}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}

export default MessageList