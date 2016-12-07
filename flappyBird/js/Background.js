/**
 * Created by zhanglei on 2016/12/3.
 */
(function(){
    //背景类：是所有的平铺背景
    //一会这个类将有三个实例：房子，大树，地板
    //有移动的功能，有平铺的属性；
    window.Background=Class.extend({
        init:function(params){
            this.image=params.image;
            this.width=params.width;
            this.height=params.height;
            this.speed=params.speed;
            this.y=params.y;
            this.x=0;
            //图片要能够平铺：画布总宽度／图片宽度；
            this.amount=parseInt(game.canvas.width/this.width)+1;

        },
        update:function(){
            this.x-=this.speed;
            if(this.x<=-this.width*this.amount){
                this.x=0;
            }
        },
        //渲染：这个函数每帧执行
        render:function(){
            //绘制这个图片,绘制两倍的图片数量
            for(var i=0; i<this.amount*2; i++){
                game.ctx.drawImage(this.image,0,0,this.width,this.height,this.x+this.width*i,this.y,this.width,this.height)
            }
        }
    })
})();