import Canvas, {Drawing} from "./Canvas";
import Node from "./Node";

export default class Grid extends Drawing {
    public width: number
    public height: number

    public resolution: number

    public grid: Array<Array<Node>> = [];
    private offset!: { x: number; y: number };

    public playerPositions: Array<{ x: number; y: number, skip: boolean }> = [];

    private drawings: {[key: string]: any} = {}

    getDrawing(key: string) {
        if(!(key in this.drawings)) {
            let img = new Image(24,24);
            img.src = process.env.PUBLIC_URL+"/img/" + key + '.png'
            this.drawings[key] = img;
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
    }

    setOffset() {
        this.offset = {x:window.innerWidth/2-(this.width/2*this.resolution), y:window.innerHeight/2-(this.height/2*this.resolution)}
    }

    initializeDrawings() {
        this.drawings["grid"] = this.drawGrid()
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
                    this.grid[y][x].isPlayer = true;
                    this.grid[y][x].isPushable = true;
                    this.grid[y][x].objectName = 'baba';
                    this.playerPositions.push({x:x,y:y, skip:false});
                }
                if((x===3 && y===3)) {
                    this.grid[y][x].text = "baba";
                }
                if((x===4 && y===3)) {
                    this.grid[y][x].text = "is";
                }
                if((x===6 && y===3)) {
                    this.grid[y][x].text = "you";
                }
            }
        }
    }

    updateRules() {

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

    //#endregion

    //#region drawing

    draw() {
        this.ctx.drawImage(this.drawings["grid"], this.offset.x, this.offset.y)

        const resolution = this.resolution;

        this.ctx.imageSmoothingEnabled = false
        for (const pos of this.playerPositions) {
            this.ctx.drawImage(this.getDrawing('babu'),pos.x*resolution+this.offset.x,pos.y*resolution+this.offset.y,resolution,resolution)
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if(this.grid[y][x].isText) {
                    this.ctx.drawImage(this.getDrawing("text_"+this.grid[y][x].text), x*resolution+this.offset.x+1,y*resolution+this.offset.y+1,resolution-2,resolution-2)
                }
            }
        }
        this.ctx.imageSmoothingEnabled = true
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