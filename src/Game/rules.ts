import Grid from "./Grid";
import {objectNames} from "./Node";

export default class Rules {
    public grid: Grid;
    public rules: Array<string> = [];

    constructor(grid: Grid) {
        this.grid = grid;
    }

    updateRules() {
        this.rules = [];
        const grid = this.grid.grid;
        const rulesText = document.getElementById("rules-text")
        if(rulesText != null) {
            rulesText.innerText = ""
        }
        // convert every rule in blocks on the grid into an array with rules
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                const curNode = grid[y][x];
                if(curNode.isText_Object) {
                    if(x+1 !< this.grid.width && x+2 !< this.grid.width) {
                        if(grid[y][x+1].isText_Verb) {
                            if(grid[y][x+2].isText_Quality || grid[y][x+2].isText_Object) {
                                this.addRule(curNode.text + " " + grid[y][x+1].text + " " + grid[y][x+2].text)
                            }
                        }
                    }
                    if(y+1 !< this.grid.height && y+2 !< this.grid.height) {
                        if (grid[y + 1][x].isText_Verb) {
                            if (grid[y + 2][x].isText_Quality || grid[y + 2][x].isText_Object) {
                                this.addRule(curNode.text + " " + grid[y + 1][x].text + " " + grid[y + 2][x].text)
                            }
                        }
                    }
                }
            }
        }

        // Removes duplicates from rules array
        this.rules = Array.from(new Set(this.rules))

        this.resetAllNodeRules()
        for (const rule of this.rules) {
            const rules = rule.split(" ");
            const objectName = rules[0];
            const qualityName = rules[2];

            let nodesWithObjectName = [];
            for (let y = 0; y < this.grid.height; y++) {
                for (let x = 0; x < this.grid.width; x++) {
                    if (grid[y][x].objectNames.some(value => value === objectName)) {
                        nodesWithObjectName.push(grid[y][x])
                    }
                }
            }

            for (const node of nodesWithObjectName) {
                if(objectNames.indexOf(qualityName) !== -1) {
                    // this.grid.playerPositions = []

                    this.grid.undoActions.push({node: node, changeTo: node.objectNames, changeOn: this.grid.undoStep+1})

                    this.grid.doAfterMove.push({node: node, newObjectName: [qualityName]})
                }
                switch (qualityName) {
                    case "you": {
                        node.isPlayer = true;
                        this.grid.playerPositions.push({x:node.x,y:node.y, skip:false});
                        break;
                    }
                    case "push": {
                        node.isPushable = true;
                        break;
                    }
                    default: {
                        node.rules.push(qualityName)
                        break;
                    }

                }
            }
            if(rulesText != null) {
                rulesText.innerText += rule+"\n";
            }
        }
    }

    resetAllNodeRules() {
        this.grid.playerPositions = []
        const grid = this.grid.grid;
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                grid[y][x].isPlayer = false;
                grid[y][x].isPushable = false;
                grid[y][x].rules = [];
            }
        }
    }

    addRule(rule:string) {
        this.rules.push(rule);
    }
}