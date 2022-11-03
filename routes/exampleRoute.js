const router = require("express").Router();
import ExampleModel from '../models/ExampleModel';

// example get
router.get("/exampleGet", (req, res) => {
    res.send("Example Get is Successful!");
});

//example post
router.post("/examplePost", async (req, res) => {

    //save a record for example
    const ex = new ExampleModel({
        title: req.body.title,
        description: req.body.description,
        ex: req.body.ex
    });

    ex.save()
        .then(ex => res.json(ex))
        .catch(err => res.json({ message: err }));
});

// example put with params
router.put("/:id", async (req, res) => {
    try {
        const updatedEntry = await ExampleModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedEntry);

    } catch (err) {
        res.status(500).json(err);
    }
});

// example delete with params
router.delete("/:id", async (req, res) => {
    ExampleModel.findByIdAndRemove(req.params.id)
        .then(entry => res.json(`Successfully deleted: ${entry.title}`))
        .catch(err => res.json({ message: err }))
});


export default router