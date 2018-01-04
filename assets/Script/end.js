cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        star1:
            {
                default: null,
                type:cc.Sprite,
            },
        star2:
            {
                default: null,
                type:cc.Sprite,
            },
        star3:
            {
                default: null,
                type:cc.Sprite,
            },
        par:
            {
                default: null,
                type:cc.ParticleSystem,
            }
        ,
        ClickAudio:{
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        // console.log('111111');
         this.star1.node.active=true;
        this.star1.node.setScale(0);
      this.star1.node.runAction(cc.sequence(cc.scaleTo(0.2,1.2,1.2),cc.scaleTo(0.1,1,1),cc.callFunc(function () {

      },this)));
       this.scheduleOnce(function () {
           this.star2.node.active=true;
           this.star2.node.setScale(0);
           this.star2.node.runAction(cc.sequence(cc.scaleTo(0.2,1.2,1.2),cc.scaleTo(0.1,1,1)));
       }.bind(this),0.2);

        this.scheduleOnce(function () {
            this.star3.node.active=true;
            this.star3.node.setScale(0);
                this.star3.node.runAction(cc.sequence(cc.scaleTo(0.2,1.2,1.2),cc.scaleTo(0.1,1,1),cc.callFunc(function () {
                    this.node.getChildByName("replay").active=true;
                    this.node.getChildByName("forward").active=true;
                    this.node.getChildByName("particlesystem").active=true;
                },this)));
        }.bind(this),0.3);


    },
    replay:function () {
        cc.audioEngine.play(this.ClickAudio,false,1);
        cc.director.loadScene("gameSence");
    },
    endBtn:function () {
        cc.audioEngine.play(this.ClickAudio,false,1);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
