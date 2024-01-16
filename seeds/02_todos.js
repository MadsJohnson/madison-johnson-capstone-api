/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("table_name").del();
    await knex("table_name").insert([
      { id: 1, colName: "rowValue1" },
      { id: 2, colName: "rowValue2" },
      { id: 3, colName: "rowValue3" },
    ]);
  };
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("todos").del();
    await knex("todos").insert([
      {
        task_id: 1,
        task: "To do test #1",
        dueDate: "2023-02-05",
        completed: false,
      },
      {
        task_id: 2,
        task: "To do test #2",
        dueDate: "2023-02-15",
        completed: false,
      }
    ]);
  };