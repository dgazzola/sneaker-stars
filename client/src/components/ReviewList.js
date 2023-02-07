// arranges the div element of all related reviews by mapping in to review tiles
import React, { useState } from "react";
import ReviewTile from "./ReviewTile.js";

const ReviewList = (props) => {
  let reviewTiles = ""
  const sortedReviews = props.reviews.sort((a,b) => {
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
      return <ReviewTile key={review.id} review={review} handleVote={props.handleVote}/>
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