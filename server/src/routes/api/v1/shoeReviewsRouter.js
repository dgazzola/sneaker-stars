import express from "express"
import { ValidationError } from "objection"
import { Review, Vote } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../serializer/ReviewSerializer.js"

const shoeReviewsRouter = new express.Router({ mergeParams: true})

shoeReviewsRouter.post("/vote", async (req, res) => {
  const { value, reviewId } = req.body
  const userId = req.user.id
  try {
    const voteExists = await Vote.query().findOne({ userId, reviewId })
    if (!voteExists){
      const vote = await Vote.query().insertAndFetch({ userId, reviewId, value})
      return res.status(201).json({ vote })
    }
    if (voteExists?.value != value){
      const vote = await Vote.query().patch({ value }).findOne({ userId, reviewId})
      return res.status(201).json({ vote })
    }
    if(voteExists?.value == value){
      const vote = await Vote.query().delete().findOne({ userId, reviewId })
      return res.status(201).json({ vote })
    }
    return res.status(200)
  } catch (error) {
    return res.status(422).json({ error: "already voted" })
  }
})

shoeReviewsRouter.post("/", async (req, res) => {
  const bodyInput = cleanUserInput(req.body)
  const { score, body } = bodyInput
  const { shoeId } = req.params
  const { id } = req.user
  try {
    const newReview = await Review.query().insertAndFetch({ score: score, body: body, shoeId:shoeId, userId: id })
    const serializedReview = await ReviewSerializer.getSummary(newReview)
    return res.status(201).json({ review:serializedReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default shoeReviewsRouter