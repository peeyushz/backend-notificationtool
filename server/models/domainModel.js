"use strict";
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    planId: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isExpired: {
        type: Boolean,
        required: true
    },
    expiryDate: {
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

const domainModel = mongoose.model('domain', schema);

module.exports = domainModel;