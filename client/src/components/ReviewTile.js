import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewTile = ({ review }) => {

  let iconArray = []
  for (let i=0; i<review.score; i++){
    iconArray.push(<FontAwesomeIcon className = "star"  key ={`font-awesome ${i}`} icon={faStar} />)
  }

  const dateObj = new Date(review.createdAt)
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const reviewDate = month + "/" + day + "/" + year

  return (
    <div className="grid-x callout">
      <div className = "cell small-6">
        <h5 className="backorange">{review.username}</h5>
        <h5 className="white">Date:{reviewDate}</h5>
        <h5 className="white">{iconArray}</h5>
      </div>

      <h5 className="white cell small-5">"{review.body}"</h5>

    </div>
  )
}

export default ReviewTile