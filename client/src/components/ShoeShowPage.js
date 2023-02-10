import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ReviewList from "./ReviewList.js"
import ReviewForm from "./ReviewForm.js"
import translateServerErrors from "../services/translateServerErrors.js"

const ShoeShowPage = ({ user, match }) => {
  const [shoe, setShoe] = useState({
    reviews: []
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)

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

  let reviewFormComponent
  if (user){
    reviewFormComponent = <ReviewForm postReview={postReview} shoe={shoe} errors={errors} setErrors={setErrors}/>
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
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this shoe? \nThis cannot be undone") == true) {
      deleteShoe()
    } else {
      alert("This shoe has NOT been deleted.")
    }
  }

  if (shouldRedirect) {
    return <Redirect push to="/" />
  }

  let deleteButton = ''
  if (user?.isAdmin == true) {
    deleteButton = <button type="button" className="button" onClick={handleDelete}>Delete Shoe</button>
  }

  const deleteReview = async (reviewToDelete) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewToDelete.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(reviewToDelete)
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
        const updatedReviews = shoe.reviews.filter(deleteReviewInState => {
          return deleteReviewInState.id !== reviewToDelete.id
        })
        setShoe({...shoe, reviews:updatedReviews}) 
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
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
        {deleteButton}
        <ReviewList reviews={shoe.reviews} user={user} deleteReview={deleteReview} />
        <div>
          {reviewFormComponent}
        </div>
    </div>
  )
}

export default ShoeShowPage