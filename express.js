let Contenedor = require("./products.js");

const express = require("express");

let contenedor = new Contenedor();

const PORT = process.env.PORT || 8080;

const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(express.static("public"));

api.all("/", (req, res, next) => {
    res.send(`Desafio 4 Backend CoderHouse`);
});

api.get("/api/productos", async (req, res, next) => {
    const productos = await contenedor.getAll();

    res.json(productos);
});

api.get("/api/productos/:id", async (req, res, next) => {
    const productos = await contenedor.getById(req.params.id);

    res.json(productos);
});

api.post("/api/productos", async (req, res, next) => {
    let product = req.body;

    const productos = await contenedor.save(product);

    await res.json(productos);
});

api.put("/api/productos/:id", async (req, res, next) => {
    const productos = await contenedor.update(req.params.id, req.body);
    res.json(productos);
});

api.delete("/api/productos/:id", async (req, res, next) => {
    const productos = await contenedor.deleteById(req.params.id);

    res.json(productos);
});

api.listen(PORT, () => console.log(`server on http://localhost:${PORT}`));
