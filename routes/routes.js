const express = require('express');
const router = express.Router();

const {getAll, getById, add, deleteById, updateById} = require('../controllers/userController')


router.get('/getAll', getAll);
router.get('/getById', getById);
router.post('/add', add);
router.delete('/delete', deleteById);
router.put('/update', updateById);

const routes = module.exports;