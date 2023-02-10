import React, { useEffect, useState } from "react";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewTile = ({ user, reviewId }) => {
  const [review, setReview] = useState({ voteArray: []})
  const [clickedOn, setClickedOn] = useState({})

  const onClickHandler = (event) => {
    const value = event.currentTarget.id == "upvote" ? 1 : -1 
    handleVote(value, review.id)
    setClickedOn({[event.currentTarget.id]: !clickedOn[event.currentTarget.id]})
  }

  useEffect(() => {
    getReview()
  }, [])


  const getReview = async () => {
    try {
      const body = await fetch(`/api/v1/reviews/${reviewId}`)
      const reviewData = await body.json()
      setReview(reviewData.review)
    } catch (error) {
      console.error(error)
    }
  }

  const handleVote = async (value, reviewId) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}/votes`, {
        method: "POST",
        body: JSON.stringify({ value }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
      if (!response.ok) {
        throw new Error(
          `${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const voteArray = review.voteArray
      const voteIndex = review.voteArray.findIndex(e => e.id == body.vote.id)
      if (voteIndex != -1) {
        voteArray[voteIndex] = body.vote
      }else {
        voteArray.push(body.vote)
      }
      setReview({
        ...review,
        voteArray,
        votes: calcVotes(voteArray)})
    } catch (error) {
      console.error(error)
    }
  }


  const calcVotes = votes => {
    let sum = 0
    votes.forEach(vote => sum += vote.value )
    return sum
  }


  let upVoteComponent, downvoteComponent
  if (user){
    upVoteComponent = 
      <li 
        className={`vote-icon ${clickedOn.upvote ? "voted" : ""}`} >
        <FontAwesomeIcon 
          icon={faArrowUp} 
          id="upvote"  
          alt="upvote" 
          onClick={onClickHandler}/>
      </li>
    downvoteComponent = 
      <li 
        className={`vote-icon ${clickedOn.downvote ? "voted" : ""}`} >
        <FontAwesomeIcon 
          icon={faArrowDown} 
          id="downvote"  
          alt="downvote" 
          onClick={onClickHandler} />
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