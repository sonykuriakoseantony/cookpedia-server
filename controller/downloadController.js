const downloads = require('../model/downloadsModel')

exports.addToDownloadsController = async (req, res) =>{
    console.log("Inside addToDownloadsController", req.payload);

    const {id} = req.params;
    const userMail = req.payload;
    const {name, cuisine, image} = req.body;

    try{

        const existingDownload = await downloads.findOne({recipeId : id});
        if(existingDownload){
            existingDownload.count +=1;
            await existingDownload.save();
            res.status(200).json(existingDownload);
        }
        else{
            const newDownload = await downloads.create({
                recipeId : id, name, image, cuisine, count : 1, userMail : userMail
            });
            res.status(200).json(newDownload);
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
}

exports.getUserDownloadListController = async (req, res) =>{
    console.log("Inside getUserDownloadListController", req.payload);
    const userMail = req.payload;
    try{

        const allDownloads = await downloads.find({userMail});
        res.status(200).json(allDownloads);
        
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
}

exports.getAllDownloadsController = async (req, res) =>{
    console.log("Inside getAllDownloadsController", req.payload);
    try{

        const allDownloads = await downloads.find();
        res.status(200).json(allDownloads);
        
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
}
