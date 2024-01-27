/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
 
  // Deletes ALL existing entries for 'digitalPlanner.agenda'
  await knex("digitalPlanner.agenda").del();
  await knex("digitalPlanner.agenda").insert([
    { user_id: "1", id: "1", date: '2024-01-15', time: '07:00:00', task: 'Task 1' },
    { user_id: "1",id: "2", date: '2024-01-15', time: '08:00:00', task: 'Task 2' },
    { user_id: "1",id: "3", date: '2024-01-15', time: '09:00:00', task: 'Task 3' },
    { user_id: "1",id: "4", date: '2024-01-15', time: '10:00:00', task: 'Task 4' },
  ]);
};
