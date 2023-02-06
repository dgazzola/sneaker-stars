import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ReviewList from "./ReviewList.js"
import ReviewForm from "./ReviewForm.js"

const ShoeShowPage = props => {

    const { user } = props
    const [shoe, setShoe] = useState({})
    const [reviews, setReviews] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

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
          setShouldRedirect(true)
          
        }
      }
      catch(error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
    //NEED ERROR HANDLING AND PASS IN AS PROPS TO REVIEW FORM
      //still need error handling and form feedback
      useEffect(() => {
          getShoe()
      }, [])
      
      let redirectComponent = ""
      if(shouldRedirect) {
        <Redirect to={`/shoes/${id}`} />
        getShoe()
        setShouldRedirect(false)
        
      }

      let reviewFormComponent = ""
      if(user){
        reviewFormComponent = <ReviewForm postReview={postReview} shoe={shoe} user={user}/>
      }
      
    return(
          <div className = "callout">
            {/* {redirectComponent} */}
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
                  <div>
                    {reviewFormComponent}
                  </div>
              </div>
          </div>  
    )
}

export default ShoeShowPage