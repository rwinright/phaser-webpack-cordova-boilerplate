
import { Scene } from 'phaser';
import Logo from '../../assets/logos/logo.png';
import { CST } from '../../CST'

//The scene that displays the game studio logo/name
export default class BootScene extends Scene {
  constructor() {
    super({ 
      key: CST.SCENES.UI.BOOT
    });
  }
  preload(){
    //Add image for boot screen here
    this.load.image('logo', Logo);
  }

  create(){
    this.scene.start(CST.SCENES.UI.PRELOAD)
  }
}