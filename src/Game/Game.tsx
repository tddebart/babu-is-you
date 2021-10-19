import React, {Component} from "react";
import "./Game.css"
import Canvas, {Drawing} from "./Canvas";
import Grid from "./Grid";

export default class Game extends Component {
    private canvas!: Canvas | null;
    private grid!:Grid;

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (this.canvas) {
            this.grid = new Grid(this.canvas, 10, 10, 50);
            window.addEventListener("resize", this.grid.setOffset.bind(this.grid))
            window.addEventListener('keydown',this.keyDetect.bind(this),false);
            
        }
    }

    movePlayer(xP:number, yP:number) {
        // const notValidNow: any = []

        for (const pos of this.grid.playerPositions) {
            if(pos.skip) {
                pos.skip = false;
                continue
            }
            this.grid.moveNode(pos.x,pos.y,xP,yP)
            pos.skip =false;
        }

    }
    
    keyDetect(e: KeyboardEvent) {
        if(e.key === "w") {
            this.movePlayer(0,-1)
        }
        else if(e.key === "a") {
            this.movePlayer(-1,0)
        } else if(e.key === "s") {
            this.movePlayer(0,1)
        } else if(e.key === "d") {
            this.movePlayer(1,0)
        }
    }

    render() {
        return(
            <>
                <button onClick={() => console.log(this.grid)}>Grid</button>
                <Canvas ref={el => this.canvas = el}/>
            </>
        )
    }
}