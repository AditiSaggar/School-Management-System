const moment = require('moment');

const timeStamp = {

    created_at:
    {
        type: Number,
        default: moment()
    },

    updated_at: {
        type: Number,
        default: moment()
    },

};

module.exports = {
    timeStamp
}