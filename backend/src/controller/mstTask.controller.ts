import { query } from "express";
import { AppDataSource } from "../data-source"
import { mstTaskEntity } from "../entities/mstTask.entities"
import { taskStatusEntity } from "../entities/mstTaskStatus.entities";
import { taskPriorityEntity } from "../entities/mstTaskPriority.entities";



export class mstTaskController {

    async getTask(req: Request | any, res: Response | any) {
        try {

            const taskRepositry = AppDataSource.getRepository(mstTaskEntity)

            const { search = '', page = 1, limit = 5, sortBy = 'id', sortOrder = 'ASC', filter = '' } = req.query;

            let query = taskRepositry.createQueryBuilder("mst_task")
            query = query.leftJoinAndSelect(`mst_task.status`, 'status')
            query = query.leftJoinAndSelect(`mst_task.priority`, 'priority')

            if (search) {
                query = query.where(`mst_task.name = :name`, { name: search })
            }

            query = query.skip((page - 1) * limit).take(limit)

            const allowedSortFields = ['id', "name", "status.name", "priority.name"]

            const validatedSortBy = allowedSortFields.includes(sortBy as string) ? sortBy : "id"
            const validatedSortOrder = sortOrder.toUpperCase() === "DESC" ? "ASC" : "DESC"

            if (validatedSortBy) {

                if (validatedSortBy.includes('.')) {
                    const [alias, column] = validatedSortBy.split('.');
                    
                    query = query.orderBy(`${alias}.${column}`, validatedSortOrder);
                } else {
                    query = query.orderBy(`mst_task.${validatedSortBy}`, validatedSortOrder as 'ASC' | 'DESC')
                }
            }



            if (filter) {
                const filters = (filter as string).split(",")

                filters.forEach((f, index) => {
                    const [key, value] = f.split(":")


                    if (key && value) {
                        if (index === 0 && !search) {
                            if (key == 'name') {
                                query = query.where(`mst_task.${key} = :${key}`, { [key]: value })
                            } else {
                                query = query.where(`${key}.name = :${key}`, { [key]: value })
                            }
                        } else {
                            query = query.andWhere(`mst_task.${key} = :${key}`, { [key]: value })

                        }
                    }
                })

            }

            // Clone the query to count total before pagination

            // Pagination
            const currentPage = parseInt(page);
            const perPage = parseInt(limit);
            const skip = (currentPage - 1) * perPage;


            const taskList = await query.skip(skip).take(perPage).getMany();
            const total = await query.getCount();

            const totalPages = Math.ceil(total / perPage);

            const pager = { taskList, totalPages }

            return res.status(200).json(pager)

        } catch (error) {
            console.error(error)
            return res.status(404).json("Internal server error")
        }
    }

    async AddTask(req: Request | any, res: Response | any) {
        try {

            const taskRepositry = AppDataSource.getRepository(mstTaskEntity);

            const data = req?.body

            if (data) {
                const findByName = await taskRepositry.find({ where: { name: data?.name } })

                console.log(findByName);

                if (findByName.length > 0) {
                    return res.status(404).json("Task Already exist")
                }

                await taskRepositry.save(data)

                return res.status(200).json("add sucess")
            }



            return res.status(404).json('Not data found')

        } catch (error) {
            console.error(error)
            return res.status(404).json("Internal server error")
        }
    }
    
    
    async UpdateTask(req:Request | any,res :Response | any){
        try {
            
            const id = req?.params?.id

            const data = req?.body

            const taskRepositry = AppDataSource.getRepository(mstTaskEntity)

            if(id && data){
                const findTaskData = await taskRepositry.findOne({where:{id}})

                if(findTaskData){
                    await taskRepositry.update(id,data)

                    return res.status(200).json("SucessFully Updated")
                }

                return res.status(404).json("Not the find Task")

            }

            return res.status(404).json("Not find the id")

        } catch (error) {
            console.error(error)
            return res.status(404).json("Internal Server Error")
        }
    }

    async TaskStatus(req: Request | any, res: Response | any) {
        try {

            const taskStatusRepositry = AppDataSource.getRepository(taskStatusEntity);

            const taskStatusData = await taskStatusRepositry.find()

            return res.status(200).json(taskStatusData)

        } catch (error) {
            console.error(error)
            return res.status(404).json("Internal server error")
        }
    }

    async TaskPriority(req: Request | any, res: Response | any) {
        try {

            const taskPriorityRepositry = AppDataSource.getRepository(taskPriorityEntity);

            const taskPriorityData = await taskPriorityRepositry.find()

            return res.status(200).json(taskPriorityData)

        } catch (error) {
            console.error(error)
            return res.status(404).json("Internal server error")
        }
    }

}