import { Physics } from 'phaser';

import Helpers from '../helpers/helpers';

export default class extends Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);
    //For debugging
    this.setCollideWorldBounds(true);

    this.direction = 0;
    this.facingRight = false;
  }

  create() {
    let playerAnims = [
      {
        frameName: "run",
        start: 0,
        end: 5,
        frameRate: 10,
        repeat: -1
      },
      {
        frameName: "jump",
        start: 0,
        end: 2,
        frameRate: 10,
        repeat: -1
      },
      {
        frameName: "fall",
        start: 0,
        end: 3,
        frameRate: 10,
        repeat: -1 
      },
      {
        frameName: "idle",
        start: 0,
        end: 1,
        frameRate: 0,
        repeat: -1
      },
    ];
    Helpers().generateAnimations(playerAnims, this.scene, this.texture.key);
  }

  update(keys) {
    this.setSize(16, 40).setOrigin(1).setScale(2).setOffset(8, 24)

    this.direction = keys.D.isDown - keys.A.isDown;
    this.setVelocityX(this.direction * 100);
    //Set facing
    if (keys.A.isDown) this.facingRight = false;
    if (keys.D.isDown) this.facingRight = true;

    this.flipX = !this.facingRight;

    if (this.direction) {
      this.anims.play("run", true);
      this.setVelocityX(this.direction * 100)
    } else {
      this.setVelocityX(0)
      this.anims.play('idle', true);
    }

    //The last part of this should be changed to this.body.touching.down...
    //However, that doesn't work on collideWorldBounds
    if (keys.SPACE.isDown && this.body.velocity.y === 0) {
      this.setVelocityY(-100);
    }
    if(this.body.velocity.y < 0){
      this.anims.play('jump');
    } else if(this.body.velocity.y > 0){
      this.anims.play('fall');
      // -_- ...ugh
      this.setSize(this.frame.cutWidth, this.frame.cutHeight, false).setOffset(this.frame.x, this.frame.y).setOrigin(1);
    }
  }

}