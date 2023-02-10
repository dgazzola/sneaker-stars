import Review from "../models/Review.js"
import ReviewSerializer from "./ReviewSerializer.js"

class ShoeSerializer {
    static async getDetail(shoe) {
        const allowedAttributes = ["id", "name", "category", "color", "description", "url"]
        let serializedShoe = {}
        for (const attribute of allowedAttributes) {
            serializedShoe[attribute] = shoe[attribute]
        }
        const relatedReviews = await shoe.$relatedQuery("reviews")
        const serializedReviews = await Promise.all(
          relatedReviews.map(async(review) => await ReviewSerializer.getSummary(review))
          )
        let reviewTotal = 0
        let denominator = 0
        serializedReviews.forEach(review => {
          reviewTotal+=parseInt(review.score)
          denominator++
        })
        const reviewAvg = Math.round((reviewTotal/denominator))

        serializedShoe.reviews = serializedReviews
        serializedShoe.score = reviewAvg
        return serializedShoe
      }
}

export default ShoeSerializer