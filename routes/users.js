const router = require('express').Router();
const {
  getAllUsers, getUserById, addNewUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', addNewUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
module.exports = router;
