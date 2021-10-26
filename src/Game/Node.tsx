
export default class Tile {
    public x:number;
    public y:number;
    private _nodes:Array<Node> = []

    get nodes(): Array<Node> {
        return this._nodes.sort((a,b) => {

            if(a.zIndex > b.zIndex) {
                return 1;
            }
            if(a.zIndex < b.zIndex) {
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

    get zIndex(): number {
        if(this.objectName === "") {
            return Objects["text_"+this.text].zIndex
        } else {
            return Objects[this.objectName].zIndex
        }
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
        if(startDirection === 1 && objectName === "" ? false : Objects[objectName].hasDirs) {
            this._lastDirection = 2
        } else {
            this._lastDirection = startDirection;
        }
    }
}

export const Objects: {[key:string]: {x:number, y:number, zIndex:number, hasWalkAni: boolean, hasDirs: boolean, isTileable: boolean}} = {
    "babu":         {x:0,y:3, zIndex:24, hasWalkAni: true, hasDirs: false, isTileable: false},
    "text_babu":    {x:4,y:1, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "keke":         {x:2,y:2, zIndex:24, hasWalkAni: true, hasDirs: false, isTileable: false},
    "text_keke":    {x:2,y:2, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "me":           {x:3,y:1, zIndex:24, hasWalkAni: true, hasDirs: false, isTileable: false},
    "text_me":      {x:3,y:1, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "text_you":     {x:4,y:1, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "skull":        {x:2,y:1, zIndex:21, hasWalkAni: false, hasDirs: true, isTileable: false},
    "text_push":    {x:6,y:1, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "text_stop":    {x:5,y:1, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "text_is":      {x:0,y:3, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "belt":         {x:1,y:1, zIndex:24, hasWalkAni: false, hasDirs: true, isTileable: false},
    "text_belt":    {x:1,y:3, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "text_shift":   {x:1,y:3, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "text_move":    {x:5,y:3, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "text_defeat":  {x:2,y:1, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
    "wall":         {x:1,y:1, zIndex:13, hasWalkAni: false, hasDirs: false, isTileable: true},
    "text_wall":    {x:0,y:1, zIndex:24, hasWalkAni: false, hasDirs: false, isTileable: false},
}

export const objectNames = [
    "babu",
    "keke",
    "me",
    "skull",
    "belt",
    "wall"
]

export const verbNames = [
    "is",
    "and"
]

export const qualityNames = [
    "you",
    "push",
    "stop",
    "defeat",
    "move",
    "shift"
]