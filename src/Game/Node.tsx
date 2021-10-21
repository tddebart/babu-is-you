

export default class Node {
    // Text
    get isText(): boolean {
        return this.text !== "";
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
        return objectNames.indexOf(this.text.toLowerCase()) !== -1;
    }
    get isText_Verb(): boolean {
        return verbNames.indexOf(this.text.toLowerCase()) !== -1;
    }
    get isText_Quality(): boolean {
        return qualityNames.indexOf(this.text.toLowerCase()) !== -1;
    }

    is(rule: string): boolean {
        return this.rules.indexOf(rule) !== -1;
    }

    public x: number;
    public y: number;
    public text: string = "";
    public isPlayer: boolean = false;
    private _isPushable: boolean = false;
    public objectNames: Array<string> = [];
    public rules: Array<string> = [];

    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
    }
}

export const specialObjects = [
    "babu",
    "keke",
    "me"
]

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
    "push",
    "stop",
]