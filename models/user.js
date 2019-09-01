const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    name: {
        type: Schema.Types.String
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: 'Email address is required',
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    role: {
      type: Schema.Types.String,
      default: "User"
    }
})


export default mongoose.model('User', User);