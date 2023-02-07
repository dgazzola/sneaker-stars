import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ReviewList from "./ReviewList.js"
import ReviewForm from "./ReviewForm.js"
import translateServerErrors from "../services/translateServerErrors.js"

const ShoeShowPage = props => {

    const { user } = props
    const [shoe, setShoe] = useState({
      reviews: []
    })
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [errors, setErrors] = useState({})

    const id = props.match.params.id
    const getShoe = async () => {
        try{
            const response = await fetch(`/api/v1/shoes/${id}`)
            if (!response.ok) {
              if (response.status===422) {
                const body = await response.json()
                const newErrors = translateServerErrors(body.errors)
                return setErrors(newErrors)

              } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
              }
            } else {
              const shoeData = await response.json()
              setShoe(shoeData.shoe)
            }
        } catch(err) {
          console.error(`Error in fetch: ${err.message}`)
        }
    }

    const postReview = async (newReviewData) => {
      newReviewData.shoeId = id
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
          setShouldRedirect(true)          
        }
      }
      catch(error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
    
      useEffect(() => {
          getShoe()
      }, [])
      
      if(shouldRedirect) {
        <Redirect to={`/shoes/${id}`} />
        getShoe()
        setShouldRedirect(false)
      }

      let reviewFormComponent = ""
      if(user){
        reviewFormComponent = 
        <ReviewForm 
            postReview={postReview} 
            shoe={shoe} 
            user={user} 
            errors={errors} 
            setErrors={setErrors}
        />
      }

      const handleVote = async (type, reviewId) => {
        try {
          const response = await fetch(`/api/v1/shoes/${shoe.id}/reviews`, {
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
          setShouldRedirect(true)
        } catch (error) {
          console.error(error)
        }
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
                  <ReviewList reviews={shoe.reviews} handleVote={handleVote}/>
                  <div>
                    {reviewFormComponent}
                  </div>
              </div>
          </div>  
    )
}

export default ShoeShowPage