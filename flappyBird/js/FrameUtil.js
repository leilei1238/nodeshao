/**
 * Created by zhanglei on 2016/12/2.
 */
(function(){
    //帧工具：提供当前的帧数，提供当前真实的fps;
    window.FrameUtil=Class.extend({
        init:function(){
            this.currentFrame=0;//当前帧序号
            //起始帧:用于统计时间戳
            this.sFrame=0;//起始帧
            this.sTime=new Date();//起始帧时间；
            //真实fps;
            this.realFps=0;

        },
        update:function(){//每秒都要调用update方法；
            //当前帧序号自增1；
            this.currentFrame++;
            //是否是sTime+1000;
            var t=new Date();
            if(t-this.sTime >= 1000){
                //计算1000毫秒里面帧序号的流失
                this.realFps=this.currentFrame-this.sFrame;
                this.sTime=t;//当前帧的发生时间成为新的起始帧时间；
                this.sFrame=this.currentFrame;//同时当前帧成为新的起始帧；
            }
        }
    })
})();