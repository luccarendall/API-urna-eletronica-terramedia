require("dotenv").config();

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));