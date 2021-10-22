import Canvas, {Drawing} from "./Canvas";
import Tile, {Node, specialObjects} from "./Node";
import Rules from "./rules";

class AnimatedImage extends Drawing {
    public currentDirection: number = 0;
    public imageName: string;

    public drawings: Array<Array<any>> = []

    public x: number = 0;
    public y: number = 0;
    public offset!: { x: number; y: number };
    private readonly resolution: number;

    constructor(canvas: Canvas, imageName: string, resolution: number) {
        super(canvas, false);
        this.imageName = imageName;
        this.resolution = resolution;
        this.initializeDrawings();
    }

    initializeDrawings() {
        for (let j = 0; j < 1; j++) {
            this.drawings[j] = [];
            for (let i = 1; i < 4; i++) {
                this.drawings[j][i] = undefined;
            }
        }

        for (let j = 0; j < 1; j++) {
            for (let i = 1; i < 4; i++) {
                let img = new Image(24,24);
                if(specialObjects.indexOf(this.imageName) !== -1) {
                    img.src = process.env.PUBLIC_URL+"/img/"+this.imageName + "/" + this.imageName + "_" + j + "_" + i + '.png'
                } else if (this.imageName.includes('text')) {
                    img.src = process.env.PUBLIC_URL+"/img/texts/" + this.imageName + "_" + j + "_" + i + '.png'
                } else {
                    img.src = process.env.PUBLIC_URL+"/img/" + this.imageName + "_" + j + "_" + i + '.png'
                }

                this.drawings[0][i] = img
            }
        }
    }

    draw() {
        this.ctx.drawImage(this.drawings[this.currentDirection][this.currentFrame], this.x*this.resolution+this.offset.x+1,this.y*this.resolution+this.offset.y+1,this.resolution-2,this.resolution-2)
    }
}

export default class Grid extends Drawing {
    public width: number
    public height: number

    public resolution: number

    public grid: Array<Array<Tile>> = [];
    private offset!: { x: number; y: number };

    public playerPositions: Array<{ x: number; y: number, skip: boolean }> = [];

    private drawings: {[key: string]: AnimatedImage} = {}

    private gridImage: any;

    public active: boolean = true;

    public undoMoves: Array<Array<{node:Node, xP: number; yP: number, doAction: boolean}>> = [];
    public undoActions: Array<{node: Node, changeTo: any, changeOn: number}> = [];

    public doAfterMove: Array<{node: Node, newObjectName: string}> = []

    public undoStep = 0;
    public undoActionStep = 0;
    public rules: Rules;

    getDrawing(key: string) {
        if(!(key in this.drawings)) {
            this.drawings[key] = new AnimatedImage(this.canvas, key, this.resolution);
        }
        return this.drawings[key]
    }

    constructor(canvas: Canvas, width: number, height: number, resolution: number) {
        super(canvas)
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.setOffset()
        this.initializeGrid(width, height)
        this.initializeDrawings()
        this.rules = new Rules(this);
        this.rules.updateRules()
        this.canvas.canvas.addEventListener('click', this.calculateText.bind(this));
    }

    setOffset() {
        this.offset = {x:window.innerWidth/2-(this.width/2*this.resolution), y:window.innerHeight/2-(this.height/2*this.resolution)}
    }

    initializeDrawings() {
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
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if((x===5 && y===5)) {
                    this.grid[y][x].nodes.push(new Node(x,y,"", 'babu'))
                }
                if((x===7 && y===5)) {
                    this.grid[y][x].nodes.push(new Node(x,y,"", 'keke'))
                    this.grid[y][x].nodes.push(new Node(x,y,"", 'me'))
                }

                if((x===3 && y===3)) {
                    this.grid[y][x].nodes.push(new Node(x,y,"babu"))
                }
                if((x===4 && y===3)) {
                    this.grid[y][x].nodes.push(new Node(x,y,"is"))
                }
                if((x===5 && y===3)) {
                    this.grid[y][x].nodes.push(new Node(x,y,"you"))
                }
                //
                // if((x===5 && y===1)) {
                //     this.grid[y][x].text = "keke";
                // }
                // if((x===6 && y===1  )) {
                //     this.grid[y][x].text = "is";
                // }
                // if((x===7 && y===1)) {
                //     this.grid[y][x].text = "stop";
                // }

                // if((x===5 && y===1)) {
                //     this.grid[y][x].text = "keke";
                // }
            }
        }
    }

    calculateText(e: any) {
        const posX = e.clientX - this.offset.x;
        const posY = e.clientY - this.offset.y;
        const gridPos = {x: Math.floor(posX/this.resolution), y: Math.floor(posY/this.resolution)}
        if(gridPos.x < 0 || gridPos.x > this.width || gridPos.y < 0 || gridPos.y > this.height) {
            return;
        }
        const text = prompt("Give a text value.")
        if(text !== null) {
            this.grid[gridPos.y][gridPos.x].nodes.push(new Node(gridPos.x,gridPos.y,text))
        }
        this.rules.updateRules();
    }

    //#region moving

    canMoveIntoNode(node:Node, xP:number, yP:number) {
        const grid = this.grid;

        const x = node.x;
        const y = node.y;
        if(x+xP < 0 || x+xP > this.width-1 || y+yP < 0 || y+yP > this.height-1) return false;
        for (let i = 0; i < grid[y+yP][x+xP].nodes.length; i++) {
            const nextNode = grid[y+yP][x+xP].nodes[i];
            if(nextNode.isPushable) {
                if(nextNode.x+xP < 0 || nextNode.x+xP > this.width-1 || nextNode.y+yP < 0 || nextNode.y+yP > this.height-1) return false;
                if(grid[nextNode.y+yP][nextNode.x+xP].nodes.length === 0) {
                    this.moveNode(nextNode, xP,yP)
                    return true;
                }
                for (const nodeAfterNext of grid[nextNode.y+yP][nextNode.x+xP].nodes) {
                    if(this.canMoveIntoNode(nodeAfterNext, xP, yP)) {
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

    moveNode(node: Node, xP:number, yP:number, skipMoveCheck:boolean = false, skipAddUndoCheck:boolean = false): boolean {

        if(!skipMoveCheck && !this.canMoveIntoNode(node, xP, yP)) {
            return false;
        }

        const curTile = this.grid[node.y][node.x];
        const nextTile = this.grid[node.y+yP][node.x+xP];

        node.x += xP;
        node.y += yP;
        nextTile.nodes.push(node);
        curTile.nodes.splice(curTile.nodes.indexOf(node), 1);

        // Undo moves
        if(!skipAddUndoCheck) {
            if(this.undoMoves.length-1 !== this.undoStep) {
                this.undoMoves.push([]);
            }
            this.undoMoves[this.undoStep].push({node:nextTile.nodes[nextTile.nodes.length-1], xP: xP !==0 ? -xP : 0,yP: yP !==0 ? -yP : 0, doAction:false});
        }
        return true;
    }

    //#endregion

    //#region drawing

    draw() {
        if(!this.active) return;
        this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height)
        this.ctx.imageSmoothingEnabled = false

        this.ctx.drawImage(this.gridImage, this.offset.x, this.offset.y)
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                for (let j = 0; j < this.grid[y][x].nodes.length; j++){
                    const node = this.grid[y][x].nodes[j];
                    if(node.objectName !== "") {
                        const drawing = this.getDrawing(node.objectName);
                        drawing.x = x;
                        drawing.y = y;
                        drawing.offset = this.offset;
                        drawing.draw()
                    }
                    if(node.isText) {
                        const drawing = this.getDrawing("text_"+node.text);
                        drawing.x = x;
                        drawing.y = y;
                        drawing.offset = this.offset;
                        drawing.draw()
                    }
                }
            }
        }
        // this.ctx.imageSmoothingEnabled = true
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