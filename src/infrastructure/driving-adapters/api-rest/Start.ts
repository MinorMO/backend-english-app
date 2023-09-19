import 'module-alias/register'
import pat from "path"
import * as dotenv from "dotenv"
import { TuttoDataFakerBackendApp } from "./EnglishBackendApp"


try {
    dotenv.config({ 
        path: pat.resolve(__dirname, '../../../../.env') 
    })
    new TuttoDataFakerBackendApp().start()
} catch (error) {
    console.log(error)
}