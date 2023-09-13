const mysql = require('mysql2/promise');

const client = mysql.createPool(process.env.CONNECTION_STRING)

// função para buscar todos os candidatos
const getCandidatos = async () => {
  const result = await client.query("SELECT * FROM candidatos;")
  return result[0];
}

// função para selecionar 1 candidato pelo id
const getProductById = async (id) => {
  const results = await client.query("SELECT * FROM candidatos WHERE id=?;", [id])
  return results[0];
}

// função para selecionar 1 candidato pelo número
const getProductByNumber = async (numero) => {
  const results = await client.query("SELECT * FROM candidatos WHERE numero=?;", [numero])
  return results[0];
}

// função para criar um novo candidato
const postCandidato = async (candidato) => {
  newCandidatoInfo = [candidato.id, candidato.numero, candidato.nome, candidato.partido, candidato.cargo]
  await client.query("INSERT INTO candidatos(id,numero,nome,partido,cargo) VALUES (?,?,?,?,?)", newCandidatoInfo)
}

// função para adicionar vários candidatos ao mesmo tempo
const postCandidatos = async (candidatos) => {
  const newCandidatosInfo = candidatos.map((candidato) => [
    candidato.id,
    candidato.numero,
    candidato.nome,
    candidato.partido,
    candidato.cargo
  ]);

  const query = "INSERT INTO candidatos(id, numero, nome, partido, cargo) VALUES ?";
  await client.query(query, [newCandidatosInfo]);
}

module.exports = {
  getCandidatos,
  getProductById,
  getProductByNumber,
  postCandidato,
  postCandidatos,
}