function isTouch(){
	try{document.createEvent('TouchEvent'); return true;} catch(e){return false;}
}

function isRedirected(){
	return /(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile)/i.test(navigator.userAgent)
}

function getUrlVars(){
	
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 
    return vars;
}

function firstCap(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ready(function(){
	
	//
	// Set Auto Height
	//
	var h = $(window).height();
    h = h - 48;
    $(window).bind("resize", resizeWindow);
    function resizeWindow( e ) {
        var newh = $(window).height();
        newh = newh - 48; 
        $('#themify_frame').height(newh);
    };

    $('#themify_frame').height(h);
	
	//
	// Init
	//
	var url = getUrlVars();
	var theme = "";
	var current_theme = ""; 
	var current_skin = "";
	var opt = "<option vale=''>Default Skin</option>";
	// console.log(url['theme']);
	if(url['theme'] != "" && url['theme'] != undefined){
		
		current_theme = url['theme'];	
		
		$("#themify_frame").attr("src","http://themify.me/demo/themes/"+current_theme);
		$('#buy_theme').attr('href', 'http://themify.me/themes/'+current_theme);
		$("#theme option").each(function(){
			if($(this).val() == current_theme){
				$(this).attr('selected', 'selected');
			} else {
				$(this).attr('selected', '');	
			}
		});
		
		$.each(themes, function(name,val){
			$.each(val, function(name,val){
				if(name.toLowerCase() == current_theme){
					theme = name;
					$.each(val, function(){
						opt += "<option value='" + this + "'>" + this + "</option>";
					});
				}
			});
		});
		
		$("#skin").html(opt);
	}
	
	$("#themify_frame").fadeIn(1000);
	if('' == theme){
		iframeSRC = '' + $('#themify_frame').attr('src');
		splitURL = iframeSRC.split('/demo/themes/');
		chop = splitURL[1];
		theme = chop.substring(0, chop.length - 1);
	}
	document.title = 'Themify Demos - ' + firstCap(theme);
	
	//
	// Theme Picker
	// 
	$("#theme").live("change", function(){
		
		var el = this;
		var theme = $(":selected", this).val();
		var opt = "<option vale=''>Default Skin</option>";
		var skin = "";
		
		$.each(themes, function(name,val){
			$.each(val, function(name,val){
				if(name.toLowerCase() == theme){
					$.each(val, function(){
						opt += "<option value='" + this + "'>" + this + "</option>";	
					});
				}
			});
		});
		
		$("#skin").html(opt);
			
		$("#themify_frame").attr("src", "http://themify.me/demo/themes/" + $(":selected",el).val());
		
		$(".btn.buy").attr("href",  "http://themify.me/themes/" + $(":selected",this).val());
		
		if($(":selected","#skin").val() == "Default Skin"){
			skin = "";
		} else {
			skin = $(":selected","#skin").val();
		}
		
		document.title = 'Themify Demos - ' + firstCap(theme);
		window.location.hash = "#theme=" + $(":selected", this).val();
		
	});
	
	//
	// Skin Picker
	// 
	$("#skin").live("change", function(){
		var el = this;
		//console.log($("#themify_frame").contents().find('body').text());
		$("#themify_frame").contents().find("#traverse_this").remove();
		// $("#themify_frame").contents().find("body").append("<style type='text/css' id='traverse_this'>@import url('http://demo.themify.me/" +  $("#theme option:selected").val() + "/wp-content/themes/" + $("#theme option:selected").val() + "/skins/" +  $(":selected", el).val().toLowerCase() + "/style.css');</style>");			   
              $("#themify_frame").contents().find("body").append("<link href='http://themify.me/demo/themes/" +  $("#theme option:selected").val() + "/wp-content/themes/" + $("#theme option:selected").val() + "/skins/" +  $(":selected", el).val().toLowerCase() + "/style.css' rel='stylesheet' type='text/css' id='traverse_this' />");
	});
	
	//
	// Close Frame
	//
	$(".close-frame").click(function(e){
		
		e.preventDefault();
		window.location = $("#themify_frame").attr("src");
		
	});

	// Animate Load
	//$("#themify_frame").load(function(){
		//$(this).fadeIn(1000);
	//});
	
	if( isRedirected() || /*isTouch() ||*/ screen.width < 500  ) {
		window.location = $("#themify_frame").attr("src");
	}	
});