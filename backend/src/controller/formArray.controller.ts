import { AppDataSource } from "../data-source"
import { formArrayEntity } from "../entities/formArray.entities";


export class formArrayController{
    async getFormArrayData(req:any,res:any){
        try {
            const userRepository = AppDataSource.getRepository(formArrayEntity);            

            let query = userRepository.createQueryBuilder('designation');
            
            const userList = await query.getMany();


            return res.status(200).json(userList);
        } catch (error) {
            console.error(error)
            return res.status(400).json(error);
        }
    }

    async addFormArrayData(req:any,res:any){ 
        try {
            const userRepository = AppDataSource.getRepository(formArrayEntity);
            
            const skillsData = {
                skill_1: req.body.skill_1 || '',
                skill_2: req.body.skill_2 || '',
                skill_3: req.body.skill_3 || '',
                skill_4: req.body.skill_4 || '',
                skill_5: req.body.skill_5 || '',
            };

            await userRepository.save(skillsData);

            return res.status(200).json('Add');
        } catch (error) {
            console.error(error)
            return res.status(400).json(error)
        }
    }

    async updateUserData(req:any,res:any){ 
        try {
            const userRepository = AppDataSource.getRepository(formArrayEntity);

            const id:any = parseInt(req?.params?.id)
            
            const userData:any = await userRepository.findOne({where:{id}});
            
            if(userData){
                await userRepository.update(id,req?.body)
            }
            
            return res.status(200).json('Update');
        } catch (error) {
            console.error(error)
            return res.status(400).json(error)
        }
    }
}