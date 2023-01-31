import React from "react"
import { Link } from "react-router-dom"

const ShoeTile = (props) => {
    let showId = `/${props.id}`
    return (
        <div className="callout">
            <img src={props.url} width="200" height="200"/>
            <Link to={showId}> {props.name} </Link>


        </div>
    )
}

export default ShoeTile