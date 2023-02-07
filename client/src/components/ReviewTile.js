// prepare formatted review tiles 
import React, { useEffect, useState } from "react";

const ReviewTile = ({ review, handleVote }) => {

  const onClickHandler = (event) => {
    handleVote(event.currentTarget.id, review.id)
  }

  return (
    <div className="callout">
      <h5>User:{review.username}</h5>
      <h5>Created At: {review.createdAt}</h5>
      <h5>Score: {review.score}</h5>
      <h5>Review: {review.body}</h5>
      <p>Upvotes: {review.votes}</p>
      <button className="button" id="upvote" onClick={onClickHandler}>Upvote</button>
      <button className="button" id="downvote" onClick={onClickHandler}>Downvote</button>
    </div>
    )
}

export default ReviewTile