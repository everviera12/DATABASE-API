/* ========== REQUIRE ========== */
const cors = require("cors");
const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());
/* ============ CONEXIÓN A MYSQL ============ */
const conexion = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root123",
  database: "prueba",
});

conexion.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected");
  }
});

/* ============ PETICIONES ============ */
app.get("/", (req, res) => {
  res.send("Ruta INICIO");
});

// MOSTRAR REGISTRO DE PERSONAS
app.get("/api/persona", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  conexion.query("SELECT * FROM persona", (err, filas) => {
    if (err) {
      throw err;
    } else {
      res.send(filas);
    }
  });
});

// MOSTRAR REGISTRO DE UNA SOLA PERSONA
app.get("/api/persona/:id_persona", (req, res) => {
  conexion.query(
    "SELECT * FROM persona WHERE id_persona = ?",
    [req.params.id_persona],
    (err, filas) => {
      if (err) {
        throw err;
      } else {
        res.send(filas);
      }
    }
  );
});

//INGRESAR DATOS
app.post("/api/persona", (req, res) => {
  let data = { nombre: req.body.nombre };
  let sql = "INSERT INTO persona SET ?";
  conexion.query(sql, data, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

//EDITAR DATOS
app.put("/api/persona/:id_persona", (req, res) => {
  let id_persona = req.params.id_persona;
  let nombre = req.body.nombre;
  let sql = "UPDATE persona SET nombre = ? WHERE id_persona = ?";
  conexion.query(sql, [nombre, id_persona], (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

//ELIMINAR DATOS
app.delete("/api/persona/:id_persona", (req, res) => {
  conexion.query(
    "DELETE FROM persona WHERE id_persona = ?",
    [req.params.id_persona],
    (err, filas) => {
      if (err) {
        throw err;
      } else {
        res.send(filas);
      }
    }
  );
});

/* ============  ============ */
app.listen("3232", () => {
  console.log("Server OK");
});
