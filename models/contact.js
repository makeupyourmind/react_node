const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contact = new Schema ({
    userId : {
        type: Schema.Types.ObjectId
    },
    name: {
        type: Schema.Types.String
    },
    number: {
        type: Schema.Types.Number
    },
    age : {
        type: Schema.Types.Number
    }
})

export default mongoose.model('Contact', Contact);