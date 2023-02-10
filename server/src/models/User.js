/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users"
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds)
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword)
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username"],
      properties: {
        username: { type: "string", minLength: 3, maxLength: 15 },
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        profileImage: { type: "string" }
      },
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }
    return serializedJson;
  }

  static get relationMappings() {
      const { Review, Vote } = require("./index.js")

      return{
        reviews: {
          relation: Model.HasManyRelation,
          modelClass: Review,
          join: {
            from: "users.id",
            to: "reviews.userId"
          }
        },
        votes: {
          relation: Model.HasManyRelation,
          modelClass: Vote,
          join: {
            from: "users.id",
            to: "vote.userId"
          }
        }
      }
  }
}

module.exports = User;
