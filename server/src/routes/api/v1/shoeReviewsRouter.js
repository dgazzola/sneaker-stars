import express from "express"
import { ValidationError } from "objection"
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"

const shoeReviewsRouter = new express.Router({ mergeParams: true })

shoeReviewsRouter.post("/", async (req, res) => {
  const bodyInput = cleanUserInput(req.body)
  const { score, body, userId } = bodyInput
  const shoeId = parseInt(req.params.shoeId)

  try {
    const newReview = await Review.query().insertAndFetch({ score: score, body: body, shoeId:shoeId, userId: parseInt(userId) })
    return res.status(201).json({ review:newReview })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors:error.data })
    }
  }
})

export default shoeReviewsRouter