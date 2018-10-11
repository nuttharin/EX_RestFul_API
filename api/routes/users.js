const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

//POST
router.post("/login", UserController.user_login);