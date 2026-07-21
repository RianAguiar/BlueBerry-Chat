import { Link } from "react-router-dom"
import { SlArrowLeft } from "react-icons/sl"
import { IoTrashOutline } from "react-icons/io5"

export function ChatHeader({ nome, username, onDeleteRoom }) {
    return (
        <div className="topfunctions">
            <div className="exit">
                <Link to="/"><SlArrowLeft title="Exit chat room" /></Link>
            </div>

            <div className="chat-n-username">
                <h4 title="Chat room">{nome}</h4>
                <h5 title="Your username">{username}</h5>
            </div>

            <div className="deletarsala">
                <IoTrashOutline title="Delete chat room" onClick={onDeleteRoom} />
            </div>
        </div>
    )
}

export default ChatHeader