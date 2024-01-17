/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {

  // Deletes ALL existing entries for 'digitalPlanner.goals'
  await knex("digitalPlanner.notes").del();
  await knex("digitalPlanner.notes").insert([
    {
      note_id: "1",
      note: "note test #1",
      due_date: "2023-02-05",
      completed: false,
    },
    {
      note_id: "2",
      note: "note test #2",
      due_date: "2023-01-24",
      completed: false,
    },
  ]);
};
