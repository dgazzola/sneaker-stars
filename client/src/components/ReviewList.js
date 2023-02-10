import React from "react";
import ReviewTile from "./ReviewTile.js";

const ReviewList = (props) => {
  let reviewTiles = ""
  let reviewMessage = ""
  reviewTiles = props.reviews.map(review => {
    return <ReviewTile key={review.id} review={review} />
  })

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