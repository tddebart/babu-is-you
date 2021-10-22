
export default class Tile {
    public x:number;
    public y:number;
    private _nodes:Array<Node> = []

    get nodes(): Array<Node> {
        return this._nodes.sort((a,b) => {
            if(specialObjects.indexOf(a.objectName) !== -1 && specialObjects.indexOf(b.objectName) !== -1) {
                return 0;
            }
            if(specialObjects.indexOf(a.objectName) !== -1) {
                return 1;
            }
            if(specialObjects.indexOf(b.objectName) !== -1) {
                return -1;
            }
            return 0;
        });
    }

    set nodes(value: Array<Node>) {
        this._nodes = value;
    }

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}

export class Node {
    // Text
    get isText(): boolean {
        return this.text !== "";
    }


    get isPushable(): boolean {
        if(this.isText) return true;
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
    public text: string;
    public isPlayer: boolean = false;
    private _isPushable: boolean = false;
    public objectName: string;
    public rules: Array<string> = [];

    constructor(x:number,y:number, text:string = "", objectNames:string = "") {
        this.x = x;
        this.y = y;
        this.text = text;
        this.objectName = objectNames
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