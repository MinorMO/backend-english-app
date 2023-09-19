import { UserRepository } from "@domain/repositories/UserRepository";
import { PasswordHasher } from "@domain/services/password-services/PasswordHasher";
import { TokenGenerator } from "@domain/services/password-services/TokenGenerator";
import { UserNotFoundException } from "@domain/exceptions/users/UserNotFoundException";
import { UserInvalidPassowrd } from "@domain/exceptions/users/UserInvalidPassword";

export class UserAuthenticatorUseCase {
    private readonly userRepository: UserRepository;
    private readonly passwordHasher: PasswordHasher;
    private readonly tokenGenerator: TokenGenerator;

    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, tokenGenerator: TokenGenerator) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenGenerator = tokenGenerator;
    }

    async authenticate(email: string, password: string): Promise<string> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new UserNotFoundException();

        const passwordMatch = await this.passwordHasher.comparePassword(password, user.password);
        if (!passwordMatch) throw new UserInvalidPassowrd();

        return this.tokenGenerator.generateToken({id: user.id,role: user.role});
    }
}

