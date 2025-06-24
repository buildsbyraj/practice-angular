import { AppDataSource } from "../data-source"
import { feedbackEntity } from "../entities/feedback.entities"

export class Feedback{
    async addFeedBack(req:Request | any,res : Response | any){
        try {
            const feedbackRepository = AppDataSource.getRepository(feedbackEntity);

            const data = req?.body;

            if(data){
                await feedbackRepository.save(data);
            }else{
                return res.status(400).json("Error")
            }

            return res.status(200).json("Success")

        } catch (error) {
            console.error(error)
            return res.status(400).json(error)

        }
    }
}


