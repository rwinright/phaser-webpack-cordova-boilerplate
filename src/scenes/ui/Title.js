import 'phaser';
import { CST } from '../../CST';

export default class Title extends Phaser.Scene {

    constructor() {
        super(CST.SCENES.UI.TITLE);
    }

    init(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    preload() {

        //ADD Images for the title screen here
        // let player = this.add.image(this.width / 2, this.height / 2 - 200, 'player_run');

        let titleText = this.make.text({
            x: this.width / 2,
            y: this.height / 2,
            text: 'Title Screen',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        titleText.setOrigin(0.5, 0.5);
    }

    create() {
        this.createButton(this.width/2, this.height/2+30, "Start Game", () => this.scene.start(CST.SCENES.GAME.LEVEL1, {play: "Scene started"}));
        this.createButton(this.width/2, this.height/2+60, "Options", ()=> {console.log("Clicked Options")});
        this.createButton(this.width/2, this.height/2+90, "Exit", ()=> {console.log("Clicked Exit")});
    }

    //Export this to helpers later
    createButton(x, y, text, callback){
        const button = this.add.text(x, y, text, { fill: '#0f0' });
        button.setOrigin(0.5, 0.5);
        button.setInteractive()
            .on('pointerup', () => callback())
            .on('pointerover', () => this.enterButtonHoverState(button) )
            .on('pointerout', () => this.enterButtonRestState(button) );
        return button;
    }

    enterButtonHoverState(button) {
        button.setStyle({ fill: '#ff0'});
    }
    
    enterButtonRestState(button) {
        button.setStyle({ fill: '#0f0' });
    }
};