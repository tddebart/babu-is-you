(this["webpackJsonpbabu-is-you"]=this["webpackJsonpbabu-is-you"]||[]).push([[0],{15:function(t,e,i){},16:function(t,e,i){},17:function(t,e,i){},19:function(t,e,i){"use strict";i.r(e);var n=i(4),s=i.n(n),r=i(9),a=i.n(r),o=(i(15),i(16),i(1)),h=i(2),d=i(3),c=i(6),u=i(5),l=(i(17),i(0)),g=function(){function t(e){var i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];Object(h.a)(this,t),this.canvas=void 0,this.ctx=void 0,this.currentFrame=1,this.isAutoDrawn=void 0,this.canvas=e,this.isAutoDrawn=i,this.canvas.drawings.push(this),this.ctx=e.ctx}return Object(d.a)(t,[{key:"draw",value:function(){}},{key:"remove",value:function(){this.canvas.drawings.slice(this.canvas.drawings.indexOf(this),1)}}]),t}(),v=function(t){Object(c.a)(i,t);var e=Object(u.a)(i);function i(t){var n;return Object(h.a)(this,i),(n=e.call(this,t)).drawings=[],n.canvas=void 0,n.ctx=void 0,n.lastFrameTime=void 0,n.FRAMES_PER_SECOND=60,n.FRAME_MIN_TIME=void 0,n.frameTime=0,n.state={},n.FRAME_MIN_TIME=1e3/60*(60/n.FRAMES_PER_SECOND)-1e3/60*.5,n}return Object(d.a)(i,[{key:"componentDidMount",value:function(){this.canvas=document.getElementById("canvas"),this.rescaleCanvas(),this.ctx=this.canvas.getContext("2d"),window.addEventListener("resize",this.rescaleCanvas),window.requestAnimationFrame(this.draw.bind(this))}},{key:"draw",value:function(t){if(t-this.lastFrameTime<this.FRAME_MIN_TIME)window.requestAnimationFrame(this.draw.bind(this));else{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.lastFrameTime=t,this.frameTime+=1/this.FRAMES_PER_SECOND;var e=!1;this.frameTime%1>.225&&(this.frameTime=0,e=!0);var i,n=Object(o.a)(this.drawings);try{for(n.s();!(i=n.n()).done;){var s=i.value;s.isAutoDrawn&&s.draw(),e&&(3!==s.currentFrame?s.currentFrame++:s.currentFrame=1)}}catch(r){n.e(r)}finally{n.f()}window.requestAnimationFrame(this.draw.bind(this))}}},{key:"rescaleCanvas",value:function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}},{key:"render",value:function(){return Object(l.jsx)("canvas",{id:"canvas"})}}]),i}(n.Component),f=i(7),y=function(){function t(e,i){Object(h.a)(this,t),this.x=void 0,this.y=void 0,this._nodes=[],this.x=e,this.y=i}return Object(d.a)(t,[{key:"nodes",get:function(){return this._nodes.sort((function(t,e){return t.zIndex>e.zIndex?1:t.zIndex<e.zIndex?-1:0}))},set:function(t){this._nodes=t}}]),t}(),b=function(){function t(e,i,n){var s,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;Object(h.a)(this,t),this.x=void 0,this.y=void 0,this.text=void 0,this.isPlayer=!1,this._isPushable=!1,this._objectName=void 0,this.rules=[],this._lastDirection=1,this.aniImg=void 0,this.isMoving=!1,this.canvas=void 0,this.grid=void 0,this.xP=0,this.yP=0,this.x=e,this.y=i,this.text=r,this._objectName=a,this.canvas=N.canvas,this.grid=n,-1!==Object.keys(t.Objects).indexOf(a)&&(1===o&&""===a||!t.Objects[a].hasDirs?this._lastDirection=o:this._lastDirection=2),s=""===a?"text_"+r:a,this.aniImg=new T(e,i,n,s,this)}return Object(d.a)(t,[{key:"objectName",get:function(){return this._objectName},set:function(t){this._objectName=t,this.aniImg=""!==t?new T(this.x,this.y,this.grid,t,this):null}},{key:"isText",get:function(){return""!==this.text}},{key:"zIndex",get:function(){return""!==this._objectName?t.Objects[this._objectName].zIndex:-1!==Object.keys(t.Objects).indexOf("text_"+this.text)?t.Objects["text_"+this.text].zIndex:0}},{key:"isPushable",get:function(){return!!this.isText||this._isPushable},set:function(t){this._isPushable=t}},{key:"isText_Object",get:function(){return!!this.isText&&0===t.Objects["text_"+this.text].type}},{key:"isText_Verb",get:function(){return!!this.isText&&1===t.Objects["text_"+this.text].type}},{key:"isText_Quality",get:function(){return!!this.isText&&2===t.Objects["text_"+this.text].type}},{key:"is",value:function(t){return-1!==this.rules.indexOf(t)}},{key:"lastDirection",value:function(){return 0===this.xP&&-1===this.yP?(this._lastDirection=0,0):1===this.xP&&0===this.yP?(this._lastDirection=1,1):0===this.xP&&1===this.yP?(this._lastDirection=2,2):-1===this.xP&&0===this.yP?(this._lastDirection=3,3):this._lastDirection}},{key:"directionToXAndY",value:function(t){return 0===t?{xP:0,yP:-1}:1===t?{xP:1,yP:0}:2===t?{xP:0,yP:1}:3===t?{xP:-1,yP:0}:{xP:0,yP:0}}}]),t}();b.Objects={};var m=function(){function t(e){Object(h.a)(this,t),this.grid=void 0,this.rules=[],this.grid=e}return Object(d.a)(t,[{key:"updateRules",value:function(){this.rules=[];var t=this.grid.grid,e=document.getElementById("rules-text");null!=e&&(e.innerText="");for(var i=0;i<this.grid.height;i++)for(var n=0;n<this.grid.width;n++)for(var s=0;s<t[i][n].nodes.length;s++){var r=t[i][n].nodes[s];if(r.isText_Object){if(n+1<this.grid.width&&n+2<this.grid.width){var a,h=Object(o.a)(t[i][n+1].nodes);try{for(h.s();!(a=h.n()).done;){var d=a.value;if(d.isText_Verb){var c,u=Object(o.a)(t[i][n+2].nodes);try{for(u.s();!(c=u.n()).done;){var l=c.value;(l.isText_Quality||l.isText_Object)&&this.addRule(r.text+" "+d.text+" "+l.text)}}catch(R){u.e(R)}finally{u.f()}}}}catch(R){h.e(R)}finally{h.f()}}if(i+1<this.grid.height&&i+2<this.grid.height){var g,v=Object(o.a)(t[i+1][n].nodes);try{for(v.s();!(g=v.n()).done;){var f=g.value;if(f.isText_Verb){var y,m=Object(o.a)(t[i+2][n].nodes);try{for(m.s();!(y=m.n()).done;){var x=y.value;(x.isText_Quality||x.isText_Object)&&this.addRule(r.text+" "+f.text+" "+x.text)}}catch(R){m.e(R)}finally{m.f()}}}}catch(R){v.e(R)}finally{v.f()}}}}this.rules=Array.from(new Set(this.rules)),this.resetAllNodeRules();var w,p=Object(o.a)(this.rules);try{for(p.s();!(w=p.n()).done;){for(var j=w.value,O=j.split(" "),A=O[0],D=O[1],k=O[2],I=[],M=0;M<this.grid.height;M++)for(var P=0;P<this.grid.width;P++)for(var N=0;N<this.grid.grid[M][P].nodes.length;N++){var T=this.grid.grid[M][P].nodes[N];T.objectName===A&&"is"===D&&I.push(T)}for(var S=0,E=I;S<E.length;S++){var _=E[S];switch(-1!==Object.keys(b.Objects).indexOf(k)&&(this.grid.undoActions.push({node:_,changeTo:_.objectName,changeOn:this.grid.undoStep+1}),this.grid.doAfterMove.push({node:_,newObjectName:k})),k){case"you":_.isPlayer=!0,this.grid.playerPositions.push({x:_.x,y:_.y,skip:!1});break;case"push":_.isPushable=!0;break;default:_.rules.push(k)}}null!=e&&(e.innerText+=j+"\n")}}catch(R){p.e(R)}finally{p.f()}}},{key:"resetAllNodeRules",value:function(){this.grid.playerPositions=[];for(var t=this.grid.grid,e=0;e<this.grid.height;e++)for(var i=0;i<this.grid.width;i++)for(var n=0;n<t[e][i].nodes.length;n++){var s=t[e][i].nodes[n];s.isPlayer=!1,s.isPushable=!1,s.rules=[]}}},{key:"addRule",value:function(t){this.rules.push(t)}}]),t}(),x=function(t){Object(c.a)(i,t);var e=Object(u.a)(i);function i(t,n,s,r){var a,o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return Object(h.a)(this,i),(a=e.call(this,t)).width=void 0,a.height=void 0,a.resolution=void 0,a.grid=[],a.offset=void 0,a.playerPositions=[],a.gridImage=void 0,a.undoMoves=[],a.undoActions=[],a.doAfterMove=[],a.undoStep=0,a.rules=new m(Object(f.a)(a)),a.didMoveThisStep=!1,a.debug=void 0,a.width=n,a.height=s,a.resolution=r,a.debug=o,a.updateScreenScalings(),a.gridImage=a.drawGrid(),a.initializeGrid(n,s),a.rules.updateRules(),a.canvas.canvas.addEventListener("click",a.calculateText.bind(Object(f.a)(a))),a}return Object(d.a)(i,[{key:"updateGrid",value:function(t,e){this.debug=!1,this.grid=[],this.width=t,this.height=e,this.updateScreenScalings(),this.gridImage=this.drawGrid(),this.initializeGrid(t,e)}},{key:"updateScreenScalings",value:function(){var t,e,i,n=(window.innerHeight-100)/this.height,s=(window.innerWidth-100)/this.width;this.resolution=(t=Math.round(Math.min(s,n)),e=5,i=150,Math.min(Math.max(t,e),i)),this.offset={x:Math.floor(window.innerWidth/2-this.width/2*this.resolution),y:Math.floor(window.innerHeight/2-this.height/2*this.resolution)},this.gridImage=this.drawGrid()}},{key:"initializeGrid",value:function(t,e){for(var i=this,n=0;n<e;n++){for(var s=[],r=0;r<t;r++)s.push(new y(r,n));this.grid.push(s)}this.debug&&setTimeout((function(){for(var n=0;n<e;n++)for(var s=0;s<t;s++)5===s&&5===n&&i.grid[n][s].nodes.push(new b(s,n,i,"","babu")),7===s&&5===n&&i.grid[n][s].nodes.push(new b(s,n,i,"","keke")),3===s&&3===n&&i.grid[n][s].nodes.push(new b(s,n,i,"babu")),4===s&&3===n&&i.grid[n][s].nodes.push(new b(s,n,i,"is")),5===s&&3===n&&i.grid[n][s].nodes.push(new b(s,n,i,"you"))}),5e3)}},{key:"calculateText",value:function(t){var e=t.clientX-this.offset.x,i=t.clientY-this.offset.y,n={x:Math.floor(e/this.resolution),y:Math.floor(i/this.resolution)};if(!(n.x<0||n.x>=this.width||n.y<0||n.y>=this.height)){var s=prompt("Give a value.");null!==s&&this.grid[n.y][n.x].nodes.push(new b(n.x,n.y,this,s)),this.rules.updateRules()}}},{key:"doMovement",value:function(){for(var t=[],e=0;e<this.height;e++)for(var i=0;i<this.width;i++){var n,s=Object(o.a)(this.grid[e][i].nodes);try{for(s.s();!(n=s.n()).done;){var r=n.value;if(r.is("move")){var a=r.directionToXAndY(r.lastDirection());this.canMoveIntoNode(r,a.xP,a.yP)||(a={xP:-a.xP,yP:-a.yP}),t.push({node:r,xP:a.xP,yP:a.yP})}if(r.is("defeat")&&this.grid[e][i].nodes.some((function(t){return t.isPlayer}))){var h,d=Object(o.a)(this.grid[e][i].nodes.filter((function(t){return t.isPlayer})));try{for(d.s();!(h=d.n()).done;){var c=h.value;this.undoActions.push({node:c,changeTo:c.objectName,changeOn:this.undoStep+1}),c.objectName=""}}catch(v){d.e(v)}finally{d.f()}}r.is("win")&&this.grid[e][i].nodes.some((function(t){return t.isPlayer}))&&function(){var t=document.getElementById("loading");t.innerText="CONGRATULATIONS",t.style.display="",t.style.animation="winScreen 4s linear",t.style.animationFillMode="forwards",t.addEventListener("animationend",(function(){t.style.animation="",t.style.display="none"}))}()}}catch(v){s.e(v)}finally{s.f()}}for(var u=0,l=t;u<l.length;u++){var g=l[u];this.moveNode(g.node,g.xP,g.yP)}}},{key:"canMoveIntoNode",value:function(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=this.grid,r=t.x,a=t.y;if(r+e<0||r+e>this.width-1||a+i<0||a+i>this.height-1)return!1;for(var o=0;o<s[a+i][r+e].nodes.length;o++){var h=s[a+i][r+e].nodes[o];if(!n&&h.isPushable){if(h.x+e<0||h.x+e>this.width-1||h.y+i<0||h.y+i>this.height-1)return!1;if(0===s[h.y+i][h.x+e].nodes.length)return this.moveNode(h,e,i),!0;for(var d=0;d<s[h.y+i][h.x+e].nodes.length;d++)if(this.canMoveIntoNode(h,e,i))return this.moveNode(h,e,i),!0;return!1}if(h.is("stop"))return!1}return!0}},{key:"moveNode",value:function(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=arguments.length>5&&void 0!==arguments[5]&&arguments[5],a=arguments.length>6&&void 0!==arguments[6]&&arguments[6];if(!n&&!this.canMoveIntoNode(t,e,i,a))return!1;var o=this.grid[t.y][t.x],h=this.grid[t.y+i][t.x+e];return t.x+=e,t.y+=i,r?(t.xP=-e,t.yP=-i):(t.xP=e,t.yP=i),h.nodes.push(t),o.nodes.splice(o.nodes.indexOf(t),1),s||(this.didMoveThisStep=!0,this.undoMoves.length-1!==this.undoStep&&this.undoMoves.push([]),this.undoMoves[this.undoStep].push({node:h.nodes[h.nodes.findIndex((function(e){return e===t}))],xP:-e,yP:-i,doAction:!1})),!0}},{key:"draw",value:function(){this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height),this.ctx.imageSmoothingEnabled=!1,this.ctx.drawImage(this.gridImage,this.offset.x,this.offset.y);for(var t=0;t<25;t++)for(var e=0;e<this.height;e++)for(var i=0;i<this.width;i++)for(var n=0;n<this.grid[e][i].nodes.length;n++){var s=this.grid[e][i].nodes[n];if(""!==s.objectName){if(b.Objects[s.objectName].zIndex!==t)continue;var r=s.aniImg;null!==r&&(r.x=i,r.y=e,r.grid=this,r.lastDirection=s.lastDirection(),r.resolution=this.resolution,r.offset=this.offset,r.draw())}if(s.isText){if(b.Objects["text_"+s.text].zIndex!==t)continue;var a=s.aniImg;null!==a&&(a.x=i,a.y=e,a.grid=this,a.resolution=this.resolution,a.offset=this.offset,a.draw())}}}},{key:"drawGrid",value:function(){var t=this.width,e=this.height,i=this.resolution,n=document.createElement("canvas");n.width=t*i,n.height=e*i;var s=n.getContext("2d");if(s){s.imageSmoothingEnabled=!1,s.globalCompositeOperation="source-over",s.strokeStyle="rgba(0,0,0,1)",s.fillStyle="rgba(0,0,0,1)",s.lineWidth=Math.round(Math.max(this.resolution/40,1)),s.beginPath();for(var r=0;r<t;r++)s.moveTo(r*i,0),s.lineTo(r*i,e*i);s.stroke(),s.beginPath();for(var a=0;a<t;a++)s.moveTo(0,a*i),s.lineTo(t*i,a*i);s.stroke(),s.beginPath(),s.moveTo(t*i,0),s.lineTo(t*i,e*i),s.stroke(),s.beginPath(),s.moveTo(0,e*i),s.lineTo(t*i,e*i),s.stroke()}return n}}]),i}(g);var w=i(10),p=function t(){Object(h.a)(this,t),this.ID=-1,this.Name="",this.Active=void 0,this.x=0,this.y=0,this.Sprite="",this.direction=1,this.Tiling=-1,this.Color=void 0,this.zIndex=13,this.Type=0,this.Active=!0},j={},O={};function A(){fetch("/babu-is-you/values.lua").then((function(t){return t.text()})).then((function(t){var e,i=t.split("\n"),n=Object(o.a)(i);try{var s=function(){var t=e.value;0===t.indexOf("tileslist =")&&(!function(t,e){for(var i=0,n=t+1;n<e.length;n++){var s=e[n].trim();if("}"===s)break;var r=s.indexOf("=");if(!(s.length<2||r<0)){var a=new p;0===(s=s.substring(0,r).trim()).indexOf("object")&&parseInt(s.substring(6),10)>i&&(i=parseInt(s.substring(6),10)),a.Name=s;for(var o=n+1;o<e.length;o++){var h=e[o].trim();if("},"===h){n+=o-n;break}if(!((r=h.indexOf("="))<0)){var d=h.substring(r+1,h.length).trim();h=h.substring(0,r).trim().toLowerCase(),d.includes("baba")&&(d=d.replace("baba","babu")),D(a,h,d)}}j[a.ID]=a,O[a.Name]=a}}(function(){for(var t=0,e=Object.keys(O);t<e.length;t++){var i=e[t],n=O[i];-1===Object.keys(b.Objects).indexOf(n.Name)&&(b.Objects[i]={x:n.Color.x,y:n.Color.y,type:n.Type,zIndex:n.zIndex,hasWalkAni:2===n.Tiling,hasDirs:0===n.Tiling,isTileable:1===n.Tiling,spriteName:n.Sprite})}N.hasLoadedObjects=!0})()}(i.findIndex((function(e){return e===t})),i),N.loadAllImages())};for(n.s();!(e=n.n()).done;)s()}catch(r){n.e(r)}finally{n.f()}}))}function D(t,e,i){switch(e){case"name":t.Name=i.substring(1,i.length-2);break;case"sprite":t.Sprite=i.substring(1,i.length-2);break;case"layer":t.zIndex=parseInt(i);break;case"colour":case"active":t.Color=k(i);break;case"tiling":t.Tiling=parseInt(i);break;case"tile":t.ID=function(t){var e=0,i=t.length;0===t.indexOf("{")&&(e++,i--);var n=t.indexOf(",");if(n<0)return parseInt(t);var s=parseInt(t.substring(e,e+(n-e)));return parseInt(t.substring(n+1,n+(i-n-1)))<<8|s}(i);break;case"type":t.Type=parseInt(i)}}function k(t){return{x:parseInt(t.split("")[1]),y:parseInt(t.split("")[4])}}function I(t){if(null!==t&&"string"===typeof t)if("ACHTUNG!"===t.slice(0,8)){for(var e="",i=0;i<t.length;i++){var n=t.charCodeAt(i).toString(16);n.length<2&&(n="0"+n),e+=" "+n}var s=e.split(" ");s.shift();var r=28,a=P(s.slice(r,r+2));r+=2;for(var o=0;o<a;o++)M(s,r)}else console.error("Invalid map file")}function M(t,e){var i=P(t.slice(e,e+4));e+=4;var n=P(t.slice(e,e+4));e+=4,console.log("Width: "+i+" Height: "+n);var s=i*n;e+=32,console.log("Position should be 70 it is: "+e),e+=1,e+=4;var r=P(t.slice(e,e+4));e+=4;for(var a=t.slice(e,e+r),o=new Uint8Array(a.map((function(t){return parseInt(t,16)}))),h=w.a.inflate(o),d=[],c=0;c<h.length;c++){var u=h[c].toString(16);1===u.length&&(u="0"+u),d.push(u.toString())}for(var l=[],g=0,v=0;g<s;g++,v+=2){var f=P([d[v],d[v+1]]);if(f in j){if("edge"===j[f].Name)continue;var y=Object.assign(Object.create(Object.getPrototypeOf(j[f])),j[f]);y.x=g%i,y.y=Math.floor(g/i),l.push(y)}}var m=N.grid;m.updateGrid(i,n);for(var x=0,p=l;x<p.length;x++){var O=p[x];O.Name.includes("text")?m.grid[O.y-1][O.x-1].nodes.push(new b(O.x-1,O.y-1,m,O.Name.split("_")[1],"",O.direction)):m.grid[O.y-1][O.x-1].nodes.push(new b(O.x-1,O.y-1,m,"",O.Name,O.direction))}m.rules.updateRules()}function P(t){for(var e="",i=t.length-1;i>=0;i--)e+=t[i];return parseInt(e,16)}var N=function(t){Object(c.a)(i,t);var e=Object(u.a)(i);function i(t){var n;return Object(h.a)(this,i),(n=e.call(this,t)).canMove=!0,n.justUndone=!1,n.interval=void 0,n.debug=!0,n.state={percentage:0},n}return Object(d.a)(i,[{key:"componentDidMount",value:function(){i._grid=new x(i.canvas,10,10,i.resolution,this.debug),window.addEventListener("resize",i._grid.updateScreenScalings.bind(i._grid)),window.addEventListener("keydown",this.keyDetectDown.bind(this),!1),window.addEventListener("keyup",this.keyDetectUp.bind(this),!1),A()}},{key:"movePlayers",value:function(t,e){var n=this;if(this.canMove&&0!==i._grid.playerPositions.length){i._grid.undoMoves.length=i._grid.undoStep,i._grid.undoMoves.length>50&&(i._grid.undoMoves.shift(),i._grid.undoStep--);var s,r=0,a=Object(o.a)(i._grid.playerPositions);try{for(a.s();!(s=a.n()).done;){var h=s.value;if(h.skip)h.skip=!1;else{var d=i._grid.grid[h.y][h.x].nodes.find((function(t){return t.isPlayer}));null!=d&&(i._grid.moveNode(d,t,e)||r++,h.skip=!1)}}}catch(y){a.e(y)}finally{a.f()}i._grid.doMovement(),i._grid.rules.updateRules();var c,u=0,l=Object(o.a)(i._grid.rules.rules);try{for(l.s();!(c=l.n()).done;){"you"!==c.value.split(" ")[2]&&u++}}catch(y){l.e(y)}finally{l.f()}if((r!==i._grid.playerPositions.length||u===i._grid.rules.rules.length||i._grid.didMoveThisStep)&&(i._grid.undoStep++,i._grid.didMoveThisStep=!1),0!==i._grid.doAfterMove.length){var g,v=Object(o.a)(i._grid.doAfterMove);try{for(v.s();!(g=v.n()).done;){var f=g.value;f.node.objectName=f.newObjectName}}catch(y){v.e(y)}finally{v.f()}i._grid.rules.resetAllNodeRules()}i._grid.rules.updateRules(),this.canMove=!1,setTimeout((function(){n.canMove=!0}),100)}}},{key:"undoMoves",value:function(){if(!(i._grid.undoStep-1<0))if(this.canMove=!1,i._grid.undoMoves.length<i._grid.undoStep)console.error("Could not do undo with: "+i._grid.undoMoves+" and "+i._grid.undoStep);else{for(var t=i._grid.undoMoves[i._grid.undoStep-1].slice(),e=t.length-1;e>=0;e--){var n=t[e];i._grid.moveNode(n.node,n.xP,n.yP,!1,!0,!0,!0);var s,r=Object(o.a)(i._grid.undoActions);try{for(r.s();!(s=r.n()).done;){var a=s.value;a.changeOn===i._grid.undoStep&&(a.node.objectName=a.changeTo,i._grid.doAfterMove=[])}}catch(h){r.e(h)}finally{r.f()}}i._grid.rules.updateRules(),i._grid.undoStep--,this.justUndone=!0,this.canMove=!0}}},{key:"keyDetectDown",value:function(t){var e=this;!t.repeat&&i.hasFullyLoaded&&void 0===this.interval&&("w"===t.key?(this.movePlayers(0,-1),this.interval=setInterval((function(){return e.movePlayers(0,-1)}),150)):"a"===t.key?(this.movePlayers(-1,0),this.interval=setInterval((function(){return e.movePlayers(-1,0)}),150)):"s"===t.key?(this.movePlayers(0,1),this.interval=setInterval((function(){return e.movePlayers(0,1)}),150)):"d"===t.key?(this.movePlayers(1,0),this.interval=setInterval((function(){return e.movePlayers(1,0)}),150)):"z"===t.key&&(this.undoMoves(),this.interval=setInterval((function(){return e.undoMoves()}),200)))}},{key:"keyDetectUp",value:function(t){t.repeat||(clearInterval(this.interval),this.interval=void 0)}},{key:"render",value:function(){return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{id:"loading",className:"loading",children:"LOADING 0%"}),Object(l.jsx)("a",{href:"https://github.com/tddebart/babu-is-you",target:"_blank",rel:"noreferrer",children:Object(l.jsx)("img",{className:"github",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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",alt:"github"})}),Object(l.jsx)("button",{style:{position:"absolute",top:"10px"},onClick:function(){return console.log(i._grid)},children:"Grid"}),Object(l.jsx)("input",{type:"file",style:{position:"absolute",left:250,top:"10px"},onChange:function(t){return function(t){var e=t.target.files[0];if(e){var i=new FileReader;i.onload=function(){return I(this.result)},i.readAsBinaryString(e)}}(t)}}),Object(l.jsx)("label",{style:{position:"absolute",left:250,top:25,fontSize:20},children:"Load a world (.l file)"}),Object(l.jsx)("div",{id:"rules-text",style:{position:"absolute",top:"10px",left:"10px",textAlign:"left"}}),Object(l.jsx)(v,{ref:function(t){if(t)return i.canvas=t}})]})}}],[{key:"hasFullyLoaded",get:function(){return Object.keys(i.drawings).length===Object.keys(b.Objects).length-1}},{key:"grid",get:function(){return this._grid},set:function(t){this._grid=t,window.addEventListener("resize",t.updateScreenScalings.bind(i.grid))}},{key:"loadAllImages",value:function(){var t=new Image(7,5);t.src="/babu-is-you/img/Palettes/default.png",t.onload=function(){for(var e=function(){var e=s[n],r=[],a=0;b.Objects[e].hasDirs&&(a=24),b.Objects[e].hasWalkAni&&(a=27),b.Objects[e].isTileable&&(a=15);for(var o=0;o<a+1;o++){r[o]=[];for(var h=1;h<4;h++)r[o][h]=void 0}for(var d=function(n){for(var s=function(s){var a=new Image(24,24);e.includes("text")?a.src="/babu-is-you/img/texts/"+b.Objects[e].spriteName+"_"+n+"_"+s+".png":a.src="/babu-is-you/img/objects/"+b.Objects[e].spriteName+"_"+n+"_"+s+".png";document.createElement("canvas").getContext("2d");a.onload=function(){var o=document.createElement("canvas").getContext("2d");if(null!==o){o.imageSmoothingEnabled=!1,o.drawImage(t,100,100,t.width,t.height);var h=o.getImageData(100,100,t.width,t.height);o.drawImage(a,0,0,24,24);for(var d=o.getImageData(0,0,24,24),c=d.data,u=b.Objects[e].x,l=7*b.Objects[e].y+u<<2,g=0;g<c.length;g+=4)255===c[g]&&(c[g]=h.data[l],c[g+1]=h.data[l+1],c[g+2]=h.data[l+2]);var v=document.createElement("canvas");v.width=d.width,v.height=d.height;var f=v.getContext("2d");null!==f&&f.putImageData(d,0,0),r[n][s]=v,i.drawings[e]=r,document.getElementById("loading").textContent="LOADING\n"+(Object.keys(i.drawings).length/(Object.keys(b.Objects).length-1)*100).toFixed(2)+"%",setTimeout((function(){i.hasFullyLoaded&&(document.getElementById("loading").style.animation="loadingDone 1s linear",document.getElementById("loading").style.animationFillMode="forwards",i.grid.rules.updateRules())}),100)}}},a=1;a<4;a++)s(a)},c=0;c<a+1;c++)d(c)},n=0,s=Object.keys(b.Objects);n<s.length;n++)e()}}}]),i}(n.Component);N.canvas=void 0,N._grid=void 0,N.drawings={},N.resolution=50,N.hasLoadedObjects=!1;var T=function(t){Object(c.a)(i,t);var e=Object(u.a)(i);function i(t,n,s,r,a){var o;return Object(h.a)(this,i),(o=e.call(this,N.canvas,!1)).currentDirection=0,o.lastDirection=1,o.extraWalking=0,o.imageName=void 0,o.drawings=[],o.x=0,o.xLastFrame=0,o.drawX=0,o.xDir=0,o.y=0,o.yLastFrame=0,o.drawY=0,o.yDir=0,o.offset=void 0,o.resolution=void 0,o.hasWalking=!1,o.hasDirections=!1,o.isMoving=!1,o.grid=void 0,o.node=void 0,o.imageName=r,o.grid=s,o.node=a,o.resolution=N.resolution,o.x=t,o.xLastFrame=o.x,o.drawX=t,o.y=n,o.yLastFrame=o.y,o.drawY=n,o.hasDirections=b.Objects[o.imageName].hasDirs,o.hasWalking=b.Objects[o.imageName].hasWalkAni,o}return Object(d.a)(i,[{key:"draw",value:function(){var t=this;if(this.drawings=N.drawings[this.imageName],void 0!==this.drawings&&void 0!==this.drawings[this.currentDirection][this.currentFrame]){if(this.currentDirection=0,this.hasDirections&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0),this.hasWalking&&(this.currentDirection=0===this.lastDirection?8:1===this.lastDirection?0:2===this.lastDirection?24:3===this.lastDirection?16:0,this.x===this.xLastFrame&&this.y===this.yLastFrame||(3!==this.extraWalking?this.extraWalking+=1:this.extraWalking=0),this.currentDirection+=this.extraWalking),this.x===this.xLastFrame&&this.y===this.yLastFrame||(this.xDir=this.x-this.xLastFrame,this.yDir=this.y-this.yLastFrame,this.drawX=this.x-this.xDir,this.drawY=this.y-this.yDir),b.Objects[this.imageName].isTileable&&!this.isMoving){var e=!1,i=!1,n=!1,s=!1;this.x+1>this.grid.width-1||!this.grid.grid[this.y][this.x+1].nodes.some((function(e){return e.objectName===t.imageName}))||(i=!0),this.x-1<0||!this.grid.grid[this.y][this.x-1].nodes.some((function(e){return e.objectName===t.imageName}))||(e=!0),this.y+1>this.grid.height-1||!this.grid.grid[this.y+1][this.x].nodes.some((function(e){return e.objectName===t.imageName}))||(s=!0),this.y-1<0||!this.grid.grid[this.y-1][this.x].nodes.some((function(e){return e.objectName===t.imageName}))||(n=!0),e||!i||n||s?e||i||!n||s?!e&&i&&n&&!s?this.currentDirection+=3:!e||i||n||s?e&&i&&!n&&!s?this.currentDirection+=5:e&&!i&&n&&!s?this.currentDirection+=6:e&&i&&n&&!s?this.currentDirection+=7:e||i||n||!s?!e&&i&&!n&&s?this.currentDirection+=9:!e&&!i&&n&&s?this.currentDirection+=10:!e&&i&&n&&s?this.currentDirection+=11:e&&!i&&!n&&s?this.currentDirection+=12:e&&i&&!n&&s?this.currentDirection+=13:e&&!i&&n&&s?this.currentDirection+=14:e&&i&&n&&s&&(this.currentDirection+=15):this.currentDirection+=8:this.currentDirection+=4:this.currentDirection+=2:this.currentDirection+=1}this.ctx.imageSmoothingEnabled=!1,void 0!==this.drawings[this.currentDirection][this.currentFrame]&&(this.ctx.drawImage(this.drawings[this.currentDirection][this.currentFrame],this.drawX*this.resolution+this.offset.x,this.drawY*this.resolution+this.offset.y,this.resolution,this.resolution),parseFloat(this.drawX.toFixed(1))!==this.x||parseFloat(this.drawY.toFixed(1))!==this.y?(this.drawX+=.2*this.xDir,this.drawY+=.2*this.yDir,this.isMoving=!0,this.node.isMoving=!0):(this.isMoving=!1,this.node.isMoving=!1),this.xLastFrame=this.x,this.yLastFrame=this.y)}}}]),i}(g);var S=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)("header",{className:"App-header",children:Object(l.jsx)(N,{})})})},E=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,20)).then((function(e){var i=e.getCLS,n=e.getFID,s=e.getFCP,r=e.getLCP,a=e.getTTFB;i(t),n(t),s(t),r(t),a(t)}))};a.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(S,{})}),document.getElementById("root")),E()}},[[19,1,2]]]);
//# sourceMappingURL=main.3dba36e5.chunk.js.map