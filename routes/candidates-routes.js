const express = require('express');
const db = require('../database');
const router = express.Router();

// rota para listar os candidatos cadastrados
router.get('/candidatos', async (req, res) => {
  const results = await db.getCandidatos();
  res.json(results)
});

// rota de cadastro de 1 novo candidato
router.post('/candidato', async (req, res) => {
  const candidato = req.body;
  await db.postCandidato(candidato);
  res.sendStatus(201);
});

module.exports = router;