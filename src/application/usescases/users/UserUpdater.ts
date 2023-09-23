import { User } from "@domain/entities/User"
import { UserRepository } from "@domain/repositories/UserRepository"
import { UserGetterById } from "@domain/services/users-domain-services/UserGetterById"
import { PasswordHasher } from "@domain/services/password-services/PasswordHasher"

export class UserUpdaterUseCase {
    private readonly userRepository: UserRepository
    private readonly userGetterById: UserGetterById
    private readonly passwordHasher: PasswordHasher;

    constructor( userRepository: UserRepository, passwordHasher: PasswordHasher) {
        
        this.userRepository = userRepository
        this.userGetterById = new UserGetterById(userRepository)
        this.passwordHasher = passwordHasher
    }

    async run_updateUser(data:User): Promise<User> {
        const user = await this.userGetterById.run(data.id)

        
        const dataToUpdate = {
            email: data.email ?? user.email,
            name: data.name ?? user.name,
            lastName: data.lastName ?? user.lastName,
            password: data.password ? await this.passwordHasher.hashPassword(data.password) : user.password,
            role: data.role ?? user.role,
            id: data.id
        }

        const userUpdated = await this.userRepository.updateUser(dataToUpdate)
        return userUpdated
    }
}



