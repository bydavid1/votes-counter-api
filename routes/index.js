const express = require('express');
const { registerVotes, getJrvInfo } = require('../controllers/jrv-controller');
const router = express.Router();

router.post('/registrar-datos', registerVotes);

router.get('/obtener-info-jrv', getJrvInfo);

module.exports = router;
