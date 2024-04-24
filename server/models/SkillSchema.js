const {Schema,model} = require('mongoose');
const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    endorser: {
        type:Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }
})

module.exports = model('SkillSchema',skillSchema)