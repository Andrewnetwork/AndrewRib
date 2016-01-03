/* Andrew Ribeiro 
// guestBook.js
// http://www.AndrewRib.com
// January 2, 2016 */
/*******************************************************
** This code was created by Andrew Ribeiro whom        *
** retains the rights to all the material presented in *
** this document, unless stated otherwise. The usage   *
** of this code is granded with no liability to the    *
** creator of this material.                           *
********************************************************/

var baseIncrementCounter  = 0;
var areWeCrazy            = false;
var frequency             = .1;
var maxBaseIncrement      = 27;
var preloadedSoundPlayers = Array();
var gabePannels           = Array();


/***** Color Sequences ******/
function funckyMultiColorWalk( i)
{
	var red   =  Math.floor(Math.sin( (frequency * i )  + baseIncrementCounter + 4  ) * 127 + 128);
	var green =  Math.floor(Math.sin((frequency  * i )  + baseIncrementCounter + 2   ) * 127 + 128);
	var blue  = Math.floor( Math.sin((frequency  * i )   + baseIncrementCounter + 0 ) * 127 + 128);
	
	//alert( "rgb("+red+","+green+","+blue+")" );
	dbFetches[i].style.backgroundColor = "rgb("+(red-100)+","+(green-100)+","+(blue-100)+")";	
	dbFetches[i].style.boxShadow = -4+"px "+1+"px "+50+"px " + "rgb("+(red-100)+","+(green-100)+","+(blue-100)+")";
}

function funckyMultiColorWal2(i , box)
{
	var red   =  Math.floor(Math.sin( (frequency * i )  + baseIncrementCounter + i ) * 127 + 128);
	var green =  Math.floor(Math.sin((frequency  * i )  + baseIncrementCounter    ) * 127 + 128);
	var blue  = Math.floor( Math.sin((frequency  * i )   + baseIncrementCounter  ) * 127 + 128);
	
	//alert( "rgb("+red+","+green+","+blue+")" );
	box.style.backgroundColor = "rgb("+(red-100)+","+(green-100)+","+(blue-100)+")";	
	box.style.boxShadow = -4+"px "+1+"px "+50+"px " + "rgb("+(red-100)+","+(green-100)+","+(blue-100)+")";
}

function coolBlend( i ,  baseIncrementCounter)
{
	var red   = Math.floor(Math.sin( (frequency * i ) + baseIncrementCounter + i) * 127 + 128);
	var green = Math.floor(Math.sin( (frequency * i ) + baseIncrementCounter ) * 127 + 128);
	var blue  = Math.floor(Math.sin( (frequency * i ) + baseIncrementCounter) * 127 + 128);
	
	//alert( "rgb("+red+","+green+","+blue+")" );
	document.getElementById("box"+i).style.backgroundColor = "rgb("+(red-100)+","+(green-100)+","+(blue-100)+")";	
	document.getElementById("box"+i).style.boxShadow = -4+"px "+1+"px "+50+"px " + "rgb("+(red-100)+","+(green-100)+","+(blue-100)+")";
}
/**************************************/

/* Starting the animation functions */
function changeUpBoxColor( increment )
{
	var incrementCounter = baseIncrementCounter;
	
	for( var i = 1; i <= 36; i++ )
	{
		coolBlend(i,baseIncrementCounter);
	}
}

function changeUpTextColors()
{
	for( var i = 0; i < dbFetches.length; i++ )
	{
		//document.getElementById("box"+i).style.backgroundColor = "rgb("+incrementCounter+","+incrementCounter+","+incrementCounter+")";
		//var red   =  Math.floor(Math.sin( (frequency + incrementCounter ) * i + 0  ) * 127 + 128);
		//funckyMultiColorWalk( i );
		funckyMultiColorWalk( i , textColorBasicIncrementCounter  );
	}
	
	textColorBasicIncrementCounter += .5;
}


function changeUpGabeTileColors()
{
	for( var i = 0; i < gabePannels.length; i++)
	{
		funckyMultiColorWal2( i , gabePannels[i] );
	}
	
}

/***********************************/

function rand(low,high)
{
	// 255 is max rbg value. rand( 0, 255 );
	return Math.floor((Math.random() * high) + low);
}

function randomChangeUpColor()
{
	for( var i = 1; i <= 36; i++ )
	{
		document.getElementById("box"+i).style.backgroundColor = "rgb("+rand(50,110)+","+0+","+0+")";
	}
}

function goCrazy()
{
	if( !areWeCrazy )
	{
		clearInterval(defaultColorChangeHandle);
		randomChangeUpColor();
		setInterval(randomChangeUpColor, 50);
		areWeCrazy = true;
	}
}

function callChangeUpColor()
{
	changeUpBoxColor( baseIncrementCounter );
	baseIncrementCounter += .12;
}

function preloadSounds()
{
	
}

function playClickSound()
{
	var tmpPlayer = document.createElement("audio");
	tmpPlayer.setAttribute("src","sound/click"+rand(1,4)+".wav");
	tmpPlayer.play();
}

function submitPost()
{
	if( document.getElementById("textIn").value.length >= 10 )
	{
		
		$.ajax
		(
			{
			  method: "POST",
			  url: "process.php",
			  data: { action: "setTruth", text: (document.getElementById("textIn").value.replace(/'/g,"\"") )}
			}
		).done(function( msg )
			{
			  document.location = document.location;
			}
		);
	}
	else
	{
		// Meme it. 
		alert("Only < 10 characters? That's all you could muster? What the fuck did you just fucking say, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.");
		
	}
}

var avedAjaxResult;
var dbFetches = new Array();
var textColorBasicIncrementCounter = 0;

function hoverOverMessage(parentID)
{
	document.getElementById("bigDisplay").innerHTML = parentID.innerHTML;
}

function getMessages()
{
	// 200 + 13 offset
	var containerWidth = Math.floor( ($(window).width() )/ 214 ) * 214;
	var dbFetchsHandle              = document.getElementById("dbFetches");
	dbFetchsHandle.style.width      = containerWidth+"px" ;
	dbFetchsHandle.style.marginLeft = (($(window).width() - containerWidth ))/2 + "px";
	document.getElementById("dbFetches").innerHTML = "";
	var gabeTileHandle = null;
	
	$.ajax
	(
		{
		  method: "POST",
		  url: "process.php",
		  data: { action: "getTruths" }
		}
	).done(function( msg )
		{
		  // Stores value in ajaxResult.
		  //alert(msg);
		  eval( msg );
		  
		  savedAjaxResult = ajaxResult;
		  
		  displayTexts( savedAjaxResult )
		  
		}
	);
	
	function displayTexts( savedAjaxResult )
	{
		for( var i = 0; i < savedAjaxResult.length; i++)
		{
			var tmpDiv = document.createElement("div");
			tmpDiv.setAttribute("class","dbFetch");
			tmpDiv.innerHTML = savedAjaxResult[i];
			tmpDiv.id = "dbFetch"+i;
			tmpDiv.setAttribute("onmouseover", "hoverOverMessage("+("dbFetch"+i)+")" );
			dbFetches.push( tmpDiv );
			document.getElementById("dbFetches").appendChild( tmpDiv );
		}
	}
}

function fillGabePanels()
{
	//50*50
	parent = document.getElementById("gabePanels");
	
	for( var row = 0; row <= $(window).height(); row += 50)
	{
		for( var column = 0; column <= $(window).width(); column += 50 )
		{
			var panel = document.createElement("div");
			panel.id = "panel"+row+column;
			panel.setAttribute("class","gabePanel")
			panel.setAttribute("style","")
			parent.appendChild( panel );
			gabePannels.push(panel);
			
		}
	}


	gabeTileHandle = setInterval(changeUpGabeTileColors, 50 );
}

function constructor()
{
	callChangeUpColor();
	defaultColorChangeHandle = setInterval( callChangeUpColor, 50);
	getMessages();
	setInterval( changeUpTextColors, 50 );
	fillGabePanels();

	
}

constructor()