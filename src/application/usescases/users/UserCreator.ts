import {User} from "@domain/entities/User"
import { UserRepository } from "@domain/repositories/UserRepository"
import { ExistUserByEmail } from "@domain/services/users-domain-services/ExistUserByUserEmail"
import { UserAlreadyExistException } from "@domain/exceptions/users/UserAlreadyExistException"
import { PasswordHasher } from "@domain/services/password-services/PasswordHasher"



export class UserCreatorUseCase {
    private readonly userRepository: UserRepository
    private readonly existUserByEmail: ExistUserByEmail
    private readonly passwordHasher: PasswordHasher;

    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher) {
        this.userRepository = userRepository;
        this.existUserByEmail = new ExistUserByEmail(userRepository);
        this.passwordHasher = passwordHasher;
    }

    async run_createUser(body: User): Promise<User> {
        const existUser:boolean = await this.existUserByEmail.run_existUserByEmail(body.email)
        if (existUser) {
            throw new UserAlreadyExistException()
        }
        // Hashear la contraseña antes de guardarla
        body.password = await this.passwordHasher.hashPassword(body.password);

        const userCreated:User = await this.userRepository.createUser(body)
        return userCreated
    }

}