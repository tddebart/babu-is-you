(this["webpackJsonpbabu-is-you"]=this["webpackJsonpbabu-is-you"]||[]).push([[0],{14:function(i,t,e){},15:function(i,t,e){},16:function(i,t,e){},18:function(i,t,e){"use strict";e.r(t);var s=e(4),n=e.n(s),a=e(9),r=e.n(a),o=(e(14),e(15),e(1)),h=e(2),d=e(3),l=e(6),c=e(5),u=(e(16),e(0)),v=function(){function i(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];Object(h.a)(this,i),this.canvas=void 0,this.ctx=void 0,this.currentFrame=1,this.isAutoDrawn=void 0,this.canvas=t,this.isAutoDrawn=e,this.canvas.drawings.push(this),this.ctx=t.ctx}return Object(d.a)(i,[{key:"draw",value:function(){}},{key:"remove",value:function(){this.canvas.drawings.slice(this.canvas.drawings.indexOf(this),1)}}]),i}(),g=function(i){Object(l.a)(e,i);var t=Object(c.a)(e);function e(i){var s;return Object(h.a)(this,e),(s=t.call(this,i)).drawings=[],s.canvas=void 0,s.ctx=void 0,s.lastFrameTime=void 0,s.FRAMES_PER_SECOND=60,s.FRAME_MIN_TIME=void 0,s.frameTime=0,s.state={},s.FRAME_MIN_TIME=1e3/60*(60/s.FRAMES_PER_SECOND)-1e3/60*.5,s}return Object(d.a)(e,[{key:"componentDidMount",value:function(){this.canvas=document.getElementById("canvas"),this.rescaleCanvas(),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",this.rescaleCanvas),window.requestAnimationFrame(this.draw.bind(this))}},{key:"draw",value:function(i){if(i-this.lastFrameTime<this.FRAME_MIN_TIME)window.requestAnimationFrame(this.draw.bind(this));else{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.lastFrameTime=i,this.frameTime+=1/this.FRAMES_PER_SECOND;var t=!1;this.frameTime%1>.2&&(this.frameTime=0,t=!0);var e,s=Object(o.a)(this.drawings);try{for(s.s();!(e=s.n()).done;){var n=e.value;n.isAutoDrawn&&n.draw(),t&&(3!==n.currentFrame?n.currentFrame++:n.currentFrame=1)}}catch(a){s.e(a)}finally{s.f()}window.requestAnimationFrame(this.draw.bind(this))}}},{key:"rescaleCanvas",value:function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}},{key:"render",value:function(){return Object(u.jsx)("canvas",{id:"canvas"})}}]),e}(s.Component),f=e(7),x=function(){function i(t,e){Object(h.a)(this,i),this.x=void 0,this.y=void 0,this._nodes=[],this.x=t,this.y=e}return Object(d.a)(i,[{key:"nodes",get:function(){return this._nodes.sort((function(i,t){return i.zIndex>t.zIndex?1:i.zIndex<t.zIndex?-1:0}))},set:function(i){this._nodes=i}}]),i}(),y=function(){function i(t,e,s,n){var a,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"",d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1;Object(h.a)(this,i),this.x=void 0,this.y=void 0,this.text=void 0,this.isPlayer=!1,this._isPushable=!1,this._objectName=void 0,this.rules=[],this._lastDirection=1,this.aniImg=void 0,this.isMoving=!1,this.canvas=void 0,this.grid=void 0,this.xP=0,this.yP=0,this.x=t,this.y=e,this.text=r,this._objectName=o,this.canvas=s,this.grid=n,1===d&&""===o||!b[o].hasDirs?this._lastDirection=d:this._lastDirection=2,a=""===o?"text_"+r:o,this.aniImg=new k(t,e,s,a,n,this)}return Object(d.a)(i,[{key:"objectName",get:function(){return this._objectName},set:function(i){this._objectName=i,this.aniImg=new k(this.x,this.y,this.canvas,i,this.grid,this)}},{key:"isText",get:function(){return""!==this.text}},{key:"zIndex",get:function(){return""===this._objectName?b["text_"+this.text].zIndex:b[this._objectName].zIndex}},{key:"isPushable",get:function(){return!!this.isText||this._isPushable},set:function(i){this._isPushable=i}},{key:"isText_Object",get:function(){return-1!==m.indexOf(this.text.toLowerCase())}},{key:"isText_Verb",get:function(){return-1!==w.indexOf(this.text.toLowerCase())}},{key:"isText_Quality",get:function(){return-1!==A.indexOf(this.text.toLowerCase())}},{key:"is",value:function(i){return-1!==this.rules.indexOf(i)}},{key:"lastDirection",value:function(){return 0===this.xP&&-1===this.yP?(this._lastDirection=0,0):1===this.xP&&0===this.yP?(this._lastDirection=1,1):0===this.xP&&1===this.yP?(this._lastDirection=2,2):-1===this.xP&&0===this.yP?(this._lastDirection=3,3):this._lastDirection}},{key:"directionToXAndY",value:function(i){return 0===i?{xP:0,yP:-1}:1===i?{xP:1,yP:0}:2===i?{xP:0,yP:1}:3===i?{xP:-1,yP:0}:{xP:0,yP:0}}}]),i}(),b={babu:{x:0,y:3,zIndex:24,hasWalkAni:!0,hasDirs:!1,isTileable:!1},text_babu:{x:4,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},keke:{x:2,y:2,zIndex:24,hasWalkAni:!0,hasDirs:!1,isTileable:!1},text_keke:{x:2,y:2,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},me:{x:3,y:1,zIndex:24,hasWalkAni:!0,hasDirs:!1,isTileable:!1},text_me:{x:3,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_you:{x:4,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},skull:{x:2,y:1,zIndex:21,hasWalkAni:!1,hasDirs:!0,isTileable:!1},text_push:{x:6,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_stop:{x:5,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_is:{x:0,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},belt:{x:1,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!0,isTileable:!1},text_belt:{x:1,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_shift:{x:1,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_move:{x:5,y:3,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},text_defeat:{x:2,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},wall:{x:1,y:1,zIndex:13,hasWalkAni:!1,hasDirs:!1,isTileable:!0},text_wall:{x:0,y:1,zIndex:24,hasWalkAni:!1,hasDirs:!1,isTileable:!1},grass:{x:5,y:0,zIndex:13,hasWalkAni:!1,hasDirs:!1,isTileable:!0},text_grass:{x:5,y:0,zIndex:13,hasWalkAni:!1,hasDirs:!1,isTileable:!1}},m=["babu","keke","me","skull","belt","wall","grass"],w=["is","and"],A=["you","push","stop","defeat","move","shift"],D=function(){function i(t){Object(h.a)(this,i),this.grid=void 0,this.rules=[],this.grid=t}return Object(d.a)(i,[{key:"updateRules",value:function(){this.rules=[];var i=this.grid.grid,t=document.getElementById("rules-text");null!=t&&(t.innerText="");for(var e=0;e<this.grid.height;e++)for(var s=0;s<this.grid.width;s++)for(var n=0;n<i[e][s].nodes.length;n++){var a=i[e][s].nodes[n];if(a.isText_Object){if(s+1<this.grid.width&&s+2<this.grid.width){var r,h=Object(o.a)(i[e][s+1].nodes);try{for(h.s();!(r=h.n()).done;){var d=r.value;if(d.isText_Verb){var l,c=Object(o.a)(i[e][s+2].nodes);try{for(c.s();!(l=c.n()).done;){var u=l.value;(u.isText_Quality||u.isText_Object)&&this.addRule(a.text+" "+d.text+" "+u.text)}}catch(R){c.e(R)}finally{c.f()}}}}catch(R){h.e(R)}finally{h.f()}}if(e+1<this.grid.height&&e+2<this.grid.height){var v,g=Object(o.a)(i[e+1][s].nodes);try{for(g.s();!(v=g.n()).done;){var f=v.value;if(f.isText_Verb){var x,y=Object(o.a)(i[e+2][s].nodes);try{for(y.s();!(x=y.n()).done;){var b=x.value;(b.isText_Quality||b.isText_Object)&&this.addRule(a.text+" "+f.text+" "+b.text)}}catch(R){y.e(R)}finally{y.f()}}}}catch(R){g.e(R)}finally{g.f()}}}}this.rules=Array.from(new Set(this.rules)),this.resetAllNodeRules();var w,A=Object(o.a)(this.rules);try{for(A.s();!(w=A.n()).done;){for(var D=w.value,k=D.split(" "),p=k[0],j=k[2],I=[],T=0;T<this.grid.height;T++)for(var O=0;O<this.grid.width;O++)for(var P=0;P<this.grid.grid[T][O].nodes.length;P++){var M=this.grid.grid[T][O].nodes[P];M.objectName===p&&I.push(M)}for(var N=0,E=I;N<E.length;N++){var S=E[N];switch(-1!==m.indexOf(j)&&(this.grid.undoActions.push({node:S,changeTo:S.objectName,changeOn:this.grid.undoStep+1}),this.grid.doAfterMove.push({node:S,newObjectName:j})),j){case"you":S.isPlayer=!0,this.grid.playerPositions.push({x:S.x,y:S.y,skip:!1});break;case"push":S.isPushable=!0;break;default:S.rules.push(j)}}null!=t&&(t.innerText+=D+"\n")}}catch(R){A.e(R)}finally{A.f()}}},{key:"resetAllNodeRules",value:function(){this.grid.playerPositions=[];for(var i=this.grid.grid,t=0;t<this.grid.height;t++)for(var e=0;e<this.grid.width;e++)for(var s=0;s<i[t][e].nodes.length;s++){var n=i[t][e].nodes[s];n.isPlayer=!1,n.isPushable=!1,n.rules=[]}}},{key:"addRule",value:function(i){this.rules.push(i)}}]),i}(),k=function(i){Object(l.a)(e,i);var t=Object(c.a)(e);function e(i,s,n,a,r,o){var d;return Object(h.a)(this,e),(d=t.call(this,n,!1)).currentDirection=0,d.lastDirection=1,d.extraWalking=3,d.imageName=void 0,d.drawings=[],d.x=0,d.xLastFrame=0,d.drawX=0,d.xDir=0,d.y=0,d.yLastFrame=0,d.drawY=0,d.yDir=0,d.offset=void 0,d.resolution=void 0,d.hasWalking=!1,d.hasDirections=!1,d.isMoving=!1,d.grid=void 0,d.node=void 0,d.imageName=a,d.grid=r,d.node=o,d.resolution=d.grid.resolution,d.x=i,d.xLastFrame=i,d.drawX=i,d.y=s,d.yLastFrame=s,d.drawY=s,d.hasDirections=b[d.imageName].hasDirs,d.hasWalking=b[d.imageName].hasWalkAni,d}return Object(d.a)(e,[{key:"draw",value:function(){var i=this;if(this.drawings=this.grid.drawings[this.imageName],void 0!==this.drawings&&void 0!==this.drawings[this.currentDirection][this.currentFrame]){if(this.currentDirection=0,this.hasDirections&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0),this.hasWalking&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0,this.x===this.xLastFrame&&this.y===this.yLastFrame||(3!==this.extraWalking?this.extraWalking+=1:this.extraWalking=0),this.currentDirection+=this.extraWalking),this.x===this.xLastFrame&&this.y===this.yLastFrame||(this.xDir=this.x-this.xLastFrame,this.yDir=this.y-this.yLastFrame,this.drawX=this.x-this.xDir,this.drawY=this.y-this.yDir),b[this.imageName].isTileable&&!this.isMoving){var t=!1,e=!1,s=!1,n=!1;this.x+1>this.grid.width-1||!this.grid.grid[this.y][this.x+1].nodes.some((function(t){return t.objectName===i.imageName}))||(e=!0),this.x-1<0||!this.grid.grid[this.y][this.x-1].nodes.some((function(t){return t.objectName===i.imageName}))||(t=!0),this.y+1>this.grid.height-1||!this.grid.grid[this.y+1][this.x].nodes.some((function(t){return t.objectName===i.imageName}))||(n=!0),this.y-1<0||!this.grid.grid[this.y-1][this.x].nodes.some((function(t){return t.objectName===i.imageName}))||(s=!0),t||!e||s||n?t||e||!s||n?!t&&e&&s&&!n?this.currentDirection+=3:!t||e||s||n?t&&e&&!s&&!n?this.currentDirection+=5:t&&!e&&s&&!n?this.currentDirection+=6:t&&e&&s&&!n?this.currentDirection+=7:t||e||s||!n?!t&&e&&!s&&n?this.currentDirection+=9:!t&&!e&&s&&n?this.currentDirection+=10:!t&&e&&s&&n?this.currentDirection+=11:t&&!e&&!s&&n?this.currentDirection+=12:t&&e&&!s&&n?this.currentDirection+=13:t&&!e&&s&&n?this.currentDirection+=14:t&&e&&s&&n&&(this.currentDirection+=15):this.currentDirection+=8:this.currentDirection+=4:this.currentDirection+=2:this.currentDirection+=1}this.ctx.imageSmoothingEnabled=!1,void 0!==this.drawings[this.currentDirection][this.currentFrame]&&(this.ctx.drawImage(this.drawings[this.currentDirection][this.currentFrame],this.drawX*this.resolution+this.offset.x,this.drawY*this.resolution+this.offset.y,this.resolution,this.resolution),parseFloat(this.drawX.toFixed(1))!==this.x||parseFloat(this.drawY.toFixed(1))!==this.y?(this.drawX+=.2*this.xDir,this.drawY+=.2*this.yDir,this.isMoving=!0,this.node.isMoving=!0):(this.isMoving=!1,this.node.isMoving=!1),this.xLastFrame=this.x,this.yLastFrame=this.y)}}}]),e}(v),p=function(i){Object(l.a)(e,i);var t=Object(c.a)(e);function e(i,s,n,a){var r;return Object(h.a)(this,e),(r=t.call(this,i)).width=void 0,r.height=void 0,r.resolution=void 0,r.grid=[],r.offset=void 0,r.playerPositions=[],r.drawings={},r.gridImage=void 0,r.active=!0,r.undoMoves=[],r.undoActions=[],r.doAfterMove=[],r.undoStep=0,r.rules=new D(Object(f.a)(r)),r.didMoveThisStep=!1,r.width=s,r.height=n,r.resolution=a,r.loadAllImages(),r.setOffset(),r.initializeGrid(s,n),r.initializeDrawings(),r.rules.updateRules(),r.canvas.canvas.addEventListener("click",r.calculateText.bind(Object(f.a)(r))),r}return Object(d.a)(e,[{key:"loadAllImages",value:function(){for(var i=this,t=function(){var t=s[e],n=[],a=b[t].hasDirs,r=b[t].hasWalkAni,o=0;a&&(o=24),r&&(o=27),b[t].isTileable&&(o=15);for(var h=0;h<o+1;h++){n[h]=[];for(var d=1;d<4;d++)n[h][d]=void 0}var l=new Image(7,5);l.src="/babu-is-you/img/Palettes/default.png",l.onload=function(){for(var e=function(e){for(var s=function(s){var a=new Image(24,24);r?a.src="/babu-is-you/img/"+t+"/"+t+"_"+e+"_"+s+".png":t.includes("text")?a.src="/babu-is-you/img/texts/"+t+"_"+e+"_"+s+".png":a.src="/babu-is-you/img/objects/"+t+"_"+e+"_"+s+".png";document.createElement("canvas").getContext("2d");a.onload=function(){var r=document.createElement("canvas").getContext("2d");if(null!==r){r.imageSmoothingEnabled=!1,r.drawImage(l,100,100,l.width,l.height);var o=r.getImageData(100,100,l.width,l.height);r.drawImage(a,0,0,i.resolution-2,i.resolution-2);for(var h=r.getImageData(0,0,i.resolution-2,i.resolution-2),d=h.data,c=b[t].x,u=7*b[t].y+c<<2,v=0;v<d.length;v+=4)255===d[v]&&(d[v]=o.data[u],d[v+1]=o.data[u+1],d[v+2]=o.data[u+2]);var g=document.createElement("canvas");g.width=h.width,g.height=h.height;var f=g.getContext("2d");null!==f&&f.putImageData(h,0,0),n[e][s]=g,i.drawings[t]=n}}},a=1;a<4;a++)s(a)},s=0;s<o+1;s++)e(s)}},e=0,s=Object.keys(b);e<s.length;e++)t()}},{key:"setOffset",value:function(){this.offset={x:Math.floor(window.innerWidth/2-this.width/2*this.resolution),y:Math.floor(window.innerHeight/2-this.height/2*this.resolution)}}},{key:"initializeDrawings",value:function(){this.gridImage=this.drawGrid()}},{key:"initializeGrid",value:function(i,t){for(var e=0;e<t;e++){for(var s=[],n=0;n<i;n++)s.push(new x(n,e));this.grid.push(s)}for(var a=0;a<t;a++)for(var r=0;r<i;r++)5===r&&5===a&&this.grid[a][r].nodes.push(new y(r,a,this.canvas,this,"","babu")),7===r&&5===a&&this.grid[a][r].nodes.push(new y(r,a,this.canvas,this,"","keke")),3===r&&3===a&&this.grid[a][r].nodes.push(new y(r,a,this.canvas,this,"babu")),4===r&&3===a&&this.grid[a][r].nodes.push(new y(r,a,this.canvas,this,"is")),5===r&&3===a&&this.grid[a][r].nodes.push(new y(r,a,this.canvas,this,"you"))}},{key:"calculateText",value:function(i){var t=i.clientX-this.offset.x,e=i.clientY-this.offset.y,s={x:Math.floor(t/this.resolution),y:Math.floor(e/this.resolution)};if(!(s.x<0||s.x>=this.width||s.y<0||s.y>=this.height)){var n=prompt("Give a value.");null!==n&&this.grid[s.y][s.x].nodes.push(new y(s.x,s.y,this.canvas,this,n)),this.rules.updateRules()}}},{key:"doMovement",value:function(){for(var i=[],t=0;t<this.height;t++)for(var e=0;e<this.width;e++){var s,n=Object(o.a)(this.grid[t][e].nodes);try{for(n.s();!(s=n.n()).done;){var a=s.value;if(a.is("move")){var r=a.directionToXAndY(a.lastDirection());this.canMoveIntoNode(a,r.xP,r.yP)||(r={xP:-r.xP,yP:-r.yP}),i.push({node:a,xP:r.xP,yP:r.yP})}if(a.is("defeat")&&this.grid[t][e].nodes.some((function(i){return i.isPlayer}))){var h,d=Object(o.a)(this.grid[t][e].nodes.filter((function(i){return i.isPlayer})));try{for(d.s();!(h=d.n()).done;){var l=h.value;this.undoActions.push({node:l,changeTo:l.objectName,changeOn:this.undoStep+1}),l.objectName=""}}catch(g){d.e(g)}finally{d.f()}}}}catch(g){n.e(g)}finally{n.f()}}for(var c=0,u=i;c<u.length;c++){var v=u[c];this.moveNode(v.node,v.xP,v.yP)}}},{key:"canMoveIntoNode",value:function(i,t,e){var s=this.grid,n=i.x,a=i.y;if(n+t<0||n+t>this.width-1||a+e<0||a+e>this.height-1)return!1;for(var r=0;r<s[a+e][n+t].nodes.length;r++){var o=s[a+e][n+t].nodes[r];if(o.isPushable){if(o.x+t<0||o.x+t>this.width-1||o.y+e<0||o.y+e>this.height-1)return!1;if(0===s[o.y+e][o.x+t].nodes.length)return this.moveNode(o,t,e),!0;for(var h=0;h<s[o.y+e][o.x+t].nodes.length;h++)if(this.canMoveIntoNode(o,t,e))return this.moveNode(o,t,e),!0;return!1}if(o.is("stop"))return!1}return!0}},{key:"moveNode",value:function(i,t,e){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(!s&&!this.canMoveIntoNode(i,t,e))return!1;var r=this.grid[i.y][i.x],o=this.grid[i.y+e][i.x+t];return i.x+=t,i.y+=e,a?(i.xP=-t,i.yP=-e):(i.xP=t,i.yP=e),o.nodes.push(i),r.nodes.splice(r.nodes.indexOf(i),1),n||(this.didMoveThisStep=!0,this.undoMoves.length-1!==this.undoStep&&this.undoMoves.push([]),this.undoMoves[this.undoStep].push({node:o.nodes[o.nodes.findIndex((function(t){return t===i}))],xP:-t,yP:-e,doAction:!1})),!0}},{key:"draw",value:function(){if(this.active){this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height),this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(this.gridImage,this.offset.x,this.offset.y);for(var i=0;i<25;i++)for(var t=0;t<this.height;t++)for(var e=0;e<this.width;e++)for(var s=0;s<this.grid[t][e].nodes.length;s++){var n=this.grid[t][e].nodes[s];if(""!==n.objectName){if(b[n.objectName].zIndex!==i)continue;var a=n.aniImg;a.x=e,a.y=t,a.grid=this,a.lastDirection=n.lastDirection(),a.offset=this.offset,a.draw()}if(n.isText){if(b["text_"+n.text].zIndex!==i)continue;var r=n.aniImg;r.x=e,r.y=t,r.grid=this,r.offset=this.offset,r.draw()}}}}},{key:"drawGrid",value:function(){var i=this.width,t=this.height,e=this.resolution,s=document.createElement("canvas");s.width=i*e,s.height=t*e;var n=s.getContext("2d");if(n){n.imageSmoothingEnabled=!1,n.globalCompositeOperation="source-over",n.strokeStyle="rgba(0,0,0,1)",n.fillStyle="rgba(0,0,0,1)",n.beginPath();for(var a=0;a<i;a++)n.moveTo(a*e,0),n.lineTo(a*e,t*e);n.stroke(),n.beginPath();for(var r=0;r<i;r++)n.moveTo(0,r*e),n.lineTo(i*e,r*e);n.stroke(),n.beginPath(),n.moveTo(i*e,0),n.lineTo(i*e,t*e),n.stroke(),n.beginPath(),n.moveTo(0,t*e),n.lineTo(i*e,t*e),n.stroke()}return s}}]),e}(v),j=function(i){Object(l.a)(e,i);var t=Object(c.a)(e);function e(i){var s;return Object(h.a)(this,e),(s=t.call(this,i)).canvas=void 0,s.grid=void 0,s.canMove=!0,s.justUndone=!1,s.interval=void 0,s.state={},s}return Object(d.a)(e,[{key:"componentDidMount",value:function(){this.canvas&&(this.grid=new p(this.canvas,10,10,70),window.addEventListener("resize",this.grid.setOffset.bind(this.grid)),window.addEventListener("keydown",this.keyDetectDown.bind(this),!1),window.addEventListener("keyup",this.keyDetectUp.bind(this),!1))}},{key:"movePlayers",value:function(i,t){var e=this;if(this.canMove&&0!==this.grid.playerPositions.length){this.grid.undoMoves.length=this.grid.undoStep,this.grid.undoMoves.length>50&&(this.grid.undoMoves.shift(),this.grid.undoStep--);var s,n=0,a=Object(o.a)(this.grid.playerPositions);try{for(a.s();!(s=a.n()).done;){var r=s.value;if(r.skip)r.skip=!1;else{var h=this.grid.grid[r.y][r.x].nodes.find((function(i){return i.isPlayer}));null!=h&&(this.grid.moveNode(h,i,t)||n++,r.skip=!1)}}}catch(f){a.e(f)}finally{a.f()}this.grid.doMovement(),this.grid.rules.updateRules();var d,l=0,c=Object(o.a)(this.grid.rules.rules);try{for(c.s();!(d=c.n()).done;){"you"!==d.value.split(" ")[2]&&l++}}catch(f){c.e(f)}finally{c.f()}if((n!==this.grid.playerPositions.length||l===this.grid.rules.rules.length||this.grid.didMoveThisStep)&&(this.grid.undoStep++,this.grid.didMoveThisStep=!1),0!==this.grid.doAfterMove.length){var u,v=Object(o.a)(this.grid.doAfterMove);try{for(v.s();!(u=v.n()).done;){var g=u.value;g.node.objectName=g.newObjectName}}catch(f){v.e(f)}finally{v.f()}this.grid.rules.resetAllNodeRules()}this.grid.rules.updateRules(),this.canMove=!1,setTimeout((function(){e.canMove=!0}),100)}}},{key:"undoMoves",value:function(){if(!(this.grid.undoStep-1<0))if(this.canMove=!1,this.grid.undoMoves.length<this.grid.undoStep)console.error("Could not do undo with: "+this.grid.undoMoves+" and "+this.grid.undoStep);else{for(var i=this.grid.undoMoves[this.grid.undoStep-1].slice(),t=i.length-1;t>=0;t--){var e=i[t];this.grid.moveNode(e.node,e.xP,e.yP,!1,!0,!0);var s,n=Object(o.a)(this.grid.undoActions);try{for(n.s();!(s=n.n()).done;){var a=s.value;a.changeOn===this.grid.undoStep&&(a.node.objectName=a.changeTo,this.grid.doAfterMove=[])}}catch(r){n.e(r)}finally{n.f()}}this.grid.rules.updateRules(),this.grid.undoStep--,this.justUndone=!0,this.canMove=!0}}},{key:"keyDetectDown",value:function(i){var t=this;i.repeat||void 0===this.interval&&("w"===i.key?(this.movePlayers(0,-1),this.interval=setInterval((function(){return t.movePlayers(0,-1)}),150)):"a"===i.key?(this.movePlayers(-1,0),this.interval=setInterval((function(){return t.movePlayers(-1,0)}),150)):"s"===i.key?(this.movePlayers(0,1),this.interval=setInterval((function(){return t.movePlayers(0,1)}),150)):"d"===i.key?(this.movePlayers(1,0),this.interval=setInterval((function(){return t.movePlayers(1,0)}),150)):"z"===i.key&&(this.undoMoves(),this.interval=setInterval((function(){return t.undoMoves()}),200)))}},{key:"keyDetectUp",value:function(i){i.repeat||(clearInterval(this.interval),this.interval=void 0)}},{key:"render",value:function(){var i=this;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("a",{href:"https://github.com/tddebart/babu-is-you",target:"_blank",rel:"noreferrer",children:Object(u.jsx)("img",{className:"github",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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",alt:"github"})}),Object(u.jsx)("button",{style:{position:"absolute",top:"10px"},onClick:function(){return console.log(i.grid)},children:"Grid"}),Object(u.jsx)("div",{id:"rules-text",style:{position:"absolute",top:"10px",left:"10px",textAlign:"left"}}),Object(u.jsx)(g,{ref:function(t){return i.canvas=t}})]})}}]),e}(s.Component);var I=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)("header",{className:"App-header",children:Object(u.jsx)(j,{})})})},T=function(i){i&&i instanceof Function&&e.e(3).then(e.bind(null,19)).then((function(t){var e=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,r=t.getTTFB;e(i),s(i),n(i),a(i),r(i)}))};r.a.render(Object(u.jsx)(n.a.StrictMode,{children:Object(u.jsx)(I,{})}),document.getElementById("root")),T()}},[[18,1,2]]]);
//# sourceMappingURL=main.7abdd1b3.chunk.js.map