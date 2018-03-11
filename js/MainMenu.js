var SamuraiCat = SamuraiCat || {};
SamuraiCat.MainMenu = function(){};

SamuraiCat.MainMenu.prototype = {
  create: function() {

    this.duke = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'duke');
    this.duke.scale.setTo(0.5, 0.5)
    this.duke.anchor.setTo(0.5);

    var text = "Samurai Cat";
    var style = { font: "60px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, 3);
    var text = "Click to begin";
    var style = { font: "30px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, -4);

    // text = "Highest score: "+this.highestScore;
    // style = { font: "15px Arial", fill: "#fff", align: "center" };

    // var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    // h.anchor.set(0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Level1');
    }
  }
};
