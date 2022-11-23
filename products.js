const fs = require("fs");
class Contenedor {
    async save(obj) {
        try {
            if (
                fs.accessSync("./products.txt", fs.constants.F_OK) === undefined
            ) {
                const DATOS = await fs.promises.readFile(
                    "products.txt",
                    "utf-8"
                );

                if (DATOS == "") {
                    await fs.writeFileSync(
                        "products.txt",
                        `[{"Title":"${obj.title}","Price":"${
                            obj.price
                        }","Id":${1}}]`
                    );
                } else {
                    let data = JSON.parse(DATOS);

                    data.push(((obj.Id = data.length + 1), obj));

                    await fs.writeFileSync(
                        "products.txt",
                        JSON.stringify(data)
                    );

                    const Data = await fs.promises.readFile(
                        "products.txt",
                        "utf-8"
                    );

                    let newData = await JSON.parse(Data);
                    return newData[newData.length - 1];
                }
            }
        } catch (error) {
            await fs.writeFileSync("products.txt", "");
            console.log(error + " save");
        }
    }

    async getById(id) {
        try {
            if (
                fs.accessSync("./products.txt", fs.constants.F_OK) === undefined
            ) {
                const DATOS = await fs.promises.readFile(
                    "products.txt",
                    "utf-8"
                );
                let data = JSON.parse(DATOS);
                const buscar = data.findIndex((dat) => dat.Id == id);
                if (data[buscar] === undefined) {
                    return "el id ingresado no existe";
                } else {
                    return data[buscar];
                }
            }
        } catch (error) {
            return error + "getById";
        }
    }

    async getAll() {
        try {
            if (
                fs.accessSync("./products.txt", fs.constants.F_OK) === undefined
            ) {
                const DATOS = await fs.promises.readFile(
                    "products.txt",
                    "utf-8"
                );

                return JSON.parse(DATOS);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            if (
                fs.accessSync("./products.txt", fs.constants.F_OK) === undefined
            ) {
                let DATOS = await fs.promises.readFile("products.txt", "utf-8");
                let data = JSON.parse(DATOS);

                const eliminar = data.findIndex((dat) => dat.Id == id);

                if (eliminar != -1) {
                    data.splice(eliminar, 1);

                    await fs.writeFileSync("products.txt", "");
                    await fs.writeFileSync(
                        "products.txt",
                        JSON.stringify(data)
                    );

                    return data;
                } else {
                    return "Producto no encontrado ";
                }
            }
        } catch (error) {
            return error + " deleteById";
        }
    }

    async update(id, obj) {
        try {
            if (
                fs.accessSync("./products.txt", fs.constants.F_OK) === undefined
            ) {
                const DATOS = await fs.promises.readFile(
                    "products.txt",
                    "utf-8"
                );

                let data = JSON.parse(DATOS);

                const eliminar = data.findIndex((dat) => dat.Id == id);

                if (eliminar === -1) {
                    return "Producto no encontrado";
                }
                data.map((dat, index) => {
                    if (dat.Id == id) {
                        dat.Title = obj.Title;
                        dat.Price = obj.Price;
                    }
                });

                await fs.writeFileSync("products.txt", "");

                await fs.writeFileSync("products.txt", JSON.stringify(data));

                return data;
            }
        } catch (error) {
            return error + " update";
        }
    }
}
module.exports = Contenedor;
