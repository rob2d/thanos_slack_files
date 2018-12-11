const router = require('express').Router();
const runThanos = global.require('utils/runThanos');

router.post('/', (req, res) => {
    const { text } = req.body;
    const token = text.trim(); // strip whitespace

    runThanos(token);
    res.status(200).send();
});

module.exports = router;