import 'phaser';
import Snake from '../objects/snake';
import Food from '../objects/food';


export default class Main extends Phaser.Scene {
    snake: Snake;
    food: Food;
    cursors: any;

    constructor() {
        super('Main');
    }

    preload() {
        this.load.image('food', '../assets/food.png');
        this.load.image('body', '../assets/body.png');
    }
    create() {
        this.snake = new Snake(this, 8, 8);
        this.food = new Food(this, 3, 4);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(time, delta) {
        if (!this.snake.alive) {
            return;
        }


        if (this.cursors.left.isDown) {
            this.snake.faceLeft();
        } else if (this.cursors.right.isDown) {
            this.snake.faceRight();
        } else if (this.cursors.up.isDown) {
            this.snake.faceUp();
        } else if (this.cursors.down.isDown) {
            this.snake.faceDown();
        }

        if (this.snake.update(time)) {

            if (this.snake.collideWithFood(this.food)) {
                this.repositionFood();
            }
        }
    }

    repositionFood() {

        var testGrid = [];

        for (var y = 0; y < 30; y++) {
            testGrid[y] = [];

            for (var x = 0; x < 40; x++) {
                testGrid[y][x] = true;
            }
        }

        this.snake.updateGrid(testGrid);

        var validLocations = [];

        for (var y = 0; y < 30; y++) {
            for (var x = 0; x < 40; x++) {
                if (testGrid[y][x] === true) {
                    validLocations.push({ x: x, y: y });
                }
            }
        }

        if (validLocations.length > 0) {
            var pos = Phaser.Math.RND.pick(validLocations);

            this.food.setPosition(pos.x * 16, pos.y * 16);

            return true;
        }
        else {
            return false;
        }

    }
}