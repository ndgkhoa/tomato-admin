import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartData: { type: Object, default: {} },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true },
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
