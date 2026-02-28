const ensureAuthenticated = require('../Middlewares/ProdValid');

const router = require('express').Router();

router.get('/', ensureAuthenticated,(req, res) => {
    console.log(req.user);
    res.status(200).json([
        {
            name: 'Mobile',
            price: 10000,
        },
        {
            name: 'Laptop',
            price: 50000,
        }
    ]) 
});

module.exports = router;