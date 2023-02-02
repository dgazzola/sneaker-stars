import React, { useState, useEffect } from "react"
import ReviewList from "./ReviewList.js"


const ShoeShowPage = props => {
    const [shoe, setShoe] = useState({})
    const [reviews, setReviews] = useState([])

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
            setReviews(shoeData.shoe.reviews)
        }   catch(err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    
    useEffect(() => {
        getShoe()
    }, [])

    return(
          <div className = "callout">
              <h1>{shoe.name}</h1>
              <img src={shoe.url} />
              <div>
                  <h5>Category: {shoe.category}</h5>
                  <h5>Color: {shoe.color}</h5>
                  <h6>Description:</h6>
                  <p>
                      {shoe.description}
                  </p>
                  <div>
                    <ReviewList reviews={reviews}/>
                  </div>
              </div>
          </div>  
    )
}

export default ShoeShowPage