import { Review } from "../../models/index.js";
import ShoeSeeder from "./ShoeSeeder.js";


class ReviewSeeder {
  static async seed(users, shoes) {

    const reviewsData = [
      {
      userId: users[0].id,
      shoeId: shoes[0].id,
      body: "really great shoe i recommend one",
      score:2
      },
      {
        userId: users[1].id,
        shoeId: shoes[1].id,
        body: "second time I'm saying really great shoe i recommend one",
        score:4
      },
      {
        userId: users[1].id,
        shoeId: shoes[2].id,
        body: "really great shoe i recommend two",
        score:2
      },
      {
        userId: users[2].id,
        shoeId: shoes[2].id,
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


