function User(props) {
    return(
        <div>
            <img src={props.photo} alt={props.username} />
            <h2>Name: {props.username}</h2>
        </div>
    ) 
}

export default User