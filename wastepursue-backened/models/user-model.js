const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStatus:{
        type: Boolean,
       default:false
    },
    address:{
        
        fullName: {
            type: String,
            
        },
        addressLine1: {
            type: String,
            
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String,
            
        },
        state: {
            type: String,
            
        },
        postalCode: {
            type: String,
           
        },
        country: {
            type: String,
            
        }
    
    },
});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function() {
    try {
        const token = jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SEC_KEY,
            {
                expiresIn: '30d'
            }
        );
        return token;
    } catch (error) {
        console.log('Error generating token:', error);
        return null;
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
