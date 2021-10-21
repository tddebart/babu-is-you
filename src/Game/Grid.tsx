import Canvas, {Drawing} from "./Canvas";
import Node, {objectNames, specialObjects} from "./Node";

class AnimatedImage extends Drawing {
    public currentDirection: number = 0;
    public imageName: string;

    public drawings: Array<Array<any>> = []

    public x: number = 0;
    public y: number = 0;
    public offset!: { x: number; y: number };
    private resolution: number;

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

    public rules: Array<string> = [];

    private gridImage: any;

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
        this.updateRules()
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

                // if((x===3 && y===6)) {
                //     this.grid[y][x].text = "keke";
                // }
                // if((x===3 && y===4  )) {
                //     this.grid[y][x].text = "is";
                // }
                // if((x===5 && y===2)) {
                //     this.grid[y][x].text = "is";
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
            this.grid[gridPos.y][gridPos.x].text = text;
        }
    }

    updateRules() {
        this.rules = [];
        const grid = this.grid;
        const rulesText = document.getElementById("rules-text")
        if(rulesText != null) {
            rulesText.innerText = ""
        }
        // convert every rule in blocks on the grid into an array with rules
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const curNode = grid[y][x];
                if(curNode.isText_Object) {
                    if(grid[y][x+1].isText_Verb) {
                        if(grid[y][x+2].isText_Quality || grid[y][x+2].isText_Object) {
                            this.addRule(curNode.text + " " + grid[y][x+1].text + " " + grid[y][x+2].text)
                        }
                    }if(grid[y+1][x].isText_Verb) {
                        if(grid[y+2][x].isText_Quality || grid[y+2][x].isText_Object) {
                            this.addRule(curNode.text + " " + grid[y+1][x].text + " " + grid[y+2][x].text)
                        }
                    }
                }
            }
        }

        // Removes duplicates from rules array
        this.rules = Array.from(new Set(this.rules))

        this.resetAllNodeRules()
        for (const rule of this.rules) {
            const rules = rule.split(" ");
            const objectName = rules[0];
            const qualityName = rules[2];

            let nodesWithObjectName = [];
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (grid[y][x].objectNames.some(value => value === objectName)) {
                        nodesWithObjectName.push(grid[y][x])
                    }
                }
            }

            for (const node of nodesWithObjectName) {
                if(objectNames.indexOf(qualityName) !== -1) {
                    this.playerPositions = []
                    node.objectNames = [qualityName];
                }
                switch (qualityName) {
                    case "you": {
                        node.isPlayer = true;
                        this.playerPositions.push({x:node.x,y:node.y, skip:false});
                        break;
                    }
                    case "push": {
                        node.isPushable = true;
                        break;
                    }

                }
            }
            if(rulesText != null) {
                rulesText.innerText += rule+"\n";
            }
        }
    }

    resetAllNodeRules() {
        this.playerPositions = []
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x].isPlayer = false;
                this.grid[y][x].isPushable = false;
            }
        }
    }

    addRule(rule:string) {
        this.rules.push(rule);
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

        if(node.isPlayer) {
            this.playerPositions[plIndex].x += xP;
            this.playerPositions[plIndex].y += yP;
            this.playerPositions[plIndex].skip = true;
        }

        this.grid[y][x] = new Node(x,y);
        if(nodeObjNames.length > 1) {
            this.grid[y][x].objectNames = nodeObjNames.splice(0,nodeObjNames.length - 1)
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
                if(this.grid[y][x].isText) {
                    const drawing = this.getDrawing("text_"+this.grid[y][x].text);
                    drawing.x = x;
                    drawing.y = y;
                    drawing.offset = this.offset;
                    drawing.draw()
                }
                if(this.grid[y][x].objectNames.length > 0) {
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