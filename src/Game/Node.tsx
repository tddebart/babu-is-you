
export default class Tile {
    public x:number;
    public y:number;
    private _nodes:Array<Node> = []

    get nodes(): Array<Node> {
        return this._nodes.sort((a,b) => {
            if(objectsWithWalking.indexOf(a.objectName) !== -1 && objectsWithWalking.indexOf(b.objectName) !== -1) {
                return 0;
            }
            if(objectsWithWalking.indexOf(a.objectName) !== -1) {
                return 1;
            }
            if(objectsWithWalking.indexOf(b.objectName) !== -1) {
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

    lastDirection():number {
        if(this.xP === 0 && this.yP === -1) {
            this._lastDirection = 0;
            return 0;
        }
        if(this.xP === 1 && this.yP === 0) {
            this._lastDirection = 1;
            return 1;
        }
        if(this.xP === 0 && this.yP === 1) {
            this._lastDirection = 2;
            return 2;
        }
        if(this.xP === -1 && this.yP === 0) {
            this._lastDirection = 3;
            return 3;
        }
        return this._lastDirection;
    }

    directionToXAndY(direction: number): {xP:number, yP:number} {
        if(direction === 0) {
            return {xP: 0, yP: -1}
        }
        if(direction === 1) {
            return {xP: 1, yP: 0}
        }
        if(direction === 2) {
            return {xP: 0, yP: 1}
        }
        if(direction === 3) {
            return {xP: -1, yP: 0}
        }
        return {xP: 0, yP: 0}
    }

    public x: number;
    public y: number;
    public text: string;
    public isPlayer: boolean = false;
    private _isPushable: boolean = false;
    public objectName: string;
    public rules: Array<string> = [];
    private _lastDirection: number = 1;

    xP: number = 0;
    yP: number = 0;

    constructor(x:number,y:number, text:string = "", objectName:string = "", startDirection:number = 1) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.objectName = objectName
        if(startDirection === 1 && objectsWithDirections.indexOf(objectName) !== -1) {
            this._lastDirection = 2;
        } else {
            this._lastDirection = startDirection;
        }
    }
}

export const objectColors: {[key:string]: {x:number, y:number}} = {
    "keke": {x:2,y:2},
    "text_keke": {x:2,y:2},
    "me": {x:3,y:1},
    "text_me": {x:3,y:1},
    "text_babu": {x:4,y:1},
    "text_you": {x:4,y:1},
    "skull": {x:2,y:1},
    "text_push": {x:6,y:1},
    "text_stop": {x:5,y:1},
    "text_is": {x:0,y:3},
    "babu": {x:0,y:3},
    "belt": {x:1,y:1},
    "text_belt": {x:1,y:3},
    "text_shift": {x:1,y:3},
}

export const objectsWithDirections = [
    "skull",
    "belt",
]

export const objectsWithWalking = [
    "babu",
    "keke",
    "me",
]

export const objectNames = [
    "babu",
    "keke",
    "me",
    "skull",
    "belt",
]

export const verbNames = [
    "is",
    "and"
]

export const qualityNames = [
    "you",
    "push",
    "stop",
    "shift"
]