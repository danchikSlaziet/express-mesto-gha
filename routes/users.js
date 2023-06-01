const express = require('express');
const router = require('express').Router();
const { getAllUsers, getUserById, addNewUser } = require('../controllers/users');

router.use(express.json());
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.post('/users', addNewUser);

module.exports = router;
