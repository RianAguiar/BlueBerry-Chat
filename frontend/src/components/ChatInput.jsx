import { useRef } from 'react'
import { SlArrowRightCircle } from "react-icons/sl"
import { FiPaperclip } from "react-icons/fi";


export function ChatInput({ value, onChange, onKeyDown, onSend, onAppend }) {
    const fileInputRef = useRef(null)
    return (
        <div className="input-container">
            <FiPaperclip onClick={() => fileInputRef.current.click()} style={{ cursor: "pointer" }} />
            <input ref={fileInputRef} type="file" accept="image/*" onChange={onAppend} style={{ display: "none" }}/>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Type a message :)"
                onKeyDown={onKeyDown}
            />
            <SlArrowRightCircle onClick={onSend} title="Send message" style={{ cursor: "pointer" }} />
        </div>
    )
}

export default ChatInput