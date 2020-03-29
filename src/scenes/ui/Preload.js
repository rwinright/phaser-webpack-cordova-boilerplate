import { Scene } from 'phaser';

import { CST } from '../../CST';
import playerAtlas from '../../assets/player/phaser-boilerplate.json';
//The scene that loads all of the game assets and displays a progress bar.
export default class Preload extends Scene {
	constructor() {
		super({
      key: CST.SCENES.UI.PRELOAD
		});
	}

	init(){
		this.readyCount = 0;
	}

	preload() {

		const width = this.cameras.main.width;
		const height = this.cameras.main.height;

		//Add the logo image
		let logo = this.add.image(width/2, height/2 -200, 'logo');
		logo.setScale(0.1)

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();

		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 270, 320, 50);

		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});

		const percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		loadingText.setOrigin(0.5, 0.5);

		const assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});

		assetText.setOrigin(0.5, 0.5);

		// update progress bar
		this.load.on('progress', (value) => {
			percentText.setText(value * 100 + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 280, 300 * value, 30);
		});

		// update file progress text
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
		});
	 
		// remove progress bar when complete
		this.load.on('complete', () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
			this.ready();
		});

		//Load assets for the game below this
		this.load.multiatlas('player', playerAtlas, 'assets/player');

		this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
	}

	ready(){
		this.readyCount++;
		if(this.readyCount === 2){
			// this.scene.start(CST.SCENES.UI.TITLE);
			//You can override it here if you want to just skip to what you were working on.
			this.scene.start(CST.SCENES.GAME.LEVEL1);
		}
	}
}