const express = require('express');
const router = express.Router();

const {getAll, getById, add, deleteById, updateById} = require('../controllers/userController')

router.get('/', (req, res) => {
    res.send('welcome to TourEase');
});

router.get('/get', getAll);
router.get('/getById/:id', getById);
router.post('/add', add);
router.delete('/delete/:id', deleteById);
router.put('/update/:id', updateById);

module.exports = router;