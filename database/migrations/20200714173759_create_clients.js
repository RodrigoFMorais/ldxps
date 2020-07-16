exports.up = function (knex) {
  return knex.schema.createTable('CLIENTES', function (table) {
    table.string('CDCL', [36]).unique().primary();
    table.string('DSNOME', [50]).notNullable();
    table.string('IDTIPO', [2]).notNullable().defaultTo('PF');
    table.string('CDVEND', [36]).references('CDVEND').inTable('VENDEDORES');
    table.decimal('DSLIN', [15], [2]).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('CLIENTES');
};