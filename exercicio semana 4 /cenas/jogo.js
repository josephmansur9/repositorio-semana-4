class Jogo extends Phaser.Scene {
    constructor() {
        super({ key: 'jogo' });
    }

    preload() {
        this.load.image('bg', 'assets/mar.png');
        this.load.image('player', 'assets/kra.png');
        this.load.image('abacaxi', 'assets/aba.png');
        this.load.image('tomate', 'assets/tom.png');
        this.load.image('pepino', 'assets/pep.png');
    }

    create() {
        this.add.image(600, 400, 'bg').setScale(1.2);

        this.krabs = this.physics.add.sprite(700, 550, 'player').setScale(0.3);
        this.krabs.setCollideWorldBounds(true);

        this.teclado = this.input.keyboard.createCursorKeys();

        this.tomate = this.physics.add.staticImage(300, 550, 'tomate').setScale(0.8);

        // Adiciona colisão entre Krabs e tomate
        this.physics.add.collider(this.krabs, this.tomate);

        this.pepino = this.physics.add.sprite(700, 520, 'pepino').setScale(0.2);
        this.pepino.setCollideWorldBounds(true);
        this.pepino.setBounce(0.7);
        this.physics.add.collider(this.pepino, this.tomate);

        this.abacaxi = this.physics.add.sprite(700, 520, 'abacaxi').setScale(0.2);
        this.abacaxi.setCollideWorldBounds(true);
        this.abacaxi.setBounce(0.7);
        this.physics.add.collider(this.abacaxi, this.tomate);

        this.physics.add.collider(this.tomate, this.abacaxi);
        this.physics.add.collider(this.tomate, this.pepino);
        this.physics.add.collider(this.abacaxi, this.krabs);
        this.physics.add.collider(this.pepino, this.krabs);

        this.placarAbacaxi = this.add.text(50, 50, 'Abacaxis: 0', { fontSize: '30px', fill: '#495613' });
        this.pontuacaoAbacaxi = 0;

        this.placarPepino = this.add.text(50, 80, 'Pepinos: 0', { fontSize: '30px', fill: '#495613' });
        this.pontuacaoPepino = 0;

        this.physics.add.overlap(this.krabs, this.abacaxi, () => {
            this.abacaxi.setVisible(false);
            var posicaoAbacaxi = [100, 250, 400, 550, 700, 850];
            var posicaoAbacaxi_Y = Phaser.Math.RND.pick(posicaoAbacaxi);
            this.abacaxi.setPosition(posicaoAbacaxi_Y, 100);
            this.pontuacaoAbacaxi += 1;
            this.placarAbacaxi.setText('Abacaxis: ' + this.pontuacaoAbacaxi);
            this.abacaxi.setVisible(true);
        });

        this.physics.add.overlap(this.krabs, this.pepino, () => {
            this.pepino.setVisible(false);
            var posicaoPepino = [100, 250, 400, 550, 700, 850];
            var posicaoPepino_Y = Phaser.Math.RND.pick(posicaoPepino);
            this.pepino.setPosition(posicaoPepino_Y, 100);
            this.pontuacaoPepino += 1;
            this.placarPepino.setText('Pepinos: ' + this.pontuacaoPepino);
            this.pepino.setVisible(true);
        });
    }

    update() {
        // Movimento horizontal
        if (this.teclado.left.isDown) {
            this.krabs.setVelocityX(-150);
        } else if (this.teclado.right.isDown) {
            this.krabs.setVelocityX(150);
        } else {
            this.krabs.setVelocityX(0);
        }

        if (this.teclado.up.isDown && this.krabs.body.blocked.down) {
            this.krabs.setVelocityY(-400);
        }
    }
}
