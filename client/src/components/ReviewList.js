import React from "react";
import ReviewTile from "./ReviewTile.js";

const ReviewList = ({ user, reviews, handleVote }) => {
  let reviewTiles = ""

  if(reviews) {
    reviewTiles = reviews.map(review => {
      return <ReviewTile key={review.id} review={review} handleVote={handleVote} user={user}/>
    })
  }

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