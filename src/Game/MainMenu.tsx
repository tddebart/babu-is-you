import {Component} from "react";
import "./MainMenu.css"
import {GenerateDefault} from "./Reader";

export default class MainMenu extends Component {

    private isInMain = true;
    private isInSettings = false;
    private isInCredits = false;

    render() {
        if(this.isInMain) {
            return (
                <div className={"mainMenu"}>
                    <img className={"mainImage"} id={"mainImage"} src={process.env.PUBLIC_URL+"/mainMenu/babu-is-you.gif"} alt={"babu is you"}/>
                    <div style={{fontFamily:"arial"}}>A RECREATION OF THE GAME BABA iS YOU</div>
                    <div style={{height:"5%"}}/>
                    <img id={"start"} src={process.env.PUBLIC_URL+"/mainMenu/startGame.png"} alt={"babu is you"} onMouseEnter={
                        () => {
                            // @ts-ignore
                            document.getElementById("start").src = process.env.PUBLIC_URL+"/mainMenu/startGameSelected.png"
                        }
                    } onMouseOut={
                        () => {
                            // @ts-ignore
                            document.getElementById("start").src = process.env.PUBLIC_URL+"/mainMenu/startGame.png"
                        }
                    } onClick={
                        () => {
                            this.isInMain = false;
                            GenerateDefault();
                            this.forceUpdate();
                        }
                    }/>
                    <br/>
                    <img id={"settings"} src={process.env.PUBLIC_URL+"/mainMenu/settings.png"} alt={"babu is you"} onMouseEnter={
                        () => {
                            // @ts-ignore
                            document.getElementById("settings").src = process.env.PUBLIC_URL+"/mainMenu/settingsSelected.png"
                        }
                    } onMouseOut={
                        () => {
                            // @ts-ignore
                            document.getElementById("settings").src = process.env.PUBLIC_URL+"/mainMenu/settings.png"
                        }
                    } onClick={
                        () => {
                            this.isInMain = false;
                            this.isInSettings = true;
                            this.forceUpdate();
                        }
                    }/>
                    <br/>
                    <img id={"credits"} src={process.env.PUBLIC_URL+"/mainMenu/credits.png"} alt={"babu is you"} onMouseEnter={
                        () => {
                            // @ts-ignore
                            document.getElementById("credits").src = process.env.PUBLIC_URL+"/mainMenu/creditsSelected.png"
                        }
                    } onMouseOut={
                        () => {
                            // @ts-ignore
                            document.getElementById("credits").src = process.env.PUBLIC_URL+"/mainMenu/credits.png"
                        }
                    } onClick={
                        () => {
                            this.isInMain = false;
                            this.isInCredits = true;
                            this.forceUpdate();
                        }
                    }/>
                </div>
            );
        } else if(this.isInSettings) {
            return (
                <div className={"mainMenu"}>
                    <h1>Settings</h1>

                    {/*grid button on */}
                    {localStorage.getItem("grid") === "true" &&
                    <img style={{display: "inline-block"}} id={"grid"} src={process.env.PUBLIC_URL+"/mainMenu/gridOn.png"} alt={"grid"} onMouseEnter={
                        () => {
                            // @ts-ignore
                            document.getElementById("grid").src = process.env.PUBLIC_URL+"/mainMenu/gridOnSelected.png"
                        }
                    } onMouseOut={
                        () => {
                            // @ts-ignore
                            document.getElementById("grid").src = process.env.PUBLIC_URL+"/mainMenu/gridOn.png"
                        }
                    } onClick={
                        () => {
                            localStorage.setItem("grid", localStorage.getItem("grid") === "true" ? "false" : "true");
                            this.forceUpdate();
                        }
                    }/>
                    }

                    {/*grid button off */}
                    {localStorage.getItem("grid") === "false" &&
                    <img style={{display: "inline-block"}} id={"grid"} src={process.env.PUBLIC_URL+"/mainMenu/grid.png"} alt={"grid"} onMouseEnter={
                        () => {
                            // @ts-ignore
                            document.getElementById("grid").src = process.env.PUBLIC_URL+"/mainMenu/gridSelected.png"
                        }
                    } onMouseOut={
                        () => {
                            // @ts-ignore
                            document.getElementById("grid").src = process.env.PUBLIC_URL+"/mainMenu/grid.png"
                        }
                    } onClick={
                        () => {
                            localStorage.setItem("grid", localStorage.getItem("grid") === "true" ? "false" : "true");
                            this.forceUpdate();
                        }
                    }/>
                    }


                    <img id={"return"} src={process.env.PUBLIC_URL+"/mainMenu/return.png"} alt={"return"} onMouseEnter={
                        () => {
                            // @ts-ignore
                            document.getElementById("return").src = process.env.PUBLIC_URL+"/mainMenu/returnSelected.png"
                        }
                    } onMouseOut={
                        () => {
                            // @ts-ignore
                            document.getElementById("return").src = process.env.PUBLIC_URL+"/mainMenu/return.png"
                        }
                    } onClick={
                        () => {
                            this.isInSettings = false;
                            this.isInMain = true;
                            this.forceUpdate()
                        }
                    }/>
                </div>
            )
        } else if (this.isInCredits) {
            return (
                <div className={"mainMenu"}>
                    <h1>Credits</h1>
                    <p className={"creditsText"} style={{width:"30%", textAlign:"center"}}>All sprites and level design are not mine and i don't claim they are mine they are from the original creator of baba is you which this game is a recreation of</p>
                    <img id={"return"} src={process.env.PUBLIC_URL+"/mainMenu/return.png"} alt={"babu is you"} onMouseEnter={
                        () => {
                            // @ts-ignore
                            document.getElementById("return").src = process.env.PUBLIC_URL+"/mainMenu/returnSelected.png"
                        }
                    } onMouseOut={
                        () => {
                            // @ts-ignore
                            document.getElementById("return").src = process.env.PUBLIC_URL+"/mainMenu/return.png"
                        }
                    } onClick={
                        () => {
                            this.isInCredits = false;
                            this.isInMain = true;
                            this.forceUpdate();
                        }
                    }/>
                </div>
            )
        } else {
            return(
                <div className={"mainMenu"} style={{display: "none"}}/>
            )
        }
    }
}