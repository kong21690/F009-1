
var Level;
var Numer=0;
var audioVu=1;
var audioID=0;
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
        audio: {
            url: cc.AudioClip,
            default: null
        },
        bgaudio: {
            url: cc.AudioClip,
            default: null
        },
        chenggong: {
            url: cc.AudioClip,
            default: null
        },
        shibai: {
            url: cc.AudioClip,
            default: null
        },
        pre:{
            default: null,
            type:cc.Prefab,
        },
        audionBtn1:{
            default: null,
            type:cc.SpriteFrame,
        },
        audionBtn2:{
            default: null,
            type:cc.SpriteFrame,
        },
        EndBtn:{
            default: null,
            type:cc.SpriteFrame,
        },
        ClickAudio:{
            url: cc.AudioClip,
            default: null
        }
    },
    // use this for initialization
    onLoad: function () {

        Level=0;
        this.MTT=this.node.getChildByName("MTT");
        this.liduBar=this.node.getChildByName("lidu");
        this.round=this.node.getChildByName("round_bj");
        this.heimu=this.node.getChildByName("heimu");
        this.guang=this.node.getChildByName("guang");
        this.MTTIsTouch=false;
        this.userInput = false;
        this.grandTotalTime = 0;
        this.grandEndTime = 0;

        if(!Global.urlExtendedFunction)
        {
           this.node.getChildByName("button1").active=false;
        }
        if(audioID!=0)
        {
            cc.audioEngine.stop(audioID);
        }
        this.MTT.on('touchstart', function (event) {
           this.TouchMTT();
            this.guang.active=false;
            this.guang.stopAllActions();
        }, this);
        this.node.on('touchstart', function (event) {
            this.userInput = true;
        }, this);

if(Numer==0)
{
    if(Global.autoStartGame)
    {
        this.pangbai();
    }else {
      this.heimu.getChildByName("mft").on('touchstart', function (event) {
          if(Numer==0)
          {this.heimu.getChildByName("mft").targetOff(this.heimu.getChildByName("mft"));
              this.pangbai();
          }
      }, this);
    }

}else
    {
        this.heimu.active=false;
        this.MTT.active=true;
        this.liduBar.active=true;
        this.round.active=true;
        this.roundFun();

        audioID = cc.audioEngine.play(this.bgaudio,true,1);

        var btn=this.node.getChildByName("button2");
        btn.getComponent(cc.Button).interactable=true;
        if(audioVu==0)
        {
            cc.audioEngine.setVolume(audioID,0);
            btn.getComponent(cc.Sprite).spriteFrame=this.audionBtn1;
        }
    }

    },
    pangbai:function () {
        console.log("asdasdasd");
        Numer=1;
        this.pbaudio=cc.audioEngine.play(this.audio,false,1);
        this.scheduleOnce(function () {
            this.heimu.active=false;
            this.MTT.active=true;
            this.liduBar.active=true;
            this.round.active=true;
            this.roundFun();
            audioID= cc.audioEngine.play(this.bgaudio,true,1);
            var btn=this.node.getChildByName("button2");
            btn.getComponent(cc.Button).interactable=true;
        }.bind(this),10);
    }
    ,
    roundFun:function () {
        var rotate = this.round.getComponent("Round");
        rotate.setRountNumber(Level+1);
        this.round.runAction(cc.sequence(cc.delayTime(1),cc.spawn(cc.moveTo(0.5,-380,-300),cc.scaleTo(0.5,0.8,0.8)),cc.callFunc(function () {
            this.PlayIsOk();
        },this)));
    },
    PlayIsOk:function () {
        this.MTTIsTouch=true;
        var rotate = this.liduBar.getComponent("lidu");
        rotate.ActiontRun();
    },
    TouchMTT:function () {
        if(this.MTTIsTouch)
        {

            this.MTTIsTouch=false;
            this.anim = this.MTT.getComponent(cc.Animation);
            this.anim.play('MTTAnimation');

            var lidu=this.liduBar.getComponent("lidu").getLidu();
            this.anim.node.runAction(cc.sequence(cc.spawn(cc.moveBy(2*lidu/388,0,lidu),cc.scaleTo(2*lidu/388,0.4*(1- lidu/388)+0.2,0.4*(1- lidu/388)+0.2)),cc.callFunc(function () {
                this.anim.setCurrentTime(0);
                this.anim.stop();

            },this),cc.delayTime(0.2),cc.callFunc(function () {

                if(lidu==388)
                {

                    cc.audioEngine.play(this.chenggong,false,1);
                    // if(Level==0)
                    // {
                    //
                    // }
                    this.playYH();
                    this.scheduleOnce(function () {
                        // this.anim.node.removeFromParent();
                        this.starShow();
                    }.bind(this),2.5);

                }else
                    {
                        if (Level!=2)
                        {
                            cc.audioEngine.play(this.shibai,false,1);
                        }
                        this.scheduleOnce(function () {
                            this.Next();
                        }.bind(this),1);
                    }

            },this)));
        }
    },
    playYH:function () {
        var anim = this.node.getChildByName("firework_01").getComponent(cc.Animation);
        anim.play('fireworkAction');
        this.scheduleOnce(function () {
            var anim1 = this.node.getChildByName("firework_02").getComponent(cc.Animation);
            anim1.play('fireworkAction');
        }.bind(this),0.5);
        this.scheduleOnce(function () {
            var anim2 = this.node.getChildByName("firework_03").getComponent(cc.Animation);
            anim2.play('fireworkAction');
        }.bind(this),1);
    },
    starShow:function () {

        var tPrefab = cc.instantiate(this.pre);
        tPrefab.parent = this.node;
        tPrefab.setPosition(0,0);
    },
    Next:function () {
        //cc.audioEngine.play(this.ClickAudio,false,1);
        Level++;
        if (Level==3)
        {
            this.starShow();
            return;
        }
        this.MTT.setPosition(0,-96);
        this.MTT.setScale(1,1);
        this.roundFun();
    },
    tip:function () {
        cc.audioEngine.play(this.ClickAudio,false,1);
        this.userInput = true;
        if(this.MTTIsTouch)
        {
            this.guang.active=true;
            this.guang.stopAllActions();
            this.guang.runAction(cc.repeatForever(cc.blink(1,2)));
            //this.guang.active=false;
        }
    },
    jingyin:function () {
        cc.audioEngine.play(this.ClickAudio,false,1);
        this.userInput = true;
        var btn=this.node.getChildByName("button2");
       if(cc.audioEngine.getVolume(audioID)==0)
       {
           cc.audioEngine.setVolume(audioID,1);
           btn.getComponent(cc.Sprite).spriteFrame=this.audionBtn2;
           audioVu=1;
       }else
           {
               audioVu=0;
               cc.audioEngine.setVolume(audioID,0);
               btn.getComponent(cc.Sprite).spriteFrame=this.audionBtn1;
           }
    },
    EndClick:function () {
        cc.audioEngine.play(this.ClickAudio,false,1);
    this.starShow();
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var btn=this.node.getChildByName("button3");
        if(!btn.getComponent(cc.Button).interactable)
        {
            this.grandTotalTime+=dt;
            this.grandEndTime+=dt;
            if(this.grandTotalTime>=Global.exitInterval/1000)
            {
                if(!this.userInput)
                {
                    this.grandEndTime=0;
                }
                this.userInput=false;
                this.grandTotalTime=0;
            }
            if(this.grandEndTime>=Global.exitTotalTime*60)
            {
                btn.getComponent(cc.Sprite).spriteFrame=this.EndBtn;
                btn.getComponent(cc.Button).interactable=true;
            }
        }
    },
});
