import React from "react"
import { Link } from "react-router-dom"

const ShoeTile = ({ id, url, name, color, description, score} ) => {
    const shoeUrl = `/shoes/${id}`
    return (
        <div className="small-12 medium-6 large-4 callout shoe-tile">
            <Link to={shoeUrl}>
            <img src={url} className="shoe-image-tile"/>
            <p>{name}</p>
            <p>{color}</p>
            <p>{score}</p>
          </Link>
        </div>
      )
}

export default ShoeTile