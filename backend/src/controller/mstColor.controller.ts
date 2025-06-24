import { AppDataSource } from "../data-source";
import { mstColorEntity } from "../entities/mstColor.entities";

export class mstColorController{

    async getMstColor(req:Request | any, res:Response | any){
        try {
            
            const colorRepositery = AppDataSource.getRepository(mstColorEntity)

            const colorData = await colorRepositery.find();

            if(colorData){
                return res.status(200).json(colorData)
            }

            return res.status(400).json("Not found")

        } catch (error) {
            console.error(error);
            return res.status(404).json("Internal Server Error")
        }
    }
}