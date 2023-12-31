const mysql = require('mysql2/promise');

const client = mysql.createPool(process.env.CONNECTION_STRING)

// função para buscar todos os candidatos
const getCandidatos = async () => {
  const result = await client.query("SELECT * FROM candidatos;")
  return result[0];
}

// função para selecionar 1 candidato pelo id
// const getCandidatoById = async (id) => {
//   const results = await client.query("SELECT * FROM candidatos WHERE id=?;", [id])
//   return results[0];
// }
// A busca por id estava sobrepondo e quebrando a consulta por número

// função para selecionar candidatos pelo número
const getCandidatosByNumber = async (numero) => {
  // console.log("Consultando candidatos com número:", numero);
  const results = await client.query("SELECT * FROM candidatos WHERE numero=?;", [numero])
  // console.log("Resultados da consulta:", results);
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

// função de atualização de candidato
const updateCandidato = async (numero, candidato) => {
  infoCandidato = [candidato.numero, candidato.nome, candidato.partido, candidato.cargo, candidato.numero]
  await client.query("UPDATE candidatos SET numero=?,nome=?,partido=?,cargo=? WHERE numero=?", infoCandidato) // Passar sempre as variáveis assim. Não passar diretamente na query para evitar ataques SQL injection
}

// função para deletar um candidato pelo número do mesmo
const deleteCandidato  = async (numero) => {
  await client.query("DELETE FROM candidatos WHERE numero=?", [numero])
}

module.exports = {
  getCandidatos,
  // getCandidatoById,
  getCandidatosByNumber,
  postCandidato,
  postCandidatos,
  updateCandidato,
  deleteCandidato,
}