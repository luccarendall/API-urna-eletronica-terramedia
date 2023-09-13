const express = require('express');
const db = require('../database');
const router = express.Router();

// rota para listar os candidatos cadastrados
router.get('/candidatos', async (req, res) => {
  const results = await db.getCandidatos();
  res.json(results)
});

// rota para listar 1 candidato especifico com base no id
router.get('/candidatos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await db.getProductById(id)
  res.json(results)
});


// rota de cadastro de 1 novo candidato
router.post('/candidato', async (req, res) => {
  const candidato = req.body;
  await db.postCandidato(candidato);
  res.sendStatus(201);
});

// rota de cadastro de novos candidatos
router.post('/candidatos', async (req, res) => {
  const candidato = req.body;
  await db.postCandidatos(candidato);
  res.sendStatus(201);
});

module.exports = router;