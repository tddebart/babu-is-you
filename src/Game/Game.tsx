import React, {Component} from "react";
import "./Game.css"
import Canvas from "./Canvas";
import Grid from "./Grid";
import gitLogo from "../GitHub-Mark-64px.png";
import {GenerateDefault, ReadMap} from "./Reader";

export default class Game extends Component {
    static get grid(): Grid {
        return this._grid;
    }

    static set grid(value: Grid) {
        this._grid = value;
        window.addEventListener("resize", value.setOffset.bind(Game.grid))
    }
    static canvas: Canvas;
    private static _grid:Grid;
    private canMove: boolean = true;
    private justUndone: boolean = false;
    private interval!: any;
    private debug: boolean = true;

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        Game._grid = new Grid(Game.canvas, 10, 10, 70, this.debug);
        window.addEventListener("resize", Game._grid.setOffset.bind(Game._grid))
        window.addEventListener('keydown',this.keyDetectDown.bind(this),false);
        window.addEventListener('keyup',this.keyDetectUp.bind(this),false);

        GenerateDefault()

        // Detect loading with this

        // window.addEventListener('DOMContentLoaded', function() {
        //     console.log("started loading")
        // })
        // window.addEventListener(`load`, () => {
        //     console.log('i have loaded')
        // })
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
            Game._grid.moveNode(undoMove.node, undoMove.xP, undoMove.yP,false,true, true)
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
        if(e.repeat) return;
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



    render() {

        return(
            <>
                <a href="https://github.com/tddebart/babu-is-you" target="_blank" rel="noreferrer">
                    <img className={"github"} src={gitLogo} alt={"github"} />
                </a>
                <button style={{position: "absolute", top: "10px"}} onClick={() => console.log(Game._grid)}>Grid</button>
                <input type={"file"} style={{position: "absolute", left: 250, top: "10px"}} onChange={(e) => ReadMap(e)}/>
                <div id={"rules-text"} style={{position: "absolute", top: "10px", left: "10px", textAlign: "left"}}/>
                <Canvas ref={el => {
                    if(el) {
                        return Game.canvas = el;
                    }
                }}/>
            </>
        )
    }
}