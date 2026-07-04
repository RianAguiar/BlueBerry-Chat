import { useState } from "react";

function IndexForm() {
    function IrParaSala(e){
        const username = localStorage.getItem('username')
        e.preventDefault()
        console.log('user',{username},'sended to',{nome})

    }
    const [username, setUsername] = useState()
    const [nome, setNome] = useState()
    localStorage.setItem('username', username)

    return(
        <div>
            <form onSubmit={IrParaSala}>

                <input type="text" id='name' name='name' placeholder="Your Name" className="indexinput"
                onChange={(e) => setUsername(e.target.value)}/>
                
                <input type="text" id='roomname' name='roomname' placeholder="Room Name" className="indexinput" 
                onChange={(e) => setNome(e.target.value)}/>

                <button className="indexenterbutton" type="submit">Get In</button>
                
            </form>
        </div>
    )
}

export default IndexForm