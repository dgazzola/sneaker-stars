import React from "react";
import ReviewTile from "./ReviewTile.js";

const ReviewList = ({ reviews, handleVote }) => {
  let reviewTiles = ""
  const sortedReviews = reviews.sort((a,b) => {
    if ( a.votes < b.votes ){
      return 1
    }
    if ( a.votes > b.votes ){
      return -1
    }
    return 0
  }) 
  
  if(sortedReviews) {
    reviewTiles = sortedReviews.map(review => {
      return <ReviewTile key={review.id} review={review} handleVote={handleVote}/>
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