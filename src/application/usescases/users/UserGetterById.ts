import { User } from "@domain/entities/User"
import { UserRepository } from "@domain/repositories/UserRepository"
import { UserGetterById } from "@domain/services/users-domain-services/UserGetterById"

export class UserGetterByIdUseCase{
    private readonly _userRepository: UserRepository;
    private readonly _userGetterById: UserGetterById;
    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
        this._userGetterById = new UserGetterById(userRepository)
    }

    async run_UserGetterById(id: string): Promise<User>{
        const user = await this._userGetterById.run(id);
        return user;
    }

    
}