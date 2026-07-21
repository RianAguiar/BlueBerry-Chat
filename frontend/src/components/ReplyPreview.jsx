import { IoArrowBack } from "react-icons/io5"

export function ReplyPreview({ reply, onCancel }) {
    if (!reply) return null

    return (
        <div className="reply-preview">
            <small>Respondendo a {reply.username}</small>
            <p>{reply.conteudo}</p>
            <IoArrowBack onClick={onCancel} />
        </div>
    )
}

export default ReplyPreview