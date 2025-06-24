import { Router } from "express";
import { userController } from "../controller/user.controller";
import { formArrayController } from "../controller/formArray.controller";
import { authController } from "../controller/auth.controller";
import { verifyToken } from "../middlewares/tokenVerification";
import { ChatGptController } from "../controller/chatGpt.controller";
import { Feedback } from "../controller/feedback.controller";
import { weatherController } from "../controller/weather.controller";
import { userTypeController } from "../controller/userType.controller";
import multer from "multer";
import { storage } from "../middlewares/fileUpload.middlewares";
import { FileUploadController } from "../controller/fileUpload.controller";
import { StudentController } from "../controller/student.controller";
import { mstTaskController } from "../controller/mstTask.controller";
import { mstColorController } from "../controller/mstColor.controller";

const user = new userController()
const formArray = new formArrayController()
const login = new authController()
const chatgptApi = new ChatGptController();
const feedback = new Feedback();
const weather = new weatherController();
const userType = new userTypeController();
const uploadFile = new FileUploadController();
const student = new StudentController();
const task = new mstTaskController();
const color = new mstColorController();

const routes = Router();

// routes.get('/', verifyToken, user.getUserData);
routes.get('/',  user.getUserData);
routes.get('/getReactUserData', user.getReactUserData);
routes.put('/delete/:id', user.UsesrDelete);

routes.post('/add',verifyToken,user.addUserData)
routes.put('/update/:id',verifyToken,user.updateUserData)


routes.get('/form-array',verifyToken,formArray.getFormArrayData)
routes.post('/form-array/add',verifyToken,formArray.addFormArrayData)
routes.put('/form-array/update/:id',verifyToken,formArray.updateUserData)

routes.post('/login',login.getAuthData)

routes.post('/chatgpt',chatgptApi.getChatGptData)

routes.post('/feedback',feedback.addFeedBack)

routes.get('/cityDropdown',weather.weatherDropDown)

routes.post('/userType',userType.addType)



const upload = multer({storage})


routes.post('/upload',upload.single('file'),uploadFile.fileUpload)



routes.get('/student',student.getStudentData)
routes.post('/add-student',student.addStudentData)
routes.post('/update-studnet/:id',student.updateStudentData)
routes.put('/delete-student/:id',student.deleteStudentData)


// task
routes.get('/task',task.getTask)
routes.post('/add-task',task.AddTask)
routes.post('/update-task/:id',task.UpdateTask)

routes.get('/task-status',task.TaskStatus)
routes.get('/task-priority',task.TaskPriority)


routes.get('/color',color.getMstColor);

export  default routes