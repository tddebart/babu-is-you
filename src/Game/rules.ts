import Grid from "./Grid";
import {Node} from "./Node";

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
                                if(node1.isText_Verb && node1.text === "is") {

                                    let extraObjects = []

                                    // do extra and's
                                    let stop = false;
                                    let extra = 2;
                                    while(!stop) {
                                        if(x-extra > 0 && x-extra+1 > 0) {
                                            for (const node3 of grid[y][x-extra].nodes) {
                                                if(node3.isText_Object) {
                                                    for (const node4 of grid[y][x-extra+1].nodes) {
                                                        if (node4.isText_Special && node4.text === "and") {
                                                            extraObjects.push(node3.text)
                                                        } else {
                                                            stop = true;
                                                        }
                                                    }
                                                } else {
                                                    stop = true;
                                                }
                                            }
                                        } else {
                                            stop = true;
                                        }
                                        extra+=2;
                                    }

                                    // Remove duplicates
                                    extraObjects = Array.from(new Set(extraObjects))

                                    for (const node2 of grid[y][x+2].nodes) {
                                        if (node2.isText_Quality || node2.isText_Object) {
                                            for (const extraObject of extraObjects) {
                                                this.addRule(extraObject + " " + node1.text + " " + node2.text)
                                            }
                                            this.addRule(curNode.text + " " + node1.text + " " + node2.text)

                                            // do extra and's
                                            let stop2 = false;
                                            let extra2 = 3;
                                            while(!stop2) {
                                                if(x+extra2 !< this.grid.width && x+extra2+1 !< this.grid.width) {
                                                    for (const node3 of grid[y][x+extra2].nodes) {
                                                        if(node3.isText_Special && node3.text === "and") {
                                                            for (const node4 of grid[y][x+extra2+1].nodes) {
                                                                if (node4.isText_Quality || node4.isText_Object) {
                                                                    for (const extraObject of extraObjects) {
                                                                        this.addRule(extraObject + " " + node1.text + " " + node4.text)
                                                                    }
                                                                    this.addRule(curNode.text + " " + node1.text + " " + node4.text)
                                                                } else {
                                                                    stop2 = true;
                                                                }
                                                            }
                                                        } else {
                                                            stop2 = true;
                                                        }
                                                    }
                                                } else {
                                                    stop2 = true;
                                                }
                                                extra2+=2;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(y+1 !< this.grid.height && y+2 !< this.grid.height) {
                            for (const node1 of grid[y+1][x].nodes) {
                                if(node1.isText_Verb && node1.text === "is") {

                                    let extraObjects = []

                                    // do extra and's
                                    let stop = false;
                                    let extra = 2;
                                    while(!stop) {
                                        if(y-extra > 0 && y-extra+1 > 0) {
                                            for (const node3 of grid[y-extra][x].nodes) {
                                                if(node3.isText_Object) {
                                                    for (const node4 of grid[y-extra+1][x].nodes) {
                                                        if (node4.isText_Special && node4.text === "and") {
                                                            extraObjects.push(node3.text)
                                                        } else {
                                                            stop = true;
                                                        }
                                                    }
                                                } else {
                                                    stop = true;
                                                }
                                            }
                                        } else {
                                            stop = true;
                                        }
                                        extra+=2;
                                    }

                                    // Remove duplicates
                                    extraObjects = Array.from(new Set(extraObjects))


                                    for (const node2 of grid[y+2][x].nodes) {
                                        if (node2.isText_Quality || node2.isText_Object) {
                                            for (const extraObject of extraObjects) {
                                                this.addRule(extraObject + " " + node1.text + " " + node2.text)
                                            }
                                            this.addRule(curNode.text + " " + node1.text + " " + node2.text)

                                            // do extra and's
                                            let stop2 = false;
                                            let extra2 = 3;
                                            while(!stop2) {
                                                if(y+extra2 !< this.grid.height && y+extra2+1 !< this.grid.height) {
                                                    for (const node3 of grid[y+extra2][x].nodes) {
                                                        if(node3.isText_Special && node3.text === "and") {
                                                            for (const node4 of grid[y+extra2+1][x].nodes) {
                                                                if (node4.isText_Quality || node4.isText_Object) {
                                                                    for (const extraObject of extraObjects) {
                                                                        this.addRule(extraObject + " " + node1.text + " " + node4.text)
                                                                    }
                                                                    this.addRule(curNode.text + " " + node1.text + " " + node4.text)
                                                                } else {
                                                                    stop2 = true;
                                                                }
                                                            }
                                                        } else {
                                                            stop2 = true;
                                                        }
                                                    }
                                                } else {
                                                    stop2 = true;
                                                }
                                                extra2+=2;
                                            }
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
            // like is
            const verbName = rules[1];
            // like you or stop
            const qualityName = rules[2];

            let nodesWithObjectName = [];
            for (let y = 0; y < this.grid.height; y++) {
                for (let x = 0; x < this.grid.width; x++) {
                    for (let i = 0; i < this.grid.grid[y][x].nodes.length; i++) {
                        const node = this.grid.grid[y][x].nodes[i]
                        if (node.objectName === objectName && verbName === "is") {
                            nodesWithObjectName.push(node)
                        }
                    }
                }
            }

            for (const node of nodesWithObjectName) {
                if(Object.keys(Node.Objects).indexOf(qualityName) !== -1) {
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