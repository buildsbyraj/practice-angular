import { AppDataSource } from "../data-source"
import { userTypeEntity } from "../entities/userType.entities"

export class userTypeController{

    async addType(req:any ,res:any){
        try{
            const data = req?.body

            
            const userTypeRepo = AppDataSource.getRepository(userTypeEntity);

            if(data){                
                const findUsesrType = await userTypeRepo.findOne({where:{lable:data?.lable}})
                
                if(findUsesrType){
                    return res.status(400).json('Label Exsit')
                }

                await userTypeRepo.save(data);

                return res.status(200).json("save");
            }

            return res.status(404).json("Data Not Found")

        }catch(error){
            console.error(error)
            return res.status(404).json("Error  Found")
        }
    }
}