import Phaser from 'phaser'
import WebFontFile from './WebFontFile'
import {GameBackground} from '../const/SceneKeys'
import * as Colors from '../const/colors'
class Game extends Phaser.Scene 
{
    init()
    {
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)
        
        this.leftScore = 0
        this.rightScore = 0
    }

    preload()
    {
        const fonts = new WebFontFile(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
    }
    create()
    {
        this.scene.run(GameBackground)
        this.scene.sendToBack(GameBackground)
        this.physics.world.setBounds(-100, 0, 1000, 500)

        this.ball = this.add.circle(400, 250, 10, Colors.White, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setCircle(10)
        this.ball.body.setBounce(1,1)

        this.ball.body.setCollideWorldBounds(true, 1, 1)

        this.paddleLeft = this.add.rectangle(30, 250, 30, 100, Colors.White, 1)
        this.physics.add.existing(this.paddleLeft, true)
        
        this.paddleRight = this.add.rectangle(750, 250, 30, 100, Colors.White, 1)
        this.physics.add.existing(this.paddleRight, true)
        

        this.physics.add.collider(this.paddleLeft, this.ball)
        this.physics.add.collider(this.paddleRight, this.ball)

        const scoreStyle = {
            fontSize: 30,
            fontFamily: '"Press Start 2P"'
        }
        this.leftScoreLabel = this.add.text(300, 50, '0', scoreStyle)
        .setOrigin(0.5,0.5)
        this.rightScoreLabel = this.add.text(500, 50, '0', scoreStyle)
        .setOrigin(0.5,0.5)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.time.delayedCall(1000, () => {
            this.resetBall()
        })
        
    }

    update()
    {              
        this.handlePlayerInput()
        this.updateAI()     
        this.trackScore()
        this.updateBallSpeed()

        
    }

    updateBallSpeed()
    /** Increase Ball speed everytime it hits the wall */
    {
        const bloc = this.ball.y 

        if (bloc == 10 || bloc == 490)
        {
            this.ball.body.velocity.x *= 1.1
            this.ball.body.velocity.y *= 1.1
        }
             

    }

    updateAI()
    /** Move computer's handler */
    {
        const diff = this.ball.y - this.paddleRight.y
        if (Math.abs(diff) < 10)
        {
            return
        }
        
        const aiSpeed = 5
        if (diff < 0)
        {
            this.paddleRightVelocity.y = - aiSpeed
            if (this.paddleRightVelocity.y < -10)
            {
                this.paddleRightVelocity.y = -10
            }
        }
        else if (diff > 0)
        {
            this.paddleRightVelocity.y = aiSpeed
            if (this.paddleRightVelocity.y > 10)
            {
                this.paddleRightVelocity.y = 10
            }
        }
        
        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()

    }
    
    trackScore()
    {
        if (this.ball.x < -30)
        {
            //score for right
            this.resetBall()
            this.incrementRightScore()
        }
        else if (this.ball.x > 830)
        {
            //score for left
            this.resetBall()
            this.incrementLeftScore()
        }
        
    }

    handlePlayerInput()
    /** This is player's handler */
    {
        /** @type {Phaser.Physics.Arcade.Body} */
        const body = this.paddleLeft.body

        if (this.cursors.up.isDown)
        {
           this.paddleLeft.y -= 10
           body.updateFromGameObject()
        }
        else if (this.cursors.down.isDown)
        {
            this.paddleLeft.y += 10
            body.updateFromGameObject()
        }
    }

    incrementLeftScore()
    {
        this.leftScore += 1
        this.leftScoreLabel.text = this.leftScore
    }
    
    incrementRightScore()
    {
        this.rightScore += 1
        this.rightScoreLabel.text = this.rightScore
    }

    resetBall()
    /** Restart the ball from the center of the screen */
    {
        this.ball.setPosition(400, 250)
        const angle = Phaser.Math.Between(0, 360)
        const vec = this.physics.velocityFromAngle(angle , 200)

        this.ball.body.setVelocity(vec.x, vec.y)
    }
}

export default Game  