const knex = require("knex");
const router = require("express").Router();

const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: "./data/lambda.sqlite3"
    },
    useNullAsDefault: true,
    debug: true
}

const db = knex(knexConfig);

router.get("/",(req,res)=>{
    db("cohorts")
    .then(animal=>{
        res.status(200).json(animal)
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({message: "cannot GET data"})
    })
})

router.get("/:id",(req,res)=>{
    db("cohorts")
    .where({id: req.params.id})
    .first()
    .then(animal=>{
        if(animal){
            res.status(200).json(animal)
        }else{
            res.status(404).json({Message: "role not found"})
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.post("/",(req,res)=>{
    db("cohorts")
    .insert(req.body,"id")
    .then(ids=>{
        db("zoos")
            .where({id: ids[0]})
            .first()
            .then(animal=>{
                res.status(201).json(animal)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    db('cohorts')
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: `${count} ${count > 1 ? 'records' : 'record'} updated`
          });
        } else {
          res.status(404).json({ message: 'Role does not exist' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.delete("/:id",(req,res)=>{
    db("cohorts")
    .where({id: req.params.id})
    .del()
    .then(count =>{
        if(count > 0) {
            res.status(200).json({message: `${count} ${count > 1 ? 'records' : 'record'} deleted`})
        }else {
            res.status(404).json({ message: 'Role does not exist' });
          }
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


module.exports = router;