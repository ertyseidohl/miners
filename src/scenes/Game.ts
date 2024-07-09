import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameMap : Uint8Array;

    public static readonly MAP_WIDTH = 100;
    public static readonly MAP_HEIGHT = 100;
    public static readonly TOWN_HEIGHT = 5;
    public static readonly VALLEY_HEIGHT = 5;

    // Materials
    public static readonly MATERIAL_UNKNOWN = 0;
    public static readonly MATERIAL_AIR = 1;
    public static readonly MATERIAL_ROCK_SOLID = 2;


    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.generateMap()

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }

    generateMap() {
        this.gameMap = new Uint8Array(Game.MAP_WIDTH * Game.MAP_HEIGHT)

        // Generate air
        this.gameMap.fill(Game.MATERIAL_AIR, 0, Game.TOWN_HEIGHT * Game.MAP_WIDTH)

        // Generate rock
        this.gameMap.fill(
            Game.MATERIAL_ROCK_SOLID,
            Game.TOWN_HEIGHT * Game.MAP_WIDTH,
            (Game.MAP_HEIGHT - Game.VALLEY_HEIGHT) * Game.MAP_WIDTH)

        // Generate valley of the dead
        this.gameMap.fill(
            Game.MATERIAL_AIR,
            (Game.MAP_HEIGHT - Game.VALLEY_HEIGHT) * Game.MAP_WIDTH,
            Game.MAP_HEIGHT * Game.MAP_WIDTH
        )

        // Defensive coding: make sure we have no empty spaces
        for (let i = 0; i < this.gameMap.length; i++) {
            if (this.gameMap[i] == Game.MATERIAL_UNKNOWN) {
                console.log(this.gameMap)
                throw new Error("Found MATERIAL_UNKNOWN at index " + i)
            }
        }
    }
}
