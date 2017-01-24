'use strict';

var Users = require('../models/users.js');
var Images = require('../models/images.js');
function ClickHandler () {


	
	this.addImg=function(req,res){
		var url=req.body.url;
		var title=req.body.title;
		//console.log(title+url+req.user);
		var img={
			url:url,
			title:title,
			creator:req.user._id
		};
		var doc=new Images(img);
		doc.save();
		// console.log(doc);
		// Users.findOneAndUpdate({twitter:req.user.twitter},{$push:{createdImg:doc._id}}).exec(function(err,result){
		// 	console.log(1);
		// 	console.log(""+err+result);
		// });
	
		res.redirect('/');
	};
	this.deleteImg=function(req,res){
		var id=req.body.id;
		//console.log(req.body);
		Images.find({_id:id,creator:req.user._id}).exec(function(err,result){
			console.log(req.user._id);
			console.log(err);
			console.log(result);
			// res.end();
		});
		Images.remove({_id:id,creator:req.user._id}).exec(function(err,result){
			// console.log(err);
			// console.log(result);
			res.end();
		});
		
		
	}
	
	this.renderMain= function (req, res) {
		
		Images.find({}).populate("creator").exec(function(err,result){
		//	console.log(result);
			var options={isAuthenticated:req.isAuthenticated(),selected:"home",images:result};
			if(req.isAuthenticated())
				options.uId=req.user._id.toString();

			res.render("main",options);
		})

		

	};
	this.renderProfile=function(req,res){
		if(req.params.name){
			Users.findOne({"twitter.username":req.params.name}).exec(function(err,result){
				if(err) console.log(err)
			Images.find({creator:result._id}).populate("creator").exec(function(err,result){
			//console.log(result);
			var options={isAuthenticated:req.isAuthenticated(),selected:"customProfile",images:result};
			if(req.isAuthenticated())
				options.uId=req.user._id.toString();

			res.render("main",options);
		})
			})
			
		}
		else
		Images.find({creator:req.user._id}).populate("creator").exec(function(err,result){
		//	console.log(result);
			var options={isAuthenticated:req.isAuthenticated(),selected:"profile",images:result};
			if(req.isAuthenticated())
				options.uId=req.user._id.toString();
			res.render("main",options);
		})
	}
	this.vote=function(req,res){
		Images.findOne({_id:req.query.id,fans:req.user._id}).exec(function(err,result){
		//	console.log(result);
			if(result){
				Images.findOneAndUpdate({_id:req.query.id},{$pull:{fans:req.user._id}},{new:true}).exec(function(err,result){
				//	console.log("deleted and now "+result.fans.length);
					res.json({num:result.fans.length});
				})
			}
			else{
				Images.findOneAndUpdate({_id:req.query.id},{$push:{fans:req.user._id}},{new:true}).exec(function(err,result){
				//	console.log("inserted and now "+result.fans.length);
					res.json({num:result.fans.length});
				})
			}
		})
		console.log(req.query);	
	}

}

module.exports = ClickHandler;
