import { useState } from "react";

function IndexForm() {
    function IrParaSala(){

    }

    return(
        <div>
            <form onSubmit={IrParaSala}>
                <input type="text" id='name' name='name' placeholder="Your Name" className="indexinput" value={Name}
                
                />
                <input type="text" id='roomname' name='roomname' placeholder="Room Name" className="indexinput" value={RoomName}
                
                />
                <button className="indexenterbutton" type="submit" value={GetIn}>Get In</button>
                
            </form>
        </div>
    )
}

export default IndexForm