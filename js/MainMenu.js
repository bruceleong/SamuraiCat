var SamuraiCat = SamuraiCat || {};
SamuraiCat.MainMenu = function(){};

SamuraiCat.MainMenu.prototype = {
  create: function() {
    // this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'blue');

    // this.background.autoScroll(-20, 0);
    // this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    // this.logo.anchor.setTo(0.5, .75)
    this.duke = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'duke');
    this.duke.scale.setTo(0.2, 0.2)
    this.duke.anchor.setTo(0.5, -.26);

    var text = "Samurai Cat";
    var style = { font: "60px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, 1.25);
    var text = "Tap to begin";
    var style = { font: "30px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    // text = "Highest score: "+this.highestScore;
    // style = { font: "15px Arial", fill: "#fff", align: "center" };

    // var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    // h.anchor.set(0.5);
    console.log('are you in main menu')
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Level2');
    }
  }
};
