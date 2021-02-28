const route = require("express").Router();
const imageUploader = require("../../middleware/multer")

route.post("/", imageUploader, (req, res)=>{
    if(!req.file)
        return res.status(500).send("Bad request")
    
    return res.status(200).send(req.files)
});

module.exports = route;
