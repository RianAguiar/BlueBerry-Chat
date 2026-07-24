import { SlArrowRightCircle } from "react-icons/sl"
import { FiPaperclip } from "react-icons/fi";


export function ChatInput({ value, onChange, onKeyDown, onSend, onAppend }) {
    return (
        <div className="input-container">
            <FiPaperclip onChange={onAppend} />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Type a message :)"
                onKeyDown={onKeyDown}
            />
            <SlArrowRightCircle onClick={onSend} title="Send message" />
        </div>
    )
}

export default ChatInput