
class ShoeSerializer {
    static async getDetail(shoe) {
        const allowedAttributes = ["name", "category", "color", "description", "url"]
        let serializedShoe = {}
        for (const attribute of allowedAttributes) {
            serializedShoe[attribute] = shoe[attribute]
        }
        return serializedShoe
    }
}

export default ShoeSerializer