var SamuraiCat = SamuraiCat || {};
SamuraiCat.MainMenu = function(){};

SamuraiCat.MainMenu.prototype = {
  create: function() {
    this.myGirl = this.game.add.audio('myGirl')
    this.myGirl.play()

    this.duke = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'duke');
    this.duke.scale.setTo(0.5, 0.5)
    this.duke.anchor.setTo(0.5);

    var text = "Samurai Cat";
    var style = { font: "70px Avenir", fill: "#551A8B", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, 3.25);
    var text = "by Bruce Leong";
    var style = { font: "25px Avenir", fill: "#551A8B", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, 6);
    var text = "Click to begin";
    var style = { font: "30px Avenir", fill: "#551A8B", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, -4);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Level0');
    }
  }
};
