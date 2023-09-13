const express = require('express');
const db = require('../database');
const router = express.Router();

// rota para listar os candidatos cadastrados
router.get('/candidatos', async (req, res) => {
  const results = await db.getCandidatos();
  res.json(results)
});

// rota para listar 1 candidato especifico com base no id
// router.get('/candidatos/:id', async (req, res) => {
//   const id = parseInt(req.params.id);
//   const results = await db.getCandidatoById(id)
//   res.json(results)
// });

// rota para listar candidatod com base no número
router.get('/candidatos/:numero', async (req, res) => {
  const numero = parseInt(req.params.numero);
  const results = await db.getCandidatosByNumber(numero);
  res.json(results);
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

// rota para atualizar candidato
router.patch('/candidatos/:numero', async (req, res) => {
  const numero = parseInt(req.params.numero);
  const candidato = req.body;

  await db.updateCandidato(numero, candidato)
  res.sendStatus(200);
  });

// rota para excluir 1 candidato pelo número
router.delete('/candidatos/:numero', async (req, res) => {
  const numero = parseInt(req.params.numero);
  await db.deleteCandidato(numero);
  res.sendStatus(204);
});

module.exports = router;