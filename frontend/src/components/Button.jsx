function Button(props) {
    return(
        <div>
            <button className={props.className}>{props.written}</button>
        </div>
    )
}

export default Button