import Canvas, {Drawing} from "./Canvas";
import Tile, {Node, objectColors, objectsWithDirections, objectsWithWalking} from "./Node";
import Rules from "./rules";

class AnimatedImage extends Drawing {
    public currentDirection: number = 0;
    public lastDirection: number = 1;
    public extraWalking: number = 3;

    public imageName: string;

    public drawings: Array<Array<any>> = []

    public x: number = 0;
    public xLastFrame: number = 0;
    public y: number = 0;
    public yLastFrame: number = 0;

    public offset!: { x: number; y: number };
    private readonly resolution: number;
    private hasWalking: boolean = false;
    private hasDirections: boolean = false;
    private paletteData!: ImageData;

    constructor(canvas: Canvas, imageName: string, resolution: number) {
        super(canvas, false);
        this.imageName = imageName;
        this.resolution = resolution;
        this.initializeDrawings()
    }

    initializeDrawings() {
        this.hasDirections = objectsWithDirections.indexOf(this.imageName) !== -1
        this.hasWalking = objectsWithWalking.indexOf(this.imageName) !== -1

        if(this.hasDirections) {
            this.currentDirection = 24;
        }
        if(this.hasWalking) {
            this.currentDirection = 27;
        }

        // Give drawings a proper length to assign to
        for (let j = 0; j < this.currentDirection+1; j++) {
            this.drawings[j] = [];
            for (let i = 1; i < 4; i++) {
                this.drawings[j][i] = undefined;
            }
        }

        // load the palette of colors
        let palette = new Image(7,5)
        palette.src = process.env.PUBLIC_URL+"/img/Palettes/default.png"
        palette.onload = () => {
            for (let j = 0; j < this.currentDirection+1; j++) {
                for (let i = 1; i < 4; i++) {

                    // load image from public folder
                    let img = new Image(24,24);
                    if(objectsWithWalking.indexOf(this.imageName) !== -1) {
                        img.src = process.env.PUBLIC_URL+"/img/"+this.imageName + "/" + this.imageName + "_" + j + "_" + i + '.png'
                    } else if (this.imageName.includes('text')) {
                        img.src = process.env.PUBLIC_URL+"/img/texts/" + this.imageName + "_" + j + "_" + i + '.png'
                    } else {
                        img.src = process.env.PUBLIC_URL+"/img/objects/" + this.imageName + "_" + j + "_" + i + '.png'
                    }

                    // get the palette image data
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    if(ctx !== null) {
                        ctx.drawImage(palette, 0, 0, palette.width,palette.height)
                        this.paletteData = ctx.getImageData(0,0, palette.width,palette.height)
                    }

                    // when image is loaded change it's color to correct color
                    img.onload = () => {
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext('2d');
                        if(ctx !== null) {
                            ctx.imageSmoothingEnabled = false

                            // get image data to change
                            ctx.drawImage(img, 0, 0, this.resolution-2, this.resolution-2)
                            const imageData = ctx.getImageData(0,0,this.resolution-2, this.resolution-2)
                            let imgData = imageData.data;

                            // get x and y for index of the palette data. "<< 2" does something * 4 but faster
                            const x = objectColors[this.imageName].x;
                            const y = objectColors[this.imageName].y;
                            const posForColor = (y * 7 + x) << 2;

                            // change the whites of the image to the palette color
                            for (let i =0; i < imgData.length; i += 4) {
                                if(imgData[i] === 255) {
                                    imgData[i] = this.paletteData.data[posForColor]
                                    imgData[i+1] = this.paletteData.data[posForColor+1]
                                    imgData[i+2] = this.paletteData.data[posForColor+2];
                                }
                            }

                            // change image data to canvas for easy drawing
                            let canvas2 = document.createElement("canvas")
                            canvas2.width = imageData.width;
                            canvas2.height = imageData.height;
                            let ctx2 = canvas2.getContext("2d")
                            if(ctx2 !== null) {
                                ctx2.putImageData(imageData, 0, 0)
                            }

                            this.drawings[j][i] = canvas2;
                        }
                    }
                }
            }
        }
    }

    draw() {
        // if there is no drawing don't try to draw the image and crash
        if(this.drawings[this.currentDirection][this.currentFrame] === undefined) return;

        // set the currentDirection for objects that have walking animation
        if(this.hasWalking) {
            this.currentDirection = this.lastDirection === 0? 8 : this.lastDirection === 1 ? 0 : this.lastDirection === 2 ? 24 : this.lastDirection === 3 ? 16 : 0;
            if(this.x !== this.xLastFrame || this.y !== this.yLastFrame) {
                if(this.extraWalking !== 3) {
                    this.extraWalking += 1;
                } else {
                    this.extraWalking = 0;
                }
            }
            this.currentDirection += this.extraWalking;
        }

        // set the currentDirection for objects that have more than 1 direction like the skull
        if(this.hasDirections) {
            this.currentDirection = this.lastDirection === 0? 8 : this.lastDirection === 1 ? 0 : this.lastDirection === 2 ? 24 : this.lastDirection === 3 ? 16 : 0;
        }

        // if there is no drawing don't try to draw the image and crash
        if(this.drawings[this.currentDirection][this.currentFrame] === undefined) return;

        this.ctx.drawImage(this.drawings[this.currentDirection][this.currentFrame], this.x*this.resolution+this.offset.x+1,this.y*this.resolution+this.offset.y+1, this.resolution-2, this.resolution-2);

        this.xLastFrame = this.x;
        this.yLastFrame = this.y;
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
    public rules: Rules = new Rules(this);

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
        this.loadAllImages()
        this.setOffset()
        this.initializeGrid(width, height)
        this.initializeDrawings();
        this.rules.updateRules()
        this.canvas.canvas.addEventListener('click', this.calculateText.bind(this));
    }

    loadAllImages() {
        for (const key of Object.keys(objectColors)) {
            this.drawings[key] = new AnimatedImage(this.canvas, key, this.resolution)
        }
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
                    this.grid[y][x].nodes.push(new Node(x,y,"", 'belt'))
                    // this.grid[y][x].nodes.push(new Node(x,y,"", 'me'))
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
                // if((x===7 && y===4)) {
                //     this.grid[y][x].nodes.push(new Node(x,y,"keke"))
                // }
                // if((x===7 && y===6)) {
                //     this.grid[y][x].nodes.push(new Node(x,y,"me"))
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

    doMovement() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                for (const node of this.grid[y][x].nodes) {
                    //TODO: fix this and change it into move because shift does not do this
                    if(node.is("shift")) {
                        console.log('shifting')
                        const xyP = node.directionToXAndY(node.lastDirection())
                        this.moveNode(node, xyP.xP, -xyP.yP);
                    }
                }
            }
        }
    }

    canMoveIntoNode(node:Node, xP:number, yP:number) {
        const grid = this.grid;

        const x = node.x;
        const y = node.y;
        // return if coords out of bounds
        if(x+xP < 0 || x+xP > this.width-1 || y+yP < 0 || y+yP > this.height-1) return false;
        for (let i = 0; i < grid[y+yP][x+xP].nodes.length; i++) {
            const nextNode = grid[y+yP][x+xP].nodes[i];
            if(nextNode.isPushable) {
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

    moveNode(node: Node, xP:number, yP:number, skipMoveCheck:boolean = false, skipAddUndoCheck:boolean = false, reverseDirection:boolean = false): boolean {

        if(!skipMoveCheck && !this.canMoveIntoNode(node, xP, yP)) {
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
            if(this.undoMoves.length-1 !== this.undoStep) {
                this.undoMoves.push([]);
            }
            this.undoMoves[this.undoStep].push({node:nextTile.nodes[nextTile.nodes.findIndex(value => value === node)], xP: xP !==0 ? -xP : 0,yP: yP !==0 ? -yP : 0, doAction:false});
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
                        drawing.lastDirection = node.lastDirection();
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