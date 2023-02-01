const Model = require("./Model")

class Shoe extends Model {
    static get tableName() {
        return "shoes"
    }

    static get jsonSchema() {
        return {
            type:"object",
            required: ["name", "url"],
            properties: {
                name: {type: "string" },
                color: {type: "string"},
                category: {type: "string"},
                url: {type: "string"}
            }
        }
    }
}

module.exports = Shoe