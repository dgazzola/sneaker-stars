import Review from "../models/Review.js"
import ReviewSerializer from "./ReviewSerializer.js"

class ShoeSerializer {
    static async getDetail(shoe) {
        const allowedAttributes = ["name", "category", "color", "description", "url"]
        let serializedShoe = {}
        for (const attribute of allowedAttributes) {
            serializedShoe[attribute] = shoe[attribute]
        }
        const relatedReviews = await shoe.$relatedQuery("reviews")
        const serializedReviews = await Promise.all(
          relatedReviews.map(async(review) => await ReviewSerializer.getSummary(review))
        )
        serializedShoe.reviews = serializedReviews
        return serializedShoe
      }
}

export default ShoeSerializer