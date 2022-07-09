const mongoose  =  require('mongoose');  
   
const excelSchema = new mongoose.Schema({  
    Name:{  
        type:String  
    },  
    Type:{  
        type:String  
    },
    Breed:{
        type:String
    },
    age:{  
        type:Number  
    }
},{timestamps:true});  
   
module.exports = mongoose.model('petData',excelSchema);  