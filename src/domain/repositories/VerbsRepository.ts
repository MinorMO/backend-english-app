import {Verb} from "../entities/Verb"

//Interfaz que define los métodos que debe implementar el repositorio de usuarios
export interface VerbRepository {
    getAllVerbs(): Promise<Verb[]> //para devolver una promesa de un array de usuarios
    insertVerb(verb: Verb): Promise<Verb>
    insertVerbs(verbs: Verb[]): Promise<Verb[]>
    updateVerb(verb: Verb): Promise<Verb>
    deleteVerb(verb: Verb): Promise<void>
    getVerbById(verbId: string): Promise<Verb|null>
    getVerb(verb: string): Promise<Verb|null>
}