const express = require('express');
const {CreateNewUser} = require('../Controller/bootcamp');


const router = express.Router();

router.route("/").post(CreateNewUser);

module.exports = router;