//extende a classe comeco
class Comeco extends Phaser.Scene {
    constructor() {
        super({ key: 'comeco' });
    }

    //preload da imagem botao
    preload() {
        this.load.image('botao', 'assets/play_bt2.png'); // Load your play button image
    }

    //cria os elementos na tela
    create() {
        //cria o  texto nessa posicao da tela, com essa cor e tamanho
        this.add.text(400, 300, 'Bem-vindo ao Mr Krabs Game!', { fontSize: '40px', fill: '#00FF00' }); 

        // cria o botao =
        let botaoJogar = this.add.image(700, 500, 'botao')
                                 .setScale(0.5)
                                 .setInteractive(); // Make it interactive

        // inicia o jogo quando clicar no botao
        botaoJogar.on('pointerdown', () => {
            this.scene.start('jogo'); 
        });
    }
}