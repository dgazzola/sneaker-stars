import React, { useState, useEffect } from "react"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewList from "./ReviewList.js"
import ReviewForm from "./ReviewForm.js"
import translateServerErrors from "../services/translateServerErrors.js"

const ShoeShowPage = ({ user, match }) => {
    const [shoe, setShoe] = useState({
      reviews: [],
      score: 0
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
          console.log("LOG", body)
          setShoe({ 
            ...shoe, 
            reviews:updatedReviews, 
            score:body.review.score
          })
          getShoe()      
        }
      }
      catch(error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
    
    useEffect(() => {
        getShoe()
    }, [])

    let iconArray = []
    for (let i=0; i<shoe.score; i++){
      iconArray.push(<FontAwesomeIcon className = "star" key ={`font-awesome ${i}`} icon={faStar} />)
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
              <h5 className="white">Color: {shoe.color}</h5>
              <h5 className="white">Category: {shoe.category}</h5>
              <h5 className="white">Score: {iconArray} </h5>
            </div>
          </div>
            <p className="shoe-description">
              {shoe.description}
            </p>
            <ReviewList reviews={shoe.reviews}/>
            <div>
              {reviewFormComponent}
            </div>
        </div>
    )
}

export default ShoeShowPage