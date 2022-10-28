const router = require("express").Router();
const ExampleModel = require('../models/ExampleModel');

// example get
router.get("/exampleGet",(req,res)=>{
    res.send("Example Get is Successfull!");
});

//example post
router.post("/examplePost",async (req,res)=>{

    //save a record for example
    // const ex = new ExampleModel({
    //     title: req.body.title,
    //     description: req.body.description,
    //     rating: req.body.example
    // });
    // ex.save()
    // .then(ex=>res.json(ex))
    // .catch(err=>res.json({message:err}));

    res.send("Example Post is Successfull!");
});

// example put with params
router.put("/:id", async (req,res)=>{
    res.send(`Example Put Successfull for id: ${req.params.id}`);
});

// example delete with params
router.delete("/:id",async (req,res)=>{
    res.send(`Example Delete is Successfull for id: ${req.params.id}`);
});


module.exports = router