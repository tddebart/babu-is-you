

export default class Node {
    get isText(): boolean {
        return this._isText;
    }

    set isText(value: boolean) {
        this._isText = value;
        if(value) {
            this.isPushable = value;
        }
    }

    public x: number;
    public y: number;
    public text: string;
    public isPlayer: boolean = false;
    private _isText: boolean = false;
    public isPushable: boolean = false;

    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
        this.text = x + " | " + y
    }
}