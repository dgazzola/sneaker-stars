// prepare formatted review tiles 
import React, { useEffect, useState } from "react";

const ReviewTile = ({ review }) => {
  let body, username, createdAtString, score
  
  if(review) {
    body = <p>{review.body}</p>
    username = <p>{review.username}</p>
    score = <p>{review.score}</p>
    createdAtString = <p>{(new Date(review.createdAt)).toUTCString()}</p>
  }

  return (
    <div className="callout">
      <h5>User:{username}</h5>
      <h5>Created At: {createdAtString}</h5>
      <h5>Score: {score}</h5>
      <h5>Review: {body}</h5>
    </div>
    )
}

export default ReviewTile