import 'reflect-metadata'
import dotenv from 'dotenv'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './config/inversify/inversify.config'
import express from 'express'
import './controllers'
import { AppDataStore } from './config/db/pg.config'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

dotenv.config()

AppDataStore.initialize()
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) => {
        console.log('Problem while connecting Database', error)
    })

const server = new InversifyExpressServer(container)

server.setConfig(app => {
    // to enable body parser
    app.use(express.json({
        limit: '100mb'
    }))

    app.use(cors({
        origin: '*'
    }))
})

// build the express server
const app = server.build()

const PORT = process.env.PORT

const expressServer = http.createServer(app)

export const io = new Server(expressServer, {
    cors: { origin: '*' }
})

export let connectedClients: any[] = []

io.on('connection', (socket) => {
    socket.on('join', () => {
        connectedClients.push(socket.id)
        socket.join(socket.id)
    })
})

io.on('disconnect', (socket) => {
    connectedClients = connectedClients.filter(data => data === socket.id)
})

expressServer.listen(PORT, () => {
    console.log(`server up on port ${PORT}`)
})
