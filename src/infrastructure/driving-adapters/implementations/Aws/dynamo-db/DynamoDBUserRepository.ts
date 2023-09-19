import { User } from "@domain/entities/User";
import { UserRepository } from "@domain/repositories/UserRepository";
import { DynamoDB } from "@infrastructure/driven-adpters/AWS/dynamo-db/DynamoDB";
import e from "express";


export class DynamoDBUserRepository implements UserRepository {

    private readonly _dynamoDB = DynamoDB.getInstance()


    async getAllUsers(): Promise<User[]> {
       const response = await this._dynamoDB.scan({
            TableName: DynamoDB.TABLE_NAME,
            FilterExpression: 'ENTITY_TYPE = :entity_type',
            ExpressionAttributeValues: {
                ':entity_type': {
                    S: 'USER'
                }
            }
        }).promise()
        const items = (response.Items !=null) ? response.Items : []

        const user = items.map((item:any) => {
            const id: string = item['ENGLISH-APP_PK'].S?? ''
            const name: string = item.name.S?? ''
            const lastName: string = item.lastName.S?? ''
            const email: string = item.email.S?? ''
            const password: string = item.password.S?? ''
            const role: string = item.role.S?? ''

            return {
                id: id.split('_')[1],
                name,
                lastName,
                email,
                password,
                role
            }
        })

        return user
    

    }


    async getUserById(Userid: string): Promise<User |null> {
        
        const response = await this._dynamoDB.scan({
            TableName: DynamoDB.TABLE_NAME,
            FilterExpression: '#pk = :pk', //se filtra la entidad por user y se busca por username
            ExpressionAttributeNames: {  // <-- Nombres de atributos
                '#pk': 'ENGLISH-APP_PK'
            },
            ExpressionAttributeValues: {  // <-- Valores de atributos
                ':pk': {
                    S: `USER_${Userid}`
                }
            }
        }).promise()

        const item = (response.Items !=null) ? response.Items[0] : undefined

        if(item===undefined) return null

        const id: string = item['ENGLISH-APP_PK'].S?? ''
        const name: string = item.name.S?? ''
        const lastName: string = item.lastName.S?? ''
        const email: string = item.email.S?? ''
        const password: string = item.password.S?? ''
        const role: string = item.role.S?? ''

        const user: User = {
            id: id.split('_')[1],
            name,
            lastName,
            email,
            password,
            role
        }
        return user

    }

    async getUserByEmail(userEmail: string): Promise<User |null> {
        
        const response = await this._dynamoDB.scan({
            TableName: DynamoDB.TABLE_NAME,
            FilterExpression: 'email = :userEmail', 
            /*ExpressionAttributeNames: {  // <-- Nombres de atributos
                '#email': 'userEmail'
            }, como userEmail es diferente del atributo de la tabla email no es necesario y se quita arriba el "#"            */
            ExpressionAttributeValues: {  // <-- Valores de atributos
                ':userEmail': {
                    S: userEmail
                }
            }
        }).promise()

        const item = (response.Items !=null) ? response.Items[0] : undefined

        if(item===undefined) return null

        const id: string = item['ENGLISH-APP_PK'].S?? ''
        const name: string = item.name.S?? ''
        const lastName: string = item.lastName.S?? ''
        const email: string = item.email.S?? ''
        const password: string = item.password.S?? ''
        const role: string = item.role.S?? ''

        const user: User = {
            id: id.split('_')[1],
            name,
            lastName,
            email,
            password,
            role
        }
        return user

    }


    async createUser(user: User): Promise<User> {
     await this._dynamoDB.putItem({ 
            TableName: DynamoDB.TABLE_NAME,
            Item: {
                'ENGLISH-APP_PK': {
                    S: `USER_${user.id}`
                },
                'ENGLISH-APP_FK': {
                    S: `USER_${user.id}`
                },
                'ENTITY_TYPE': {
                    S: 'USER'
                },
                'name': {
                    S: user.name
                },
                'lastName': {
                    S: user.lastName
                },
                'email': {
                    S: user.email
                },
                'password': {
                    S: user.password
                },
                'role': {
                    S: user.role
                }
            }
        }).promise()
        
        return user
    }

    async updateUser(user: User): Promise<User > {
        await this._dynamoDB.updateItem({
            TableName: DynamoDB.TABLE_NAME,
            Key: {
                'ENGLISH-APP_PK': {
                    S: `USER_${user.id}`
                },
                'ENGLISH-APP_FK': {
                    S: `USER_${user.id}`
                }
            },
            UpdateExpression: 'SET #name = :name, #lastName = :lastName, #email = :email, #password = :password, #role = :role',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#lastName': 'lastName',
                '#email': 'email',
                '#password': 'password',
                '#role': 'role'
            },
            ExpressionAttributeValues: {
                ':name': {
                    S: user.name
                },
                ':lastName': {
                    S: user.lastName
                },
                ':email': {
                    S: user.email
                },
                ':password': {
                    S: user.password
                },
                ':role': {
                    S: user.role
                }
            }
        }).promise()

        return user

    }
    async  deleteUser(user: User): Promise<void> {
        await this._dynamoDB.deleteItem({
            TableName: DynamoDB.TABLE_NAME,
            Key: {
                'ENGLISH-APP_PK': {
                    S: `USER_${user.id}`
                },
                'ENGLISH-APP_FK': {
                    S: `USER_${user.id}`
                }
            }
        }).promise()
    }

}