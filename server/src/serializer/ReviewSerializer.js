class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "body", "createdAt", "score"]
    const serializedReview = {}
    
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    const relatedUser = await review.$relatedQuery("user")
    serializedReview.username = relatedUser.username
    return serializedReview
  }
}

export default ReviewSerializer