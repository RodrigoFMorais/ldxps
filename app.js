require("dotenv").config();
const path = require("path");

const express = require("express");
const cors = require("cors");

const vendedoresRouter = require("./routes/vendedores");
const clientesRouter = require("./routes/clientes");
const viewRouter = require("./routes/views");

const app = express();

app.use(express.json());
app.use(cors());
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", viewRouter);
app.use("/api/v1/vendedores", vendedoresRouter);
app.use("/api/v1/clientes", clientesRouter);

module.exports = app;