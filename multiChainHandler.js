var axios=require('axios');
var httpClient=axios.create({
    baseURL:process.env.BASEURL,
    headers:{'Content-Type':'application/json','apikey':process.env.APIKEY},
    validateStatus:(status)=>{
        return status;
    }
});

function publishData(){
    return new Promise((resolve,reject)=>{
        const keyCount=50;
        let stream='root';
        let method='liststreamitems'
        httpClient.post(process.env.URL,{method:method,params:[stream,true,keyCount]})
            .then((response)=>{
               if(response.data){
                   if(!response.data.error){
                    resolve({status:response.status,data:response.data,message:'Fetched data from multichain'});
                   }
                   else{
                    resolve({status:response.status,data:response.data,message:'Not able to fetch data from multichain'});
                   }
               }
               else{
                    
                   reject(response);
               }
            })
            .catch((ex)=>{
                console.log(ex);
                reject(ex);
                
        });
    });
    
}

module.exports=publishData;

