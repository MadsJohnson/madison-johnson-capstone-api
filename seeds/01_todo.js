/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("digitalPlanner.todo").del();

  // Inserts seed entries
  await knex("digitalPlanner.todo").insert([
    {
      user_id: "1",
      task_id: "3",
      task: "To do test #1",
      due_date: "2023-02-05",
      completed: false,
    },
    {
      user_id: "1",
      task_id: "2",
      task: "To do test #2",
      due_date: "2023-02-15",
      completed: false,
    },
  ]);
};
