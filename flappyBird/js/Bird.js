/**
 * Created by zhanglei on 2016/12/4.
 */
(function(){
    //鸟类
    window.Bird=Class.extend({
        init:function(){
            this.x=(game.canvas.width-52)/2;
            this.y=100;
            this.w=52;
            this.h=45;
            //翅膀形态，合法值 0 1 2
            this.swing=0;
            //y的变化值；
            this.dy=1;
            //掉落时候的帧数
            this.dropStateFram=game.frameUtil.currentFrame;
            //鸟的方向
            this.ro=0;
            //添加监听一般写在init中
            this.bindClickListener();
            //
            this.state=0;//0 就是下降； 1 就是上升
            //能够上升的最大高度
            this.flyHeight=120;
        },
        //每帧都要执行
        update:function(){
            //翅膀的煽动
            //如果当前的帧编号是5的倍数，那么换翅膀；
            if(game.frameUtil.currentFrame%5==0){
                this.swing=++this.swing%3;
            }
            if(this.state==0){
                //dY在变化，就是越掉越快
                this.dy=0.005*Math.pow(game.frameUtil.currentFrame-this.dropStateFram,2);
                //旋转的改变
                this.ro++;
            }else if(this.state==1){
                this.dy=-1;
                if(this.y<this.oldy-this.flyHeight){
                    this.state=0;
                    this.dropStateFram=game.frameUtil.currentFrame;
                }
            }
            //y的改变；
            this.y+=this.dy;

        },
        render:function(){
            //save和restore是旋转的上下文；他们里面的所有东西都能旋转
            //旋转公式
            game.ctx.save();
            game.ctx.translate(this.x+this.w/2,this.y+this.h/2);
            game.ctx.rotate(Math.PI/180*this.ro);
            game.ctx.translate(-(this.x+this.w/2),-(this.y+this.h/2));
            game.ctx.drawImage(game.images.bird,this.swing*52,0,this.w,this.h,this.x,this.y,this.w,this.h);
            game.ctx.restore();
            //ctx.translate(this.w/2, this.h);
        },
        bindClickListener:function(){//绑定监听
            var self=this;
            game.canvas.addEventListener('mousedown',function(){
                self.state=1;
                //记录以下小鸟的y;
                self.oldy=self.y;
            })
        }
    })
})();