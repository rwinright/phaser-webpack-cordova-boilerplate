import { Scene, Cameras } from "phaser";
import { CST } from "../../CST";
import Player from "../../sprites/Player";

export default class Level1 extends Scene{
  constructor(){
    super({key: CST.SCENES.GAME.LEVEL1})
  }

  init(data) {
    console.log(data.play);
  }

  create(){
    console.log("Level 1 Open")
    this.player = new Player(this, 400, 400, 'player');
    this.player.create();
		// this.keys = this.input.keyboard.addKeys("W, S, A, D, P, E, Q, SPACE");
  }

  update(){
    this.player.update();
  }
}