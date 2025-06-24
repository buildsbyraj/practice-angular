export class FileUploadController{
    async fileUpload(req:Request | any,res : Response | any){
        try{

             if (!req.file) return res.status(400).send('No file uploaded.');

            return res.status(200).json({
                message: 'File uploaded successfully',
                filename: req.file.filename,
                path: `/uploads/${req.file.filename}`
            });

        }catch(error){
            console.error(error)
            return res.status(404).json("Internal Server Error")
        }
    }
}