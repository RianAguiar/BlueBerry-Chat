function User(props) {
    return(
        <div>
            <img src={User.photo} alt={User.username} />
            <h2>Name: {User.username}</h2>
        </div>
    )
}

export default User