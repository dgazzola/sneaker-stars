import React, { useState, useEffect } from "react"

const ShoeShowPage = props => {
    const [shoe, setShoe] = useState({})

    const id = props.match.params.id
    const getShoe = async () => {
        try{
            const response = await fetch(`/api/v1/shoes/${id}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
              }
            const shoeData = await response.json()
            setShoe(shoeData.shoe)
        }   catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getShoe()
    }, [])

    return(
        <div className="callout shoe-show">
          <h1>{shoe.name}</h1>
          <div className="shoe-show-grid">
            <div className="column">
              <img className="shoe-show-image" src={shoe.url} />
            </div>
            <div>
              <h5>Color: {shoe.color}</h5>
              <h5>Category: {shoe.category}</h5>
              <h5>Score: {shoe.score}</h5>
            </div>
          </div>
            <p className="shoe-description">
              {shoe.description}
            </p>
        </div>
    )
}

export default ShoeShowPage