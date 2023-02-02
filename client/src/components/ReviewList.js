// arranges the div element of all related reviews by mapping in to review tiles
import React, { useState } from "react";
import ReviewTile from "./ReviewTile.js";

const ReviewList = (props) => {
  let reviewTiles = ""
  if(props.reviews) {
    reviewTiles = props.reviews.map(review => {
      return <ReviewTile key={review.id} review={review} />
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