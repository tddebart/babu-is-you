import Canvas, {Drawing} from "./Canvas";
import Tile, {Node, Objects} from "./Node";
import Rules from "./rules";
import Game from "./Game";

export class AnimatedImage extends Drawing {
    public currentDirection: number = 0;
    public lastDirection: number = 1;
    public extraWalking: number = 3;

    public imageName: string

    public drawings: Array<Array<any>> = []

    public x: number = 0;
    public xLastFrame: number = 0;
    public drawX: number = 0;
    private xDir: number = 0;

    public y: number = 0;
    public yLastFrame: number = 0;
    public drawY: number = 0;
    private yDir: number = 0;

    public offset!: { x: number; y: number };
    private readonly resolution: number;
    private readonly hasWalking: boolean = false;
    private readonly hasDirections: boolean = false;
    private isMoving: boolean = false;

    public grid: Grid;
    public node: Node;

    constructor(x:number, y:number, grid:Grid, imageName: string, node:Node) {
        super(Game.canvas, false);
        this.imageName = imageName;
        this.grid = grid
        this.node = node;
        this.resolution = grid.resolution;

        this.x = x;
        this.xLastFrame = x;
        this.drawX = x;
        this.y = y;
        this.yLastFrame = y;
        this.drawY = y;

        this.hasDirections = Objects[this.imageName].hasDirs
        this.hasWalking = Objects[this.imageName].hasWalkAni
    }

    draw() {
        this.drawings = this.grid.drawings[this.imageName];

        // if there is no drawing don't try to draw the image and crash
        if(this.drawings === undefined || this.drawings[this.currentDirection][this.currentFrame] === undefined) return;

        // Reset the direction
        this.currentDirection = 0;

        // set the currentDirection for objects that have more than 1 direction like the skull
        if(this.hasDirections) {
            this.currentDirection = this.lastDirection === 0? 8 : this.lastDirection === 1 ? 0 : this.lastDirection === 2 ? 24 : this.lastDirection === 3 ? 16 : 0;
        }
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
        if(this.x !== this.xLastFrame || this.y !== this.yLastFrame) {
            this.xDir = this.x - this.xLastFrame
            this.yDir = this.y - this.yLastFrame
            this.drawX = this.x-this.xDir
            this.drawY = this.y-this.yDir;
        }

        //#region tile sides

        // Tile system
        if(Objects[this.imageName].isTileable && !this.isMoving) {
            let hasLeft = false;
            let hasRight = false;
            let hasTop = false;
            let hasBottom = false;

            //TODO: when pushing two or more walls for one frame they are not connected
            if(!(this.x+1 > this.grid.width-1) && this.grid.grid[this.y][this.x+1].nodes.some(value => value.objectName === this.imageName)) {
                // const nextNodes = this.grid.grid[this.y][this.x+1].nodes.filter(value => value.objectName === this.imageName)
                // let shouldDo = true;
                // for (const nextNode of nextNodes) {
                //     if(nextNode.isMoving) {
                //         shouldDo = false;
                //     }
                // }
                // if(shouldDo) {
                    hasRight = true;
                // }
            }
            if(!(this.x-1 < 0) && this.grid.grid[this.y][this.x-1].nodes.some(value => value.objectName === this.imageName)) {
                // const nextNodes = this.grid.grid[this.y][this.x-1].nodes.filter(value => value.objectName === this.imageName)
                // let shouldDo = true;
                // for (const nextNode of nextNodes) {
                //     if(nextNode.isMoving) {
                //         shouldDo = false;
                //     }
                // }
                // if(shouldDo) {
                    hasLeft = true;
                // }
            }
            if(!(this.y+1 > this.grid.height-1) && this.grid.grid[this.y+1][this.x].nodes.some(value => value.objectName === this.imageName)) {
                // const nextNodes = this.grid.grid[this.y+1][this.x].nodes.filter(value => value.objectName === this.imageName)
                // let shouldDo = true;
                // for (const nextNode of nextNodes) {
                //     if(nextNode.isMoving) {
                //         shouldDo = false;
                //     }
                // }
                // if(shouldDo) {
                    hasBottom = true;
                // }
            }
            if(!(this.y-1 < 0) && this.grid.grid[this.y-1][this.x].nodes.some(value => value.objectName === this.imageName)) {
                // const nextNodes = this.grid.grid[this.y-1][this.x].nodes.filter(value => value.objectName === this.imageName)
                // let shouldDo = true;
                // for (const nextNode of nextNodes) {
                //     if(nextNode.isMoving) {
                //         shouldDo = false;
                //     }
                // }
                // if(shouldDo) {
                    hasTop = true;
                // }
            }

            // Right
            if(!hasLeft && hasRight && !hasTop && !hasBottom) {
                this.currentDirection += 1;
            }
            //Top
            else if(!hasLeft && !hasRight && hasTop && !hasBottom) {
                this.currentDirection += 2;
            }
            // Top and right
            else if(!hasLeft && hasRight && hasTop && !hasBottom) {
                this.currentDirection += 3;
            }
            // Left side
            else if(hasLeft && !hasRight && !hasTop && !hasBottom) {
                this.currentDirection += 4;
            }
            // Left and right
            else if(hasLeft && hasRight && !hasTop && !hasBottom) {
                this.currentDirection += 5;
            }
            // Left and top
            else if(hasLeft && !hasRight && hasTop && !hasBottom) {
                this.currentDirection += 6;
            }
            // Left, top and right
            else if(hasLeft && hasRight && hasTop && !hasBottom) {
                this.currentDirection += 7;
            }
            // Bottom
            else if(!hasLeft && !hasRight && !hasTop && hasBottom) {
                this.currentDirection += 8;
            }
            // Bottom and right
            else if(!hasLeft && hasRight && !hasTop && hasBottom) {
                this.currentDirection += 9;
            }
            // Top and bottom
            else if(!hasLeft && !hasRight && hasTop && hasBottom) {
                this.currentDirection += 10;
            }
            // Top, bottom and right
            else if(!hasLeft && hasRight && hasTop && hasBottom) {
                this.currentDirection += 11;
            }
            // Bottom and left
            else if(hasLeft && !hasRight && !hasTop && hasBottom) {
                this.currentDirection += 12;
            }
            // Left, bottom and right
            else if(hasLeft && hasRight && !hasTop && hasBottom) {
                this.currentDirection += 13;
            }
            // Top, bottom and left
            else if(hasLeft && !hasRight && hasTop && hasBottom) {
                this.currentDirection += 14;
            }
            // All sides
            else if(hasLeft && hasRight && hasTop && hasBottom) {
                this.currentDirection += 15;
            }
        }

        //#endregion

        this.ctx.imageSmoothingEnabled = false
        // if there is no drawing don't try to draw the image and crash
        if(this.drawings[this.currentDirection][this.currentFrame] === undefined) return;

        this.ctx.drawImage(this.drawings[this.currentDirection][this.currentFrame], this.drawX*this.resolution+this.offset.x,this.drawY*this.resolution+this.offset.y, this.resolution, this.resolution);

        if(parseFloat(this.drawX.toFixed(1)) !== this.x || parseFloat(this.drawY.toFixed(1)) !== this.y) {
            this.drawX+= 0.2*this.xDir
            this.drawY+= 0.2*this.yDir;
            this.isMoving = true;
            this.node.isMoving = true;
        } else {
            this.isMoving = false;
            this.node.isMoving = false;
        }

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

    public drawings: {[key: string]: any} = {}

    private gridImage: any;

    public active: boolean = true;

    public undoMoves: Array<Array<{node:Node, xP: number; yP: number, doAction: boolean}>> = [];
    public undoActions: Array<{node: Node, changeTo: any, changeOn: number}> = [];

    public doAfterMove: Array<{node: Node, newObjectName: string}> = []

    public undoStep = 0;
    public rules: Rules = new Rules(this);

    public didMoveThisStep: boolean = false;
    private readonly debug: boolean;

    constructor(canvas: Canvas, width: number, height: number, resolution: number, debug: boolean = false) {
        super(canvas)
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.debug = debug;
        this.loadAllImages()
        this.setOffset()
        this.initializeGrid(width, height)
        this.initializeDrawings();
        this.rules.updateRules()
        this.canvas.canvas.addEventListener('click', this.calculateText.bind(this));
    }

    loadAllImages() {
        for (const key of Object.keys(Objects)) {
            // this.drawings[key] = new AnimatedImage(this.canvas, key, this.resolution)
            const drawings: Array<Array<any>> = []

            const hasDirections = Objects[key].hasDirs
            const hasWalking = Objects[key].hasWalkAni

            let amountOfDirections = 0;
            if(hasDirections) {
                amountOfDirections = 24;
            }
            if(hasWalking) {
                amountOfDirections = 27;
            }
            if(Objects[key].isTileable) {
                amountOfDirections = 15;
            }

            // Give drawings a proper length to assign to
            for (let j = 0; j < amountOfDirections+1; j++) {
                drawings[j] = [];
                for (let i = 1; i < 4; i++) {
                    drawings[j][i] = undefined;
                }
            }

            // load the palette of colors
            let palette = new Image(7,5)
            palette.src = process.env.PUBLIC_URL+"/img/Palettes/default.png"
            palette.onload = () => {
                for (let j = 0; j < amountOfDirections+1; j++) {
                    for (let i = 1; i < 4; i++) {

                        // load image from public folder
                        let img = new Image(24,24);
                        if(hasWalking) {
                            img.src = process.env.PUBLIC_URL+"/img/"+key + "/" + key + "_" + j + "_" + i + '.png'
                        } else if (key.includes('text')) {
                            img.src = process.env.PUBLIC_URL+"/img/texts/" + key + "_" + j + "_" + i + '.png'
                        } else {
                            img.src = process.env.PUBLIC_URL+"/img/objects/" + key + "_" + j + "_" + i + '.png'
                        }

                        // get the palette image data
                        let canvas = document.createElement('canvas');
                        let ctx = canvas.getContext('2d');
                        if(ctx !== null) {

                        }

                        // when image is loaded change it's color to correct color
                        img.onload = () => {
                            let canvas = document.createElement('canvas');
                            let ctx = canvas.getContext('2d');
                            if(ctx !== null) {
                                ctx.imageSmoothingEnabled = false

                                ctx.drawImage(palette, 100, 100, palette.width,palette.height)
                                const paletteData = ctx.getImageData(100,100, palette.width,palette.height)

                                // get image data to change
                                ctx.drawImage(img, 0, 0, this.resolution-2, this.resolution-2)
                                const imageData = ctx.getImageData(0,0,this.resolution-2, this.resolution-2)
                                let imgData = imageData.data;

                                // get x and y for index of the palette data. "<< 2" does something * 4 but faster
                                const x = Objects[key].x;
                                const y = Objects[key].y;
                                const posForColor = (y * 7 + x) << 2;

                                // change the whites of the image to the palette color
                                for (let i =0; i < imgData.length; i += 4) {
                                    if(imgData[i] === 255) {
                                        imgData[i] = paletteData.data[posForColor]
                                        imgData[i+1] = paletteData.data[posForColor+1]
                                        imgData[i+2] = paletteData.data[posForColor+2];
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

                                drawings[j][i] = canvas2;
                                this.drawings[key] = drawings;
                            }
                        }
                    }
                }
            }
        }
    }

    setOffset() {
        this.offset = {x:Math.floor(window.innerWidth/2-(this.width/2*this.resolution)), y:Math.floor(window.innerHeight/2-(this.height/2*this.resolution))}
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
        if(this.debug) {
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
                        this.grid[y][x].nodes.push(new Node(x,y,this,"you"))
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
                    if(node.is("defeat")) {
                        if(this.grid[y][x].nodes.some(value => value.isPlayer)) {
                            for (const playerNode of this.grid[y][x].nodes.filter(value => value.isPlayer)) {
                                this.undoActions.push({node: playerNode, changeTo: playerNode.objectName, changeOn: this.undoStep+1})
                                playerNode.objectName = "";
                            }
                        }
                    }
                }
            }
        }

        for (const movedNode of movedNodes) {
            this.moveNode(movedNode.node, movedNode.xP, movedNode.yP)
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
        if(!this.active) return;
        this.ctx.clearRect(0,0,this.canvas.canvas.width,this.canvas.canvas.height)
        this.ctx.imageSmoothingEnabled = false

        this.ctx.drawImage(this.gridImage, this.offset.x, this.offset.y)
        for (let zI = 0; zI < 25; zI++) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    for (let j = 0; j < this.grid[y][x].nodes.length; j++){
                        const node = this.grid[y][x].nodes[j];
                        if(node.objectName !== "") {
                            if(Objects[node.objectName].zIndex !== zI) continue


                            const drawing = node.aniImg;
                            drawing.x = x;
                            drawing.y = y;
                            drawing.grid = this;
                            drawing.lastDirection = node.lastDirection();
                            drawing.offset = this.offset;
                            drawing.draw()
                        }
                        if(node.isText) {
                            if(Objects["text_"+node.text].zIndex !== zI) continue

                            const drawing = node.aniImg;
                            drawing.x = x;
                            drawing.y = y;
                            drawing.grid = this;
                            drawing.offset = this.offset;
                            drawing.draw()
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