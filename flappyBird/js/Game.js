/**
 * Created by zhanglei on 2016/12/2.
 */
(function(){
    //游戏类，最最核心的类；
    window.Game=Class.extend({
        init:function(params){//类似于构造函数；
            var self=this;
            //fps:每秒多少帧；
            this.fps=params.fps || 60;//帧数：默认为60；
            //定时器
            this.timer=null;
            //我的帧工具类
            this.frameUtil=new FrameUtil();
            //得到canvas
            this.canvas=document.getElementById(params.id);
            //得到上下文；
            this.ctx=this.canvas.getContext('2d');
            //实例化一个静态资源管理工具
            this.sr=new StaticResources();
            //所有图片
            this.images=null;
            //命令这个静态资源管理工具，开始加载图片
            this.sr.loadImgs('r.json',function(alreadyLoadNum,allNum,imgsObj){
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                //如果已经加载的图片个数等于
                if(alreadyLoadNum===allNum){
                    self.run();
                    self.images=imgsObj;
                }else{
                    self.ctx.font='20px 黑体'
                    self.ctx.fillText('请稍后，正在加载图片'+alreadyLoadNum+'of'+allNum,30,50);
                }

            })
        },
        run:function(){//开始游戏
            var self=this;//备份this；
            this.timer=setInterval(function(){
                self.mainloop();
            },1000/this.fps)
        },
        mainloop:function(){//主循环
            //里面的语句，每帧执行
            this.frameUtil.update();
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            //打印fps
            this.ctx.font='16px 微软雅黑';
            this.ctx.fillText('FPS  /   '+this.frameUtil.realFps,10,20)
            //打印帧编号
            this.ctx.fillText('FNo  /   '+this.frameUtil.currentFrame,10,40);
            this.ctx.drawImage(this.images.pipeBot,100,100)

        },
        pause:function(){//暂停游戏
           // clearInterval(this.timer);
        }
    })
})();