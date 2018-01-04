var Global = require("GlobalConfig");
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
        Progres: {
            default: null,
            type: cc.Sprite
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('gameSence', function () {
            this.node.getChildByName("Mask").x=0;
            this.Progres.node.x=0;
            this.scheduleOnce(function () {
                cc.director.loadScene("gameSence");
            }.bind(this),0.2);
        }.bind(this));
        if (cc.sys.os == cc.sys.OS_IOS)
        {
            Global.autoStartGame=false;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        console.log(this.node.getChildByName("Mask").x);
     if(this.node.getChildByName("Mask").x<=-50)
     {
         this.node.getChildByName("Mask").x+=30;
         this.Progres.node.x -=30;
     }
    },
});
