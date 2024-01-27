/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("todo", (table) => {
        table.increments("task_id").primary();
        table.string("task").notNullable();
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
    console.log('Running down function for todo migration');
    return knex.schema.dropTable("todo"); 
   
};