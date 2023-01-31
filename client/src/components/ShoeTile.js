import React from "react"
import { Link } from "react-router-dom"

const ShoeTile = (props) => {
    const showId = `/${props.id}`
    return (
        <div className="callout">
            <img src={props.url} className="shoeimage"/>
            <Link to={showId}> {props.name} </Link>
        </div>
    )
}

export default ShoeTile