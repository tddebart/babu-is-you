(this["webpackJsonpbabu-is-you"]=this["webpackJsonpbabu-is-you"]||[]).push([[0],{14:function(t,i,e){},15:function(t,i,e){},16:function(t,i,e){},18:function(t,i,e){"use strict";e.r(i);var s=e(4),n=e.n(s),a=e(9),r=e.n(a),o=(e(14),e(15),e(1)),h=e(2),d=e(3),l=e(6),u=e(5),c=(e(16),e(0)),g=function(){function t(i){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];Object(h.a)(this,t),this.canvas=void 0,this.ctx=void 0,this.currentFrame=1,this.isAutoDrawn=void 0,this.canvas=i,this.isAutoDrawn=e,this.canvas.drawings.push(this),this.ctx=i.ctx}return Object(d.a)(t,[{key:"draw",value:function(){}},{key:"remove",value:function(){this.canvas.drawings.slice(this.canvas.drawings.indexOf(this),1)}}]),t}(),v=function(t){Object(l.a)(e,t);var i=Object(u.a)(e);function e(t){var s;return Object(h.a)(this,e),(s=i.call(this,t)).drawings=[],s.canvas=void 0,s.ctx=void 0,s.lastFrameTime=void 0,s.FRAMES_PER_SECOND=60,s.FRAME_MIN_TIME=void 0,s.frameTime=0,s.state={},s.FRAME_MIN_TIME=1e3/60*(60/s.FRAMES_PER_SECOND)-1e3/60*.5,s}return Object(d.a)(e,[{key:"componentDidMount",value:function(){this.canvas=document.getElementById("canvas"),this.rescaleCanvas(),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",this.rescaleCanvas),window.requestAnimationFrame(this.draw.bind(this))}},{key:"draw",value:function(t){if(t-this.lastFrameTime<this.FRAME_MIN_TIME)window.requestAnimationFrame(this.draw.bind(this));else{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.lastFrameTime=t,this.frameTime+=1/this.FRAMES_PER_SECOND;var i=!1;this.frameTime%1>.2&&(this.frameTime=0,i=!0);var e,s=Object(o.a)(this.drawings);try{for(s.s();!(e=s.n()).done;){var n=e.value;n.isAutoDrawn&&n.draw(),i&&(3!==n.currentFrame?n.currentFrame++:n.currentFrame=1)}}catch(a){s.e(a)}finally{s.f()}window.requestAnimationFrame(this.draw.bind(this))}}},{key:"rescaleCanvas",value:function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}},{key:"render",value:function(){return Object(c.jsx)("canvas",{id:"canvas"})}}]),e}(s.Component),f=e(7),x=function(){function t(i,e){Object(h.a)(this,t),this.x=void 0,this.y=void 0,this._nodes=[],this.x=i,this.y=e}return Object(d.a)(t,[{key:"nodes",get:function(){return this._nodes.sort((function(t,i){return t.zIndex>i.zIndex?1:t.zIndex<i.zIndex?-1:0}))},set:function(t){this._nodes=t}}]),t}(),y=function(){function t(i,e){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;Object(h.a)(this,t),this.x=void 0,this.y=void 0,this.text=void 0,this.isPlayer=!1,this._isPushable=!1,this.objectName=void 0,this.rules=[],this._lastDirection=1,this.xP=0,this.yP=0,this.x=i,this.y=e,this.text=s,this.objectName=n,1===a&&""===n||!b[n].hasDirs?this._lastDirection=a:this._lastDirection=2}return Object(d.a)(t,[{key:"isText",get:function(){return""!==this.text}},{key:"zIndex",get:function(){return""===this.objectName?b["text_"+this.text].zIndex:b[this.objectName].zIndex}},{key:"isPushable",get:function(){return!!this.isText||this._isPushable},set:function(t){this._isPushable=t}},{key:"isText_Object",get:function(){return-1!==m.indexOf(this.text.toLowerCase())}},{key:"isText_Verb",get:function(){return-1!==w.indexOf(this.text.toLowerCase())}},{key:"isText_Quality",get:function(){return-1!==D.indexOf(this.text.toLowerCase())}},{key:"is",value:function(t){return-1!==this.rules.indexOf(t)}},{key:"lastDirection",value:function(){return 0===this.xP&&-1===this.yP?(this._lastDirection=0,0):1===this.xP&&0===this.yP?(this._lastDirection=1,1):0===this.xP&&1===this.yP?(this._lastDirection=2,2):-1===this.xP&&0===this.yP?(this._lastDirection=3,3):this._lastDirection}},{key:"directionToXAndY",value:function(t){return 0===t?{xP:0,yP:-1}:1===t?{xP:1,yP:0}:2===t?{xP:0,yP:1}:3===t?{xP:-1,yP:0}:{xP:0,yP:0}}}]),t}(),b={babu:{x:0,y:3,zIndex:24,hasWalkAni:!0,hasDirs:!1,isTileable:!1},text_babu:{x:4,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},keke:{x:2,y:2,zIndex:24,hasWalkAni:!0,hasDirs:!1,isTileable:!1},text_keke:{x:2,y:2,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},me:{x:3,y:1,zIndex:24,hasWalkAni:!0,hasDirs:!1,isTileable:!1},text_me:{x:3,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_you:{x:4,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},skull:{x:2,y:1,zIndex:21,hasWalkAni:!1,hasDirs:!0,isTileable:!1},text_push:{x:6,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_stop:{x:5,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_is:{x:0,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},belt:{x:1,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!0,isTileable:!1},text_belt:{x:1,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_shift:{x:1,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_move:{x:5,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_defeat:{x:2,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},wall:{x:1,y:1,zIndex:13,hasWalkAni:!1,hasDirs:!1,isTileable:!0},text_wall:{x:0,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},grass:{x:5,y:0,zIndex:13,hasWalkAni:!1,hasDirs:!1,isTileable:!0},text_grass:{x:5,y:0,zIndex:13,hasWalkAni:!1,hasDirs:!1,isTileable:!1}},m=["babu","keke","me","skull","belt","wall","grass"],w=["is","and"],D=["you","push","stop","defeat","move","shift"],A=function(){function t(i){Object(h.a)(this,t),this.grid=void 0,this.rules=[],this.grid=i}return Object(d.a)(t,[{key:"updateRules",value:function(){this.rules=[];var t=this.grid.grid,i=document.getElementById("rules-text");null!=i&&(i.innerText="");for(var e=0;e<this.grid.height;e++)for(var s=0;s<this.grid.width;s++)for(var n=0;n<t[e][s].nodes.length;n++){var a=t[e][s].nodes[n];if(a.isText_Object){if(s+1<this.grid.width&&s+2<this.grid.width){var r,h=Object(o.a)(t[e][s+1].nodes);try{for(h.s();!(r=h.n()).done;){var d=r.value;if(d.isText_Verb){var l,u=Object(o.a)(t[e][s+2].nodes);try{for(u.s();!(l=u.n()).done;){var c=l.value;(c.isText_Quality||c.isText_Object)&&this.addRule(a.text+" "+d.text+" "+c.text)}}catch(R){u.e(R)}finally{u.f()}}}}catch(R){h.e(R)}finally{h.f()}}if(e+1<this.grid.height&&e+2<this.grid.height){var g,v=Object(o.a)(t[e+1][s].nodes);try{for(v.s();!(g=v.n()).done;){var f=g.value;if(f.isText_Verb){var x,y=Object(o.a)(t[e+2][s].nodes);try{for(y.s();!(x=y.n()).done;){var b=x.value;(b.isText_Quality||b.isText_Object)&&this.addRule(a.text+" "+f.text+" "+b.text)}}catch(R){y.e(R)}finally{y.f()}}}}catch(R){v.e(R)}finally{v.f()}}}}this.rules=Array.from(new Set(this.rules)),this.resetAllNodeRules();var w,D=Object(o.a)(this.rules);try{for(D.s();!(w=D.n()).done;){for(var A=w.value,k=A.split(" "),p=k[0],j=k[2],I=[],T=0;T<this.grid.height;T++)for(var O=0;O<this.grid.width;O++)for(var P=0;P<this.grid.grid[T][O].nodes.length;P++){var N=this.grid.grid[T][O].nodes[P];N.objectName===p&&I.push(N)}for(var M=0,E=I;M<E.length;M++){var S=E[M];switch(-1!==m.indexOf(j)&&(this.grid.undoActions.push({node:S,changeTo:S.objectName,changeOn:this.grid.undoStep+1}),this.grid.doAfterMove.push({node:S,newObjectName:j})),j){case"you":S.isPlayer=!0,this.grid.playerPositions.push({x:S.x,y:S.y,skip:!1});break;case"push":S.isPushable=!0;break;default:S.rules.push(j)}}null!=i&&(i.innerText+=A+"\n")}}catch(R){D.e(R)}finally{D.f()}}},{key:"resetAllNodeRules",value:function(){this.grid.playerPositions=[];for(var t=this.grid.grid,i=0;i<this.grid.height;i++)for(var e=0;e<this.grid.width;e++)for(var s=0;s<t[i][e].nodes.length;s++){var n=t[i][e].nodes[s];n.isPlayer=!1,n.isPushable=!1,n.rules=[]}}},{key:"addRule",value:function(t){this.rules.push(t)}}]),t}(),k=function(t){Object(l.a)(e,t);var i=Object(u.a)(e);function e(t,s,n){var a;return Object(h.a)(this,e),(a=i.call(this,t,!1)).currentDirection=0,a.lastDirection=1,a.extraWalking=3,a.imageName=void 0,a.drawings=[],a.x=0,a.xLastFrame=0,a.drawX=0,a.xDir=0,a.y=0,a.yLastFrame=0,a.drawY=0,a.yDir=0,a.offset=void 0,a.resolution=void 0,a.hasWalking=!1,a.hasDirections=!1,a.paletteData=void 0,a.grid=void 0,a.imageName=s,a.resolution=n,a.initializeDrawings(),a}return Object(d.a)(e,[{key:"initializeDrawings",value:function(){var t=this;this.hasDirections=b[this.imageName].hasDirs,this.hasWalking=b[this.imageName].hasWalkAni,this.hasDirections&&(this.currentDirection=24),this.hasWalking&&(this.currentDirection=27),b[this.imageName].isTileable&&(this.currentDirection=15);for(var i=0;i<this.currentDirection+1;i++){this.drawings[i]=[];for(var e=1;e<4;e++)this.drawings[i][e]=void 0}var s=new Image(7,5);s.src="/babu-is-you/img/Palettes/default.png",s.onload=function(){for(var i=function(i){for(var e=function(e){var n=new Image(24,24);t.hasWalking?n.src="/babu-is-you/img/"+t.imageName+"/"+t.imageName+"_"+i+"_"+e+".png":t.imageName.includes("text")?n.src="/babu-is-you/img/texts/"+t.imageName+"_"+i+"_"+e+".png":n.src="/babu-is-you/img/objects/"+t.imageName+"_"+i+"_"+e+".png";var a=document.createElement("canvas").getContext("2d");null!==a&&(a.drawImage(s,0,0,s.width,s.height),t.paletteData=a.getImageData(0,0,s.width,s.height)),n.onload=function(){var s=document.createElement("canvas").getContext("2d");if(null!==s){s.imageSmoothingEnabled=!1,s.drawImage(n,0,0,t.resolution-2,t.resolution-2);for(var a=s.getImageData(0,0,t.resolution-2,t.resolution-2),r=a.data,o=b[t.imageName].x,h=7*b[t.imageName].y+o<<2,d=0;d<r.length;d+=4)255===r[d]&&(r[d]=t.paletteData.data[h],r[d+1]=t.paletteData.data[h+1],r[d+2]=t.paletteData.data[h+2]);var l=document.createElement("canvas");l.width=a.width,l.height=a.height;var u=l.getContext("2d");null!==u&&u.putImageData(a,0,0),t.drawings[i][e]=l}t.drawX=t.x,t.drawY=t.y}},n=1;n<4;n++)e(n)},e=0;e<t.currentDirection+1;e++)i(e)}}},{key:"draw",value:function(){var t=this;if(void 0!==this.drawings[this.currentDirection][this.currentFrame]&&void 0!==this.grid){if(this.currentDirection=0,this.hasDirections&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0),this.hasWalking&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0,this.x===this.xLastFrame&&this.y===this.yLastFrame||(3!==this.extraWalking?this.extraWalking+=1:this.extraWalking=0),this.currentDirection+=this.extraWalking),this.x===this.xLastFrame&&this.y===this.yLastFrame||(this.xDir=this.x-this.xLastFrame,this.yDir=this.y-this.yLastFrame,this.drawX=this.x-this.xDir,this.drawY=this.y-this.yDir),b[this.imageName].isTileable){var i=!1,e=!1,s=!1,n=!1;this.drawX+1>this.grid.width-1||!this.grid.grid[this.y][this.drawX+1].nodes.some((function(i){return i.objectName===t.imageName}))||(e=!0),this.drawX-1<0||!this.grid.grid[this.y][this.drawX-1].nodes.some((function(i){return i.objectName===t.imageName}))||(i=!0),this.drawY+1>this.grid.height-1||!this.grid.grid[this.drawY+1][this.x].nodes.some((function(i){return i.objectName===t.imageName}))||(n=!0),this.drawY-1<0||!this.grid.grid[this.drawY-1][this.x].nodes.some((function(i){return i.objectName===t.imageName}))||(s=!0),i||!e||s||n?i||e||!s||n?!i&&e&&s&&!n?this.currentDirection+=3:!i||e||s||n?i&&e&&!s&&!n?this.currentDirection+=5:i&&!e&&s&&!n?this.currentDirection+=6:i&&e&&s&&!n?this.currentDirection+=7:i||e||s||!n?!i&&e&&!s&&n?this.currentDirection+=9:!i&&!e&&s&&n?this.currentDirection+=10:!i&&e&&s&&n?this.currentDirection+=11:i&&!e&&!s&&n?this.currentDirection+=12:i&&e&&!s&&n?this.currentDirection+=13:i&&!e&&s&&n?this.currentDirection+=14:i&&e&&s&&n&&(this.currentDirection+=15):this.currentDirection+=8:this.currentDirection+=4:this.currentDirection+=2:this.currentDirection+=1}this.ctx.imageSmoothingEnabled=!1,void 0!==this.drawings[this.currentDirection][this.currentFrame]&&(this.ctx.drawImage(this.drawings[this.currentDirection][this.currentFrame],this.drawX*this.resolution+this.offset.x,this.drawY*this.resolution+this.offset.y,this.resolution,this.resolution),parseFloat(this.drawX.toFixed(1))===this.x&&parseFloat(this.drawY.toFixed(1))===this.y||(this.drawX+=.2*this.xDir,this.drawY+=.2*this.yDir),this.xLastFrame=this.x,this.yLastFrame=this.y)}}}]),e}(g),p=function(t){Object(l.a)(e,t);var i=Object(u.a)(e);function e(t,s,n,a){var r;return Object(h.a)(this,e),(r=i.call(this,t)).width=void 0,r.height=void 0,r.resolution=void 0,r.grid=[],r.offset=void 0,r.playerPositions=[],r.drawings={},r.gridImage=void 0,r.active=!0,r.undoMoves=[],r.undoActions=[],r.doAfterMove=[],r.undoStep=0,r.rules=new A(Object(f.a)(r)),r.didMoveThisStep=!1,r.width=s,r.height=n,r.resolution=a,r.loadAllImages(),r.setOffset(),r.initializeGrid(s,n),r.initializeDrawings(),r.rules.updateRules(),r.canvas.canvas.addEventListener("click",r.calculateText.bind(Object(f.a)(r))),r}return Object(d.a)(e,[{key:"getDrawing",value:function(t){return t in this.drawings||(this.drawings[t]=new k(this.canvas,t,this.resolution)),this.drawings[t]}},{key:"loadAllImages",value:function(){for(var t=0,i=Object.keys(b);t<i.length;t++){var e=i[t];this.drawings[e]=new k(this.canvas,e,this.resolution)}}},{key:"setOffset",value:function(){this.offset={x:Math.floor(window.innerWidth/2-this.width/2*this.resolution),y:Math.floor(window.innerHeight/2-this.height/2*this.resolution)}}},{key:"initializeDrawings",value:function(){this.gridImage=this.drawGrid()}},{key:"initializeGrid",value:function(t,i){for(var e=0;e<i;e++){for(var s=[],n=0;n<t;n++)s.push(new x(n,e));this.grid.push(s)}for(var a=0;a<i;a++)for(var r=0;r<t;r++)5===r&&5===a&&this.grid[a][r].nodes.push(new y(r,a,"","babu")),7===r&&5===a&&this.grid[a][r].nodes.push(new y(r,a,"","grass")),8===r&&5===a&&this.grid[a][r].nodes.push(new y(r,a,"","grass")),3===r&&3===a&&this.grid[a][r].nodes.push(new y(r,a,"babu")),4===r&&3===a&&this.grid[a][r].nodes.push(new y(r,a,"is")),5===r&&3===a&&this.grid[a][r].nodes.push(new y(r,a,"you"))}},{key:"calculateText",value:function(t){var i=t.clientX-this.offset.x,e=t.clientY-this.offset.y,s={x:Math.floor(i/this.resolution),y:Math.floor(e/this.resolution)};if(!(s.x<0||s.x>=this.width||s.y<0||s.y>=this.height)){var n=prompt("Give a value.");null!==n&&this.grid[s.y][s.x].nodes.push(new y(s.x,s.y,n)),this.rules.updateRules()}}},{key:"doMovement",value:function(){for(var t=[],i=0;i<this.height;i++)for(var e=0;e<this.width;e++){var s,n=Object(o.a)(this.grid[i][e].nodes);try{for(n.s();!(s=n.n()).done;){var a=s.value;if(a.is("move")){var r=a.directionToXAndY(a.lastDirection());this.canMoveIntoNode(a,r.xP,r.yP)||(r={xP:-r.xP,yP:-r.yP}),t.push({node:a,xP:r.xP,yP:r.yP})}if(a.is("defeat")&&this.grid[i][e].nodes.some((function(t){return t.isPlayer}))){var h,d=Object(o.a)(this.grid[i][e].nodes.filter((function(t){return t.isPlayer})));try{for(d.s();!(h=d.n()).done;){var l=h.value;this.undoActions.push({node:l,changeTo:l.objectName,changeOn:this.undoStep+1}),l.objectName=""}}catch(v){d.e(v)}finally{d.f()}}}}catch(v){n.e(v)}finally{n.f()}}for(var u=0,c=t;u<c.length;u++){var g=c[u];this.moveNode(g.node,g.xP,g.yP)}}},{key:"canMoveIntoNode",value:function(t,i,e){var s=this.grid,n=t.x,a=t.y;if(n+i<0||n+i>this.width-1||a+e<0||a+e>this.height-1)return!1;for(var r=0;r<s[a+e][n+i].nodes.length;r++){var o=s[a+e][n+i].nodes[r];if(o.isPushable){if(o.x+i<0||o.x+i>this.width-1||o.y+e<0||o.y+e>this.height-1)return!1;if(0===s[o.y+e][o.x+i].nodes.length)return this.moveNode(o,i,e),!0;for(var h=0;h<s[o.y+e][o.x+i].nodes.length;h++)if(this.canMoveIntoNode(o,i,e))return this.moveNode(o,i,e),!0;return!1}if(o.is("stop"))return!1}return!0}},{key:"moveNode",value:function(t,i,e){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(!s&&!this.canMoveIntoNode(t,i,e))return!1;var r=this.grid[t.y][t.x],o=this.grid[t.y+e][t.x+i];return t.x+=i,t.y+=e,a?(t.xP=-i,t.yP=-e):(t.xP=i,t.yP=e),o.nodes.push(t),r.nodes.splice(r.nodes.indexOf(t),1),n||(this.didMoveThisStep=!0,this.undoMoves.length-1!==this.undoStep&&this.undoMoves.push([]),this.undoMoves[this.undoStep].push({node:o.nodes[o.nodes.findIndex((function(i){return i===t}))],xP:-i,yP:-e,doAction:!1})),!0}},{key:"draw",value:function(){if(this.active){this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height),this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(this.gridImage,this.offset.x,this.offset.y);for(var t=0;t<this.height;t++)for(var i=0;i<this.width;i++)for(var e=0;e<this.grid[t][i].nodes.length;e++){var s=this.grid[t][i].nodes[e];if(""!==s.objectName){var n=this.getDrawing(s.objectName);n.x=i,n.y=t,n.grid=this,n.lastDirection=s.lastDirection(),n.offset=this.offset,n.draw()}if(s.isText){var a=this.getDrawing("text_"+s.text);a.x=i,a.y=t,a.grid=this,a.offset=this.offset,a.draw()}}}}},{key:"drawGrid",value:function(){var t=this.width,i=this.height,e=this.resolution,s=document.createElement("canvas");s.width=t*e,s.height=i*e;var n=s.getContext("2d");if(n){n.imageSmoothingEnabled=!1,n.globalCompositeOperation="source-over",n.strokeStyle="rgba(0,0,0,1)",n.fillStyle="rgba(0,0,0,1)",n.beginPath();for(var a=0;a<t;a++)n.moveTo(a*e,0),n.lineTo(a*e,i*e);n.stroke(),n.beginPath();for(var r=0;r<t;r++)n.moveTo(0,r*e),n.lineTo(t*e,r*e);n.stroke(),n.beginPath(),n.moveTo(t*e,0),n.lineTo(t*e,i*e),n.stroke(),n.beginPath(),n.moveTo(0,i*e),n.lineTo(t*e,i*e),n.stroke()}return s}}]),e}(g),j=function(t){Object(l.a)(e,t);var i=Object(u.a)(e);function e(t){var s;return Object(h.a)(this,e),(s=i.call(this,t)).canvas=void 0,s.grid=void 0,s.canMove=!0,s.justUndone=!1,s.interval=void 0,s.state={},s}return Object(d.a)(e,[{key:"componentDidMount",value:function(){this.canvas&&(this.grid=new p(this.canvas,10,10,70),window.addEventListener("resize",this.grid.setOffset.bind(this.grid)),window.addEventListener("keydown",this.keyDetectDown.bind(this),!1),window.addEventListener("keyup",this.keyDetectUp.bind(this),!1))}},{key:"movePlayers",value:function(t,i){var e=this;if(this.canMove&&0!==this.grid.playerPositions.length){this.grid.undoMoves.length=this.grid.undoStep,this.grid.undoMoves.length>50&&(this.grid.undoMoves.shift(),this.grid.undoStep--);var s,n=0,a=Object(o.a)(this.grid.playerPositions);try{for(a.s();!(s=a.n()).done;){var r=s.value;if(r.skip)r.skip=!1;else{var h=this.grid.grid[r.y][r.x].nodes.find((function(t){return t.isPlayer}));null!=h&&(this.grid.moveNode(h,t,i)||n++,r.skip=!1)}}}catch(f){a.e(f)}finally{a.f()}this.grid.doMovement(),this.grid.rules.updateRules();var d,l=0,u=Object(o.a)(this.grid.rules.rules);try{for(u.s();!(d=u.n()).done;){"you"!==d.value.split(" ")[2]&&l++}}catch(f){u.e(f)}finally{u.f()}if((n!==this.grid.playerPositions.length||l===this.grid.rules.rules.length||this.grid.didMoveThisStep)&&(this.grid.undoStep++,this.grid.didMoveThisStep=!1),0!==this.grid.doAfterMove.length){var c,g=Object(o.a)(this.grid.doAfterMove);try{for(g.s();!(c=g.n()).done;){var v=c.value;v.node.objectName=v.newObjectName}}catch(f){g.e(f)}finally{g.f()}this.grid.rules.resetAllNodeRules()}this.grid.rules.updateRules(),this.canMove=!1,setTimeout((function(){e.canMove=!0}),100)}}},{key:"undoMoves",value:function(){if(!(this.grid.undoStep-1<0))if(this.canMove=!1,this.grid.undoMoves.length<this.grid.undoStep)console.error("Could not do undo with: "+this.grid.undoMoves+" and "+this.grid.undoStep);else{for(var t=this.grid.undoMoves[this.grid.undoStep-1].slice(),i=t.length-1;i>=0;i--){var e=t[i];this.grid.moveNode(e.node,e.xP,e.yP,!1,!0,!0);var s,n=Object(o.a)(this.grid.undoActions);try{for(n.s();!(s=n.n()).done;){var a=s.value;a.changeOn===this.grid.undoStep&&(a.node.objectName=a.changeTo,this.grid.doAfterMove=[])}}catch(r){n.e(r)}finally{n.f()}}this.grid.rules.updateRules(),this.grid.undoStep--,this.justUndone=!0,this.canMove=!0}}},{key:"keyDetectDown",value:function(t){var i=this;t.repeat||void 0===this.interval&&("w"===t.key?(this.movePlayers(0,-1),this.interval=setInterval((function(){return i.movePlayers(0,-1)}),150)):"a"===t.key?(this.movePlayers(-1,0),this.interval=setInterval((function(){return i.movePlayers(-1,0)}),150)):"s"===t.key?(this.movePlayers(0,1),this.interval=setInterval((function(){return i.movePlayers(0,1)}),150)):"d"===t.key?(this.movePlayers(1,0),this.interval=setInterval((function(){return i.movePlayers(1,0)}),150)):"z"===t.key&&(this.undoMoves(),this.interval=setInterval((function(){return i.undoMoves()}),200)))}},{key:"keyDetectUp",value:function(t){t.repeat||(clearInterval(this.interval),this.interval=void 0)}},{key:"render",value:function(){var t=this;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("a",{href:"https://github.com/tddebart/babu-is-you",target:"_blank",rel:"noreferrer",children:Object(c.jsx)("img",{className:"github",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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",alt:"github"})}),Object(c.jsx)("button",{style:{position:"absolute",top:"10px"},onClick:function(){return console.log(t.grid)},children:"Grid"}),Object(c.jsx)("div",{id:"rules-text",style:{position:"absolute",top:"10px",left:"10px",textAlign:"left"}}),Object(c.jsx)(v,{ref:function(i){return t.canvas=i}})]})}}]),e}(s.Component);var I=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)("header",{className:"App-header",children:Object(c.jsx)(j,{})})})},T=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,19)).then((function(i){var e=i.getCLS,s=i.getFID,n=i.getFCP,a=i.getLCP,r=i.getTTFB;e(t),s(t),n(t),a(t),r(t)}))};r.a.render(Object(c.jsx)(n.a.StrictMode,{children:Object(c.jsx)(I,{})}),document.getElementById("root")),T()}},[[18,1,2]]]);
//# sourceMappingURL=main.d72e7b7e.chunk.js.map