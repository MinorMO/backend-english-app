import {Server} from './Server'


export class TuttoDataFakerBackendApp {
    server?: Server // obtiene el servidor de la clase Server como una propiedad 

    //va a tener dos metodos asincronos, uno para iniciar y otro para detener
    async start(): Promise<void> {
        const port: string = process.env.PORT ?? '3000'
        this.server = new Server(port)
        return await this.server.listen()
    }

    async stop(): Promise<void> {
        return await this.server?.stop()
    }   

}