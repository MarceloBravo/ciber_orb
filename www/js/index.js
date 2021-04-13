const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 480,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 300 },
        debug: false
        }
    },
};
const game = new Phaser.Game(config);
var ball;
var hole;
var KeyA;
var KeyS;
var KeyD;
var KeyW;
var score = 0;
var scoreText;

function preload () {
    this.load.image('screen-bg','img/screen-bg.png');
    this.load.image('h','img/element-h.png');
    this.load.image('w','img/element-w.png');
    this.load.spritesheet('ball', 'img/ball.png', {frameWidth: 32, frameHeight: 48});
    this.load.image('hole', 'img/hole.png');
}

function create () {
    KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    KeyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    tope = this.physics.add.staticGroup();
    this.add.image(160, 240, 'screen-bg');
    ball = this.physics.add.sprite(160, 400, 'ball');
    ball.setCollideWorldBounds(true);

    hole = this.physics.add.staticGroup();
    hole.create(160, 50, 'hole');
    tope.create(50, 150, 'h');
    tope.create(250, 150, 'w');
    tope.create(160, 300, 'w');
    tope.create(260, 400, 'w');
    tope.create(50, 400, 'w');
    this.physics.add.collider(ball, tope, colisionTopes, null,  this);
    this.physics.add.overlap(ball, hole, finish, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '14px', fill: '#fff' });

}

function update () {
    if(KeyA.isDown){
        ball.setVelocityX(-160);
    }else if(KeyS.isDown){
        ball.setVelocityY(160);
    }else if(KeyD.isDown){
        ball.setVelocityX(160);
    }else if(KeyW.isDown){
        ball.setVelocityY(-160);
    }
    scoreText.setText('Puntaje: ' + score);
}

function colisionTopes(ball){
    ball.setTint(0xff0000);
}

function finish(ball, hole){
    //this.physics.pause();
    //ball.setTint(0xff0000);
    
    if(ball.tintBottomLeft === 16777215){
        score += 10;
        //alert('Felicitaciones, has ganado.');
    }else{
        score -= 1;
    }
    //debugger
    ball.y = 470;
    ball.X = 270;
    ball.clearTint();
    //debugger
}
