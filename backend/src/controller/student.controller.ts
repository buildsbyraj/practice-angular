import { AppDataSource } from "../data-source"
import { studentEntity } from "../entities/student.entities"



export class StudentController{

    async getStudentData(req : Request | any,res : Response | any){
        try{

            const studentRepo = AppDataSource.getRepository(studentEntity)


            const studnetData = await studentRepo.find()


            if(studnetData){
                return res.status(200).json(studnetData)
            }

            return res.status(404).json("Not Find")


        }catch(error){
            console.error(error)
            return res.status(404).json('Internal Server Error')
        }
    }


     async addStudentData(req : Request | any,res : Response | any){
        try{

            const studentRepo = AppDataSource.getRepository(studentEntity)

            const data = req?.body
            
            if(data){
                await studentRepo.save(data)

                return res.status(200).json('Sucess')
            }

            return res.status(404).json("Not Find")

        }catch(error){
            console.error(error)
            return res.status(404).json('Internal Server Error')
        }
    }

     async updateStudentData(req : Request | any,res : Response | any){
        try{

            const studentRepo = AppDataSource.getRepository(studentEntity)

            const data = req?.body

            const id = req?.params?.id

            if(id){
                const findStudentData = await studentRepo.findOne({where:{id}})

                if(findStudentData){
                    await studentRepo.update(id,data)

                    return res.status(200).json("Sucess")
                }else{
                    return res.status(404).json("Not Found")
                }
            }

            return res.status(404).json("Not Find")

        }catch(error){
            console.error(error)
            return res.status(404).json('Internal Server Error')
        }
    }

         async deleteStudentData(req : Request | any,res : Response | any){
        try{

            const studentRepo = AppDataSource.getRepository(studentEntity)

            const id = req?.params?.id

            if(id){
                const findStudentData = await studentRepo.findOne({where:{id}})

                if(findStudentData){
                    await studentRepo.delete(id)

                    return res.status(200).json("Sucess")
                }else{
                    return res.status(404).json("Not Found")
                }
            }

            return res.status(404).json("Not Find")

        }catch(error){
            console.error(error)
            return res.status(404).json('Internal Server Error')
        }
    }
}