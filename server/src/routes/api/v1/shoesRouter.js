import express from "express"
import { Shoe } from "../../../models/index.js"

const shoesRouter = new express.Router()
//NEED TO FINISH FILLING THIS OUT AFTER MODELS ARE MADE!!!
shoesRouter.get("/", async(req, res) => {
    try {
        const shoes = await Shoe.query()
        return res.status(200).json({ shoes:shoes })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

shoesRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const shoe = await Shoe.query().findById(id)
        return res.status(200).json({ shoe: shoe})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default shoesRouter

