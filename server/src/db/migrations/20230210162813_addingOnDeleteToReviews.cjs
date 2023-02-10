/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("reviews", (table) => {
    table.dropForeign("userId")
    table.dropForeign("shoeId")
    table.foreign("userId").references("users.id").onDelete("CASCADE")
    table.foreign("shoeId").references("shoes.id").onDelete("CASCADE")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("reviews", (table) => {
    table.dropForeign("userId")
    table.dropForeign("shoeId")
    table.foreign("userId").references("users.id").onDelete("NO ACTION")
    table.foreign("shoeId").references("shoes.id").onDelete("NO ACTION")
  })
}
