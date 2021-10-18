import Phaser from 'phaser'
import * as Colors from '../const/colors'

export default class GameBackground extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        this.add.line(
                        400, 250,
                        0, 0, 
                        0, 500, 
                        Colors.White, 1
        )
        .setLineWidth(3,3)

        this.add.line(
                        400, 250,
                        800, 0,
                        0, 0, 
                        Colors.White, 1
        )
        .setLineWidth(3,3)

    }
}