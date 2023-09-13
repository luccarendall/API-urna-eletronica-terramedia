const express = require('express');
const db = require('../database');
const router = express.Router();

// rota para listar os candidatos cadastrados
router.get('/candidatos', async (req, res) => {
  const results = await db.getCandidatos();
  res.json(results)
});

module.exports = router;