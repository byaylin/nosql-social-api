const router = require('express').Router();
const allRoutes = require('./api');

router.use('/api', allRoutes);
router.use((req,res) => {
    return res.send('uh oh wrong route');
});

module.exports = router;