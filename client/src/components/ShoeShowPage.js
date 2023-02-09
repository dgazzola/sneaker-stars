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

    const handleVote = async (type, reviewId) => {
      try {
        const response = await fetch(`/api/v1/shoes/${id}/reviews`, {
          method: "PATCH",
          body: JSON.stringify({ type, id:reviewId }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
        if (!response.ok){
          throw new Error(
            `${response.status} (${response.statusText})`)
        }
        const body = await response.json()
        const reviewsToUpdate = shoe.reviews
        const reviewToUpdateIndex = reviewsToUpdate.findIndex(review => {
          return review.id === body.review.id
        })
        if(reviewToUpdateIndex !== -1){
          reviewsToUpdate[reviewToUpdateIndex] = body.review
        }
        const updatedReviews = reviewsToUpdate
        setShoe({
          ...shoe,
          reviews: updatedReviews
        })
      } catch (error) {
        console.error(error)
      }
    }

    let reviewFormComponent = ""
    if (user){
      reviewFormComponent = <ReviewForm postReview={postReview} shoe={shoe} errors={errors} setErrors={setErrors}/>
    }

    return (
        <div className="callout shoe-show">
          <h1>{shoe.name}</h1>
          <div className="shoe-show-grid">
            <div className="column">
              <img className="shoe-show-image" src={shoe.url}  alt={`An image of ${shoe.name}`}/>
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
            <ReviewList reviews={shoe.reviews} handleVote={handleVote}/>
            <div>
              {reviewFormComponent}
            </div>
        </div>
    )
}

export default ShoeShowPage