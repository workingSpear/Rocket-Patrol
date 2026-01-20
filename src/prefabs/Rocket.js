const { Phaser } = require("../../lib/phaser");

// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this); // adds to existing, displayList, updateList
    this.isFiring = false;    // tracks the rocket's state
    this.moveSpeed = 2;       // rocket's speed in pixels/frame
  }

  update() {
    // left/right movement
    if(!this.isFiring) {
      if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
        this.x -= this.moveSpeed;
      }
      else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width)
      {
        this.x += this.moveSpeed;
      }

      //fire
      if(Phaser.Input.Keyboard.JustDown(keyFIRE)) {
        this.isFiring = true;
      }

      // move up based on firing state
      if(this.isFiring && this.y >= borderPaddingUISize * 3 + borderPadding) {
        this.y -= this.moveSpeed;
      }

      // reset on miss
      if(this.y <= borderUISize * 3 + borderPadding) {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
      }
      
    }
  }
}