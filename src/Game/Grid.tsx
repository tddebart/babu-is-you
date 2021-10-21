import Canvas, {Drawing} from "./Canvas";
import Node, {specialObjects} from "./Node";
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

    public grid: Array<Array<Node>> = [];
    private offset!: { x: number; y: number };

    public playerPositions: Array<{ x: number; y: number, skip: boolean }> = [];

    private drawings: {[key: string]: AnimatedImage} = {}

    private gridImage: any;

    public undoMoves: Array<Array<{x: number; y:number; xP: number; yP: number}>> = [];
    public undoStep = 0;
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
                currentY.push(new Node(x,y))
            }
            this.grid.push(currentY)
        }
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if((x===5 && y===5)) {
                    this.grid[y][x].objectNames.push('babu')
                }
                if((x===7 && y===5)) {
                    this.grid[y][x].objectNames.push('keke')
                    // this.grid[y][x].objectNames.push('me');
                }

                if((x===3 && y===3)) {
                    this.grid[y][x].text = "babu";
                }
                if((x===4 && y===3)) {
                    this.grid[y][x].text = "is";
                }
                if((x===5 && y===3)) {
                    this.grid[y][x].text = "you";
                }

                if((x===5 && y===1)) {
                    this.grid[y][x].text = "keke";
                }
                if((x===6 && y===1  )) {
                    this.grid[y][x].text = "is";
                }
                if((x===7 && y===1)) {
                    this.grid[y][x].text = "stop";
                }
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
            this.grid[gridPos.y][gridPos.x].text = text;
        }
        this.rules.updateRules();
    }

    //#region moving

    canMoveIntoNode(x:number, y:number, xP:number, yP:number) {
        const grid = this.grid;
        if(x < 0 || x > this.width-1 || y < 0 || y > this.height-1) {
            return false
        } else if(grid[y][x].isPushable) {
            if(this.canMoveIntoNode(x+xP, y+yP, xP, yP)) {
                this.moveNode(x, y, xP,yP)
                return true
            }
        } else if(grid[y][x].is('stop')) {
            return false
        } else {
            return !grid[y][x].isPlayer
        }
    }

    moveNode(x:number, y:number, xP:number, yP:number, skipMoveCheck:boolean = false, skipAddUndoCheck:boolean = false): boolean {
        const node = this.grid[y][x]

        if(!skipMoveCheck && !this.canMoveIntoNode(x+xP, y+yP, xP, yP)) {
            return false;
        }

        const nodeObjNames = node.objectNames;
        const nextObjNames = this.grid[y+yP][x+xP].objectNames;

        this.grid[y+yP][x+xP] = node;
        this.grid[y+yP][x+xP].objectNames = nextObjNames.concat(this.grid[y+yP][x+xP].objectNames)
        if(nodeObjNames.length > 1) {
            this.grid[y+yP][x+xP].objectNames = [node.objectNames[node.objectNames.length-1]]
        }
        this.grid[y+yP][x+xP].x+=xP;
        this.grid[y+yP][x+xP].y+=yP;

        const plIndex = this.playerPositions.findIndex(pos => pos.x === x && pos.y === y)

        if(node.isPlayer && plIndex !== -1) {
            this.playerPositions[plIndex].x += xP;
            this.playerPositions[plIndex].y += yP;
            this.playerPositions[plIndex].skip = true;
        }

        this.grid[y][x] = new Node(x,y);
        if(nodeObjNames.length > 1) {
            this.grid[y][x].objectNames = nodeObjNames.splice(0,nodeObjNames.length - 1)
        }

        // undo moves
        if(!skipAddUndoCheck) {
            if(this.undoMoves.length-1 !== this.undoStep) {
                this.undoMoves.push([]);
            }
            this.undoMoves[this.undoStep].push({x:x+xP, y:y+yP, xP: xP !==0 ? -xP : 0,yP: yP !==0 ? -yP : 0});
        }

        return true;
    }

    //#endregion

    //#region drawing

    draw() {
        this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height)
        this.ctx.imageSmoothingEnabled = false

        this.ctx.drawImage(this.gridImage, this.offset.x, this.offset.y)
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // if(this.grid[y][x].isText) {
                //     // this.ctx.globalCompositeOperation = "destination-in";
                //     this.ctx.drawImage(this.getDrawing("text_"+this.grid[y][x].text), Math.floor(x*resolution+this.offset.x+1),Math.floor(y*resolution+this.offset.y+1),resolution-2,resolution-2)
                // }
                // if(this.grid[y][x].objectNames.length > 0) {
                //     for (const objectName of this.grid[y][x].objectNames) {
                //         this.ctx.drawImage(this.getDrawing(objectName), x*resolution+this.offset.x+1,y*resolution+this.offset.y+1,resolution-2,resolution-2)
                //     }
                // }
                for (let i = this.grid[y][x].objectNames.length-1; i >= 0; i--) {
                    const objectName = this.grid[y][x].objectNames[i]
                    const drawing = this.getDrawing(objectName);
                    drawing.x = x;
                    drawing.y = y;
                    drawing.offset = this.offset;
                    drawing.draw()
                }
                // for (const objectName of this.grid[y][x].objectNames) {
                //     const drawing = this.getDrawing(objectName);
                //     drawing.x = x;
                //     drawing.y = y;
                //     drawing.offset = this.offset;
                //     drawing.draw()
                // }
                if(this.grid[y][x].isText) {
                    const drawing = this.getDrawing("text_"+this.grid[y][x].text);
                    drawing.x = x;
                    drawing.y = y;
                    drawing.offset = this.offset;
                    drawing.draw()
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