(this["webpackJsonpbabu-is-you"]=this["webpackJsonpbabu-is-you"]||[]).push([[0],{14:function(t,e,i){},15:function(t,e,i){},16:function(t,e,i){},18:function(t,e,i){"use strict";i.r(e);var s=i(4),n=i.n(s),a=i(9),r=i.n(a),o=(i(14),i(15),i(1)),h=i(2),d=i(3),u=i(6),c=i(5),l=(i(16),i(0)),v=function(){function t(e){var i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];Object(h.a)(this,t),this.canvas=void 0,this.ctx=void 0,this.currentFrame=1,this.isAutoDrawn=void 0,this.canvas=e,this.isAutoDrawn=i,this.canvas.drawings.push(this),this.ctx=e.ctx}return Object(d.a)(t,[{key:"draw",value:function(){}},{key:"remove",value:function(){this.canvas.drawings.slice(this.canvas.drawings.indexOf(this),1)}}]),t}(),f=function(t){Object(u.a)(i,t);var e=Object(c.a)(i);function i(t){var s;return Object(h.a)(this,i),(s=e.call(this,t)).drawings=[],s.canvas=void 0,s.ctx=void 0,s.lastFrameTime=void 0,s.FRAMES_PER_SECOND=60,s.FRAME_MIN_TIME=void 0,s.frameTime=0,s.state={},s.FRAME_MIN_TIME=1e3/60*(60/s.FRAMES_PER_SECOND)-1e3/60*.5,s}return Object(d.a)(i,[{key:"componentDidMount",value:function(){this.canvas=document.getElementById("canvas"),this.rescaleCanvas(),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",this.rescaleCanvas),window.requestAnimationFrame(this.draw.bind(this))}},{key:"draw",value:function(t){if(t-this.lastFrameTime<this.FRAME_MIN_TIME)window.requestAnimationFrame(this.draw.bind(this));else{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.lastFrameTime=t,this.frameTime+=1/this.FRAMES_PER_SECOND;var e=!1;this.frameTime%1>.25&&(this.frameTime=0,e=!0);var i,s=Object(o.a)(this.drawings);try{for(s.s();!(i=s.n()).done;){var n=i.value;n.isAutoDrawn&&n.draw(),e&&(3!==n.currentFrame?n.currentFrame++:n.currentFrame=1)}}catch(a){s.e(a)}finally{s.f()}window.requestAnimationFrame(this.draw.bind(this))}}},{key:"rescaleCanvas",value:function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}},{key:"render",value:function(){return Object(l.jsx)("canvas",{id:"canvas"})}}]),i}(s.Component),g=i(7),y=function(){function t(e,i){Object(h.a)(this,t),this.x=void 0,this.y=void 0,this._nodes=[],this.x=e,this.y=i}return Object(d.a)(t,[{key:"nodes",get:function(){return this._nodes.sort((function(t,e){return-1!==w.indexOf(t.objectName)&&-1!==w.indexOf(e.objectName)?0:-1!==w.indexOf(t.objectName)?1:-1!==w.indexOf(e.objectName)?-1:0}))},set:function(t){this._nodes=t}}]),t}(),x=function(){function t(e,i){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;Object(h.a)(this,t),this.x=void 0,this.y=void 0,this.text=void 0,this.isPlayer=!1,this._isPushable=!1,this.objectName=void 0,this.rules=[],this._lastDirection=1,this.xP=0,this.yP=0,this.x=e,this.y=i,this.text=s,this.objectName=n,1===a&&-1!==b.indexOf(n)?this._lastDirection=2:this._lastDirection=a}return Object(d.a)(t,[{key:"isText",get:function(){return""!==this.text}},{key:"isPushable",get:function(){return!!this.isText||this._isPushable},set:function(t){this._isPushable=t}},{key:"isText_Object",get:function(){return-1!==p.indexOf(this.text.toLowerCase())}},{key:"isText_Verb",get:function(){return-1!==k.indexOf(this.text.toLowerCase())}},{key:"isText_Quality",get:function(){return-1!==j.indexOf(this.text.toLowerCase())}},{key:"is",value:function(t){return-1!==this.rules.indexOf(t)}},{key:"lastDirection",value:function(){return 0===this.xP&&-1===this.yP?(this._lastDirection=0,0):1===this.xP&&0===this.yP?(this._lastDirection=1,1):0===this.xP&&1===this.yP?(this._lastDirection=2,2):-1===this.xP&&0===this.yP?(this._lastDirection=3,3):this._lastDirection}},{key:"directionToXAndY",value:function(t){return 0===t?{xP:0,yP:-1}:1===t?{xP:1,yP:0}:2===t?{xP:0,yP:1}:3===t?{xP:-1,yP:0}:{xP:0,yP:0}}}]),t}(),m={keke:{x:2,y:2},text_keke:{x:2,y:2},me:{x:3,y:1},text_me:{x:3,y:1},text_babu:{x:4,y:1},text_you:{x:4,y:1},skull:{x:2,y:1},text_push:{x:6,y:1},text_stop:{x:5,y:1},text_is:{x:0,y:3},babu:{x:0,y:3},belt:{x:1,y:1},text_belt:{x:1,y:3},text_shift:{x:1,y:3},text_move:{x:5,y:3},text_defeat:{x:2,y:1},wall:{x:1,y:1},text_wall:{x:0,y:1}},b=["skull","belt"],w=["babu","keke","me"],p=["babu","keke","me","skull","belt","wall"],k=["is","and"],j=["you","push","stop","defeat","move","shift"],O=function(){function t(e){Object(h.a)(this,t),this.grid=void 0,this.rules=[],this.grid=e}return Object(d.a)(t,[{key:"updateRules",value:function(){this.rules=[];var t=this.grid.grid,e=document.getElementById("rules-text");null!=e&&(e.innerText="");for(var i=0;i<this.grid.height;i++)for(var s=0;s<this.grid.width;s++)for(var n=0;n<t[i][s].nodes.length;n++){var a=t[i][s].nodes[n];if(a.isText_Object){if(s+1<this.grid.width&&s+2<this.grid.width){var r,h=Object(o.a)(t[i][s+1].nodes);try{for(h.s();!(r=h.n()).done;){var d=r.value;if(d.isText_Verb){var u,c=Object(o.a)(t[i][s+2].nodes);try{for(c.s();!(u=c.n()).done;){var l=u.value;(l.isText_Quality||l.isText_Object)&&this.addRule(a.text+" "+d.text+" "+l.text)}}catch(E){c.e(E)}finally{c.f()}}}}catch(E){h.e(E)}finally{h.f()}}if(i+1<this.grid.height&&i+2<this.grid.height){var v,f=Object(o.a)(t[i+1][s].nodes);try{for(f.s();!(v=f.n()).done;){var g=v.value;if(g.isText_Verb){var y,x=Object(o.a)(t[i+2][s].nodes);try{for(x.s();!(y=x.n()).done;){var m=y.value;(m.isText_Quality||m.isText_Object)&&this.addRule(a.text+" "+g.text+" "+m.text)}}catch(E){x.e(E)}finally{x.f()}}}}catch(E){f.e(E)}finally{f.f()}}}}this.rules=Array.from(new Set(this.rules)),this.resetAllNodeRules();var b,w=Object(o.a)(this.rules);try{for(w.s();!(b=w.n()).done;){for(var k=b.value,j=k.split(" "),O=j[0],P=j[2],D=[],_=0;_<this.grid.height;_++)for(var M=0;M<this.grid.width;M++)for(var N=0;N<this.grid.grid[_][M].nodes.length;N++){var T=this.grid.grid[_][M].nodes[N];T.objectName===O&&D.push(T)}for(var I=0,A=D;I<A.length;I++){var F=A[I];switch(-1!==p.indexOf(P)&&(this.grid.undoActions.push({node:F,changeTo:F.objectName,changeOn:this.grid.undoStep+1}),this.grid.doAfterMove.push({node:F,newObjectName:P})),P){case"you":F.isPlayer=!0,this.grid.playerPositions.push({x:F.x,y:F.y,skip:!1});break;case"push":F.isPushable=!0;break;default:F.rules.push(P)}}null!=e&&(e.innerText+=k+"\n")}}catch(E){w.e(E)}finally{w.f()}}},{key:"resetAllNodeRules",value:function(){this.grid.playerPositions=[];for(var t=this.grid.grid,e=0;e<this.grid.height;e++)for(var i=0;i<this.grid.width;i++)for(var s=0;s<t[e][i].nodes.length;s++){var n=t[e][i].nodes[s];n.isPlayer=!1,n.isPushable=!1,n.rules=[]}}},{key:"addRule",value:function(t){this.rules.push(t)}}]),t}(),P=function(t){Object(u.a)(i,t);var e=Object(c.a)(i);function i(t,s,n){var a;return Object(h.a)(this,i),(a=e.call(this,t,!1)).currentDirection=0,a.lastDirection=1,a.extraWalking=3,a.imageName=void 0,a.drawings=[],a.x=0,a.xLastFrame=0,a.y=0,a.yLastFrame=0,a.offset=void 0,a.resolution=void 0,a.hasWalking=!1,a.hasDirections=!1,a.paletteData=void 0,a.imageName=s,a.resolution=n,a.initializeDrawings(),a}return Object(d.a)(i,[{key:"initializeDrawings",value:function(){var t=this;this.hasDirections=-1!==b.indexOf(this.imageName),this.hasWalking=-1!==w.indexOf(this.imageName),this.hasDirections&&(this.currentDirection=24),this.hasWalking&&(this.currentDirection=27);for(var e=0;e<this.currentDirection+1;e++){this.drawings[e]=[];for(var i=1;i<4;i++)this.drawings[e][i]=void 0}var s=new Image(7,5);s.src="/babu-is-you/img/Palettes/default.png",s.onload=function(){for(var e=function(e){for(var i=function(i){var n=new Image(24,24);-1!==w.indexOf(t.imageName)?n.src="/babu-is-you/img/"+t.imageName+"/"+t.imageName+"_"+e+"_"+i+".png":t.imageName.includes("text")?n.src="/babu-is-you/img/texts/"+t.imageName+"_"+e+"_"+i+".png":n.src="/babu-is-you/img/objects/"+t.imageName+"_"+e+"_"+i+".png";var a=document.createElement("canvas").getContext("2d");null!==a&&(a.drawImage(s,0,0,s.width,s.height),t.paletteData=a.getImageData(0,0,s.width,s.height)),n.onload=function(){var s=document.createElement("canvas").getContext("2d");if(null!==s){s.imageSmoothingEnabled=!1,s.drawImage(n,0,0,t.resolution-2,t.resolution-2);for(var a=s.getImageData(0,0,t.resolution-2,t.resolution-2),r=a.data,o=m[t.imageName].x,h=7*m[t.imageName].y+o<<2,d=0;d<r.length;d+=4)255===r[d]&&(r[d]=t.paletteData.data[h],r[d+1]=t.paletteData.data[h+1],r[d+2]=t.paletteData.data[h+2]);var u=document.createElement("canvas");u.width=a.width,u.height=a.height;var c=u.getContext("2d");null!==c&&c.putImageData(a,0,0),t.drawings[e][i]=u}}},n=1;n<4;n++)i(n)},i=0;i<t.currentDirection+1;i++)e(i)}}},{key:"draw",value:function(){void 0!==this.drawings[this.currentDirection][this.currentFrame]&&("keke"===this.imageName&&console.log("keke"),this.hasDirections&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0),this.hasWalking&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0,this.x===this.xLastFrame&&this.y===this.yLastFrame||(3!==this.extraWalking?this.extraWalking+=1:this.extraWalking=0),this.currentDirection+=this.extraWalking),void 0!==this.drawings[this.currentDirection][this.currentFrame]&&(this.ctx.drawImage(this.drawings[this.currentDirection][this.currentFrame],this.x*this.resolution+this.offset.x+1,this.y*this.resolution+this.offset.y+1,this.resolution-2,this.resolution-2),this.xLastFrame=this.x,this.yLastFrame=this.y))}}]),i}(v),D=function(t){Object(u.a)(i,t);var e=Object(c.a)(i);function i(t,s,n,a){var r;return Object(h.a)(this,i),(r=e.call(this,t)).width=void 0,r.height=void 0,r.resolution=void 0,r.grid=[],r.offset=void 0,r.playerPositions=[],r.drawings={},r.gridImage=void 0,r.active=!0,r.undoMoves=[],r.undoActions=[],r.doAfterMove=[],r.undoStep=0,r.rules=new O(Object(g.a)(r)),r.didMoveThisStep=!1,r.width=s,r.height=n,r.resolution=a,r.loadAllImages(),r.setOffset(),r.initializeGrid(s,n),r.initializeDrawings(),r.rules.updateRules(),r.canvas.canvas.addEventListener("click",r.calculateText.bind(Object(g.a)(r))),r}return Object(d.a)(i,[{key:"getDrawing",value:function(t){return t in this.drawings||(this.drawings[t]=new P(this.canvas,t,this.resolution)),this.drawings[t]}},{key:"loadAllImages",value:function(){for(var t=0,e=Object.keys(m);t<e.length;t++){var i=e[t];this.drawings[i]=new P(this.canvas,i,this.resolution)}}},{key:"setOffset",value:function(){this.offset={x:window.innerWidth/2-this.width/2*this.resolution,y:window.innerHeight/2-this.height/2*this.resolution}}},{key:"initializeDrawings",value:function(){this.gridImage=this.drawGrid()}},{key:"initializeGrid",value:function(t,e){for(var i=0;i<e;i++){for(var s=[],n=0;n<t;n++)s.push(new y(n,i));this.grid.push(s)}for(var a=0;a<e;a++)for(var r=0;r<t;r++)5===r&&5===a&&this.grid[a][r].nodes.push(new x(r,a,"","babu")),7===r&&5===a&&this.grid[a][r].nodes.push(new x(r,a,"","wall")),3===r&&3===a&&this.grid[a][r].nodes.push(new x(r,a,"babu")),4===r&&3===a&&this.grid[a][r].nodes.push(new x(r,a,"is")),5===r&&3===a&&this.grid[a][r].nodes.push(new x(r,a,"you"))}},{key:"calculateText",value:function(t){var e=t.clientX-this.offset.x,i=t.clientY-this.offset.y,s={x:Math.floor(e/this.resolution),y:Math.floor(i/this.resolution)};if(!(s.x<0||s.x>=this.width||s.y<0||s.y>=this.height)){var n=prompt("Give a text value.");null!==n&&this.grid[s.y][s.x].nodes.push(new x(s.x,s.y,n)),this.rules.updateRules()}}},{key:"doMovement",value:function(){for(var t=[],e=0;e<this.height;e++)for(var i=0;i<this.width;i++){var s,n=Object(o.a)(this.grid[e][i].nodes);try{for(n.s();!(s=n.n()).done;){var a=s.value;if(a.is("move")){var r=a.directionToXAndY(a.lastDirection());this.canMoveIntoNode(a,r.xP,r.yP)||(r={xP:-r.xP,yP:-r.yP}),t.push({node:a,xP:r.xP,yP:r.yP})}if(a.is("defeat")&&this.grid[e][i].nodes.some((function(t){return t.isPlayer}))){var h,d=Object(o.a)(this.grid[e][i].nodes.filter((function(t){return t.isPlayer})));try{for(d.s();!(h=d.n()).done;){var u=h.value;this.undoActions.push({node:u,changeTo:u.objectName,changeOn:this.undoStep+1}),u.objectName=""}}catch(f){d.e(f)}finally{d.f()}}}}catch(f){n.e(f)}finally{n.f()}}for(var c=0,l=t;c<l.length;c++){var v=l[c];this.moveNode(v.node,v.xP,v.yP)}}},{key:"canMoveIntoNode",value:function(t,e,i){var s=this.grid,n=t.x,a=t.y;if(n+e<0||n+e>this.width-1||a+i<0||a+i>this.height-1)return!1;for(var r=0;r<s[a+i][n+e].nodes.length;r++){var o=s[a+i][n+e].nodes[r];if(o.isPushable){if(o.x+e<0||o.x+e>this.width-1||o.y+i<0||o.y+i>this.height-1)return!1;if(0===s[o.y+i][o.x+e].nodes.length)return this.moveNode(o,e,i),!0;for(var h=0;h<s[o.y+i][o.x+e].nodes.length;h++)if(this.canMoveIntoNode(o,e,i))return this.moveNode(o,e,i),!0;return!1}if(o.is("stop"))return!1}return!0}},{key:"moveNode",value:function(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],n=arguments.length>4&&void 0!==arguments[4]&&arguments[4],a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(!s&&!this.canMoveIntoNode(t,e,i))return!1;var r=this.grid[t.y][t.x],o=this.grid[t.y+i][t.x+e];return t.x+=e,t.y+=i,a?(t.xP=-e,t.yP=-i):(t.xP=e,t.yP=i),o.nodes.push(t),r.nodes.splice(r.nodes.indexOf(t),1),n||(this.didMoveThisStep=!0,this.undoMoves.length-1!==this.undoStep&&this.undoMoves.push([]),this.undoMoves[this.undoStep].push({node:o.nodes[o.nodes.findIndex((function(e){return e===t}))],xP:-e,yP:-i,doAction:!1})),!0}},{key:"draw",value:function(){if(this.active){this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height),this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(this.gridImage,this.offset.x,this.offset.y);for(var t=0;t<this.height;t++)for(var e=0;e<this.width;e++)for(var i=0;i<this.grid[t][e].nodes.length;i++){var s=this.grid[t][e].nodes[i];if(""!==s.objectName){var n=this.getDrawing(s.objectName);n.x=e,n.y=t,n.lastDirection=s.lastDirection(),n.offset=this.offset,n.draw()}if(s.isText){var a=this.getDrawing("text_"+s.text);a.x=e,a.y=t,a.offset=this.offset,a.draw()}}}}},{key:"drawGrid",value:function(){var t=this.width,e=this.height,i=this.resolution,s=document.createElement("canvas");s.width=t*i,s.height=e*i;var n=s.getContext("2d");if(n){n.beginPath();for(var a=0;a<t;a++)n.moveTo(a*i,0),n.lineTo(a*i,e*i);n.stroke(),n.beginPath();for(var r=0;r<t;r++)n.moveTo(0,r*i),n.lineTo(t*i,r*i);n.stroke(),n.beginPath(),n.moveTo(t*i,0),n.lineTo(t*i,e*i),n.stroke(),n.beginPath(),n.moveTo(0,e*i),n.lineTo(t*i,e*i),n.stroke()}return s}}]),i}(v),_=function(t){Object(u.a)(i,t);var e=Object(c.a)(i);function i(t){var s;return Object(h.a)(this,i),(s=e.call(this,t)).canvas=void 0,s.grid=void 0,s.canMove=!0,s.justUndone=!1,s.interval=void 0,s.state={},s}return Object(d.a)(i,[{key:"componentDidMount",value:function(){this.canvas&&(this.grid=new D(this.canvas,10,10,70),window.addEventListener("resize",this.grid.setOffset.bind(this.grid)),window.addEventListener("keydown",this.keyDetectDown.bind(this),!1),window.addEventListener("keyup",this.keyDetectUp.bind(this),!1))}},{key:"movePlayers",value:function(t,e){var i=this;if(this.canMove&&0!==this.grid.playerPositions.length){this.grid.undoMoves.length=this.grid.undoStep,this.grid.undoMoves.length>50&&(this.grid.undoMoves.shift(),this.grid.undoStep--);var s,n=0,a=Object(o.a)(this.grid.playerPositions);try{for(a.s();!(s=a.n()).done;){var r=s.value;if(r.skip)r.skip=!1;else{var h=this.grid.grid[r.y][r.x].nodes.find((function(t){return t.isPlayer}));null!=h&&(this.grid.moveNode(h,t,e)||n++,r.skip=!1)}}}catch(g){a.e(g)}finally{a.f()}this.grid.doMovement(),this.grid.rules.updateRules();var d,u=0,c=Object(o.a)(this.grid.rules.rules);try{for(c.s();!(d=c.n()).done;){"you"!==d.value.split(" ")[2]&&u++}}catch(g){c.e(g)}finally{c.f()}if((n!==this.grid.playerPositions.length||u===this.grid.rules.rules.length||this.grid.didMoveThisStep)&&(this.grid.undoStep++,this.grid.didMoveThisStep=!1),0!==this.grid.doAfterMove.length){var l,v=Object(o.a)(this.grid.doAfterMove);try{for(v.s();!(l=v.n()).done;){var f=l.value;f.node.objectName=f.newObjectName}}catch(g){v.e(g)}finally{v.f()}this.grid.rules.resetAllNodeRules()}this.grid.rules.updateRules(),this.canMove=!1,setTimeout((function(){i.canMove=!0}),100)}}},{key:"undoMoves",value:function(){if(!(this.grid.undoStep-1<0))if(this.canMove=!1,this.grid.undoMoves.length<this.grid.undoStep)console.error("Could not do undo with: "+this.grid.undoMoves+" and "+this.grid.undoStep);else{for(var t=this.grid.undoMoves[this.grid.undoStep-1].slice(),e=t.length-1;e>=0;e--){var i=t[e];this.grid.moveNode(i.node,i.xP,i.yP,!1,!0,!0);var s,n=Object(o.a)(this.grid.undoActions);try{for(n.s();!(s=n.n()).done;){var a=s.value;a.changeOn===this.grid.undoStep&&(a.node.objectName=a.changeTo,this.grid.doAfterMove=[])}}catch(r){n.e(r)}finally{n.f()}}this.grid.rules.updateRules(),this.grid.undoStep--,this.justUndone=!0,this.canMove=!0}}},{key:"keyDetectDown",value:function(t){var e=this;t.repeat||void 0===this.interval&&("w"===t.key?(this.movePlayers(0,-1),this.interval=setInterval((function(){return e.movePlayers(0,-1)}),150)):"a"===t.key?(this.movePlayers(-1,0),this.interval=setInterval((function(){return e.movePlayers(-1,0)}),150)):"s"===t.key?(this.movePlayers(0,1),this.interval=setInterval((function(){return e.movePlayers(0,1)}),150)):"d"===t.key?(this.movePlayers(1,0),this.interval=setInterval((function(){return e.movePlayers(1,0)}),150)):"z"===t.key&&(this.undoMoves(),this.interval=setInterval((function(){return e.undoMoves()}),200)))}},{key:"keyDetectUp",value:function(t){t.repeat||(clearInterval(this.interval),this.interval=void 0)}},{key:"render",value:function(){var t=this;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("button",{style:{position:"absolute",top:"10px"},onClick:function(){return console.log(t.grid)},children:"Grid"}),Object(l.jsx)("div",{id:"rules-text",style:{position:"absolute",top:"10px",left:"10px",textAlign:"left"}}),Object(l.jsx)(f,{ref:function(e){return t.canvas=e}})]})}}]),i}(s.Component);var M=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)("header",{className:"App-header",children:Object(l.jsx)(_,{})})})},N=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,19)).then((function(e){var i=e.getCLS,s=e.getFID,n=e.getFCP,a=e.getLCP,r=e.getTTFB;i(t),s(t),n(t),a(t),r(t)}))};r.a.render(Object(l.jsx)(n.a.StrictMode,{children:Object(l.jsx)(M,{})}),document.getElementById("root")),N()}},[[18,1,2]]]);
//# sourceMappingURL=main.4e87e926.chunk.js.map