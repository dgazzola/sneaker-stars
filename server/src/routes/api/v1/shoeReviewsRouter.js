import express from "express"
import { ValidationError } from "objection"
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../serializer/ReviewSerializer.js"

const shoeReviewsRouter = new express.Router()

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

shoeReviewsRouter.patch("/", async (req, res) => {
  const { type, id } = req.body
  console.log("review id", id)
  try {
    if(type === "upvote"){
      await Review.query().increment("votes", 1).where("id", id)
    }
    if(type ==="downvote"){
      await Review.query().decrement("votes", 1).where("id", id)
    }
    const reviews = await Review.query().where("id", id)
    const review = reviews[0]
    return res.status(200).json({ review })
  } catch (error) {
    console.error(error)
  }
})

export default shoeReviewsRouter