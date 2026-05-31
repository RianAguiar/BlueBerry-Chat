//outra maneira de usar o props(tera o msm resultado)

function User({photo, username}) {
    return(
        <div>
            <img src={photo} alt={username} />
            <h2>Name: {username}</h2>
        </div>
    ) 
}

export default User