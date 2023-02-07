import express from "express"
import { ValidationError } from "objection"
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"

const shoeReviewsRouter = new express.Router()

shoeReviewsRouter.post("/", async (req, res) => {
  const bodyInput = cleanUserInput(req.body)
  const { body, score } = bodyInput
  const { shoeId , userId } = req.body
  try {
    const newReview = await Review.query().insertAndFetch({ body, score, shoeId, userId: parseInt(userId) })
    return res.status(201).json({ review : newReview })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors:error.data })
    }
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