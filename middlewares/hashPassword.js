const bcrypt = require('bcryptjs');

const hashPassword = (schema) => {
    schema.pre('save', async function (next){
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,10);
        }
        next();
    });
};

module.exports = hashPassword;