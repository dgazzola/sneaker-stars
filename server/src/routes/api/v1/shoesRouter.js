import express from "express"
import ShoeSerializer from "../../../serializer/ShoeSerializer.js"
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

shoesRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const shoe = await Shoe.query().findById(id)
        const serializedShoe = await ShoeSerializer.getDetail(shoe)
        return res.status(200).json({ shoe:serializedShoe })
    } catch(error) {
        return res.status(500).json({ errors:error })
    }
})


export default shoesRouter

