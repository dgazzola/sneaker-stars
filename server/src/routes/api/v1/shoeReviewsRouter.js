import express from "express"
import { Review } from "../../../models/index.js"

const shoeReviewsRouter = new express.Router({ mergeParams: true })

shoeReviewsRouter.post("/", async (req, res) => {
  const { score, body, userId } = req.body
  const shoeId = parseInt(req.params.shoeId)

  try {
    const newReview = await Review.query().insertAndFetch({ score: score, body: body, shoeId:shoeId, userId: parseInt(userId) })
    return res.status(201).json({ review:newReview })
  } catch (error) {
    console.log(error)
  }
})

export default shoeReviewsRouter