import express from "express"
import { Review, Vote } from "../../../models/index.js"
import ReviewSerializer from "../../../serializer/ReviewSerializer.js"

const reviewsRouter = new express.Router({ mergeParams: true })

reviewsRouter.get("/:id", async (req, res) => {
  const review = await Review.query().findById(req.params.id)
  const serializedReview = await ReviewSerializer.getSummary(review)
  return res.status(200).json({ review: serializedReview }) 
})

reviewsRouter.post("/:reviewId/votes/", async (req, res) => {
  const { value } = req.body
  const { reviewId } = req.params
  const userId = req.user.id
  try {
    const voteExists = await Vote.query().findOne({ userId, reviewId })
    if (!voteExists){
      const vote = await Vote.query().insertAndFetch({ value, userId, reviewId })
      return res.status(201).json({ vote })
    }
    if (voteExists.value != value){
      const vote = await Vote.query().findOne({ userId, reviewId })
      const newVote = await vote.$query().updateAndFetchById(vote.id, { value, userId, reviewId })
      return res.status(201).json({ vote: newVote })
    }
    if(voteExists.value == value){
      const vote = await Vote.query().findOne({ userId, reviewId })
      const newVote = await vote.$query().updateAndFetchById(vote.id, { value: 0 , userId, reviewId })
      return res.status(201).json({ vote: newVote })
    }
  } catch (error) {
    console.log(error )
    return res.status(422).json({ errors: error })
  }
})

export default reviewsRouter