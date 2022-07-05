const mongoose = require('mongoose')

const UserSchema = mongoose.Schema ({
    name: {type: 'string', required: true},
    password: {type: 'string', required: true},
    category: {type: 'string', required: true}
})

module.exports = mongoose.model("User", UserSchema)

// const schema = new mongoose.Schema({ name: 'string', size: 'string' });
// const Tank = mongoose.model('Tank', schema);