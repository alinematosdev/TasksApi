const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O nome é obrigatório"],
            maxlength: [50, "O nome não pode exceder 50 caracteres"],
        },
        email: {
            type: String,
            required: [true, "O email é obrigatório"],
            unique: true,
            match: [/.+@.+\..+/, "Insira um email válido"],
        },
        password: {
            type: String,
            required: [true, "A senha é obrigatória"],
        },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;