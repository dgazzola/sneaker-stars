import React, { useState } from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewTile = ({ user, review, handleVote }) => {
  const [clickedOn, setClickedOn] = useState({})

  const onClickHandler = (event) => {
    const value = event.currentTarget.id === "upvote" ? 1 : -1 
    handleVote(value, review.id)
    setClickedOn({[event.currentTarget.id]: !clickedOn[event.currentTarget.id]})
  }

  let upVoteComponent = "", downvoteComponent = ""
  if (user){
    upVoteComponent = 
      <li className={`vote-icon ${clickedOn.upvote ? "voted" : ""}`} >
      <FontAwesomeIcon icon={faArrowUp} id="upvote"  alt="upvote" onClick={onClickHandler}/>
    </li>
    downvoteComponent = 
      <li className={`vote-icon ${clickedOn.downvote ? "voted" : ""}`} >
        <FontAwesomeIcon icon={faArrowDown} id="downvote"  alt="downvote" onClick={onClickHandler} />
      </li>
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
        {upVoteComponent}
        <li className="vote-icon">
          {review.votes}
        </li>
        {downvoteComponent}
      </ul>
    </div>
  )
}

export default ReviewTile