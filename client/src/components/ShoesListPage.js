import React, { useState, useEffect } from "react"
import ShoeTile from "./ShoeTile"

const ShoesListPage = () => {
    const [shoes, setShoes] = useState([])

    const getShoes = async () => {
        try {
            const response = await fetch('/api/v1/shoes')
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
              }
            
            const parsedResponse = await response.json()
            setShoes(parsedResponse.shoes)
        } catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    useEffect(() => {
        getShoes()
    }, [])

    const shoeTileComponents = shoes.map(shoeObject => {
        return(
            <ShoeTile
                key = {shoeObject.id}
                {...shoeObject}
            />
        )
    })

    return (
        <div className="callout">
            <h1>SNEAKER STARS</h1>
            <h3>rate your favorite shoes</h3>
            <div className="shoe-tile-container">
              {shoeTileComponents}
            </div>
        </div>
    )
}

export default ShoesListPage