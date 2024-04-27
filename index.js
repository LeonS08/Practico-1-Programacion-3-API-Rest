import { error, log } from 'console'
import express, { json } from 'express'
import fs, { read } from 'fs'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const readData = () => {
   try{
        const data = fs.readFileSync("./db.json")
    return JSON.parse(data)
   } catch (error) {
    console.log(error)
   }
}

const writedata = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data))
    }catch (error) {
        console.log(error)
    }
}

app.get("/", (req, res) => {
    res.send("pagina vacia")

})

app.get("/seleccion", (req, res) => {
    const data = readData()
    res.json(data.seleccion)
})
//comando para pedir un jugador de la plantilla por id

app.get("/seleccion/:id", (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const jugador = data.seleccion.find((jugador) => jugador.id === id)
    res.json(jugador)
})
//comando para añadir un jugador de la plantilla

app.post("/seleccion", (req, res) => {
    const data = readData()
    const body = req.body
    const nuevoJugador = {
        id: data.seleccion.length + 1,
        ...body,
    }
    data.seleccion.push(nuevoJugador)
    writedata(data)
    res.json(nuevoJugador)
})
//comando para midificar un jugador de la plantilla

app.put("/seleccion/:id", (req,res) => {
    const data = readData()
    const body = req.body
    const id = parseInt(req.params.id)
    const indiceJugador = data.seleccion.findIndex((jugador) => jugador.id === id)
    data.seleccion[indiceJugador] = {
        ...data.seleccion[indiceJugador],
        ...body,
    }
    writedata(data)
    res.json({message: "plantilla actualizada con exito"})
})
//comando para eliminar un jugador de la plantilla

app.delete("/seleccion/:id", (req,res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const indiceJugador = data.seleccion.findIndex((jugador) => jugador.id === id)
    data.seleccion.splice(indiceJugador, 1)
    writedata(data)
    res.json({message: "jugador eliminado de la plantilla con exito"})
})
//conexion al servidor

app.listen(3000, () => {
    console.log('servidor encendido')
})
