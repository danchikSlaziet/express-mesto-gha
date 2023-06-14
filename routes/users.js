const router = require('express').Router();
const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getYourself,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getYourself);
router.get('/:userId', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
module.exports = router;
