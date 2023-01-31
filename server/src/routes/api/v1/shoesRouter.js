import express from "express"
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


export default shoesRouter

