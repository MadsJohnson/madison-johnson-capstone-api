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
    await knex("priorities").del();
    await knex("priorities").insert([
      {
        priority_id: 1,
        priority: "priority test #1",
        dueDate: "2023-01-8",
        completed: false,
      },
      {
        priority_id: 2,
        prioriity: "priority test #2",
        dueDate: "2023-01-24",
        completed: false,
      }
    ]);
  };