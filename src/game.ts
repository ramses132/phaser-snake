import Main from './scenes/main'

import 'phaser';

var config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#bfcc00',
    parent: 'phaser-snake',
    scene: [Main,]
}

export function boot() {
    return new Phaser.Game(config);
}

boot();