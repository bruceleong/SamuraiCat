var SamuraiCat = SamuraiCat || {};
SamuraiCat.Intro = function(){};

SamuraiCat.Intro.prototype = {
  create: function() {

    this.duke = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dukeSleeping');
    this.duke.scale.setTo(0.5, 0.5)
    this.duke.anchor.setTo(0.5, .2);

    this.story = this.add.sprite(this.game.width/2, this.game.height/2, 'story')
    this.story.scale.setTo(.5, .5)
    this.story.anchor.set(0.5, 1.2);
    var text = "click if you must";
    var style = { font: "15px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5, 1);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('MainMenu');
    }
  }
};
