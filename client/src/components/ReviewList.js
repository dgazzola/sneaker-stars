import React from "react";
import ReviewTile from "./ReviewTile.js";

const ReviewList = ({ user, reviews, deleteReview }) => {
  let reviewTiles = ""
  reviewTiles = reviews.map(review => {
    return (
      <ReviewTile 
        key={review.id} 
        review={review} 
        user={user} 
        deleteReview={deleteReview} 
      />
    )
  })

  return(
    <div className="callout">
      <h1> Reviews:</h1>
      <ul>
        {reviewTiles}
      </ul>
    </div>
  )
}

export default ReviewList