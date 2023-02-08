import React from "react";

const ReviewTile = ({ review }) => {
  
  return (
    <div className="callout">
      <h5>User: {review.username}</h5>
      <h5>Created At: {new Date(review.createdAt).toString()}</h5>
      <h5>Score: {review.score}</h5>
      <h5>Review: {review.body}</h5>
    </div>
  )
}

export default ReviewTile