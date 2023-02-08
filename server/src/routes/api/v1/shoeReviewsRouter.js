import express from "express"
import { ValidationError } from "objection"
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../serializer/ReviewSerializer.js"

const shoeReviewsRouter = new express.Router({ mergeParams: true })

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