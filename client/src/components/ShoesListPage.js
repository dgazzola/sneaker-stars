import React, { useState, useEffect } from "react"
import ShoeTile from "./ShoeTile"

const ShoesListPage = () => {
    const [shoes, setShoes] = useState([])

    useEffect(() => {
        async function getShoes() {
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
        getShoes()
    }, [])

    const shoeTileComponents = shoes.map(shoeObject => {
        console.log(shoeObject)
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
            {shoeTileComponents}
        </div>
    )
}

export default ShoesListPage