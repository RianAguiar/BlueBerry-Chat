import '../styles/indexenterbutton.css'

function Button(props) {
    return(
        <>
            <button className={props.className}>{props.written}</button>
        </>
    )
}

export default Button