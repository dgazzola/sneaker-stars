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

        const sortedSerializedReviews = serializedReviews.sort((a,b) => {
          if ( a.votes < b.votes ){
            return 1
          }
          if ( a.votes > b.votes ){
            return -1
          }
          return 0
        }) 
        
        serializedShoe.reviews = sortedSerializedReviews
        return serializedShoe
      }
}

export default ShoeSerializer