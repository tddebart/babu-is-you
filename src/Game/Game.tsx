import React, {Component} from "react";
import "./Game.css"
import Canvas, {Drawing} from "./Canvas";
import Grid from "./Grid";
import gitLogo from "../GitHub-Mark-64px.png";
import {GenerateDefault, ReadMapFromBrowseFile} from "./Reader";
import {Node} from "./Node";

export default class Game extends Component {
    static get hasFullyLoaded(): boolean {
        if(Game.debug) {
            return true
        }
        return Object.keys(Game.drawings).length === Object.keys(Node.Objects).length-1
    }
    static get grid(): Grid {
        return this._grid;
    }

    static set grid(value: Grid) {
        this._grid = value;
        window.addEventListener("resize", value.updateScreenScalings.bind(Game.grid))
    }
    static canvas: Canvas;
    private static _grid:Grid;
    static drawings: {[key: string]: any} = {}
    private canMove: boolean = true;
    private justUndone: boolean = false;
    private interval!: any;
    static debug: boolean = true
    static resolution: number = 50;

    static hasLoadedObjects: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            percentage: 0
        }
    }

    componentDidMount() {
        Game._grid = new Grid(Game.canvas, 10, 10, Game.resolution, Game.debug);
        window.addEventListener("resize", Game._grid.updateScreenScalings.bind(Game._grid))
        window.addEventListener('keydown',this.keyDetectDown.bind(this),false);
        window.addEventListener('keyup',this.keyDetectUp.bind(this),false);

        GenerateDefault();
    }

    movePlayers(xP:number, yP:number) {
        if(!this.canMove) return;
        if(Game._grid.playerPositions.length !== 0) {
            Game._grid.undoMoves.length = Game._grid.undoStep;
            if (Game._grid.undoMoves.length > 50) {
                Game._grid.undoMoves.shift();
                Game._grid.undoStep--
            }
            let doExtra = 0;
            for (const pos of Game._grid.playerPositions) {
                if (pos.skip) {
                    pos.skip = false;
                    continue
                }
                const findPlayerNode = Game._grid.grid[pos.y][pos.x].nodes.find(v => v.isPlayer);
                if(findPlayerNode != null) {
                    if(!Game._grid.moveNode(findPlayerNode, xP, yP)) doExtra++;
                    pos.skip = false;
                }
            }
            Game._grid.doMovement();
            Game._grid.rules.updateRules()
            let howManyRulesNotYou = 0;
            for (const rule of Game._grid.rules.rules) {
                if(rule.split(" ")[2] !== "you") {
                    howManyRulesNotYou++;
                }
            }

            if(doExtra !== Game._grid.playerPositions.length || howManyRulesNotYou === Game._grid.rules.rules.length || Game._grid.didMoveThisStep) {
                Game._grid.undoStep++
                Game._grid.didMoveThisStep = false;
            }

            if(Game._grid.doAfterMove.length !== 0) {
                for (const doAfterMove of Game._grid.doAfterMove) {
                    doAfterMove.node.objectName = doAfterMove.newObjectName;
                }
                Game._grid.rules.resetAllNodeRules()
            }
            Game._grid.rules.updateRules()

            this.canMove = false;

            setTimeout(() => {
                this.canMove = true
            }, 100)
        }
    }

    undoMoves() {
        if(Game._grid.undoStep-1 < 0) return;
        this.canMove = false
        if(Game._grid.undoMoves.length < Game._grid.undoStep) {
            console.error("Could not do undo with: " + Game._grid.undoMoves + " and " + Game._grid.undoStep);
            return
        }
        const undoMoves = Game._grid.undoMoves[Game._grid.undoStep-1].slice()
        for (let i = undoMoves.length-1; i >= 0; i--) {
            const undoMove = undoMoves[i]
            Game._grid.moveNode(undoMove.node, undoMove.xP, undoMove.yP,false,true, true, true)
            for (const undoAction of Game._grid.undoActions) {
                if(undoAction.changeOn === Game._grid.undoStep) {
                    undoAction.node.objectName = undoAction.changeTo;
                    Game._grid.doAfterMove = []
                }
            }
        }
        Game._grid.rules.updateRules()
        Game._grid.undoStep--;
        this.justUndone = true;
        this.canMove = true;
    }

    keyDetectDown(e: KeyboardEvent) {
        if(e.repeat || !Game.hasFullyLoaded) return;
        if(this.interval !== undefined) return;
        if(e.key === "w") {
            this.movePlayers(0,-1)
            this.interval = setInterval(() => this.movePlayers(0,-1), 150)
        }
        else if(e.key === "a") {
            this.movePlayers(-1,0)
            this.interval = setInterval(() => this.movePlayers(-1,0), 150)
        } else if(e.key === "s") {
            this.movePlayers(0,1)
            this.interval = setInterval(() => this.movePlayers(0,1), 150)
        } else if(e.key === "d") {
            this.movePlayers(1,0)
            this.interval = setInterval(() => this.movePlayers(1,0), 150)
        }
        else if(e.key === "z") {
            this.undoMoves();
            this.interval = setInterval(() => this.undoMoves(), 200)
        }
    }
    keyDetectUp(e: KeyboardEvent) {
        if(e.repeat) return;
        clearInterval(this.interval)
        this.interval = undefined
    }

    static loadAllImages() {
        // load the palette of colors
        let palette = new Image(7,5)
        palette.src = process.env.PUBLIC_URL+"/img/Palettes/default.png"
        palette.onload = () => {
            for (const key of Object.keys(Node.Objects)) {
                if(!tempDraw.some(value => key.includes(value))) continue;
                const localDrawings: Array<Array<any>> = []

                const hasDirections = Node.Objects[key].hasDirs
                const hasWalking = Node.Objects[key].hasWalkAni

                let amountOfDirections = 0;
                if(hasDirections) {
                    amountOfDirections = 24;
                }
                if(hasWalking) {
                    amountOfDirections = 27;
                }
                if(Node.Objects[key].isTileable) {
                    amountOfDirections = 15;
                }

                // Give drawings a proper length to assign to
                for (let j = 0; j < amountOfDirections+1; j++) {
                    localDrawings[j] = [];
                    for (let i = 1; i < 4; i++) {
                        localDrawings[j][i] = undefined;
                    }
                }

                for (let j = 0; j < amountOfDirections+1; j++) {
                    for (let i = 1; i < 4; i++) {

                        // load image from public folder
                        let img = new Image(24,24);
                        if (key.includes('text')) {
                            img.src = process.env.PUBLIC_URL+"/img/texts/" + Node.Objects[key].spriteName + "_" + j + "_" + i + '.png'
                        } else {
                            img.src = process.env.PUBLIC_URL+"/img/objects/" + Node.Objects[key].spriteName + "_" + j + "_" + i + '.png'
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
                                ctx.drawImage(img, 0, 0, 24, 24)
                                const imageData = ctx.getImageData(0,0,24, 24)
                                let imgData = imageData.data;

                                // get x and y for index of the palette data. "<< 2" does something * 4 but faster
                                const x = Node.Objects[key].x;
                                const y = Node.Objects[key].y;
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

                                localDrawings[j][i] = canvas2;
                                Game.drawings[key] = localDrawings;
                                document.getElementById("loading")!.textContent = "LOADING\n" + ((Object.keys(Game.drawings).length / (Object.keys(Node.Objects).length-1)) * 100).toFixed(2) + "%"
                                setTimeout(() => {
                                    if(Game.hasFullyLoaded) {
                                        document.getElementById("loading")!.style.animation = "loadingDone 1s linear";
                                        document.getElementById("loading")!.style.animationFillMode = "forwards"
                                        Game.grid.rules.updateRules();
                                        return;
                                    }
                                }, 100)
                            }
                        }
                    }
                }
            }
        }
    }

    render() {
        return(
            <>
                <div id={"loading"} className={"loading"}>LOADING 0%</div>

                <a href="https://github.com/tddebart/babu-is-you" target="_blank" rel="noreferrer">
                    <img className={"github"} src={gitLogo} alt={"github"} />
                </a>
                <button style={{position: "absolute", top: "10px"}} onClick={() => console.log(Game._grid)}>Grid</button>
                <input type={"file"} style={{position: "absolute", left: 250, top: "10px"}} onChange={(e) => ReadMapFromBrowseFile(e)}/>
                <label style={{position: "absolute", left: 250, top: 25, fontSize: 20}}>{"Load a world (.l file)"}</label>

                <div id={"rules-text"} style={{position: "absolute", top: "10px", left: "10px", textAlign: "left"}}/>
                <Canvas ref={el => {
                    if(el) {
                        return Game.canvas = el
                    }
                }}/>
            </>
        )
    }
}

const tempDraw = [
    "babu",
    "keke",
    "wall",
    "is",
    "you",
    "rock",
    "flag",
    "win",
    "push",
    "stop",
    "melt",
    "hot",
    "sink",
    "water",
    "lava",
]

export class AnimatedImage extends Drawing {
    public currentDirection: number = 0;
    public lastDirection: number = 1;
    public extraWalking: number = 0;

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
    public resolution: number;
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
        this.resolution = Game.resolution;

        this.x = x;
        this.xLastFrame = this.x;
        this.drawX = x;

        this.y = y;
        this.yLastFrame = this.y;
        this.drawY = y;

        this.hasDirections = Node.Objects[this.imageName].hasDirs
        this.hasWalking = Node.Objects[this.imageName].hasWalkAni
    }

    draw() {
        this.drawings = Game.drawings[this.imageName];

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
        if(Node.Objects[this.imageName].isTileable && !this.isMoving) {
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