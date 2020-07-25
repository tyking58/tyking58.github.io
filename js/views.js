APP.loader = { 
	_this : this,
	show : function(){
		console.log("show loader");
		$(".loader").addClass("show");
	},
	hide: function(){
		console.log("hide loader");
		$(".loader").removeClass("show");
	},
	update: function(value){
		// *80 so it fills 80% of screen at max 100%
		// change for how much it fills at max
		value = Math.round(value * 100) / 100
		$(".loader").css({"width":value*80+"%"});
		console.log("loader progress: ",value*100+"%");
	}

}

APP.header = { 
	_this : this,
	init : function(){
		console.log("init header");
		$(".header-title").html(APP.data.header.title);


		$(".logo").click(function(){
			APP.sounds["click"].play();
			APP.go("home", true);
		});


		// listen for scrolling and have header react to it
		$(window).scroll(function(){
	        var ScrollTop = parseInt($(this).scrollTop());
	        //console.log(ScrollTop);

	        if (ScrollTop > 30) {
	            $(".header").addClass("shade");
	        } else {
	        	$(".header").removeClass("shade");
	        }
	    });



		
	},
	show : function(){
		console.log("show header");
		$(".header").addClass("show");
	},
	hide: function(){
		console.log("hide header");
		$(".header").removeClass("show");
	}
}


APP.footer = { 
	_this : this,
	init : function(){
		console.log("init footer");
		//$(".header-title").html(APP.data.header.title);

		/*
		$(".loaded-icon").click(function(){
			APP.go("home", true);
		});
		*/
	},
	show : function(){
		console.log("show footer");
		$(".footer").addClass("show");
	},
	hide: function(){
		console.log("hide footer");
		$(".footer").removeClass("show");
	}
}




APP.menu = { 
	_this : this,
	init : function(){
		console.log("init menu");
		str = "";
		str2 = "";
		str3 = "";
		$.each(APP.data.menu,function(i,m){
			console.log();
			if(i){p=" | ";} else {p="";}
			str+='<li class="menu-item menu-' + m.link + '" data-link="'+ m.link +'">' + p + m.title + '</li>';
			if(m.link!="home"){
				if(i>1){p="";} else {p="";}
				str2+='<li class="menu-item menu-' + m.link + '" data-link="'+ m.link +'">' + p + m.title + '</li>';
			}
			
			if(i>1){p="";} else {p="";}
			str3+='<li class="menu-item menu-' + m.link + '" data-link="'+ m.link +'">' + p + m.title + '</li>';
		});
		//console.log(str);
		$(".menu .menu-items").html(str3);
		$(".header-menu .menu-items").html(str);
		$(".footer-menu .menu-items").html(str2);

		$(".menu-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("menu-item clicked : " + link);
			if(link=="reel"){
				APP.go("home", true);
				APP.showReel();
			} else {
				APP.go(link, true);
			}
			
		});


		$(".menu-button").click(function(){
			APP.sounds["click"].play();
			if($(this).hasClass("active")){
				// hide menu
				APP.menu.hide();
				//$(".page-title").html(APP.tmpTitle);
			} else {
				// show menu 
				APP.menu.show();
				// store tmp title value
				//APP.tmpTitle = $(".page-title").html();
				//$(".page-title").html("Menu /");
				
				$(".menu .menu-item").removeClass("active");
				try{$(".menu .menu-item.menu-"+APP.state).addClass("active");}catch(e){}

			}
		});
	},
	show : function(){
		console.log("show menu");
		$(".menu").addClass("show");
		$(".menu-button").addClass("active");

	},
	hide: function(){
		console.log("hide menu");
		$(".menu").removeClass("show");
		$(".menu-button").removeClass("active");
	}
}





APP.home = { 
	_this : this,
	init : function(){
		console.log("init home");
		$(".home .page-title").html(APP.data.home.title);
		$(".home .page-subtitle").html(APP.data.home.subtitle);

		// make the feature title follow the mouse
		
		$(document).on('mousemove', function(e){
		    /*
		    $(".home .titles").css({
		       left:  (e.pageX- window.innerWidth/2)*.1 + window.innerWidth/2,
		       top:   (e.pageY-window.innerHeight/2)*.1 + window.innerHeight/2,
		    });
		    */

		    // reset timer
		    /*
		    APP.home.hide();
		    clearTimeout(APP.homeTimer);
		    APP.homeTimer = setTimeout(function(){
		    	APP.home.show();
		    },2000);
		    */
		});
		

		/*
		$(".home").click(function(){
			// go to current active feature
			var c = Math.floor(($(".background-video")[0].currentTime+1.0) / ($(".background-video")[0].duration/APP.data.featured.length ) );
	        //console.log(c);
	        if(c> (APP.data.featured.length-1) ) { c= 0;}
	        if(!c){c=0;}
	        APP.go(APP.data.featured[c].link,true);
		});
		*/
	},
	show : function( dir ){
		console.log("show home");
		APP.showPage($(".home"));
		
		
	},
	hide: function( dir){
		APP.hidePage($(".home"));
		console.log("hide home");
		
	}
}



APP.soundDesign = { 
	_this : this,
	init : function(){
		var data = APP.data.soundDesign;
		var list = data.list;
		
		$(".sound-design .page-title").html(data.title);		
		$(".sound-design .page-subtitle").html(data.subtitle);
		$(".sound-design .page-content").html(data.content);

		//iterate the art and build list
		var l = "", a = 0;
		$.each(list,function(i,p){
			if(a % 2 == 0) { align = "right";} else { align=""; }
			

			if(a<=12){
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item work-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			} else {
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item work-item "+align+"' data-link='"+p.link+"'><div class='tilt'><img class='lazy' data-src='"+p.thumb+"' /><div class='titles'><div class='subtitle'>"+p.subtitle+"</div><div class='title'>"+p.title+"</div></div></div></div>";
			}

			a++;
		});

		// update page
		$(".sound-design .list").html(l);

		// assign click handlers
		$(".sound-design .sound-design-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("work-item clicked : " + link);
			APP.go(link, true);
		});
	},
	show : function(dir){
		console.log("show sound design");
		APP.showPage($(".sound-design"));
		$(".sound-design .page-title").removeClass("aos-animate");
		$(".sound-design .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".sound-design .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".sound-design .page-subtitle").addClass("aos-animate");},500);

		
	},
	hide: function(dir){
		console.log("hide sound design");
		APP.hidePage($(".sound-design"));
		$(".sound-design .page-title").removeClass("aos-animate");
		$(".sound-design .page-subtitle").removeClass("aos-animate");	
		
	}
}



APP.music = {
	_this: this,
	init: function () {
		var data = APP.data.music;
		var list = data.list;

		$(".music .page-title").html(data.title);
		$(".music .page-subtitle").html(data.subtitle);
		$(".music .page-content").html(data.content);
		//iterate the  music and build list
		var l = "", a = 0;
		$.each(list, function (i, p) {
			if (a % 2 == 0) { align = "right"; } else { align = "left"; }
			if (a <= 10) {
				l += "<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item music-item " + align + "' data-link='" + p.link + "'><div class='tilt'><img src='" + p.thumb + "' /><div class='titles'><div class='subtitle'>" + p.subtitle + "</div><div class='title'>" + p.title + "</div></div></div></div>";
			} else {
				l += "<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item music-item " + align + "' data-link='" + p.link + "'><div class='tilt'><img class='lazy' data-src='" + p.thumb + "' /><div class='titles'><div class='subtitle'>" + p.subtitle + "</div><div class='title'>" + p.title + "</div></div></div></div>";
			}

			a++;
		});




		// update page
		$(".music .list").html(l);


		// assign click handlers
		$(".music .music-item").click(function () {
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("music-item clicked : " + link);
			APP.go(link, true);
		});
	},
	show: function (dir) {
		console.log("show music", dir);
		APP.showPage($(".music"), dir);
		$(".music .page-title").removeClass("aos-animate");
		$(".music .page-subtitle").removeClass("aos-animate");
		setTimeout(function () { $(".music .page-title").addClass("aos-animate"); }, 500);
		setTimeout(function () { $(".music .page-subtitle").addClass("aos-animate"); }, 500);
	},
	hide: function (dir) {
		console.log("hide music", dir);
		APP.hidePage($(".music"), dir);
		$(".music .page-title").removeClass("aos-animate");
		$(".music .page-subtitle").removeClass("aos-animate");
	}
}



APP.demoReel = {
	_this: this,
	init: function () {

		var data = APP.data.demoReel;
		var list = data.list;

		$(".demo-reel .page-title").html(data.title);
		$(".demo-reel .page-subtitle").html(data.subtitle);
		$(".demo-reel .page-content").html(data.content);

		//iterate the art and build list
		var l = "", a = 0;
		$.each(list, function (i, p) {
			if (a % 2 == 0) { align = "right"; } else { align = "left"; }

			if (a <= 12) {
				l += "<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item demo-reel-item " + align + "' data-link='" + p.link + "'><div class='tilt'><img src='" + p.thumb + "' /><div class='titles'><div class='subtitle'>" + p.subtitle + "</div><div class='title'>" + p.title + "</div></div></div></div>";
			} else {
				l += "<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0' class='list-item demo-reel-item " + align + "' data-link='" + p.link + "'><div class='tilt'><img class='lazy' data-src='" + p.thumb + "' /><div class='titles'><div class='subtitle'>" + p.subtitle + "</div><div class='title'>" + p.title + "</div></div></div></div>";
			}
			a++;
		});

		// update page
		$(".demo-reel .list").html(l);


		// assign click handlers
		$(".demo-reel .demo-reel-item").click(function () {
			var link = $(this).attr("data-link");
			console.log("demo-reel-item clicked : " + link);
			APP.go(link, true);
		});

	},
	show: function (dir) {
		console.log("show demo reel", dir);
		APP.showPage($(".demo-reel"), dir);
		$(".demo-reel .page-title").removeClass("aos-animate");
		$(".demo-reel .page-subtitle").removeClass("aos-animate");
		setTimeout(function () { $(".demo-reel .page-title").addClass("aos-animate"); }, 500);
		setTimeout(function () { $(".demo-reel .page-subtitle").addClass("aos-animate"); }, 500);

	},
	hide: function (dir) {
		console.log("hide demo-reel", dir);
		APP.hidePage($(".demo-reel"), dir);
		$(".demo-reel .page-title").removeClass("aos-animate");
		$(".demo-reel .page-subtitle").removeClass("aos-animate");

	}
}



APP.about = { 
	_this : this,
	init : function(){
		var data = APP.data.about;
		var list = data.list;
		
		$(".about .page-title").html(data.title);		
		$(".about .page-subtitle").html(data.subtitle);
		$(".about .page-content").html(data.content);

		//iterate the contact and build list
		var l = "", a = 0;
		$.each(list,function(i,o){
			if(a % 2 == 0) { align = "right";} else { align=""; }
			


			if(a<=30){
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='500' data-aos-delay='0'><div class='list-item contact-item "+align+"' data-link='"+o.link+"'><img src='"+o.thumb+"' /><div class='titles'><div class='title'>"+o.title+"</div><div class='subtitle'>"+o.subtitle+"</div></div></div></div>";
			} else {
				l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='500' data-aos-delay='0'><div class='list-item contact-item "+align+"' data-link='"+o.link+"'><img class='lazy' data-src='"+o.thumb+"' /><div class='titles'><div class='title'>"+o.title+"</div><div class='subtitle'>"+o.subtitle+"</div></div></div></div>";
			}
			a++;
		});
		


		// update page
		$(".about .about-title").html("[ features | tutorials | articles ]");
		$(".about .list").html(l);

		//iterate the interviews and build list
		var l = "", a = 0; var list = data.interviews;
		$.each(list,function(i,o){
			if(a % 2 == 0) { align = "right";} else { align=""; }
			l+="<div data-aos='fade-up' data-aos-easing='ease-in-out' data-aos-offset='0' data-aos-duration='1000' data-aos-delay='0'><div class='list-item contact-item "+align+"' data-link='"+o.link+"'><img src='"+o.thumb+"' /><div class='titles'><div class='title'>"+o.title+"</div><div class='subtitle'>"+o.subtitle+"</div></div></div></div>";
			a++;
		});

		// update page
		$(".about .interviews-title").html("[ interviews | speaking | features ]");
		$(".about .interviews-list").html(l);


		// assign click handlers
		$(".about .about-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			console.log("contact-item clicked : " + link);
			if(link.includes("http")){
				window.open(link, '_blank');
			} else {
				APP.go(link, true);
			}
			
		});
	},
	show : function(dir){
		console.log("show contact",dir);
		APP.showPage($(".about"),dir);
		$(".about .page-title").removeClass("aos-animate");
		$(".about .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".about .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".about .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide contact",dir);
		APP.hidePage($(".about"),dir);
		$(".about .page-title").removeClass("aos-animate");
		$(".about .page-subtitle").removeClass("aos-animate");
	}
}



APP.contact = { 
	_this : this,
	init : function(){
		console.log("init contact");
		var data = APP.data.contact;
		var list = data.list;
		
		$(".contact .page-title").html(data.title);		
		$(".contact .page-subtitle").html(data.subtitle);
		$(".contact .page-content").html(data.content);

		// feature media

		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video' id='feature-video'></div>";
				$(".sound-design-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:false,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				}
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".sound-design-detail .feature-content").html(str);

				APP.soundDesignDetail.curSlide=-1;
				APP.soundDesignDetail.rotateSlide();
				try{ clearInterval(APP.soundDesignDetail.slideTimer); } catch(e){}
				APP.soundDesignDetail.slideTimer = setInterval(APP.soundDesignDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".sound-design-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".contact .feature-content").html(str);
				break;
		}



		// longer bio
		$(".contact .bio-title").html("[ bio ]");
		$(".contact .bio").html(data.bio);


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div data-aos='fade-in' data-aos-easing='ease-in-out' data-aos-offset='50' data-aos-duration='1000' data-aos-delay='50' class='list-item "+l.class+"'><img class='lazy' data-src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});
		if(str!=""){
			$(".contact .awards-title").html("[ awards | recognition ]");
			$(".contact .awards-list").html(str);
			$(".contact .awards").show();
		} else {
			// hide
			$(".contact .awards").hide();
		}


		//awards
		str="";
		$.each(data.clients,function(i,l){
			str+="<div data-aos='fade-in' data-aos-easing='ease-in-out' data-aos-offset='50' data-aos-duration='1000' data-aos-delay='50' class='list-item "+l.class+"'><img class='lazy' data-src='"+l.file+"' /></div>";
		});
		if(str!=""){
			$(".contact .clients-title").html("[ select clients ]");
			$(".contact .clients-list").html(str);
			$(".contact .clients").show();
		} else {
			// hide
			$(".contact .clients").hide();
		}


		

		// instafeed
		$(".contact .instafeed-title").html("[ instagram feed ]");
		var feed = new Instafeed({
	        get: 'user',
	        limit: 5,
	        template: '<a class="list-item" target="_blank" href="{{link}}"><img src="{{image}}" /></a>',
	        userId: '201601854',
	        clientId: '19a04ded169c456e80a86f630c967cf0',
	        accessToken:'201601854.19a04de.87ab9f8a0cf34fe4ad7d8af936ead969'
	    });
	    feed.run();

	    // twitter
	    $(".contact .twitter-title").html("[ twitter feed ]");
	   



	   // social
		str="";
		$.each(data.social,function(i,l){
			target = "_blank";
			if(l.url.includes('mailto')){ target="_self";}
			str+="<div data-aos='fade-in' data-aos-easing='ease-in-out' data-aos-offset='50' data-aos-duration='1000' data-aos-delay='50' class='list-item "+l.class+"'><a href='"+l.url+"' target='"+target+"'><img title='"+l.title+"' src='"+l.file+"' /></a></div>";
		});
		if(str!=""){
			$(".contact .social-title").html("[ booking | contact | connect ]");
			$(".contact .social-list").html(str);
			$(".contact .social").show();
		} else {
			// hide
			$(".contact .social").hide();
		}



		//sound design
		str="";
		$.each(data.contact,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".sound-design-detail .contact-title").html("[ contact | articles | news ]");
			$(".sound-design-detail .contact-list").html(str);
			$(".sound-design-detail .contact").show();
		} else {
			// hide
			$(".sound-design-detail .contact").hide();
		}

		


	},
	show : function(dir){
		console.log("show contact",dir);
		APP.showPage($(".contact"),dir);
		$(".contact .page-title").removeClass("aos-animate");
		$(".contact .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".contact .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".contact .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide contact",dir);
		APP.hidePage($(".contact"),dir);
		$(".contact .page-title").removeClass("aos-animate");
		$(".contact .page-subtitle").removeClass("aos-animate");
	}
}


APP.soundDesignDetail = { 
	_this : this,
	init : function(){
		console.log("init work detail");

	    $(".sound-design-detail .next-button").click(function(){
	    	APP.sounds["click"].play();
	    	APP.soundDesignDetail.goNext();
	    });

	    $(".sound-design-detail .bottom-next").click(function(){
	    	APP.sounds["click"].play();
	    	APP.soundDesignDetail.goNext();
	    });

	    $(".sound-design-detail .bottom-back").click(function(){
	    	APP.sounds["click"].play();
	    	APP.soundDesignDetail.goBack();
	    });

	    $(".sound-design-detail .bottom-up").click(function(){
	    	APP.sounds["click"].play();
	    	APP.go("work", true);
	    });

	},
	show : function(dir){
		console.log("show work detail",dir);
		APP.showPage($(".sound-design-detail"),dir);
		$(".sound-design-detail .page-title").removeClass("aos-animate");
		$(".sound-design-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".sound-design-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".sound-design-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide work detail",dir);
		APP.hidePage($(".sound-design-detail"),dir);
		//$(".sound-design-detail iframe").attr("src","");
		//$(".sound-design-detail .feature-content").html("");
		setTimeout(function(){$(".sound-design-detail .feature-content").html("");},500);
		$(".sound-design-detail .page-title").removeClass("aos-animate");
		$(".sound-design-detail .page-subtitle").removeClass("aos-animate");
	},
	load : function(data){
		console.log("loading new work detail data",data);
		$(".sound-design-detail .page-title").html(data.title);
		$(".sound-design-detail .page-subtitle").html(data.subtitle);
		$(".sound-design-detail .client").html("<b>Client: </b>"+data.client);
		$(".sound-design-detail .role").html("<b>Role: </b>"+data.role);
		$(".sound-design-detail .content-title").html("[ brief ]");
		$(".sound-design-detail .content").html(data.content);
		
		// share
		$(".sound-design-detail .social-title").html("[ share ]");
	    $(".sound-design-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 300) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".sound-design-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 300) + ", left=" + ($(window).width() / 2 - 175) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video sixteen-nine' id='feature-video'></div>";
				$(".sound-design-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:true,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				} 

				if(data.feature.source=='youtube'){
					
						var options = {
					        id: data.feature.id,
					        api:1,
					        enablejsapi:1,
					        controls:1,
					        modestbranding:1,
					        showcontact:0,
					        responsive:1,
					        loop: 0,
					        playerVars:{"autoplay":1, "autohide":1, "controls":1, "showcontact":0, "modestbranding":1, "rel":0, "fs":1, "wmode":"transparent", "iv_load_policy":3,"allowfullscreen":"true", "frameborder": 0, "scrolling": 'no' },
				            autopause: true,
				            autoplay:true,
					        byline:0,
					        title:0,
					        host: 'https://www.youtube.com',
					        videoId: data.feature.id
					        
					    };


					    var player = new YT.Player('feature-video', options);

					    
					    
					    player.addEventListener('onStateChange', function(e) {
					        if (e.data == YT.PlayerState.PLAYING) {
					        	console.log('video playing');
	         					APP.muteAll(true);
					        } else {
					        	console.log('video not playing, state: ' + e.data)
					        	if(APP.soundOn && !APP.hidden){
					   				APP.unMuteAll();
					   			}
					        }
					        
					    });

					    
					
				} 
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img class='sixteen-nine' src='"+l.file+"'  />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".sound-design-detail .feature-content").html(str);

				APP.soundDesignDetail.curSlide=-1;
				APP.soundDesignDetail.rotateSlide();
				try{ clearInterval(APP.soundDesignDetail.slideTimer); } catch(e){}
				APP.soundDesignDetail.slideTimer = setInterval(APP.soundDesignDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".sound-design-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".sound-design-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".sound-design-detail .awards-title").html("[ awards | recognition ]");
			$(".sound-design-detail .awards-list").html(str);
			$(".sound-design-detail .awards-block").show();
		} else {
			// hide
			$(".sound-design-detail .awards-block").hide();
		}


		//contact
		str="";
		$.each(data.contact,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".sound-design-detail .contact-title").html("[ contact | articles | news ]");
			$(".sound-design-detail .contact-list").html(str);
			$(".sound-design-detail .contact-block").show();
		} else {
			// hide
			$(".sound-design-detail .contact-block").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".sound-design-detail .links-title").html("");
			$(".sound-design-detail .links-list").html(str);
			$(".sound-design-detail .links-block").show();
		} else {
			// hide
			$(".sound-design-detail .links-block").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"' data-aos='fade-in' >";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".sound-design-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".sound-design-detail .media-list").html(str);
			$(".sound-design-detail .media-block").show();
		} else {
			// hide
			$(".sound-design-detail .media-block").hide();
		}
		


		// related work
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.sound-design.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";	
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});

		
		$(".sound-design-detail .related-title").html("[ related work ]");
		$(".sound-design-detail .related-list").html(str);
		$(".sound-design-detail .related-list .list-item").click(function(){
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});

		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});

	},
	rotateSlide: function(){
		console.log(APP.soundDesignDetail.curSlide);
		APP.soundDesignDetail.curSlide++;
		if(APP.soundDesignDetail.curSlide>=$(".slide").length) {APP.soundDesignDetail.curSlide=0;}
		$(".slide").removeClass("show");
		$($(".slide")[APP.soundDesignDetail.curSlide]).addClass("show");
		setTimeout(function(){ $(".slide").css("z-index",0);$($(".slide")[APP.soundDesignDetail.curSlide]).css("z-index",1);  },500);
	},
	goNext:function(){
    	var list = APP.data.sound-design.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.sound-design.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}




APP.demoReelDetail = { 
	_this : this,
	init : function(){
		console.log("init demo-reel detail");

	    $(".demo-reel-detail .next-button").click(function(){
	    	APP.demoReelDetail.goNext();
	    });

	    $(".demo-reel-detail .bottom-next").click(function(){
	    	APP.demoReelDetail.goNext();
	    });

	    $(".demo-reel-detail .bottom-back").click(function(){
	    	APP.demoReelDetail.goBack();
	    });

	    $(".demo-reel-detail .bottom-up").click(function(){
	    	APP.go("demoReel", true);
	    });

	},
	show : function(dir){
		console.log("show demo reel detail",dir);
		APP.showPage($(".demo-reel-detail"),dir);
		$(".demo-reel-detail .page-title").removeClass("aos-animate");
		$(".demo-reel-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".demo-reel-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".demo-reel-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide demo reel detail",dir);
		APP.hidePage($(".demo-reel-detail"),dir);
		//$(".demo-reel-detail iframe").attr("src","");
		//$(".demo-reel-detail .feature-content").html();
		setTimeout(function(){$(".contact-detail .feature-content").html("");},500);
		$(".demo-reel-detail .page-title").removeClass("aos-animate");
		$(".demo-reel-detail .page-subtitle").removeClass("aos-animate");
	},



	load : function(data){
		console.log("loading new demo reel detail data",data);
		$(".demo-reel-detail .page-title").html(data.title);
		$(".demo-reel-detail .page-subtitle").html(data.subtitle);
		$(".demo-reel-detail .client").html("<b>Client: </b>"+data.client);
		$(".demo-reel-detail .role").html("<b>Role: </b>"+data.role);
		$(".demo-reel-detail .content-title").html("[ brief ]");
		$(".demo-reel-detail .content").html(data.content);
		
		// share
		$(".demo-reel-detail .social-title").html("[ share ]");
	    $(".demo-reel-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".demo-reel-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video' id='feature-video'></div>";
				$(".demo-reel-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:false,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				}
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".demo-reel-detail .feature-content").html(str);

				APP.soundDesignDetail.curSlide=-1;
				APP.soundDesignDetail.rotateSlide();
				try{ clearInterval(APP.soundDesignDetail.slideTimer); } catch(e){}
				APP.soundDesignDetail.slideTimer = setInterval(APP.soundDesignDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".demo-reel-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".demo-reel-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".demo-reel-detail .awards-title").html("[ awards | recognition ]");
			$(".demo-reel-detail .awards-list").html(str);
			$(".wart-detail .awards").show();
		} else {
			// hide
			$(".demo-reel-detail .awards").hide();
		}


		//contact
		str="";
		$.each(data.contact,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".demo-reel-detail .contact-title").html("[ contact | articles | news ]");
			$(".demo-reel-detail .contact-list").html(str);
			$(".demo-reel-detail .contact").show();
		} else {
			// hide
			$(".demo-reel-detail .contact").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".demo-reel-detail .links-title").html("");
			$(".demo-reel-detail .links-list").html(str);
			$(".demo-reel-detail .links").show();
		} else {
			// hide
			$(".demo-reel-detail .links").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".demo-reel-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".demo-reel-detail .media-list").html(str);
			$(".demo-reel-detail .media-block").show();
		} else {
			// hide
			$(".demo-reel-detail .media-block").hide();
		}
		


		// related art
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.demoReel.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});
		
		$(".demo-reel-detail .related-title").html("[ related art ]");
		$(".demo-reel-detail .related-list").html(str);
		$(".demo-reel-detail .related-list .list-item").click(function(){
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});

		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});


	},
	goNext:function(){
    	var list = APP.data.demoReel.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.demoReel.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}





APP.aboutDetail = { 
	_this : this,
	init : function(){
		console.log("init contact detail");

	    $(".about-detail .next-button").click(function(){
	    	APP.aboutDetail.goNext();
	    });

	    $(".about-detail .bottom-next").click(function(){
	    	APP.aboutDetail.goNext();
	    });

	    $(".about-detail .bottom-back").click(function(){
	    	APP.aboutDetail.goBack();
	    });

	    $(".about-detail .bottom-up").click(function(){
	    	APP.go("contact", true);
	    });

	},
	show : function(dir){
		console.log("show contact detail",dir);
		APP.showPage($(".about-detail"),dir);
		$(".about-detail .page-title").removeClass("aos-animate");
		$(".about-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".about-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".about-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide contact detail",dir);
		APP.hidePage($(".about-detail"),dir);
		//$(".about-detail iframe").attr("src","");
		setTimeout(function(){$(".about-detail .feature-content").html("");},500);
		///$(".about-detail .feature-content").html();
		$(".about-detail .page-title").removeClass("aos-animate");
		$(".about-detail .page-subtitle").removeClass("aos-animate");
	},


	load : function(data){
		console.log("loading new contact detail data",data);
		$(".about-detail .page-title").html(data.title);
		$(".about-detail .page-subtitle").html(data.subtitle);
		$(".about-detail .client").html("<b>Client: </b>"+data.client);
		$(".about-detail .role").html("<b>Role: </b>"+data.role);
		$(".about-detail .content-title").html("[ brief ]");
		$(".about-detail .content").html(data.content);
		
		// share
		$(".about-detail .social-title").html("[ share ]");
	    $(".about-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".about-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video' id='feature-video'></div>";
				$(".about-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:false,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				}
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".about-detail .feature-content").html(str);

				APP.aboutDetail.curSlide=-1;
				APP.aboutDetail.rotateSlide();
				try{ clearInterval(APP.aboutDetail.slideTimer); } catch(e){}
				APP.aboutDetail.slideTimer = setInterval(APP.aboutDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='"+data.feature.iframe+"' ></iframe>";
				$(".about-detail .feature-content").html(str);
				break;

			case "image":
				str = "<img class='feature-image' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".about-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".about-detail .awards-title").html("[ awards | recognition ]");
			$(".about-detail .awards-list").html(str);
			$(".about-detail .awards").show();
		} else {
			// hide
			$(".about-detail .awards").hide();
		}


		//contact
		str="";
		$.each(data.contact,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".about-detail .contact-title").html("[ contact | articles | news ]");
			$(".about-detail .contact-list").html(str);
			$(".about-detail .contact").show();
		} else {
			// hide
			$(".about-detail .contact").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".about-detail .links-title").html("");
			$(".about-detail .links-list").html(str);
			$(".about-detail .links").show();
		} else {
			// hide
			$(".about-detail .links").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"' data-aos='fade-in'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".about-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".about-detail .media-list").html(str);
			$(".about-detail .media-block").show();
		} else {
			// hide
			$(".about-detail .media-block").hide();
		}
		


		// related contact
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.contact.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});
		
		$(".about-detail .related-title").html("[ related contact ]");
		$(".about-detail .related-list").html(str);
		$(".about-detail .related-list .list-item").click(function(){
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});

		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});

	},
	goNext:function(){
    	var list = APP.data.contact.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.contact.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}





APP.musicDetail = { 
	_this : this,
	init : function(){
		console.log("init music detail");

	    $(".music-detail .next-button").click(function(){
	    	APP.sounds["click"].play();
	    	APP.musicDetail.goNext();
	    });

	    $(".music-detail .bottom-next").click(function(){
	    	APP.sounds["click"].play();
	    	APP.musicDetail.goNext();
	    });

	    $(".music-detail .bottom-back").click(function(){
	    	APP.sounds["click"].play();
	    	APP.musicDetail.goBack();
	    });

	    $(".music-detail .bottom-up").click(function(){
	    	APP.sounds["click"].play();
	    	APP.go("music", true);
	    });

	},
	show : function(dir){
		console.log("show music detail",dir);
		APP.showPage($(".music-detail"),dir);
		$(".music-detail .page-title").removeClass("aos-animate");
		$(".music-detail .page-subtitle").removeClass("aos-animate");
		setTimeout(function(){$(".music-detail .page-title").addClass("aos-animate");},500);
		setTimeout(function(){$(".music-detail .page-subtitle").addClass("aos-animate");},500);
	},
	hide: function(dir){
		console.log("hide music detail",dir);
		APP.hidePage($(".music-detail"),dir);
		//$(".music-detail iframe").attr("src","");
		setTimeout(function(){$(".music-detail .feature-content").html("");},500);
		//$(".music-detail .feature-content").html();
		$(".music-detail .page-title").removeClass("aos-animate");
		$(".music-detail .page-subtitle").removeClass("aos-animate");
	},


	load : function(data){
		console.log("loading new music detail data",data);
		$(".music-detail .page-title").html(data.title);
		$(".music-detail .page-subtitle").html(data.subtitle);
		//$(".music-detail .client").html("<b>Client: </b>"+data.client);
		//$(".music-detail .role").html("<b>Role: </b>"+data.role);
		$(".music-detail .content-title").html("[ brief ]");
		$(".music-detail .content").html(data.content);
		if('color' in data){  $(".music-detail .page-title").css({'color': data.color}); }

		// share
		$(".music-detail .social-title").html("[ share ]");
	    $(".music-detail .share-page-facebook").click(function(){
	    	window.open("https://www.facebook.com/sharer/sharer.php?u="+data.url+"&display=popup&ref=plugin&src=share_button","Facebook Share","width=600, height=450 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
			
		$(".music-detail .share-page-twitter").click(function(){
	    	window.open("https://twitter.com/intent/tweet?hashtags="+data.hashtags+"&original_referer="+data.url+"&ref_src=twsrc%5Etfw&related=synergyseeker&text="+data.twitterShare+"&tw_p=tweetbutton&url="+data.url,"Twitter Share","width=600, height=350 top=" + ($(window).height() / 2 - 275) + ", left=" + ($(window).width() / 2 - 225) );
	    })
	    

		// feature
		switch(data.feature.type){
			case "video":
				str = "<div class='feature-video sixteen-nine' id='feature-video'></div>";
				$(".music-detail .feature-content").html(str);
				if(data.feature.source=='vimeo'){
					var options = {
				        id: data.feature.id,
				        api:true,
				        responsive:true,
				        loop: false,
				        autoplay:true,
				        byline:false,
				        title:false
				    };

				    var player = new Vimeo.Player('feature-video', options);

				    // TODO: Event handlers and controllers to manage sound and video
				    // when both playing and/ leaving site
				    player.setVolume(1);

				    player.on('play', function() {
				        console.log('video played');
				        APP.muteAll(true);
				    });

				    player.on('pause', function() {
				        console.log('video paused!');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('stop', function() {
				        console.log('video stopped');
				        if(APP.soundOn && !APP.hidden){
				   			APP.unMuteAll();
				   		}
				    });

				    player.on('loaded', function() {
				        console.log('video is ready and loaded');
				    });
				} 

				if(data.feature.source=='youtube'){
					
						var options = {
					        id: data.feature.id,
					        api:1,
					        enablejsapi:1,
					        controls:1,
					        modestbranding:1,
					        showcontact:0,
					        responsive:1,
					        loop: 0,
					        playerVars:{"autoplay":1, "autohide":1, "controls":1, "showcontact":0, "modestbranding":1, "rel":0, "fs":1, "wmode":"transparent", "iv_load_policy":3,"allowfullscreen":"true", "frameborder": 0, "scrolling": 'no' },
				            autopause: true,
				            autoplay:true,
					        byline:0,
					        title:0,
					        host: 'https://www.youtube.com',
					        videoId: data.feature.id
					        
					    };


					    var player = new YT.Player('feature-video', options);

					    // TODO: Event handlers and controllers to manage sound and video
					    // when both playing and/ leaving site
					    
					    player.addEventListener('onStateChange', function(e) {
					        if (e.data == YT.PlayerState.PLAYING) {
					        	console.log('video playing');
	         					APP.muteAll(true);
					        } else {
					        	console.log('video not playing, state: ' + e.data)
					        	if(APP.soundOn && !APP.hidden){
					   				APP.unMuteAll();
					   			}
					        }
					        
					    });
					
				} 
				

				break;
			case "gallery":
				str="<div class='gallery'>";
				$.each(data.feature.images,function(i,l){
					str+="<div class='slide "+l.class+"'><img src='"+l.file+"' />";
					if(l.title){str+="<div class='label'>"+l.title+"</div>";}
					str+="</div>";
				});
				str+="</div>";
				$(".music-detail .feature-content").html(str);

				APP.musicDetail.curSlide=-1;
				APP.musicDetail.rotateSlide();
				try{ clearInterval(APP.musicDetail.slideTimer); } catch(e){}
				APP.musicDetail.slideTimer = setInterval(APP.musicDetail.rotateSlide,4000);

				break;
			case "iframe":
				str = "<iframe class='feature-iframe sixteen-nine' id='feature-iframe' src='' ></iframe>";
				$(".music-detail .feature-content").html(str);
				setTimeout(function(){
					$(".music-detail .feature-content .feature-iframe").attr("src",data.feature.iframe);
				},500);
				
				break;

			case "image":
				str = "<img class='feature-image sixteen-nine' id='feature-image' src='"+data.feature.images[0].file+"' />";
				$(".music-detail .feature-content").html(str);
				break;
		}


		//awards
		str="";
		$.each(data.awards,function(i,l){
			str+="<div class='list-item "+l.class+"'><img src='"+l.file+"' /><div class='label'>"+l.title+"</div></div>";
		});

		if(str!=""){
			$(".music-detail .awards-title").html("[ awards | recognition ]");
			$(".music-detail .awards-list").html(str);
			$(".music-detail .awards-block").show();
		} else {
			// hide
			$(".music-detail .awards-block").hide();
		}


		//contact
		str="";
		$.each(data.contact,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".music-detail .contact-title").html("[ contact | articles | news ]");
			$(".music-detail .contact-list").html(str);
			$(".music-detail .contact").show();
		} else {
			// hide
			$(".music-detail .contact-block").hide();
		}
		
		// links
		// TODO: In CSS style these link buttons, porbalby only ever LAUNCH SITE
		str="";
		$.each(data.links,function(i,l){
			str+="<div class='list-item "+l.class+"'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			str+="<div class='label'>"+l.title+"</div>";
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		if(str!=""){
			$(".music-detail .links-title").html("");
			$(".music-detail .links-list").html(str);
			$(".music-detail .links-block").show();
		} else {
			// hide
			$(".music-detail .links-block").hide();
		}


		// media
		str="";
		$.each(data.media,function(i,l){
			str+="<div class='list-item "+l.class+"' data-aos='fade-in'>";
			if(l.link){str+="<a target='_blank' href='"+l.link+"'>";}
			if(l.file){str+="<img src='"+l.file+"' />";}
			if(l.title){str+="<div class='label'>"+l.title+"</div>";}
			if(l.link){str+="</a>";}
			str+="</div>";
		});
		
		if(str!=""){
			$(".music-detail .media-title").html("[ selected frames | concept art | media ]");
			$(".music-detail .media-list").html(str);
			$(".music-detail .media-block").show();
		} else {
			// hide
			$(".music-detail .media-block").hide();
		}
		


		// related music
		str="";
		// convert tags list to array and trim spaces
		var tagsToMatch = data.tags.split(",").map(function(item) { return item.trim();});
		var count = 0;

		$.each(APP.data.music.list,function(i,l){
			var tags = l.tags.split(",").map(function(item) { return item.trim();});
			if(tagsToMatch.some(r=> tags.includes(r)) && l.link!=data.link && count<6){
				str+="<div data-link='"+l.link+"' class='tilt list-item "+l.class+"'>";
				if(l.thumb){str+="<img src='"+l.thumb+"' />";}
				str+="<div class='titles'><div class='subtitle'>"+l.subtitle+"</div><div class='title'>"+l.title+"</div></div>";
				str+="</div>";
				count++;
			}
		});
		
		$(".music-detail .related-title").html("[ related music ]");
		$(".music-detail .related-list").html(str);
		$(".music-detail .related-list .list-item").click(function(){
			APP.sounds["click"].play();
			var link = $(this).attr("data-link");
			if(link){ APP.go(link,true); }
		});


		//refresh the tilt
		VanillaTilt.init(document.querySelectorAll(".tilt"), {
			reverse:true,
			max:5,
			scale:1.05,
			glare:true,
			"max-glare":.1
		});

	},
	goNext:function(){
    	var list = APP.data.music.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,l){
    		var path = l.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index<list.length-1){
    		APP.go(list[index+1].link,true);
    	} else {
    		console.log(list[0]);
    		APP.go(list[0].link,true);
    	}
	},

	goBack:function(){
		var list = APP.data.music.list;
    	// find this index
    	var index=0;
    	var path = APP.state.split( '/' );
		if(path[0]){ var section  = path[0]; }
		if(path[1]){ var page = path[1]; }

    	$.each(list,function(i,g){
    		var path = g.link.split( '/' );
			var slug = path[1];
			console.log(page,slug)
    		if(page==slug){
    			index = i;
    			return false;
    		}
    	});

    	if(index>0){
    		APP.go(list[index-1].link,true);
    	} else {
    		console.log(list[list.length-1]);
    		APP.go(list[list.length-1].link,true);
    	}
	}
}



APP.showPage = function(page){
	$(page).removeClass("hide");
	setTimeout(function(){$(page).addClass("show"); AOS.refresh(); },100);	
}

APP.hidePage = function(page){
	$(page).removeClass("show");

	// if we are going from a detail page to the same detail page, dont hide it from DOM
	if( $(page).hasClass("sound-design-detail") && APP.state=="soundDesignDetail") { return false; }
	if( $(page).hasClass("music-detail") && APP.state=="musicDetail") { return false; }
	if( $(page).hasClass("about-detail") && APP.state=="aboutDetail") { return false; }
	if( $(page).hasClass("demo-reel-detail") && APP.state=="demoReelDetail") { return false; }
	
	// hide page from DOM
	setTimeout(function(){$(page).addClass("hide");},1000);

	// turn ambient back on, if not muted
	if(APP.soundOn && !APP.hidden){
		APP.unMuteAll();
	}
	
}
