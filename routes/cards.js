const express = require('express');
const router = require('express').Router();
const { getAllCards, addNewCard, deleteCard } = require('../controllers/cards');

router.use(express.json());
router.get('/cards', getAllCards);
router.delete('/cards/:cardsId', deleteCard);
router.post('/cards', addNewCard);

module.exports = router;
