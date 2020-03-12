var homeRouter=require('express').Router();
var getMultichainData=require('../multiChainHandler');

homeRouter.get('/',fetchDatafromMultichain,(req,res,next)=>{
    console.log('Request came for home page');
    console.log('Record count is ',req.chainData.length);
    res.render('index',{page:'MutiChain Viewer',chainData:req.chainData,dataCount:req.chainData.length});
    
});


function fetchDatafromMultichain(req,res,next){
    getMultichainData()
    .then((resp)=>{
        var chainData=[];
        if(!resp.data.error){
            for(let element of resp.data.result){
                let keyData={};
                keyData.key=element.key;
                keyData.data=JSON.stringify(element.data);
                chainData.push(keyData);
            }
            req.chainData=chainData;
            next();
        }
        else{
            next(resp.data.error);
        }
        
    })
    .catch((ex)=>{
        console.log(ex);
        next(ex);
    });
}
module.exports=homeRouter;