import {Component} from "react";
import "./LevelSelect.css"
import {ReadMapFromLocalFile} from "./Reader";

export default class LevelSelect extends Component {

    worldLevel = 0;
    private worldMap!: HTMLImageElement;
    private gridLevel!: HTMLDivElement;

    render() {
        let levels = [];
        for (let i = 0; i < 6; i++) {
            levels.push(
                <div className={"gridItem"} onClick={() => {
                ReadMapFromLocalFile(process.env.PUBLIC_URL+"/custom_levels/"+i+"level.l")
                this.worldMap.style.display = "none";
                this.gridLevel.style.display = "none"
            }}>{"level " + i}</div>
            )
        }

        return (
            <>
                <div className={"worldMap"}>
                    <img id={"worldMap"} className={"worldMap"} src={process.env.PUBLIC_URL+"/worldMap/worldMapMain.gif"} alt={""} ref={el => {
                        if(el) {
                            return this.worldMap = el
                        }
                    }}/>

                    <div id={"gridLevels"} className={"grid"} ref={el => {
                        if(el) {
                            return this.gridLevel = el
                        }
                    }}>
                        {levels}
                    </div>
                </div>
            </>
        )
        // if(this.worldLevel === 0) {
        // }
    }
}