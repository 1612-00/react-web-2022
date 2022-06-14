const router = require('express').Router();

router.get('/:img', (req, res) => {
    res.sendFile(req.params.img, { root: './uploads' });
});

module.exports = router;
