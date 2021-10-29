import Grid from "./Grid";
import {Objects} from "./Node";

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
                for (let i = 0; i < grid[y][x].nodes.length; i++) {
                    const curNode = grid[y][x].nodes[i];
                    if(curNode.isText_Object) {
                        if(x+1 !< this.grid.width && x+2 !< this.grid.width) {
                            for (const node1 of grid[y][x+1].nodes) {
                                if(node1.isText_Verb) {
                                    for (const node2 of grid[y][x+2].nodes) {
                                        if (node2.isText_Quality || node2.isText_Object) {
                                            this.addRule(curNode.text + " " + node1.text + " " + node2.text)
                                        }
                                    }
                                }
                            }
                        }
                        if(y+1 !< this.grid.height && y+2 !< this.grid.height) {
                            for (const node1 of grid[y+1][x].nodes) {
                                if(node1.isText_Verb) {
                                    for (const node2 of grid[y+2][x].nodes) {
                                        if (node2.isText_Quality || node2.isText_Object) {
                                            this.addRule(curNode.text + " " + node1.text + " " + node2.text)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Removes duplicates from rules array
        this.rules = Array.from(new Set(this.rules))

        this.resetAllNodeRules()

        // go though every rule
        for (const rule of this.rules) {
            const rules = rule.split(" ");
            // like baba
            const objectName = rules[0];
            // like you or stop
            const qualityName = rules[2];

            let nodesWithObjectName = [];
            for (let y = 0; y < this.grid.height; y++) {
                for (let x = 0; x < this.grid.width; x++) {
                    for (let i = 0; i < this.grid.grid[y][x].nodes.length; i++) {
                        const node = this.grid.grid[y][x].nodes[i]
                        if (node.objectName === objectName) {
                            nodesWithObjectName.push(node)
                        }
                    }
                }
            }

            for (const node of nodesWithObjectName) {
                if(Object.keys(Objects).indexOf(qualityName) !== -1) {
                    // this.grid.playerPositions = []

                    this.grid.undoActions.push({node: node, changeTo: node.objectName, changeOn: this.grid.undoStep+1})

                    this.grid.doAfterMove.push({node: node, newObjectName: qualityName })
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
                for (let i = 0; i < grid[y][x].nodes.length; i++) {
                    const node = grid[y][x].nodes[i]
                    node.isPlayer = false;
                    node.isPushable = false;
                    node.rules = [];
                }
            }
        }
    }

    addRule(rule:string) {
        this.rules.push(rule);
    }
}