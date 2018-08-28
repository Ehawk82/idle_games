(function () {
	"use strict";
	var myUI, userData;
	
	userData = {
		antColor: "rgb(0,0,0)",
		antLevel: 0,
		antExp: 0
	};
	
/* Begin myUI */	
	myUI = {
/* return functions */
        bySel: (x) => { return document.querySelector(x); },//return one element via class or id
		bySelAll: (x) => { return document.querySelectorAll(x); },//return a group of elements via class
		byTag: (x, y) => { return document.getElementsByTagName(x)[y]; },//calling elements by tag name accepts two params, the first is x for the element name, the second is y for the index 
		createEle: (x) => { return document.createElement(x);},//create any HTML element
		removeThisFullNode: (x) => { var y, z; return y = x.className, z = y.split("_full"), setTimeout(() => { x.className =  z[0]; setTimeout(() => { x.remove() }, 1200); }, 200); },//this dohicky will take in nodes with a className appended with "_full" on the end.  once removed, the new class is set, then removes the node.  *IMPORTANT NOTE* this return function will not work if the node does not have a className that ends with "_full", for a non-"_full" node, use the return function named removeThisNode()
		removeNode: (x) => { return x.remove(); },//use this one to remove any node regardless of className
		pullFullStatus: (x) => { var y, z; return y = x.className, z = y.split("_full"); },//return the element className with "_full" removed.  -will not remove node
		reloadUI: () => { return location.reload(); },//self explanatory
		deleteStorageAndReloadUI: () => { return localStorage.clear(), location.reload(); },//clearing storage and reloading page
		nulify: (x) => { return x.onclick = null; },//will make the element end any events
        saveColor: (x, y, z, ant) => { return () => { var v; return v = window.getComputedStyle( x[y] ,null).getPropertyValue('background-color'), z.antColor = v, localStorage.setItem("userData", JSON.stringify(z)), myUI.updateAntColor(v, x, y, z, ant); } },
		updateAntColor: (v, x, y, z, ant) => { var xId, xIdCut, newId, color; return xId = x[y].id, xIdCut = xId.split("Box"), newId = xIdCut[0].concat("Ant"), ant.id = newId, color = ant.id.split('Ant'), ant.style.backgroundImage = "url(css/images/" + color[0] + "Ant.png)"; },
/*
var color = myAnt.id.split('Ant');

			    myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.png)";
*/
		
		/* Initializations */
		init: () => {
			localStorage.clear();
			var uData = localStorage.getItem("userData");
			if (!uData || uData === null) {
				localStorage.setItem("userData", JSON.stringify(userData));
			}
			
			var gBool = localStorage.getItem("gameBool");
			if (!gBool || gBool === null) {
				localStorage.setItem("gameBool", false);
			}
			//alert("initiation complete");
			
			setTimeout(() => {
				myUI.loadAudioRange();
				myUI.loadFrameStarter();
			}, 50)
			//localStorage.clear();
		},
		
		loadFrameStarter: () => {
			var uFrame = myUI.createEle("div");
			
			uFrame.innerHTML = "";
			uFrame.className = "uFrame";
			
			dvContain.appendChild(uFrame);
			
			setTimeout(() => {
				uFrame.className = "uFrame_full";
				setTimeout(() => {
					myUI.loadFrameStuffs(uFrame);
				}, 50);
			}, 50);
		},
		loadFrameStuffs: (uFrame) => {
				var startBtn = myUI.createEle("button"),
				    contBtn = myUI.createEle("button"),
					startOverBtn = myUI.createEle("button"),
					gBool = localStorage.getItem("gameBool");;
				
				startOverBtn.innerHTML = "Start Over";
				startOverBtn.className = "startOverBtn";
				startOverBtn.onclick = myUI.newProgramPrompt(uFrame, contBtn, startOverBtn);
				
				contBtn.innerHTML = "Continue";
				contBtn.className = "contBtn";
				contBtn.onclick = myUI.contProgram(uFrame, contBtn, startOverBtn);
				
				startBtn.innerHTML = "Start";
				startBtn.className = "startBtn";
				startBtn.onclick = myUI.firstStartProgram(uFrame, startBtn);
				
				if (gBool === "false") {
				    uFrame.appendChild(startBtn);
					setTimeout(() => {
					startBtn.className = "startBtn_full";
				}, 100);
				} else {
					uFrame.appendChild(contBtn);
					
					uFrame.appendChild(startOverBtn);
					
					setTimeout(() => {
					contBtn.className = "contBtn_full";
					startOverBtn.className = "startOverBtn_full";
				}, 100);
				}
				
		},
/* Program Stuffs */
		newProgramPrompt: (uFrame, contBtn, startOverBtn) => {
			return () => {
				myUI.nulify(startOverBtn);
				myUI.removeThisFullNode(contBtn);
			    myUI.removeThisFullNode(startOverBtn);
				myUI.launchNewGamePrompt(uFrame);
				//alert("startOverBtn");
			}
		},
		launchNewGamePrompt: (uFrame) => {
			var qHolder = myUI.createEle("div"),
			    question = myUI.createEle("div"),
				yesBtn = myUI.createEle("button"),
				noBtn = myUI.createEle("button");
			
			noBtn.innerHTML = "no";
			noBtn.className = "noBtn";
			noBtn.onclick = myUI.noFunc();
			
			yesBtn.innerHTML = "yes";
			yesBtn.className = "yesBtn";
			yesBtn.onclick = myUI.yesFunc();
			
			question.innerHTML = "ARE YOU SURE YOU WOULD LIKE TO START OVER?";
			
			qHolder.className = "qHolder";
			qHolder.appendChild(question);
			qHolder.appendChild(yesBtn);
			qHolder.appendChild(noBtn);
			uFrame.appendChild(qHolder);
			
			setTimeout(() => {
					qHolder.className = "qHolder_full";
				}, 600);
		},
		
		beginUserPref: (uFrame) => {
			var key = {
				87: false,
				68: false,
				65: false,
				83: false
				
			};
			var uData = localStorage.getItem("userData");
			var uuu = JSON.parse(uData);
			
			var userPrefHolder = myUI.createEle("div"),
			    colorHolder = myUI.createEle("div"),
				blueBox = myUI.createEle("div"),
				redBox = myUI.createEle("div"),
				pinkBox = myUI.createEle("div"),
				orangeBox = myUI.createEle("div"),
				greenBox = myUI.createEle("div"),
				yellowBox = myUI.createEle("div"),
				purpleBox = myUI.createEle("div"),
				blackBox = myUI.createEle("div");
			
			var antHolder = myUI.createEle("div"),
			    ant = myUI.createEle("div");
			
			ant.innerHTML = "&nbsp;";
			ant.className = "ants";
			ant.id = "nullAnt";
			ant.style.position = "absolute";
			ant.style.left = "210px";
			ant.style.bottom = "210px";
			
			antHolder.appendChild(ant);
			antHolder.className = "antHolder";
			
			blackBox.className = "colorBoxes";
			blackBox.id = "blackBox";
			
			purpleBox.className = "colorBoxes";
			purpleBox.id = "purpleBox";

			yellowBox.className = "colorBoxes";
			yellowBox.id = "yellowBox";
			
			greenBox.className = "colorBoxes";
			greenBox.id = "greenBox";
			
			orangeBox.className = "colorBoxes";
			orangeBox.id = "orangeBox";
			
			pinkBox.className = "colorBoxes";
			pinkBox.id = "pinkBox";

			redBox.className = "colorBoxes";
			redBox.id = "redBox";
			
			blueBox.className = "colorBoxes";
			blueBox.id = "blueBox";

			colorHolder.className = "colorHolder";
			colorHolder.appendChild(blueBox);
			colorHolder.appendChild(redBox);
			colorHolder.appendChild(pinkBox);
			colorHolder.appendChild(orangeBox);
			colorHolder.appendChild(greenBox);
			colorHolder.appendChild(yellowBox);
			colorHolder.appendChild(purpleBox);
			colorHolder.appendChild(blackBox);
			
			userPrefHolder.innerHTML = "CHOOSE YOUR ANT COLOR!<br />";
			userPrefHolder.className = "userPrefHolder";
			
			userPrefHolder.appendChild(colorHolder);
			userPrefHolder.appendChild(antHolder);
			
			uFrame.appendChild(userPrefHolder);
			
			setTimeout(() => { 
                userPrefHolder.className = "userPrefHolder_full";
				
				var colorBoxes = myUI.bySelAll(".colorBoxes");
				
				for(var i = 0; i < colorBoxes.length; i++) {
					colorBoxes[i].addEventListener("click", myUI.saveColor(colorBoxes, i, uuu, ant), false);

				}
				
			}, 1000);
			body.onkeydown = body.onkeyup = (e) => {

                var myAnt = myUI.bySel(".ants");

				var e = e || event;
                key[e.keyCode] = e.type == 'keydown';
	            

                if (key[87] === true && key[68] === false && key[83] === false && key[65] === false) {
			        myUI.moveAntUp(myAnt);
				}
				if (key[68] === true && key[87] === false && key[83] === false && key[65] === false) {
				    myUI.moveAntRight(myAnt);
				}
				if (key[83] === true && key[87] === false && key[68] === false && key[65] === false) {
				    myUI.moveAntDown(myAnt);
				}
				if (key[65] === true && key[87] === false && key[68] === false && key[83] === false) {
				    myUI.moveAntLeft(myAnt);
				}
				//console.log(key[e.keyCode]);
				if (key[87] === true && key[68] === true && key[83] === false && key[65] === false) {
					myUI.moveAntUpRight(myAnt);
				}
				if (key[87] === true && key[68] === false && key[83] === false && key[65] === true) {
					myUI.moveAntUpLeft(myAnt);
				}
				if (key[87] === false && key[68] === true && key[83] === true && key[65] === false) {
					myUI.moveAntDownRight(myAnt);
				}
				if (key[87] === false && key[68] === false && key[83] === true && key[65] === true) {
					myUI.moveAntDownLeft(myAnt);
				}
			};
			
			//alert("launch user pref");
			//myUI.loadUserData(uFrame);
			//myUI.loadProgressBar(uFrame);
		},
		moveAntDownLeft: (myAnt) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] - +5) + "px";
			myAnt.style.bottom = (+mB[0] - +5) + "px";
			myAnt.style.transform = 'rotate(-135deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		moveAntDownRight: (myAnt) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] + +5) + "px";
			myAnt.style.bottom = (+mB[0] - +5) + "px";
			myAnt.style.transform = 'rotate(135deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		moveAntUpLeft: (myAnt) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] - +5) + "px";
			myAnt.style.bottom = (+mB[0] + +5) + "px";
			myAnt.style.transform = 'rotate(-45deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		moveAntUpRight: (myAnt) => {
			var mA = myAnt.style.left.split("px");
			var mB = myAnt.style.bottom.split("px");
			
			myAnt.style.left = (+mA[0] + +5) + "px";
			myAnt.style.bottom = (+mB[0] + +5) + "px";
			myAnt.style.transform = 'rotate(45deg)';
			
			var color = myAnt.id.split('Ant');
			
			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		moveAntRight: (myAnt) => {
			//console.log(myAnt);
			var mA = myAnt.style.left.split("px");
	
			myAnt.style.left = (+mA[0] + +5) + "px";
			myAnt.style.transform = 'rotate(90deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		moveAntLeft: (myAnt) => {
			//console.log(myAnt);
			var mA = myAnt.style.left.split("px");

			myAnt.style.left = (+mA[0] - +5) + "px";
			myAnt.style.transform = 'rotate(-90deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		moveAntUp: (myAnt) => {
			//console.log(myAnt);
			var mA = myAnt.style.bottom.split("px");

			myAnt.style.bottom = (+mA[0] + +5) + "px";
			myAnt.style.transform = 'rotate(0deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		moveAntDown: (myAnt) => {
			//console.log(myAnt);
			var mA = myAnt.style.bottom.split("px");

			myAnt.style.bottom = (+mA[0] - +5) + "px";
			myAnt.style.transform = 'rotate(180deg)';
			var color = myAnt.id.split('Ant');

			myAnt.style.backgroundImage = "url(css/images/" + color[0] + "Ant.gif)";
		},
		contProgram: (uFrame, contBtn, startOverBtn) => {
			return () => {
				myUI.nulify(contBtn);
			    myUI.removeThisFullNode(contBtn);
			    myUI.removeThisFullNode(startOverBtn);
				myUI.loadUserData(uFrame);
			    myUI.loadProgressBar(uFrame);
			
			//myUI.launchWholeGame(uFrame);
			//alert("resuming game");
			}
		},
		firstStartProgram: (uFrame, startBtn) => {
			return () => {
				myUI.nulify(startBtn);
				myUI.removeThisFullNode(startBtn);
			    
				var gBool = localStorage.getItem("gameBool");
				

			    localStorage.setItem("gameBool", true);

				
			
				myUI.beginUserPref(uFrame);
			}
		},
		loadUserData: () => {

				alert("user data loading");
	
			
			
		},
		pullUserData: () => {
			setTimeout(() => {
				alert("user data full");
			}, 1000);
			
			
		},
/* Sounds, Loading Bar and Settings */
		loadAudioRange: () => {
			//load audio range display here
		},
		loadProgressBar: (uFrame) => {
			var progressBar = myUI.createEle("div"),
			    meter = myUI.createEle("div");
			
			meter.id = "meter";
			
			progressBar.className = "progressBar";
			progressBar.appendChild(meter);
			
			uFrame.appendChild(progressBar);
			setTimeout(() => {
			    progressBar.className = "progressBar_full";
			}, 100);
			setTimeout(() => {
			    myUI.move(progressBar, meter);
			}, 750);
		},
		move: (progressBar, meter) => {

                var width = 1;
                var id = setInterval(frame, 100);
				
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
						myUI.removeThisFullNode(progressBar);
						myUI.pullUserData();
                    } else {
                        width++; 
                        meter.style.width = width + '%'; 
                    }
                }
			
		},
/* Adminitrative */
		noFunc: () => {
			return () => {
			    myUI.reloadUI();
			}
			
		},
		yesFunc: () => {
			return () => {
			    myUI.deleteStorageAndReloadUI();
			}
			
		},
	};
/* End myUI */
	window.onload = () => {
		myUI.init();
		
	};
})();