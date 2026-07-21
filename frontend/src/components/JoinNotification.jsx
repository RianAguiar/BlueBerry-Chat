export function JoinNotification({ join }) {
    if (!join) return null
    return (
        <div className="message-join">
            <small>{join.username} has just arrived</small>
        </div>
    )
}

export default JoinNotification