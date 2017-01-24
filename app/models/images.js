'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
	url:{
        type:String,
        required: true
    },
    title:{
        type:String,
        default:""
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User',required:true},
    fans:[{ type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Image', Image);
