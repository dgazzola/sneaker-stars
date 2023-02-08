import { Review, User, Shoe } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const reviewsData = [
      {
      body: "really great shoe i recommend one",
      score:2
      },
      {
        body: "second time I'm saying really great shoe i recommend one",
        score:4
      },
      {
        body: "really great shoe i recommend two",
        score:2
      },
      {
        body: "really great shoe i recommend three",
        score:5
      }
    ]
    const jack = await User.query().findOne("email", "jackyjack@jackyjack.com")
    const justin = await User.query().findOne("email", "justinyjustin@justinyjustin.com")
    const dan = await User.query().findOne("email", "dannydan@dannydan.com")
    const jordans = await Shoe.query().findOne("name", "Jordan 1 Retro High OG")
    const vans = await Shoe.query().findOne("name", "Vans Old Skool")
    const nike = await Shoe.query().findOne("name", "Nike SB Dunk Low Mummy")

    await Review.query().insert({body: reviewsData[0].body, score: reviewsData[0].score, userId: jack.id, shoeId: jordans.id})
    await Review.query().insert({body: reviewsData[1].body, score: reviewsData[1].score, userId: dan.id, shoeId: vans.id})
    await Review.query().insert({body: reviewsData[2].body, score: reviewsData[2].score, userId: justin.id, shoeId: nike.id})
    await Review.query().insert({body: reviewsData[3].body, score: reviewsData[3].score, userId: jack.id, shoeId: nike.id})

    console.log("reviews seeded")
  }
}

export default ReviewSeeder