import React from "react"
import { Link } from "react-router-dom"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShoeTile = ({ id, url, name, color, score} ) => {
    const shoeUrl = `/shoes/${id}`
    let iconArray = []
    let starComponent

    for (let i=0; i<score; i++){
      iconArray.push(<FontAwesomeIcon className = "star" key ={`font-awesome ${i}`} icon={faStar} />)
    }
    if (iconArray.length>0) {
      starComponent = <p className="centered">{iconArray}</p>
    }
    if (iconArray.length===0) {
      starComponent = <p className="centered">No reviews :/</p>
    }
    
    return (
        <div className="small-12 medium-6 large-4 callout shoe-tile">
            <Link to={shoeUrl} className="centered">
            <img src={url} className="shoe-image-tile"/>
            <p className="centered">{name}</p>
            <p className="centered">{color}</p>
          </Link>
            {starComponent}
        </div>
      )
}

export default ShoeTile