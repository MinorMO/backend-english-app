import {User} from "../entities/User"

//Interfaz que define los métodos que debe implementar el repositorio de usuarios
export interface UserRepository {
    getAllUsers(): Promise<User[]> //para devolver una promesa de un array de usuarios
    getUserById(Userid: string): Promise<User|null>
    createUser(user: User): Promise<User>
    updateUser(user: User): Promise<User>
    deleteUser(user: User): Promise<void>
    getUserByEmail(email: string): Promise<User|null>
}