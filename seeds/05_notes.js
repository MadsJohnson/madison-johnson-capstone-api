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
    await knex("goals").del();
    await knex("goals").insert([
      {
        note_id: 1,
        note: "note test #1",
        dueDate: "2023-02-05",
        completed: false,
      },
      {
        note_id: 2,
        note: "note test #2",
        dueDate: "2023-01-24",
        completed: false,
      }
    ]);
  };