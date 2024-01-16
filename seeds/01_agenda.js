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
        { date: '2024-01-15', time: '07:00:00', task: 'Task 1' },
        { date: '2024-01-15', time: '08:00:00', task: 'Task 2' },
        { date: '2024-01-15', time: '09:00:00', task: 'Task 3' },
        { date: '2024-01-15', time: '10:00:00', task: 'Task 4' },
    ]);
  };

