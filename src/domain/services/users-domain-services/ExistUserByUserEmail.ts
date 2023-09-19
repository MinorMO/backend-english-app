import { UserRepository } from "@domain/repositories/UserRepository"

export class ExistUserByEmail {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async run_existUserByEmail(email: string): Promise<boolean> {

        const user = await this.userRepository.getUserByEmail(email)

        if (user!==null) {
            return true
        }
        return false
    }   
}