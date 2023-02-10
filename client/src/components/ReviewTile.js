import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewTile = ({ user, review, deleteReview }) => {

  let iconArray = []
  for (let i=0; i<review.score; i++){
    iconArray.push(<FontAwesomeIcon className = "star"  key ={`font-awesome ${i}`} icon={faStar} />)
  }

  const dateObj = new Date(review.createdAt)
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const reviewDate = month + "/" + day + "/" + year

  const handleReviewDelete = () => {
    if (confirm("Are you sure you want to delete this review? \nThis cannot be undone") == true) {
      deleteReview(review)
    } else {
      alert("This review has NOT been deleted.")
    }
  }

  let deleteButton = ''
  let editButton = ''
  if (user?.isAdmin == true) {
    deleteButton = <button type="button" className="button" onClick={handleReviewDelete}>Delete Review</button>
    editButton = <button type="button" className="button">Edit Review</button>
  }

  return (
    <div className="grid-x callout">
      <div className = "cell small-6">
        <h5 className="backorange">{review.username}</h5>
        <h5 className="white">Date:{reviewDate}</h5>
        <h5 className="white">{iconArray}</h5>
      </div>
        <h5 className="white cell small-5">"{review.body}"</h5>
      <div>
        {deleteButton}
        {editButton}
      </div>


    </div>
  )
}

export default ReviewTile