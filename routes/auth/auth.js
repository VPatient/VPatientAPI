const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/UserModel');
const { registerValidation, loginValidation } = require('../../common/validation')
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    //validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400)
        .send(error.details[0].message);

    //checking if email is already taken
    User.findOne({ email: req.body.email })
        .then(emailExists => {
            if (emailExists) return res.status(400).send('Email already exists.')
        })

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        studentNumber: req.body.studentNumber,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    })
    user.save()
        .then(savedUser => res.send({ user: savedUser._id }))
        .catch(err => res.send({ "messages": err }));
});


router.post('/login', async (req, res) => {
    //validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400)
        .send(error.details[0].message);

    //checking if email is on the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Wrong e-mail or password.');

    //is password correct?
    const validPassword = await bcrypt
        .compare(req.body.password,
            user.password)
    if (!validPassword) return res.status(400).send('Wrong e-mail or password.');

    //create and assign jwt
    const token = jwt.sign(
        {
            _id: user._id,
            name: user.name,
            studentNumber: user.studentNumber,
            email: user.email,
            isAdmin: user.isAdmin

        }, process.env.SECRET);

    res.header('auth-token', token).send(token);
});

module.exports = router