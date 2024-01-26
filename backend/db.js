const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://ravindarravi87:MASmhdLjJhdzjZzJ@cluster0.ajofca2.mongodb.net/paytm');

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    FirstName:String,
    LastName:String
})
 const accountSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
 })

const user=mongoose.model("user",userSchema);
const Account=mongoose.model("Account",accountSchema);

module.exports={
    user,
    Account
}