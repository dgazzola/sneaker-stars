import { Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const reviewsData = [
      {
      userId: 1,
      shoeId: 1,
      body: "really great shoe i recommend one",
      score:2
      },
      {
        userId: 2,
        shoeId: 1,
        body: "second time I'm saying really great shoe i recommend one",
        score:4
      },
      {
        userId: 2,
        shoeId: 2,
        body: "really great shoe i recommend two",
        score:2
      },
      {
        userId: 3,
        shoeId: 3,
        body: "really great shoe i recommend three",
        score:5
      }
    ]
    for (const singleReviewData of reviewsData) {
      const currentReview = await Review.query().findOne(singleReviewData)
      if (!currentReview) {
        await Review.query().insert(singleReviewData)
      }
    }
    console.log("reviews seeded")
  }
}

export default ReviewSeeder


