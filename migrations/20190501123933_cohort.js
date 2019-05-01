
// id: primary key, auto-increments.
// name: text, required.


exports.up = function(knex) {
  return knex.schema.createTable("cohort", tbl=>{

    tbl.increments();//primary key, id by default

    tbl.string("name")
    .notNullable()
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cohort")
};

