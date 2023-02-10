import { User, Review, Vote } from "../../models/index.js"

class VoteSeeder {
  static async seed() {
    const jack = await User.query().findOne("email", "jackyjack@jackyjack.com")
    const justin = await User.query().findOne("email", "justinyjustin@justinyjustin.com")
    const dan = await User.query().findOne("email", "dannydan@dannydan.com")

    const review1 = await Review.query().findOne("body","really great shoe i recommend one")
    const review2 = await Review.query().findOne("body","second time I'm saying really great shoe i recommend one")
    const review3 = await Review.query().findOne("body","really great shoe i recommend three" )

    await Vote.query().insert({userId: jack.id, reviewId: review3.id, value: 1})
    await Vote.query().insert({userId: justin.id, reviewId: review2.id, value: -1})
    await Vote.query().insert({userId: dan.id, reviewId: review1.id, value: 1})
    
  }
}

export default VoteSeeder