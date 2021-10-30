import pako from 'pako';
import Game from "./Game";
import {Node} from "./Node";

class Item {
    ID: number = -1;
    Name: string = "";
    Active: boolean;
    x:number = 0;
    y:number = 0;
    Sprite: string = "";
    direction: number = 1;
    Tiling: number = -1;
    Color!: {x:number, y:number}
    zIndex: number = 13;
    Type: number = 0;


    constructor() {
        this.Active = true
    }
}

export let DefaultsById: {[key: number]: Item} = {}
export let DefaultsByName: {[key: string]: Item} = {}

export function GenerateDefault() {
    fetch(process.env.PUBLIC_URL+"/values.lua").then(
        function(res) {
            return res.text();
        }).then(function(data) {
        const lines = data.split("\n");
        for (const line of lines) {
            if(line.indexOf("tileslist =") === 0) {
                const startIndex = lines.findIndex(value => value === line);
                ReadAllObjectLines(startIndex, lines)
                Game.loadAllImages()
            }
        }
    })
}

function ReadAllObjectLines(startIndex: number, lines: Array<string>) {
    let maxID = 0;
    for (let i = startIndex+1; i < lines.length; i++) {
        let data = lines[i].trim();
        if (data === "}") {
            break;
        }
        let index = data.indexOf('=');
        if (data.length < 2 || index < 0) {
            continue;
        }
        let item = new Item()
        data = data.substring(0, index).trim();
        if (data.indexOf("object") === 0) {
            if (parseInt(data.substring(6), 10) > maxID) {
                maxID = parseInt(data.substring(6), 10);
            }
        }

        item.Name = data;

        for (let j = i+1; j < lines.length; j++) {
            let obj = lines[j].trim();
            if (obj === "},") {
                i+=j-i;
                break;
            }
            index = obj.indexOf('=');
            if (index < 0) {
                continue;
            }
            let value = obj.substring(index + 1, obj.length).trim();
            obj = obj.substring(0, index).trim().toLowerCase();
            // console.log(obj + " | " + value)
            if(value.includes("baba")) {
                value = value.replace("baba", "babu");
            }
            SetItemValue(item, obj, value);
        }
        // if (!DefaultsByName.hasOwnProperty(item.Name)) {
        //     DefaultsByObject.push(data);
        //     DefaultsByName.push(item.Name);
        //     DefaultsByID.push(item.ID);
        // }
        DefaultsById[item.ID] = item
        DefaultsByName[item.Name] = item;
    }
    // DefaultsByObject.push(Item.EMPTY.Object);
    // DefaultsByName.push(Item.EMPTY.Name);
    // DefaultsByID.push(Item.EMPTY.ID);
    // console.log(DefaultsById)

    SetupObjects();
    return maxID;
}

function SetItemValue(item: Item, obj:string, value:string) {
    switch (obj) {
        case "name": item.Name = value.substring(1, value.length - 2); break;
        case "sprite": item.Sprite = value.substring(1, value.length - 2); break;
        // case "sprite_in_root": item.SpriteInRoot = ParseBool(value); break;
        // case "type": item.Type = ParseByte(value); break;
        case "layer": item.zIndex = parseInt(value); break;
        case "colour": item.Color = CoordinateToObject(value); break;
        case "active": item.Color = CoordinateToObject(value); break;
        case "tiling": item.Tiling = parseInt(value); break;
        case "tile": item.ID = CoordinateToShort(value); break;
        case "type": item.Type = parseInt(value); break;
    }
}

function CoordinateToObject(coordinate:string): {x:number, y:number} {
    let x = parseInt(coordinate.split("")[1])
    let y = parseInt(coordinate.split("")[4])

    return {x:x,y:y}
}

function CoordinateToShort(coordinate:string): number {
    let startIndex = 0;
    let endIndex = coordinate.length;
    if (coordinate.indexOf('{') === 0) {
        startIndex++;
        endIndex--;
    }
    let index = coordinate.indexOf(',');
    if (index < 0) {
        return parseInt(coordinate);
    }
    let x = parseInt(coordinate.substring(startIndex, startIndex + (index - startIndex)));
    let y = parseInt(coordinate.substring(index + 1, index + (endIndex - index - 1)));
    return (y << 8) | x;
}

function SetupObjects() {
    for (const itemKey of Object.keys(DefaultsByName)) {
        const item = DefaultsByName[itemKey];
        if(Object.keys(Node.Objects).indexOf(item.Name) === -1) {
            Node.Objects[itemKey] = {
                x:item.Color.x,
                y:item.Color.y,
                type:item.Type,
                zIndex: item.zIndex,
                hasWalkAni: item.Tiling === 2,
                hasDirs: item.Tiling === 0,
                isTileable: item.Tiling === 1,
                spriteName:item.Sprite}
        }
    }
    // console.log(Node.Objects)
    Game.hasLoadedObjects = true;
}

//TODO: This has not been tested yet
export function ReadMapFromLocalFile(path:string) {
    fetch(path).then(
        function(res) {
            return res.text();
        }).then(function(data) {
        ReadMap(data)
    })
}

export function ReadMapFromBrowseFile(e:any) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function() {
        return ReadMap(this.result)
    }
    reader.readAsBinaryString(file);
}


export function ReadMap(result:any) {
    if(result === null || typeof result !== "string") return;
    if(result.slice(0,8) !== "ACHTUNG!") {
        console.error("Invalid map file")
        return
    }

    let hex = "";
    for (let i = 0; i < result.length; i++) {
        let byteStr = result.charCodeAt(i).toString(16);
        if (byteStr.length < 2) {
            byteStr = "0" + byteStr;
        }
        hex += " " + byteStr;
    }
    let hexArr = hex.split(" ")
    hexArr.shift();


    let position = 28;
    let layerCount = binArrayToNumb(hexArr.slice(position, position+2))
    position += 2;
    // version is assumed to be 261 (it is for all levels as far as I can tell)
    for (let i = 0; i < layerCount; i++) {
        ReadLayer(hexArr, position)
    }
}

function ReadLayer(hexArr: Array<string>, position:number) {
    const width = binArrayToNumb(hexArr.slice(position, position + 4))
    position += 4;
    const height = binArrayToNumb(hexArr.slice(position, position + 4))
    position += 4;
    console.log("Width: " + width + " Height: " + height)

    let size = width * height;
    position += 32;
    console.log(`Position should be 70 it is: ` + position)

    // let data_blocks = binArrayToNumb(hexArr.slice(position, position + 1))
    position += 1;

    // MAIN contains item information
    position += 4;

    let compressed_size = binArrayToNumb(hexArr.slice(position, position + 4))
    position += 4;
    let compressed = hexArr.slice(position, position + compressed_size)
    // position += compressed_size;

    let compArray = new Uint8Array(compressed.map(byte => parseInt(byte, 16)))

    let buffer = pako.inflate(compArray)
    let map_buffer = []
    for (let i = 0; i < buffer.length; i++) {
        const value = buffer[i]
        let tmp = value.toString(16)
        if(tmp.length === 1) {
            tmp = "0"+tmp;
        }
        map_buffer.push(tmp.toString())
    }

    let items: Array<Item> = [];
    for (let j = 0, k = 0; j < size; j++, k+=2) {
        let id = binArrayToNumb([map_buffer[k],map_buffer[k+1]])

        if(id in DefaultsById) {
            if(DefaultsById[id].Name === "edge") {
                continue;
            }
            // console.log("There is a " + DefaultsById[id].Name + " on x: " + j%width + ", y: " + Math.floor(j/width))

            // complicated thing to get copy of the class
            let item = Object.assign(Object.create(Object.getPrototypeOf(DefaultsById[id])), DefaultsById[id])
            item.x = (j%width)
            item.y = Math.floor(j/width)
            items.push(item)
        } else {
            // console.log("There is a EMPTY on x: " + j%width + ", y: " + Math.floor(j/width))
        }
    }


    //DATA contains item direction
    // position += 9
    // compressed_size = binArrayToNumb(hexArr.slice(position, position + 4))
    // position += 4;
    // compressed = hexArr.slice(position, position + compressed_size)
    // // position += compressed_size;
    //
    // compArray = new Uint8Array(compressed.map(byte => parseInt(byte, 16)))
    //
    // let dirs_buffer = pako.inflate(compArray)
    //
    // for (let j = 0; j < size; j++) {
    //     let direction = dirs_buffer[j]
    //     items[j].direction = direction;
    // }

    // console.log(items)

    let grid = Game.grid;
    grid.updateGrid(width,height)
    for (const item of items) {
        if(item.Name.includes("text")) {
            grid.grid[item.y-1][item.x-1].nodes.push(new Node(item.x-1,item.y-1,grid, item.Name.split("_")[1], "", item.direction))
        } else {
            grid.grid[item.y-1][item.x-1].nodes.push(new Node(item.x-1,item.y-1,grid,"", item.Name, item.direction));
        }

    }
    grid.rules.updateRules()
}

function binArrayToNumb(arr: Array<string>): number {
    let text = ""

    for (let i = arr.length - 1; i >= 0; i--) {
        text += arr[i];
    }

    return parseInt(text, 16)
}