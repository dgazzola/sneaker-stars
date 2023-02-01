import express from "express"
import { ValidationError } from "objection"
import { Shoe } from "../../../models/index.js"

const shoesRouter = new express.Router()

shoesRouter.get("/", async(req, res) => {
    try {
        const shoes = await Shoe.query()
        return res.status(200).json({ shoes:shoes })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

shoesRouter.post("/", async  (req, res) => {
  try {
    const { body } = req
    const newPersistedShoe = await Shoe.query().insertAndFetch(body)
    return res.status(201).json ({ shoe: newPersistedShoe })
  } catch (error) {
    if (error instanceof ValidationError){
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

export default shoesRouter

