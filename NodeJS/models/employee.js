const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    designation: { type: String },
    from: { type: Date },
    to: { type: Date },
});

module.exports = {Employee};