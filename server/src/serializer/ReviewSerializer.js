class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "body", "createdAt", "score", "votes"]
    const serializedReview = {}
    
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    const relatedUsername = await review.$relatedQuery("user")
    serializedReview.username = relatedUsername.username
    return serializedReview
  }
}

export default ReviewSerializer