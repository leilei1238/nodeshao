/**
 * Created by zhanglei on 2016/12/2.
 */
(function(){
    //用于加载所有静态图片，音乐类；
    window.StaticResources=Class.extend({
        init:function(){
            this.imgs={};
        },
        //读取图片，有两个参数：1）JSON:读取列表 2）回调函数：有三个参数（加载第几个，加载总数量，数据对象）
        loadImgs:function(url,cb){
            var alreadyLoad=0;
            var xml=new XMLHttpRequest();
            var self=this;
            xml.open('get','r.json',false);
            xml.onreadystatechange=function(){
                if(xml.readyState===4 && /^2\d{2}/.test(xml.status)){
                    var images=JSON.parse(xml.responseText).Images;//[]
                    //用循环语句，挨个向每个图片发起上行请求
                    for(var i=0; i<images.length; i++){
                        var tmpImg=new Image;
                        tmpImg.src=images[i].src;
                        self.imgs[images[i].name]=tmpImg;
                        tmpImg.src=images[i].src;
                        tmpImg.onload=function(){
                            //让已经加载好的图片进行++；
                            alreadyLoad++;
                            //保存在自己的images私有属性中；
                            cb&&cb(alreadyLoad,images.length,self.imgs);
                        }
                    }
                }
            };
            xml.send();

        }

    })
})();