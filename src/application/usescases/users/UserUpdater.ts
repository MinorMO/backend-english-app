import { User } from "@domain/entities/User"
import { UserRepository } from "@domain/repositories/UserRepository"
import { UserGetterById } from "@domain/services/users-domain-services/UserGetterById"

export class UserUpdaterUseCase {
    private readonly userRepository: UserRepository
    private readonly userGetterById: UserGetterById


    constructor( userRepository: UserRepository) {
        
        this.userRepository = userRepository
        this.userGetterById = new UserGetterById(userRepository)
    }

    async run_updateUser(data:User): Promise<User> {
        const user = await this.userGetterById.run(data.id)

        const dataToUpdate = {
            email: data.email ?? user.email,
            name: data.name ?? user.name,
            lastName: data.lastName ?? user.lastName,
            password: data.password ?? user.password,
            role: data.role ?? user.role,
            id: data.id
        }

        const userUpdated = await this.userRepository.updateUser(dataToUpdate)
        return userUpdated
    }
}



