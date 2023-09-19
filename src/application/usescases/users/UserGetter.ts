import {User} from '@domain/entities/User'
import {UserRepository} from '@domain/repositories/UserRepository'

export class UserGetterUseCase {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }   

    async run_GetAllUsers(): Promise<User[]> {
        const user: User[] = await this.userRepository.getAllUsers()
        return user
    }
}

        