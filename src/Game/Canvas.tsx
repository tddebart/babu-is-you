import {Component} from "react";

export class Drawing {
    public canvas: Canvas;
    public ctx: CanvasRenderingContext2D;
    constructor(canvas: Canvas) {
        this.canvas = canvas;
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
    private readonly FRAME_MIN_TIME;


    constructor(props: any) {
        super(props);
        this.state = {}
        const FRAMES_PER_SECOND = 60;
        this.FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
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
        for (const drawing of this.drawings) {
            drawing.draw()
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