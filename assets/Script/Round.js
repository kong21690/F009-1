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
        this.round1=this.node.getChildByName("round_1");
        this.round2=this.node.getChildByName("round_2");
        this.round3=this.node.getChildByName("round_3");
    },
     setRountNumber:function (i) {
        this.node.setPosition(0,0);
        if(i==1)
        {
            this.round1.active=true;
            this.round2.active=false;
            this.round3.active=false;
        }
         if(i==2)
         {
             this.round1.active=false;
             this.round2.active=true;
             this.round3.active=false;
         }
         if(i==3)
         {
             this.round1.active=false;
             this.round2.active=false;
             this.round3.active=true;
         }
     },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
