import Canvas, {Drawing} from "./Canvas";
import Node from "./Node";
import babu from "../img/babu.png"

export default class Grid extends Drawing {
    public width: number
    public height: number

    public resolution: number

    public grid: Array<Array<Node>> = [];
    private offset!: { x: number; y: number };

    public playerPositions: Array<{ x: number; y: number, skip: boolean }> = [];

    private gridDrawing: any;
    private babuDrawing: any;

    constructor(canvas: Canvas, width: number, height: number, resolution: number) {
        super(canvas)
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.setOffset()
        this.initializeGrid(width, height);
        this.gridDrawing = this.drawGrid()
        this.babuDrawing = new Image(24,24)
        this.babuDrawing.src = babu;
    }

    setOffset() {
        this.offset = {x:window.innerWidth/2-(this.width/2*this.resolution), y:window.innerHeight/2-(this.height/2*this.resolution)}
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
                if((x===5 && y===5) || (x===3 && y===4)) {
                    this.grid[y][x].isPlayer = true;
                    this.grid[y][x].isPushable = true;
                    this.playerPositions.push({x:x,y:y, skip:false});
                }
                if((x===3 && y===3)) {
                    this.grid[y][x].isText = true;
                }
            }
        }
    }

    canMoveIntoNode(x:number, y:number, xP:number, yP:number) {
        const grid = this.grid;
        if(x < 0 || x > this.width-1 || y < 0 || y > this.height-1) {
            return false
        } else if(grid[y][x].isPushable) {
            if(this.canMoveIntoNode(x+xP, y+yP, xP, yP)) {
                this.moveNode(x, y, xP,yP)
                return true
            }
        } else {
            return !grid[y][x].isPlayer
        }
    }

    moveNode(x:number, y:number, xP:number, yP:number, skipMoveCheck:boolean = false): boolean {
        const node = this.grid[y][x]

        if(!skipMoveCheck && !this.canMoveIntoNode(x+xP, y+yP, xP, yP)) {
            return false;
        }

        this.grid[y+yP][x+xP] = node;
        this.grid[y+yP][x+xP].x+=xP;
        this.grid[y+yP][x+xP].y+=yP;

        const plIndex = this.playerPositions.findIndex(pos => pos.x === x && pos.y === y)

        if(node.isPlayer) {
            this.playerPositions[plIndex].x += xP;
            this.playerPositions[plIndex].y += yP;
            this.playerPositions[plIndex].skip = true;
        }

        this.grid[y][x] = new Node(y,x);
        return true;
    }

    //#region drawing

    draw() {
        this.ctx.drawImage(this.gridDrawing, this.offset.x, this.offset.y)

        const resolution = this.resolution;

        for (const pos of this.playerPositions) {
            this.ctx.imageSmoothingEnabled = false
            this.ctx.drawImage(this.babuDrawing,pos.x*resolution+this.offset.x,pos.y*resolution+this.offset.y,resolution,resolution)
            this.ctx.imageSmoothingEnabled = true
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if(this.grid[y][x].isText) {
                    this.ctx.fillStyle = 'Blue'
                    this.ctx.fillRect(x*resolution+this.offset.x,y*resolution+this.offset.y,resolution,resolution)
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