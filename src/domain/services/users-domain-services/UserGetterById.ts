import { UserRepository } from "@domain/repositories/UserRepository"
import { User } from "@domain/entities/User"
import { UserNotFoundException } from "@domain/exceptions/users/UserNotFoundException"

export class UserGetterById {
    private readonly _userRepository: UserRepository

    constructor (userRepository: UserRepository){
        this._userRepository = userRepository
    }

    async run (id: string) : Promise<User>{
        const user = await this._userRepository.getUserById(id)

        if (user ===null) { throw new UserNotFoundException() }
        return user
    }
}