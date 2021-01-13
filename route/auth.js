const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require("config")
const { check, validationResult } = require("express-validator")

const User = require('../model/User')

router.post("/register",
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Please enter a password of length more than 6').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {
            let user = await User.findOne({ email })

            // See if user exists
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }

            user = new User({
                name, email, password
            })
            // Encrypt password
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)
            await user.save()

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            })
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
)


router.post("/login", [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password of length more than 6').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        // See if user does not exists
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User does not exists' }] })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            res.status(500).json({ msg: "Invalid Credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" })
    }
})


module.exports = router