import { AppDataSource } from "../data-source"
import { usersEntity } from "../entities/user.entities";


export class userController {
    async getUserData(req: any, res: any) {
        try {
            const userRepository = AppDataSource.getRepository(usersEntity);
            const { search = '', page = 1, limit = 5, sortBy = 'id', sortOrder = 'ASC', filter = '' } = req.query;

            let query = userRepository.createQueryBuilder('users');

            if (search) {
                query = query.where(`users.user = :name`, { name: search })
            }

            query = query.skip((page - 1) * limit).take(limit);

            const allowedSortFields = ['id', 'user'];

            const validatedSortBy = allowedSortFields.includes(sortBy as string) ? sortBy : 'id';
            const validatedSortOrder = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            query = query.orderBy(`users.${validatedSortBy}`, validatedSortOrder as 'ASC' | 'DESC');


            if (filter) {
                const filters = (filter as string).split(',');
                filters.forEach((f, index) => {
                    const [key, value] = f.split(':');
                    if (key && value) {
                        if (index === 0 && !search) {
                            query = query.where(`users.${key} = :${key}`, { [key]: value });
                        } else {
                            query = query.andWhere(`users.${key} = :${key}`, { [key]: value });
                        }
                    }
                });
            }
            const userList = await query.getMany();

            const totalRecords = await query.getCount();

            const pager = { userList, total: totalRecords }

            return res.status(200).json(pager);
        } catch (error) {
            console.error(error)
            return res.status(400).json(error);
        }
    }

    async getReactUserData(req: any, res: any) {
        try {
            const userRepository = AppDataSource.getRepository(usersEntity);
            const {
                search = '',
                page = 1,
                limit = 5,
                sortBy = 'id',
                sortOrder = 'ASC',
                filter = ''
            } = req.query;

            let query = userRepository.createQueryBuilder('users');

            // Add search condition
            if (search) {
                query.where('users.user LIKE :search', { search: `%${search}%` });
            }

            // Validate and add sorting
            const allowedSortFields = ['id', 'user', 'email', 'number', 'skill']; // Add more if needed
            const validatedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'id';
            const validatedSortOrder = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

            query.orderBy(`users.${validatedSortBy}`, validatedSortOrder as 'ASC' | 'DESC');

            // Clone the query to count total before pagination
            const total = await query.getCount();

            // Pagination
            const currentPage = parseInt(page);
            const perPage = parseInt(limit);
            const skip = (currentPage - 1) * perPage;


            if(filter){
                const filters = (filter as string).split(',');

                filters.forEach((f:any,index:any) =>{
                    const [key,value] = f.split(':')

                     if (index === 0 && !search) {
                            query = query.where(`users.${key} = :${key}`, { [key]: value });
                        } else {
                            query = query.andWhere(`users.${key} = :${key}`, { [key]: value });
                        }
                })
            }

            const userList = await query.skip(skip).take(perPage).getMany();

            const totalPages = Math.ceil(total / perPage);

            return res.status(200).json({
                userList,
                total,
                totalPages,
                currentPage
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Something went wrong', details: error });
        }
    }

    async addUserData(req: any, res: any) {
        try {
            const userRepository = AppDataSource.getRepository(usersEntity);

            await userRepository.save(req?.body);

            return res.status(200).json('Add');
        } catch (error) {
            console.error(error)
            return res.status(400).json(error)
        }
    }

    async updateUserData(req: any, res: any) {
        try {
            const userRepository = AppDataSource.getRepository(usersEntity);

            const id: any = parseInt(req?.params?.id)

            const userData: any = await userRepository.findOne({ where: { id } });

            if (userData) {
                await userRepository.update(id, req?.body)
            }

            return res.status(200).json('Update');
        } catch (error) {
            console.error(error)
            return res.status(400).json(error)
        }
    }

    async UsesrDelete(req: Request | any,res  :Response | any){
        try{

            const userRepository = AppDataSource.getRepository(usersEntity)

            const id = req?.params?.id

            if(id){
                const findUser = await userRepository.findOne({where:{id}})

                if(findUser){
                   await userRepository.delete(id)

                   return res.status(200).json("Sucessfully delete user")
                }

                return res.status(404).json("Not Find the user")
            }

            return res.status(404).json("Not Find the id")

        }catch(error){
            console.error(error)
            return res.status(404).json("Internal Server Error")
        }
    }
}