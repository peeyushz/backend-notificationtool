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
    isNotificationOn: {
        type: Boolean,
        required: true
    },
    alertsId: {
        type: Number,
        required: true
    },
    planExpiryTime: {
        type: Number,
        required: true
    },
    alertStartTime: {
        type: String,
        required: true
    },
    alertMsgTime: {
        type: String,
        required: true
    },
    domainCount: {
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

const planPurchaseModel = mongoose.model('planPurchase', schema);

module.exports = planPurchaseModel;