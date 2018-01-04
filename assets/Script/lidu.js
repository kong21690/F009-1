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
    },

    // use this for initialization
    onLoad: function () {
        this.lidu1=this.node.getChildByName("lidu_1");
        this.lidu2=this.node.getChildByName("lidu_2");
    },
    ActiontRun:function () {
        this.lidu1.x=-145;
        this.lidu2.x=-145;
        var  action1=new cc.moveTo(1,145,39);
        var  action2=new cc.moveTo(1,-145,39);
        this.lidu1.runAction(cc.repeatForever(cc.sequence(action1,action2)));

        var  action3=new cc.moveTo(1,145,-39);
        var  action4=new cc.moveTo(1,-145,-39);
        this.lidu2.runAction(cc.repeatForever(cc.sequence(action3,action4)));
    },
    ActiontStop:function () {
        this.lidu1.stopAllActions();
        this.lidu2.stopAllActions();
    },
    getLidu:function () {
        this.ActiontStop();
        console.log(this.lidu1.x);
     if(this.lidu1.x>=-50&&this.lidu1.x<=50)
         return 388;

     if(this.lidu1.x<-50)
         return 388+(this.lidu1.x+50)*(388/95);

        if(this.lidu1.x>50)
            return 388-(this.lidu1.x-50)*(388/95);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
