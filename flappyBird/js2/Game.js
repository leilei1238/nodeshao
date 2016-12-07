/**
 * Created by zhanglei on 2016/12/7.
 */
(function(){
    window.Game=Class.extend({
        init:function(params){
            var self=this;
            this.canvas=params.canvas;//canvas对象；
            this.ctx=this.canvas.getContext('2d');//上下文；
            //控制定时器
            this.fps=params.fps||60;//默认每秒60帧
            this.timer=null;//定时器
            //帧率计算器-可以在主程序中显示给用户：真实帧率和当前帧率；
            this.frameUtil=new FrameUtil();//帧率计算器；
            //所有图片加载完成，开始跑游戏；
            this.sr=new StaticResourcesUtil();
            this.images=null;
            this.sr.loadImage('r.json',function(loadedNum,allNum,imgObj){
                self.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                if(loadedNum===allNum){
                    self.images=imgObj;
                    self.run();
                }else{
                    self.ctx.font='20px 微软雅黑';
                    self.ctx.fillText('图片正在加载 '+loadedNum+'of'+allNum,30,50)
                }
            })
        },
        run:function(){//在run中执行主循环mainloop;
            var self=this;
            this.timer=setInterval(function(){
                self.mainLoop();
            },1000/this.fps);
        },
        mainLoop:function(){//主循环
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.frameUtil.update();
            //展示图片和内容只能在mainloop中；
            this.ctx.font='18px 微软雅黑';
            this.ctx.fillText('FPS / '+this.frameUtil.realFps,10,30);
            this.ctx.fillText('FNO / '+this.frameUtil.currentFrame,10,50);
        }
    })
})();