import express from "express"
import { ValidationError } from "objection"
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../serializer/ReviewSerializer.js"

const shoeReviewsRouter = new express.Router({ mergeParams: true })

shoeReviewsRouter.delete("/:id", async (req, res) => {
  const reviewId = req.params.id
  try {
    const deletedReview = await Review.query().findById(reviewId).delete()
    return res.status(204).json({ deleted: deletedReview })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

shoeReviewsRouter.post("/", async (req, res) => {
  const bodyInput = cleanUserInput(req.body)
  const { score, body } = bodyInput
  const shoeId = req.params.shoeId
  const userId = req.user.id
  try {
    const newReview = await Review.query().insertAndFetch({ score: score, body: body, shoeId:shoeId, userId: userId })
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