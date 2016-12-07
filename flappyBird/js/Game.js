/**
 * Created by zhanglei on 2016/12/3.
 */
//思路：所有类的实例，都是game的属性；
//我们的角色，一定要记住，有两个必须要拥有的方法：update() render();
//所有的角色，在mainloop里面，每帧都会被update() 和 render();
/*
* 1.创建游戏类mainloop,on,pause;
* 2.创建类（帧率计算器类）-因为当游戏越来越复杂，mainloop主程序可能在规定的20ms内无法执行完成，导致帧率下降；并且得到当前第几帧；
* 3.创建类（静态资源工具类）
* 4.背景类；
*
* */
(function(){
    //创建一个Game游戏类--最最核心的类；
    window.Game=Class.extend({
        init:function(params){//初始化
            var self=this;
            //canvas
            this.canvas=document.getElementById(params.canvasId);
            this.ctx=this.canvas.getContext('2d');
            //fps:每秒多少帧；默认值是60；
            this.fps=params.fps||60;
            this.timer=null;
            //帧工具类：FrameUtil--计算帧率
            this.frameUtil=new FrameUtil();
            //所有图片
            this.images=null;
            //静态资源工具类:StaticResoucesUtil--获取静态资源：
            this.sr=new StaticResoucesUtil();
            //加载图片时显示加载进度，加载图片完成，开始游戏；
            this.sr.loadImage('r.json',function(alreadyLoadNum,allNum,imgObj){
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                if(alreadyLoadNum===allNum){
                    self.images=imgObj;
                    self.run();//数据加载完成，开始游戏；
                }else{
                    self.ctx.font='20px 微软雅黑';
                    self.ctx.fillText('请稍候，正在加载图片 '+alreadyLoadNum+'of'+allNum,30,50)
                }
            });
            //自己的一些演员，罗列出来；

        },
        run:function(){//开始游戏--用来执行主循环；
            var self=this;
            this.timer=setInterval(function(){
                self.mainloop();//执行主循环
            },1000/this.fps);
            //罗列自己的一些演员
            this.fangzi=new Background({
                image:this.images.bg1,
                width:208,
                height:267,
                speed:1,
                y:200
            });
            this.diban=new Background({
                image:this.images.bg2,
                width:336,
                height:112,
                speed:3,
                y:this.canvas.height-112,
            })
            //实例化一个鸟：
            this.bird=new Bird;
        },
        mainloop:function(){//主循环
            //mainloop里面的语句每帧执行；
            this.frameUtil.update();
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            //打印字样式
            this.ctx.font='16px 微软雅黑';
            //打印fps;
            this.ctx.fillText('FPS / '+this.frameUtil.realFps,10,30);
            //打印帧编号
            this.ctx.fillText('FNO / '+this.frameUtil.currentFrame,10,50);
            //画图
            //this.ctx.drawImage(this.images.bird,100,100);
            //房子更新渲染；
            this.fangzi.update();
            this.fangzi.render();
            //地板更新渲染；
            this.diban.update();
            this.diban.render();
            //鸟类更新
            this.bird.update();
            this.bird.render();
        },
        pause:function(){//暂停游戏
            clearInterval(this.timer);
        }
    })
})();