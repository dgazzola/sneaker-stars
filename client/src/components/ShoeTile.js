import React from "react"
import { Link } from "react-router-dom"

const ShoeTile = (props) => {
    const shoeId = `/shoes/${props.id}`
    return (
        <div className="callout">
            <Link to={shoeId}>
            <img src={props.url} className="shoeimage"/>
           {props.name}
           </Link>
        </div>
       )
}

export default ShoeTile