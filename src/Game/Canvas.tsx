import {Component} from "react";

export class Drawing {
    public canvas: Canvas;
    public ctx: CanvasRenderingContext2D;
    public currentFrame: number = 1;
    public isAutoDrawn: boolean;
    constructor(canvas: Canvas, isAutoDrawn: boolean = true) {
        this.canvas = canvas;
        this.isAutoDrawn = isAutoDrawn;
        this.canvas.drawings.push(this);
        this.ctx = canvas.ctx;
    }

    draw() {

    }

    remove() {
        this.canvas.drawings.slice(this.canvas.drawings.indexOf(this), 1)
    }
}

export default class Canvas extends Component {

    public drawings: Array<Drawing> = []

    public canvas!: any
    public ctx! : CanvasRenderingContext2D ;

    private lastFrameTime!: number;
    public FRAMES_PER_SECOND: number = 60;
    private readonly FRAME_MIN_TIME;
    public frameTime: number = 0;


    constructor(props: any) {
        super(props);
        this.state = {}
        this.FRAME_MIN_TIME = (1000/60) * (60 / this.FRAMES_PER_SECOND) - (1000/60) * 0.5;
    }

    componentDidMount() {
        this.canvas = document.getElementById("canvas");
        this.rescaleCanvas()
        this.ctx = this.canvas!.getContext("2d")
        window.addEventListener("resize", this.rescaleCanvas)
        window.requestAnimationFrame(this.draw.bind(this))
    }

    draw(time: number) {
        const deltaTime = time - this.lastFrameTime
        if (deltaTime < this.FRAME_MIN_TIME) {
            window.requestAnimationFrame(this.draw.bind(this));
            return;
        }

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.lastFrameTime = time;

        this.frameTime+=(1/(this.FRAMES_PER_SECOND))
        let advanceFrame = false;
        if((this.frameTime % 1) > 0.200){
            this.frameTime = 0;
            advanceFrame = true;
        }

        for (const drawing of this.drawings) {
            if(drawing.isAutoDrawn) {
                drawing.draw()
            }
            if(advanceFrame) {
                if(drawing.currentFrame !== 3) {
                    drawing.currentFrame++;
                } else  {
                    drawing.currentFrame = 1;
                }
            }
        }

        window.requestAnimationFrame(this.draw.bind(this))
    }

    rescaleCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight
    }

    render() {
        return (
            <canvas id={"canvas"}/>
        )
    }
}