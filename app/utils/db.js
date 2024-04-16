import mongoose  from 'mongoose';


const connect = async ()  => {
    if(mongoose.connections[0].readyState) return;
    
    try{
        await  mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("mongoose sucessfully connected");
    }
    catch(error){
        throw new Error("Failed to connect to the Mongoose");
    }
}

export default connect; 