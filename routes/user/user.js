const router = require("express").Router();
const { auth, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../routes/auth/verifyToken');
const { queryValidation, idValidation } = require('../../common/validation');
const UserModel = require('../../models/UserModel');

// get all registered users
router.get("/list", verifyTokenAndAdmin, async (req, res) => {
    // get users
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json({ message: err }));
});

// get all registered authorized (administrator) users
router.get("/listadmins", verifyTokenAndAdmin, async (req, res) => {
    // get users
    UserModel.find({
        isAdmin: true
    })
    .then(users => res.json(users))
    .catch(err => res.json({ message: err }));
});

// get all registered authorized (administrator) users
router.get("/listnurses", verifyTokenAndAdmin, async (req, res) => {
    // get nurses
    UserModel.find({
        isAdmin: false
    })
    .then(users => res.json(users))
    .catch(err => res.json({ message: err }));
});


module.exports = router;