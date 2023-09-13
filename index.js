require("dotenv").config();

const express = require('express');

const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/', routes.candidatesRoutes)

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));