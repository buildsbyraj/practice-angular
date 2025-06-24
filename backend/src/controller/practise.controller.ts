import { AppDataSource } from "../data-source"
import { usersEntity } from "../entities/user.entities"



export class vendorController{

    async getVendor(req : Request | any,res : Response | any){
        
        try{
            const vendotRepo = AppDataSource.getRepository(usersEntity)

            // const data = await vendotRepo.find()

            // if(data){
            //     return res.status(200).json(data)
            // }else{
            //     return res.status(404).json("Not Data Found")
            // }


            // let query = vendotRepo.createQueryBuilder('user');

            // // query = query.orderBy
            // // query = query.leftJoinAndSelect

            // const data  = await query.getMany()

        }catch(err){
            console.error(err)
            return res.status(404).josn('Not Found')
        }
    }

    async addVendor(req:Request | any,res : Response | any){

        try{
            
            const vendorRepo = AppDataSource.getRepository(usersEntity)

            const data  = req?.body

            if(data){
                const findExistingName = await vendorRepo.findOne({where:{user:data?.name}})

                if(findExistingName){
                    return res.status(404).json("USER NAME ALREADY EXIST")
                }
            }

            await vendorRepo.save(data)

            return res.status(200).json("add Sucessfully")

        }catch(error){
            console.error(error)
            return res.status(404).json("Not Found")
        }
    }

    async updateVendor(req : Request | any,res : Response | any){
        try{

            const vendotRepo = AppDataSource.getRepository(usersEntity)

            const id = req.params.id

            const data = req?.body

            if(id){
                const findVendorId = await vendotRepo.findOne({where:{id}})

                if(findVendorId){
                    await vendotRepo.update(id,data)
                    return res.status(200).json("update sucessfullt")
                }else{
                    return res.status(404).json("Not found the user")
                }
            }

            return res.status(404).json('id not found')

        }catch(error){
            console.error(error)
            return res.status(404).json("Not Found")
        }
    }
}