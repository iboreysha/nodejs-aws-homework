const express = require('express');
const { getUsers, getUserByID, createUser, updateUser, deleteUser } = require('../controllers/users.js');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;