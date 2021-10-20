

export default class Node {
    get isText(): boolean {
        return this._text !== "";
    }
    set text(value: string) {
        this._text = value;
        this.isPushable = true;
    }

    get text(): string {
        return this._text;
    }

    get isText_Object(): boolean {
        return objectNames.indexOf(this._text.toLowerCase()) !== -1;
    }
    get isText_Verb(): boolean {
        return verbNames.indexOf(this._text.toLowerCase()) !== -1;
    }
    get isText_Quality(): boolean {
        return qualityNames.indexOf(this._text.toLowerCase()) !== -1;
    }

    public x: number;
    public y: number;
    private _text: string = "";
    public isPlayer: boolean = false;
    public isPushable: boolean = false;
    public objectName: string = "";

    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
    }
}

const objectNames = [
    "baba",
    "keke"
]

const verbNames = [
    "is",
    "and"
]

const qualityNames = [
    "you",
    "stop"
]