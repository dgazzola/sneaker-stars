import express from "express"
import { raw, ValidationError } from "objection"
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import ReviewSerializer from "../../../serializer/ReviewSerializer.js"

const shoeReviewsRouter = new express.Router({ mergeParams: true})

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

shoeReviewsRouter.patch("/", async (req, res) => {
  const { type, id } = req.body
  try {
    let review
    if(type === "upvote"){
      review = await Review.query().patchAndFetchById(id, {votes: raw('votes + 1')})
    }
    if(type === "downvote"){
      review = await Review.query().patchAndFetchById(id, {votes: raw('votes - 1')})
    }
    if(!review) {
      res.status(500).json({ errors: review })
    }else {
      const serializedReview = await ReviewSerializer.getSummary(review)
      return res.status(200).json({ review: serializedReview })
    }

  } catch (error) {
    console.error(error)
  }
})

export default shoeReviewsRouter