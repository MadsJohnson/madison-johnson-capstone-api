/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {

  // Deletes ALL existing entries for 'digitalPlanner.priorities'
  await knex("digitalPlanner.priorities").del();
  await knex("digitalPlanner.priorities").insert([
    {
      user_id: "1",
      priority_id: 1,
      priority: "priority test #1",
      due_date: "2023-01-8",
      completed: false,
    },
    {
      user_id: "1",
      priority_id: 2,
      priority: "priority test #2", // Fix the typo here
      due_date: "2023-01-24",
      completed: false,
    },
  ]);
};
