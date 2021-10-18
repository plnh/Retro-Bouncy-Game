import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import Game from './scenes/Game'
import GameBackground from './scenes/GameBackground'
import {Blue} from './const/colors'
import * as SceneKeys from './const/SceneKeys' 

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: Blue,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true

        
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add(SceneKeys.TitleScreen, TitleScreen)
game.scene.add(SceneKeys.Game, Game)
game.scene.add(SceneKeys.GameBackground, GameBackground)

game.scene.start(SceneKeys.TitleScreen)
// game.scene.start(SceneKeys.Game)
