import { AppDataSource } from "../data-source"
import { citDropDownEntity } from "../entities/cityDropdown.entities"

export class weatherController{


    async weatherDropDown(req:Request | any,res:Response | any){
        try {
            
            const cityDropDownRepo = AppDataSource.getRepository(citDropDownEntity);

            const data = await cityDropDownRepo.find()

            console.log(data);
            
            if(data){
                return res.status(200).json(data)
            }

            return res.status(400).json("Data Not Found")


        } catch (error) {
            console.error(error)
            return res.status(400).json(error)
        }
    }
}