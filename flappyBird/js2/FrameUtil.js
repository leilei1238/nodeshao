/**
 * Created by zhanglei on 2016/12/3.
 */
(function(){
    //真实fps:利用时间戳，求出1000ms流失了多少帧；
    //帧工具类：提供当前帧数，当前真实fps;
    window.FrameUtil=Class.extend({
        //初始化
        init:function(){
            //每秒都调用这个工具的update方法，
            this.currentFrame=0;//当前帧号；
            this.sTime=new Date;//统计时间戳
            this.sFrame=0;//起始帧--统计FPS;
            //真实fps;
            this.realFps=0;
        },
        update:function(){//更新
            this.currentFrame++;//
            var t=new Date;//每帧存个时间
            if(t-this.sTime >= 1000){
                //求两次之间的差值，并且求出最新的this.n;
                this.realFps=this.currentFrame-this.sFrame;//中间就是每秒流失多少帧
                this.sFrame=this.currentFrame;//当前帧序号，就是起点标志帧；
                this.sTime=t;//当前帧的发生时间就是新的起始时间
            }
        }
    })
})();