/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    return table.boolean("isAdmin").notNullable().defaultTo(false)
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    return table.dropColumn("isAdmin")
  })
}