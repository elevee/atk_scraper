var ffmpeg = require('ffmpeg');
// var utils  = require('utils');
// var path   = require('path');
var ENV   =  require('./env.js');
var casper = require('casper').create({
	viewportSize: {
	    width: 1600,
	    height: 1200
	},
	pageSettings: {
        userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    }
});

var url = "https://www.americastestkitchen.com/recipes/9067-scallion-pancakes-with-dipping-sauce";
var uri = "https://cdnapisec.kaltura.com/p/1445801/sp/144580100/playManifest/entryId/1_oighttmp/flavorIds/1_hoesme8n,1_nlql2grc,1_w58zor1a,1_0p8idx5h/format/applehttp/protocol/https/a.m3u8?referrer=aHR0cHM6Ly93d3cuYW1lcmljYXN0ZXN0a2l0Y2hlbi5jb20=&amp;playSessionId=4f5021b7-249e-fa28-12b9-ab0d0a522439&amp;clientTag=html5:v2.53.2&amp;uiConfId=35515711";

function loggedIn(casper){
	return !casper.visible(".login-link");
}

function logIn(casper){
	casper.then(function() {
	    // Click on 1st result link
	    this.click('.atkGlobalHeader__login--link');
	    // this.wait(5000, function() {
	    //     this.echo("I've waited five seconds.");
	        
	    // });
	    this.waitForSelector('.appForm__fields', function(){
	    	this.fill('form.appForm', {
		        'email':    	ENV["ATK_USER"],
		        'password':    	ENV["ATK_PASSWORD"],
		    }, true);
		    this.waitForSelector('.detail__intro', function(){
		    	this.capture('login', undefined, {
			        format: 'jpg',
			        quality: 75
			    });
			    createRecipe(this);
		    }, function(){
		    	this.capture('login', undefined, {
			        format: 'jpg',
			        quality: 75
			    });
			    console.log("login is returning false");
		    	return false;
		    }, 10000);
	    });
	});
}

casper.start(url, function(){
	this.echo('First Page: ' + this.getTitle() + "\n");

	this.waitForSelector('.detail__intro', function(){
		this.echo("Detail intro loaded.\n");
		// this.echo(ENV["ATK_USER"]);
		this.echo("Logged In?   ");
		this.echo(loggedIn(this));
		if(!loggedIn(this)){ 
			logIn(this);
		} else {
			createRecipe(this);
		}
	});
});

// casper.then(function() {

// });

function createRecipe(casper){
	casper.then(function(){
		if (this.exists('.detail__image--action')) {  //a.detail__image--action
			this.echo("Video available!\n");
			
		} else {
			this.echo("Nope. No Video.\n");
		}
	});
}

casper.run();

// try {
// 	var process = new ffmpeg(uri);
// 	process.then(function (video) {
		
// 		video
// 		.setVideoSize('640x480', true, true, '#fff')
// 		.setVideoFormat('mp4')
// 		.setVideoCodec('mpeg4')
// 		.setAudioCodec('libfaac')
// 		.setAudioChannels(2)
// 		.addCommand('-preset', 'ultrafast')
// 		.save('./your_movie.mp4', function (error, file) {
// 			if (!error)
// 				console.log('Video file: ' + file);
// 		});

// 	}, function (err) {
// 		console.log('Error: ' + err);
// 	});
// } catch (e) {
// 	console.log(e.code);
// 	console.log(e.msg);
// }