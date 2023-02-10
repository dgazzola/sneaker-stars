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
      },
      {
        body: "wow holy shoe!",
        score:2
      },
      {
        body: "cool shoes for cool foos",
        score:4
      },
      {
        body: "a shoe that moos",
        score:5
      },
      {
        body: "big shoe with a big moo",
        score:5
      },
      {
        body: "wow orange!",
        score:4
      }

    ]
    const jack = await User.query().findOne("email", "jackyjack@jackyjack.com")
    const justin = await User.query().findOne("email", "justinyjustin@justinyjustin.com")
    const dan = await User.query().findOne("email", "dannydan@dannydan.com")
    const jordans = await Shoe.query().findOne("name", "Jordan 1 Retro High OG")
    const vans = await Shoe.query().findOne("name", "Vans Old Skool")
    const nike = await Shoe.query().findOne("name", "Nike SB Dunk Low Mummy")
    const future = await Shoe.query().findOne("name", "Nike MAG")
    const redboot = await Shoe.query().findOne("name", "Big Red Boot")
    const retro = await Shoe.query().findOne("name", "Nike Kyrie 7")

    await Review.query().insert({body: reviewsData[0].body, score: reviewsData[0].score, userId: jack.id, shoeId: jordans.id})
    await Review.query().insert({body: reviewsData[1].body, score: reviewsData[1].score, userId: dan.id, shoeId: vans.id})
    await Review.query().insert({body: reviewsData[2].body, score: reviewsData[2].score, userId: justin.id, shoeId: nike.id})
    await Review.query().insert({body: reviewsData[3].body, score: reviewsData[3].score, userId: jack.id, shoeId: nike.id})
    await Review.query().insert({body: reviewsData[4].body, score: reviewsData[4].score, userId: dan.id, shoeId: future.id})
    await Review.query().insert({body: reviewsData[5].body, score: reviewsData[5].score, userId: justin.id, shoeId: future.id})
    await Review.query().insert({body: reviewsData[6].body, score: reviewsData[6].score, userId: jack.id, shoeId: redboot.id})
    await Review.query().insert({body: reviewsData[7].body, score: reviewsData[7].score, userId: dan.id, shoeId: future.id})
    await Review.query().insert({body: reviewsData[8].body, score: reviewsData[8].score, userId: justin.id, shoeId: retro.id})

    console.log("reviews seeded")
  }
}

export default ReviewSeeder