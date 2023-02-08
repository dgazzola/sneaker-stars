import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ReviewList from "./ReviewList.js"
import ReviewForm from "./ReviewForm.js"
import translateServerErrors from "../services/translateServerErrors.js"

const ShoeShowPage = ({ user, match }) => {
    const [shoe, setShoe] = useState({
      reviews: []
    })
    const [errors, setErrors] = useState({})
    const id = match.params.id

    const getShoe = async () => {
        try {
            const response = await fetch(`/api/v1/shoes/${id}`)
            if (!response.ok) {
              const errorMessage = `${response.status} (${response.statusText})`
              const error = new Error(errorMessage)
              throw error
            }
            const shoeData = await response.json()
            setShoe(shoeData.shoe)
        } catch(err) {
          console.error(`Error in fetch: ${err.message}`)
        }
    }

    const postReview = async (newReviewData) => {
      try {
        const response = await fetch(`/api/v1/shoes/${id}/reviews`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(newReviewData)
        })
        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json()
            const newErrors = translateServerErrors(body.errors)
            return setErrors(newErrors)
          } else {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error
          }
        } else {
          const body = await response.json()
          const updatedReviews = [...shoe.reviews, body.review]
          setShoe({ ...shoe, reviews:updatedReviews})      
        }
      }
      catch(error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
    
    useEffect(() => {
        getShoe()
    }, [])

    let reviewFormComponent = ""
    if (user){
      reviewFormComponent = <ReviewForm postReview={postReview} shoe={shoe} errors={errors} setErrors={setErrors}/>
    }
      
    return(
          <div className = "callout">
              <h1>{shoe.name}</h1>
              <img src={shoe.url} alt={`An image of ${shoe.name}`} />
              <div>
                  <h5>Category: {shoe.category}</h5>
                  <h5>Color: {shoe.color}</h5>
                  <h6>Description:</h6>
                  <p>
                      {shoe.description}
                  </p>
                  <ReviewList reviews={shoe.reviews}/>
                  <div>
                    {reviewFormComponent}
                  </div>
              </div>
          </div>  
    )
}

export default ShoeShowPage