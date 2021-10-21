import React, {Component} from "react";
import "./Game.css"
import Canvas from "./Canvas";
import Grid from "./Grid";

export default class Game extends Component {
    private canvas!: Canvas | null;
    private grid!:Grid;
    private canMove: boolean = true;
    private justUndone: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (this.canvas) {
            this.grid = new Grid(this.canvas, 10, 10, 70);
            window.addEventListener("resize", this.grid.setOffset.bind(this.grid))
            window.addEventListener('keydown',this.keyDetectDown.bind(this),false);
        }
    }

    movePlayers(xP:number, yP:number) {
        if(!this.canMove) return;
        if(this.grid.playerPositions.length !== 0) {
            this.grid.undoMoves.length = this.grid.undoStep;
            if (this.grid.undoMoves.length > 50) {
                this.grid.undoMoves.shift();
                this.grid.undoStep--
            }
            let doExtra = 0;
            for (const pos of this.grid.playerPositions) {
                if (pos.skip) {
                    pos.skip = false;
                    continue
                }
                if(!this.grid.moveNode(pos.x, pos.y, xP, yP)) doExtra++;
                pos.skip = false;
            }

            this.grid.rules.updateRules()
            if(doExtra !== this.grid.playerPositions.length) {
                this.grid.undoStep++;
            }
            this.canMove = false;
            setTimeout(() => {
                this.canMove = true
            }, 100)
        }
    }

    undoMoves() {
        if(this.grid.undoStep-1 < 0) return;
        this.canMove = false
        if(this.grid.undoMoves.length < this.grid.undoStep) {
            console.error("Could not do undo with: " + this.grid.undoMoves + " and " + this.grid.undoStep);
            return
        }
        const undoMoves = this.grid.undoMoves[this.grid.undoStep-1].slice()
        for (let i = undoMoves.length-1; i >= 0; i--) {
            const undoMove = undoMoves[i]
            this.grid.moveNode(undoMove.x,undoMove.y, undoMove.xP, undoMove.yP,false,true)
        }
        //TODO: when baba turns into keke should turn back
        this.grid.rules.updateRules()
        this.grid.undoStep--;
        this.justUndone = true;
        this.canMove = true;
    }
    
    keyDetectDown(e: KeyboardEvent) {
        if(e.key === "w") {
            this.movePlayers(0,-1)
        }
        else if(e.key === "a") {
            this.movePlayers(-1,0)
        } else if(e.key === "s") {
            this.movePlayers(0,1)
        } else if(e.key === "d") {
            this.movePlayers(1,0)
        }
        else if(e.key === "z") {
            this.undoMoves();
        }
    }

    render() {
        return(
            <>
                <button style={{position: "absolute", top: "10px"}} onClick={() => console.log(this.grid)}>Grid</button>
                <div id={"rules-text"} style={{position: "absolute", top: "10px", left: "10px", textAlign: "left"}}/>
                <Canvas ref={el => this.canvas = el}/>
            </>
        )
    }
}