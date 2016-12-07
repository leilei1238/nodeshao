/**
 * Created by zhanglei on 2016/12/7.
 */
(function(){
    //求真实的帧率：每秒真实走了多少帧；
    window.FrameUtil=Class.extend({
        init:function(){
            this.currentFrame=0;//当前帧
            this.sTime=new Date();//起始时间
            this.sFrame=0;//起始帧；
            this.realFps=0;//真实fps;
        },
        update:function(){//update应该在主程序mainloop中，每秒走一次；因为update决定状态更新
            this.currentFrame++;
            var t=new Date();
            if(t-this.sTime>=1000){//每秒真实的帧率；
                this.realFps=this.currentFrame-this.sFrame;
                this.sFrame=this.currentFrame;
                this.sTime=t;
            }
        }
    })
})();