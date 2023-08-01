const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{type: String, require: true},
    email:{type: String, require: true, unique: true},
    password:{type: String, require: true},
    pic:{type: String, require: true, default: "https://icon-library.com/images/141782.svg.svg"}
},{
    timeStamps: true
});

userSchema.methods.matchPassword = async function(params){
    // console.log("pasram= ", params);
    return await bcrypt.compare(params, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("user", userSchema);

module.exports = User;