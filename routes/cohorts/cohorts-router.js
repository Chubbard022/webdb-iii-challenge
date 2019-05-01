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
//------------------------------------------------------------------
//------------------------------------------------------------------
router.get("/",(req,res)=>{
    db("cohort")
    .then(animal=>{
        res.status(200).json(animal)
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({message: "cannot find cohort data"})
    })
})

router.get("/:id",(req,res)=>{
    db("cohort")
    .where({id: req.params.id})
    .first()
    .then(student=>{
        if(student){
            res.status(200).json(student)
        }else{
            res.status(404).json({Message: "cohort not found"})
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.get("/:id/students",(req,res)=>{
    db("students")
    .where({roles_id: req.params.id})
    .then(student=>{
        if(student){
            res.status(200).json(student)
        }else{
            res.status(404).json({Message: "cohort not found"})
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.post("/",(req,res)=>{
    db("cohort")
    .insert(req.body,"id")
    .then(ids=>{
        db("cohort")
            .where({id: ids[0]})
            .first()
            .then(student=>{
                res.status(201).json(student)
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
    db('cohort')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
            message: `${count} ${count > 1 ? 'cohorts' : 'cohort'} updated`
        });
        } else {
            res.status(404).json({ message: 'cohort does not exist' });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete("/:id",(req,res)=>{
    db("cohort")
    .where({id: req.params.id})
    .del()
    .then(count =>{
        if(count > 0) {
            res.status(200).json({message: `${count} ${count > 1 ? 'cohorts' : 'cohort'} deleted`})
        }else {
            res.status(404).json({ message: 'cohort does not exist' });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
})


module.exports = router;