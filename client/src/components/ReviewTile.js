// prepare formatted review tiles 
import React, { useEffect, useState } from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ReviewTile = ({ review, handleVote }) => {

  const onClickHandler = (event) => {
    handleVote(event.currentTarget.id, review.id)
  }

  return (
    <div className="callout review-tile">
        <div className="column small-10">
          <h5>User:{review.username}</h5>
          <h5>Created At: {review.createdAt}</h5>
          <h5>Score: {review.score}</h5>
          <h5>Review: {review.body}</h5>
        </div>
        <ul className="vote column">
          <li className="vote-icon" >
            <FontAwesomeIcon icon={faArrowUp} id="upvote"  alt="upvote" onClick={onClickHandler} />
          </li>
          <li className="vote-icon">
            {review.votes}
          </li>
          <li className="vote-icon" >
            <FontAwesomeIcon icon={faArrowDown} id="downvote"  alt="downvote" onClick={onClickHandler} />
          </li>
        </ul>
    </div>
  )
}

export default ReviewTile