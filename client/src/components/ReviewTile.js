import React from "react";

const ReviewTile = ({ user, review, deleteReview }) => {
  const handleReviewDelete = () => {
    if (confirm("Are you sure you want to delete this review? \nThis cannot be undone") == true) {
      deleteReview(review)
    } else {
      alert("This review has NOT been deleted.")
    }
  }

  let deleteButton = ''
  let editButton = ''
  if (user?.is_admin == true) {
    deleteButton = <button type="button" className="button" onClick={handleReviewDelete}>Delete Review</button>
    editButton = <button type="button" className="button">Edit Review</button>
  }

  return (
    <div className="callout">
      <h5>User: {review.username}</h5>
      <h5>Created At: {new Date(review.createdAt).toString()}</h5>
      <h5>Score: {review.score}</h5>
      <h5>Review: {review.body}</h5>
      <div>
        {deleteButton}
        {editButton}
      </div>
    </div>
  )
}

export default ReviewTile