import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../services/translateServerErrors"

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
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const deleteShoe = async () => {
    try {
      const response = await fetch(`/api/v1/shoes/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(shoe)
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
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleVote = async (type, reviewId) => {
    try {
      const response = await fetch(`/api/v1/shoes/${id}/reviews`, {
        method: "PATCH",
        body: JSON.stringify({ type, id: reviewId }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
      if (!response.ok) {
        throw new Error(
          `${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const reviewsToUpdate = shoe.reviews
      const reviewToUpdateIndex = reviewsToUpdate.findIndex(review => {
        return review.id === body.review.id
      })
      if (reviewToUpdateIndex !== -1) {
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
  if (user) {
    reviewFormComponent = <ReviewForm postReview={postReview} shoe={shoe} errors={errors} setErrors={setErrors} />

    useEffect(() => {
      getShoe()
    }, [])

    const handleDelete = () => {
      if (confirm("Are you sure you want to delete this shoe? \nThis cannot be undone") == true) {
        deleteShoe()
      } else {
        alert("This shoe has NOT been deleted.")
      }
    }


    let deleteButton = ''
    if (props.user?.is_admin == true) {
      deleteButton = <button type="button" className="button" onClick={handleDelete}>Delete Shoe</button>
    }

    return (
      <div className="callout shoe-show">
        <h1>{shoe.name}</h1>
        <div className="shoe-show-grid">
          <div className="column">
            <img className="shoe-show-image" src={shoe.url} alt={`An image of ${shoe.name}`} />
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
        <ReviewList reviews={shoe.reviews} handleVote={handleVote} />
        <div>
          {reviewFormComponent}
        </div>
        <div>
          {deleteButton}
        </div>
      </div>
    )
  }

  export default ShoeShowPage