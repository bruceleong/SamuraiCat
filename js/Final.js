var SamuraiCat = SamuraiCat || {};
SamuraiCat.Final = function(){};

SamuraiCat.Final.prototype = {
  create: function() {

    this.duke = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dukeAwake');
    this.duke.scale.setTo(0.5, 0.5)
    this.duke.anchor.setTo(0.5);

    var text = "What a dream...";
    var style = { font: "60px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, 3);
    var text = "Check back for more adventures of Samurai Cat";
    var style = { font: "30px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, -4);
    var text = "Click to play again";
    var style = { font: "30px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, -5);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('MainMenu');
    }
  }
};
