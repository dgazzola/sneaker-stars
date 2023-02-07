import React, { useState } from "react"
import ErrorList from "./ErrorList"

const ReviewForm = ({ postReview, errors, shoe, user, setErrors }) => {
  const [newReview, setNewReview] = useState({
    body: "",
    score: "",
    userId: user.id
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    postReview(newReview)
    clearForm()
  }

  const handleInputChange = event => {
      setNewReview({
        ...newReview,
        [event.currentTarget.name]: event.currentTarget.value
      })
      console.log("new review", newReview)
    }

  const clearForm = () => {
    setNewReview({
      body: "",
      score: "",
      userId: user.id
    })
    setErrors({})
  }

  return(
    <div className="callout">
      <h1>New Review Form:</h1>
      <form onSubmit={handleSubmit}>
        <ErrorList errors={errors} />
        <label>
          Review:
          <input
            type="text"
            name="body"
            onChange={handleInputChange}
            value={newReview.body}
          />
        </label>
        <label>
          Score:
          <select name="score" onChange={handleInputChange} value={newReview.score}>
            <option value="0"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <div className="button-group">
          <input className="button" type="submit" value="Submit Review" />
        </div>
      </form>
    </div>
  )
}

export default ReviewForm