/**
 * Created by zhanglei on 2016/12/7.
 */
(function(){
    window.StaticResourcesUtil=Class.extend({
        init:function(){
            this.images={};
        },
        loadImage:function(url,cb){//加载图片
            var self=this;
            var xml=new XMLHttpRequest;
            xml.open('get',url,false);
            xml.onreadystatechange=function(){
                if(xml.readyState==4 && /^2\d{2}/.test(xml.status)){
                    var data=JSON.parse(xml.responseText).images;
                    var allNum=data.length;
                    var loadedNum=0;
                    for(var i=0; i<data.length; i++){
                        var tmpImg=new Image;
                        tmpImg.src=data[i].src;
                        self.images[data[i].name]=tmpImg;
                        tmpImg.onload=function(){
                            loadedNum++;
                            cb && cb(loadedNum,allNum,self.images);
                        }
                    }
                }
            };
            xml.send();
        }
    })
})();