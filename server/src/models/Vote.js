const Model = require("./Model")
const unique = require("objection-unique")

class Vote extends Model {
  static get tableName() {
    return "vote"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["reviewId", "userId", "value"],
      properties: {
        reviewId: { type: ["integer", "string"] },
        userId: { type: ["integer", "string"] },
        value: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { Review, User } = require("./index.js")

    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: "vote.reviewId",
          to: "reviews.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "vote.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Vote