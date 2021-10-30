import Canvas, {Drawing} from "./Canvas";
import Tile, {Node} from "./Node";
import Rules from "./rules";

export default class Grid extends Drawing {
    public width: number
    public height: number

    public resolution: number

    public grid: Array<Array<Tile>> = [];
    private offset!: { x: number; y: number };

    public playerPositions: Array<{ x: number; y: number, skip: boolean }> = [];

    private gridImage: any;

    public undoMoves: Array<Array<{node:Node, xP: number; yP: number, doAction: boolean}>> = [];
    public undoActions: Array<{node: Node, changeTo: any, changeOn: number}> = [];

    public doAfterMove: Array<{node: Node, newObjectName: string}> = []

    public undoStep = 0;
    public rules: Rules = new Rules(this);

    public didMoveThisStep: boolean = false;
    private debug: boolean;

    constructor(canvas: Canvas, width: number, height: number, resolution: number, debug: boolean = false) {
        super(canvas)
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.debug = debug;
        this.updateScreenScalings()
        this.gridImage = this.drawGrid()
        this.initializeGrid(width, height)
        this.rules.updateRules()
        this.canvas.canvas.addEventListener('click', this.calculateText.bind(this));
    }

    updateGrid(width: number, height: number) {
        this.debug = false;
        this.grid = [];
        this.width = width;
        this.height = height;
        this.updateScreenScalings();
        this.gridImage = this.drawGrid()
        this.initializeGrid(width, height)
    }

    updateScreenScalings() {
        let resY = (window.innerHeight-100) / this.height;
        let resX = (window.innerWidth-100) / this.width
        this.resolution = clamp(Math.round(Math.min(resX, resY)), 5, 150)
        this.offset = {x:Math.floor(window.innerWidth/2-(this.width/2*this.resolution)), y:Math.floor(window.innerHeight/2-(this.height/2*this.resolution))}
        this.gridImage = this.drawGrid()
    }

    initializeGrid(width:number, height:number) {
        for (let y = 0; y < height; y++) {
            const currentY = []
            for (let x = 0; x < width; x++) {
                currentY.push(new Tile(x,y))
            }
            this.grid.push(currentY)
        }
        if(this.debug) {
            setTimeout(() => {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        if((x===5 && y===5)) {
                            this.grid[y][x].nodes.push(new Node(x,y, this,"", 'babu'))
                        }
                        if((x===7 && y===5)) {
                            this.grid[y][x].nodes.push(new Node(x,y,this,"", 'keke'));
                            // this.grid[y][x].nodes.push(new Node(x,y,"", 'me'))
                        }
                        if((x===8 && y===5)) {
                            // this.grid[y][x].nodes.push(new Node(x,y,this.canvas,this,"", 'wall'));
                        }

                        if((x===3 && y===3)) {
                            this.grid[y][x].nodes.push(new Node(x,y,this,"babu"))
                        }
                        if((x===4 && y===3)) {
                            this.grid[y][x].nodes.push(new Node(x,y,this,"is"))
                        }
                        if((x===5 && y===3)) {
                            this.grid[y][x].nodes.push(new Node(x,y,this,"you"));
                        }
                        //
                        // if((x===7 && y===4)) {
                        //     this.grid[y][x].nodes.push(new Node(x,y,this.canvas,"keke"))
                        // }
                        // if((x===7 && y===6)) {
                        //     this.grid[y][x].nodes.push(new Node(x,y,this.canvas,"me"))
                        // }
                    }
                }
            }, 5000)
        }
    }

    calculateText(e: any) {
        const posX = e.clientX - this.offset.x;
        const posY = e.clientY - this.offset.y;
        const gridPos = {x: Math.floor(posX/this.resolution), y: Math.floor(posY/this.resolution)}
        if(gridPos.x < 0 || gridPos.x >= this.width || gridPos.y < 0 || gridPos.y >= this.height) {
            return;
        }
        const text = prompt("Give a value.")
        if(text !== null) {
            // if(objectNames.indexOf(text) !== -1) {
            //     this.grid[gridPos.y][gridPos.x].nodes.push(new Node(gridPos.x,gridPos.y,"", text))
            // } else {
            this.grid[gridPos.y][gridPos.x].nodes.push(new Node(gridPos.x,gridPos.y,this,text))
            // }
        }
        this.rules.updateRules();
    }

    //#region moving

    doMovement() {
        let movedNodes = []
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                for (const node of this.grid[y][x].nodes) {
                    if(node.is("move")) {
                        let xyP = node.directionToXAndY(node.lastDirection())
                        if(!this.canMoveIntoNode(node, xyP.xP, xyP.yP)) {
                            xyP = {xP:-xyP.xP, yP:-xyP.yP}
                        }
                        movedNodes.push({node:node, xP:xyP.xP, yP:xyP.yP})
                    }
                    // boilerplate for is player on something
                    if(node.is("defeat")) {
                        if(this.grid[y][x].nodes.some(value => value.isPlayer)) {
                            for (const playerNode of this.grid[y][x].nodes.filter(value => value.isPlayer)) {
                                this.undoActions.push({node: playerNode, changeTo: playerNode.objectName, changeOn: this.undoStep+1})
                                playerNode.objectName = "";
                            }
                        }
                    }
                    if(node.is("win")) {
                        if(this.grid[y][x].nodes.some(value => value.isPlayer)) {
                            const textScreen = document.getElementById("loading");
                            textScreen!.innerText = "CONGRATULATIONS"
                            textScreen!.style.display = "";
                            textScreen!.style.animation = "winScreen 4s linear";
                            textScreen!.style.animationFillMode = "forwards"
                            textScreen!.addEventListener("animationend", () => {
                                textScreen!.style.animation = "";
                                textScreen!.style.display = "none";
                            })
                        }
                    }
                }
            }
        }

        for (const movedNode of movedNodes) {
            this.moveNode(movedNode.node, movedNode.xP, movedNode.yP)
        }
    }

    canMoveIntoNode(node:Node, xP:number, yP:number, skipPushable:boolean = false) {
        const grid = this.grid;

        const x = node.x;
        const y = node.y;
        // return if coords out of bounds
        if(x+xP < 0 || x+xP > this.width-1 || y+yP < 0 || y+yP > this.height-1) return false;
        for (let i = 0; i < grid[y+yP][x+xP].nodes.length; i++) {
            const nextNode = grid[y+yP][x+xP].nodes[i];
            if(!skipPushable && nextNode.isPushable) {
                // return if coords out of bounds
                if(nextNode.x+xP < 0 || nextNode.x+xP > this.width-1 || nextNode.y+yP < 0 || nextNode.y+yP > this.height-1) return false;

                // if next tile empty you can move
                if(grid[nextNode.y+yP][nextNode.x+xP].nodes.length === 0) {
                    this.moveNode(nextNode, xP,yP)
                    return true;
                }
                for (let j = 0; j < grid[nextNode.y+yP][nextNode.x+xP].nodes.length; j++) {
                    if(this.canMoveIntoNode(nextNode, xP, yP)) {
                        this.moveNode(nextNode, xP,yP)
                        return true;
                    }
                }
                return false;
            } else if(nextNode.is('stop')) {
                return false
            }
        }
        return true;
    }

    moveNode(node: Node, xP:number, yP:number, skipMoveCheck:boolean = false, skipAddUndoCheck:boolean = false, reverseDirection:boolean = false, skipPushable:boolean = false): boolean {

        if(!skipMoveCheck && !this.canMoveIntoNode(node, xP, yP, skipPushable)) {
            return false;
        }

        const curTile = this.grid[node.y][node.x];
        const nextTile = this.grid[node.y+yP][node.x+xP];

        node.x += xP;
        node.y += yP;

        if(reverseDirection) {
            node.xP = -xP
            node.yP = -yP;
        } else {
            node.xP = xP
            node.yP = yP;
        }

        nextTile.nodes.push(node);
        curTile.nodes.splice(curTile.nodes.indexOf(node), 1);

        // Undo moves
        if(!skipAddUndoCheck) {
            this.didMoveThisStep = true;
            if(this.undoMoves.length-1 !== this.undoStep) {
                this.undoMoves.push([]);
            }
            this.undoMoves[this.undoStep].push({node:nextTile.nodes[nextTile.nodes.findIndex(value => value === node)], xP: -xP,yP: -yP, doAction:false});
        }
        return true;
    }

    //#endregion

    //#region drawing

    draw() {
        this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height)
        this.ctx.imageSmoothingEnabled = false

        this.ctx.drawImage(this.gridImage, this.offset.x, this.offset.y)
        for (let zI = 0; zI < 25; zI++) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    for (let j = 0; j < this.grid[y][x].nodes.length; j++){
                        const node = this.grid[y][x].nodes[j];
                        if(node.objectName !== "") {
                            if(Node.Objects[node.objectName].zIndex !== zI) continue


                            const drawing = node.aniImg;
                            if(drawing !== null) {
                                drawing.x = x;
                                drawing.y = y;
                                drawing.grid = this;
                                drawing.lastDirection = node.lastDirection();
                                drawing.resolution = this.resolution;
                                drawing.offset = this.offset;
                                drawing.draw()
                            }
                        }
                        if(node.isText) {
                            if(Node.Objects["text_"+node.text].zIndex !== zI) continue

                            const drawing = node.aniImg;
                            if(drawing !== null) {
                                drawing.x = x;
                                drawing.y = y;
                                drawing.grid = this;
                                drawing.resolution = this.resolution;
                                drawing.offset = this.offset;
                                drawing.draw()
                            }
                        }
                    }
                }
            }
        }
    }

    drawGrid() {
        const width = this.width;
        const height = this.height;
        const resolution = this.resolution;

        const canvas = document.createElement('canvas')
        canvas.width = width*resolution
        canvas.height = height*resolution
        const ctx = canvas.getContext('2d');
        if(ctx) {
            ctx.imageSmoothingEnabled = false
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = 'rgba(0,0,0,1)'
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.lineWidth = Math.round(Math.max(this.resolution/40, 1))
            ctx.beginPath();
            for (let x = 0; x < width; x++) {
                ctx.moveTo(x*resolution, 0);
                ctx.lineTo(x*resolution, height*resolution);
            }
            ctx.stroke();
            ctx.beginPath();
            for (let y = 0; y < width; y++) {
                ctx.moveTo(0, y*resolution);
                ctx.lineTo(width*resolution, y*resolution);
            }
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width*resolution, 0);
            ctx.lineTo(width*resolution, height*resolution);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, height*resolution);
            ctx.lineTo(width*resolution, height*resolution);
            ctx.stroke();

        }
        return canvas;
    }

    //#endregion
}

function clamp(num:number, min:number, max:number): number {
    return Math.min(Math.max(num,min),max)
}