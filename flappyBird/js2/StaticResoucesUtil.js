/**
 * Created by zhanglei on 2016/12/3.
 */
//静态资源工具类：StaticResoucesUtil
(function(){
    //静态资源管理类：这个类用于加载所有静态图片，音乐；
    window.StaticResoucesUtil=Class.extend({
        init:function(){
            this.images=new Object;
        },
        //读取图片：有两个参数：1）数据地址 2）回调，同时回调有三个参数 (已加载数量，总数量，图片对象)
        loadImage:function(url,cb){
            var self=this;
            //1.用ajax读取数据；
            var xml=new XMLHttpRequest();
            xml.open('get',url,false);
            xml.onreadystatechange=function(){
                if(xml.readyState===4 && /^2\d{2}/.test(xml.status)){
                    var jsonObj=JSON.parse(xml.responseText);
                    var alreadyLoadNum=0;//已经加载好的图片数量
                    var allNum=jsonObj.images.length;
                    //遍历数组，挨个循环
                    for(var i=0; i<jsonObj.images.length; i++){
                        var img=new Image;
                        img.src=jsonObj.images[i].src;//一旦有src，请求就将发出；

                        (function(index){
                            img.onload=function(){
                                self.images[jsonObj.images[index].name]=this;
                                alreadyLoadNum++;//让已经加载好的图片数量+1；
                                cb&&cb(alreadyLoadNum,allNum,self.images);

                            };
                        })(i);
                    }
                }
            };
            xml.send();
        }

    })
})();