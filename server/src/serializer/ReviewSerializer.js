class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "body", "createdAt", "score", "votes"]
    const serializedReview = {}
    
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    const relatedUser = await review.$relatedQuery("user")
    serializedReview.username = relatedUser.username

    const relatedReviews = await review.$relatedQuery("votes")
    let votesSum = 0
    for(review of relatedReviews){
      votesSum += review.value
    }
    serializedReview.votes = votesSum
    serializedReview.voteArray = relatedReviews
    return serializedReview
  }
}

export default ReviewSerializer