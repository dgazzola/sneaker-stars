const Model = require("./Model")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type:"object",
            required: ["userId", "shoeId", "body", "score"],
            properties: {
                userId: { type: "integer" },
                shoeId: { type: ["integer","string"] },
                score: { type: ["integer", "string"], minimum:1, maximum:5 },
                body: { type: "string" },
                votes: { type: "integer" }

            }
        }
    }

    static get relationMappings() {
      const { Shoe, User } = require("./index.js")
      return{
        shoe: {
          relation: Model.BelongsToOneRelation,
          modelClass: Shoe,
          join: {
            from: "reviews.shoeId",
            to: "shoes.id"
          }
        },
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: "reviews.userId",
            to: "users.id"
          }
        }
      }
    }
}

module.exports = Review