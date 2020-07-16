const connection = require("../database/connection");
const axios = require('axios')
const urlbase = process.env.baseURL + "/api/v1/"


exports.getHome = async (req, res) => {
  const vendedores = await connection("VENDEDORES").select("*");
  const clientes = await connection("CLIENTES").select("*");

  res.status(200).render("base", {
    vendedores,
    clientes,
  });
};

exports.getCreatSeller = async (req, res) => {
  res.status(200).render("creatSeller");
};

exports.getCreatClient = async (req, res) => {
  const vendedores = await connection("VENDEDORES").select("*");
  res.status(200).render("creatClient", {
    vendedores,
  });
};

exports.getEditSeller = async (req, res) => {
  const CDVEND = req.params.CDVEND;

  const resultado = await axios({
    method: "GET",
    url: urlbase + "vendedores/" + CDVEND,
  });
  const vendedor = resultado.data.VENDEDOR;

  const resultado1 = await axios({
    method: "GET",
    url: urlbase + "clientes/vendedor/" + CDVEND,
  });
  const clientes = resultado1.data.clientes;

  res.status(200).render("editSeller", {
    vendedor,
    clientes
  });
};

exports.getEditClient = async (req, res) => {
  const CDCL = req.params.CDCL;

  const vendedores = await connection("VENDEDORES").select("*");

  const resultado = await axios({
    method: "GET",
    url: urlbase + "clientes/" + CDCL,
  });

  const cliente = resultado.data.CLIENTE;

  res.status(200).render("editClient", {
    vendedores,
    cliente,
  });
};