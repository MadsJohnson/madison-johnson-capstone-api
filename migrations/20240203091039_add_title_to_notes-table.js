exports.up = function (knex) {
    return knex.schema.table('notes', function (table) {
        table.string('title'); // Assuming 'title' is of string type, adjust accordingly
    });
};

exports.down = function (knex) {
    return knex.schema.table('notes', function (table) {
        table.dropColumn('title');
    });
};

