import { AppDataSource } from "../data-source"
import { authEntity } from "../entities/auth.entities";
import jwt from "jsonwebtoken";



export class authController {
    async getAuthData(req: any, res: any) {
        try {
            const userRepository = AppDataSource.getRepository(authEntity);

            const data = req?.body;

            if (data) {
                const userData: any = await userRepository.findOne({ where: { email: data?.email } })

                if (userData) {
                    const id = userData?.id
                    const email = userData?.email
                    const password = userData?.password

                    if (userData?.password == data?.password) {
                        const jwtToken = jwt.sign({ id, email, password }, 'abcd', { expiresIn: '8h' })


                        return res.status(200).json({userData:userData,token:jwtToken})
                    } else {
                        return res.status(400).json("Wrong password")

                    }
                } else {
                    return res.status(400).json("Un Authorized")
                }
            }

            return res.status(400).json('Un Authorized');
        } catch (error) {
            console.error(error)
            return res.status(400).json(error);
        }
    }
}