/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("notes", (table) => {
        table.increments("note_id").primary();
        table.string("note").notNullable();
        table.string("due_date").notNullable();
        table.boolean("completed").notNullable();
        table.integer('user_id').unsigned().references('user_id').inTable('users');
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  
});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("notes"); 
};