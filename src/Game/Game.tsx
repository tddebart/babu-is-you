import React, {Component} from "react";
import "./Game.css"
import Canvas from "./Canvas";
import Grid from "./Grid";

export default class Game extends Component {
    private canvas!: Canvas | null;
    private grid!:Grid;
    private canMove: boolean = true;

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
        for (const pos of this.grid.playerPositions) {
            if(pos.skip) {
                pos.skip = false;
                continue
            }
            this.grid.moveNode(pos.x,pos.y,xP,yP)
            pos.skip =false;
        }

        this.grid.updateRules()
        this.canMove = false;
        setTimeout(() => {this.canMove = true}, 100)
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