// Inside the migration file
exports.up = function (knex) {
    return knex.schema.table('notes', function (table) {
        table.dropColumn('completed');
    });
};

exports.down = function (knex) {
    return knex.schema.table('notes', function (table) {
        table.boolean('completed').defaultTo(false);
    });
};
