
// id: primary key, auto-increments.
// name: text, required.
// cohort_id: references the id in the cohorts table.

exports.up = function(knex) {
  return knex.schema.createTable("students", tbl=>{

        tbl.increments() //primary key

        tbl.string("name") 
            .notNullable()

        tbl.
       integer('roles_id')
      .unsigned()
      .references('id') // column
      .inTable('roles') // table
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.timestamps(true, true)
        
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("students")
};