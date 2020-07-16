exports.up = function (knex) {
  return knex.schema.createTable('VENDEDORES', function (table) {
    table.string('CDVEND', [36]).unique().primary();
    table.string('DSNOME', [50]).notNullable();
    table.integer('CDTAB').notNullable();
    table.date('DTNASC');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('VENDEDORES');
};