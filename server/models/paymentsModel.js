"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    planId: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentDetails: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        default: () => { return (new Date()).toLocaleString() }
    },
    updatedAt: {
        type: String,
        default: () => { return (new Date()).toLocaleString() }
    }
})

const paymentModel = mongoose.model('payment', schema);

module.exports = paymentModel;