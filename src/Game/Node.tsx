

export default class Node {
    // Text
    get isText(): boolean {
        return this._text !== "";
    }
    set text(value: string) {
        this._text = value;
    }

    get text(): string {
        return this._text;
    }


    get isPushable(): boolean {
        if(this.isPlayer || this.isText) return true;
        return this._isPushable;
    }

    set isPushable(value: boolean) {
        this._isPushable = value;
    }

    // Is object, verb or quality
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
    private _isPushable: boolean = false;
    public objectNames: Array<string> = [];

    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
    }
}

export const objectNames = [
    "babu",
    "keke",
    "me"
]

export const verbNames = [
    "is",
    "and"
]

export const qualityNames = [
    "you",
    "stop",
    "push"
]