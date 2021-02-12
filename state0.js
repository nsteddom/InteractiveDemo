var demo = {};
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){

        // loads in image from assets folder
        game.load.image('dude', 'assets/dude.png')
    },
    create: function(){
        
        // changes background color of state
        game.stage.backgroundColor = '#00ccff';
        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.sprite(0,0, 'dude');
    },
    update: function(){};
};

function changeState(i, stateNum){
    game.state.start('state' + stateNum);
};

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);

}