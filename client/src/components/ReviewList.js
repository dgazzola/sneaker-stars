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
  let reviewMessage=""

  if(reviewTiles.length===0){
    reviewMessage = <h1>No Reviews Yet</h1>
  }
  if(reviewTiles.length>0){
    reviewMessage = <h1>Reviews: </h1>
  }

  return(
    <div className="callout">
      {reviewMessage}
      <ul>
        {reviewTiles}
      </ul>
    </div>
  )
}

export default ReviewList