"use server"
import { readFileSync, writeFileSync } from "fs"
import { use } from "react"


export async function getEmpleados () {

    
    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    return json["paginas"]["recursos_humanos"]["empleados"]

}


export async function getDepartamentos () {

    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    return json["paginas"]["recursos_humanos"]["departamentos"]
}

export async  function saveJson (json) {

    writeFileSync("./src/helpers/db.json", JSON.stringify(json), "utf-8")

}


export async function createEmpleado (empleado) {

    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    json["paginas"]["recursos_humanos"]["empleados"].push({
        id: json["paginas"]["recursos_humanos"]["empleados"].length + 1,
        ...empleado
    })

    //

    await saveJson(json)

    return json
}


export async function getFinanzas () {

    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    return json["paginas"]["finanzas"]
}


export async function createTransaccion(transaccion) {
    console.log(transaccion);
    
    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    json["paginas"]["finanzas"]["transacciones"].push({
        id: json["paginas"]["finanzas"]["transacciones"].length + 1,
        ...transaccion
    })

    if (transaccion.descripcion === "ingreso") {
        json["paginas"]["finanzas"]["totalIngresos"] += Number(transaccion.monto)
    }

    if (transaccion.descripcion === "gasto") {
        json["paginas"]["finanzas"]["totalGastos"] += Number(transaccion.monto)
    }    

    json["paginas"]["finanzas"]["balance"] = json["paginas"]["finanzas"]["totalIngresos"] - json["paginas"]["finanzas"]["totalGastos"]

    await saveJson(json)

    return json
    
}


export  async function getInventario () {

    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    return json["paginas"]["inventario"]
}


export async function createProducto(producto) {
    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    json["paginas"]["inventario"]["productos"].push({
        id: json["paginas"]["inventario"]["productos"].length + 1,
        ...producto
    })


    json["paginas"]["inventario"]["totalProductos"] += 1
    json["paginas"]["inventario"]["productosBajoStock"] += Number(producto.stock)
    json["paginas"]["inventario"]["valorTotalInventario"] += Number(producto.precio)
    await saveJson(json)
    return json
}


export async function getProyectos() {

    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    return json["paginas"]["proyectos"]
}

export async function createProyecto(proyecto) {

    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)

    json["paginas"]["proyectos"]["proyectos"].push({
        id: json["paginas"]["proyectos"]["proyectos"].length + 1,
        ...proyecto
    })

    if (proyecto.estado === "En progreso") {
        json["paginas"]["proyectos"]["proyectosEnProgreso"] += 1
    }

    if (proyecto.estado === "Completado") {
        json["paginas"]["proyectos"]["proyectosCompletados"] += 1
    }

    json["paginas"]["proyectos"]["totalProyectos"] += 1


    await saveJson(json)

    return json["paginas"]["proyectos"]
}


export async function getUsuario(email, password) {

    const data = readFileSync("./src/helpers/db.json", "utf-8")
    const json = JSON.parse(data)
    console.log(json["usuarios"]);

    const user= json["usuarios"]

    return user
}