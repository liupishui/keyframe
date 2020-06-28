var keyframeJS = function(keyframeArr){
    this.keyframeArr = keyframeArr;
}
keyframeJS.prototype.setupKeyFrame = function(layer,$element){
    layer.dom.addClass('animated');
    layer.beforeChange=function(){};
    layer.endChange=function(){};
    var currentIndex = 0,delayCount = 0;
    var setup = function(){
        if(currentIndex < layer.keyframe.length){
            delayCount += layer.keyframe[currentIndex].delay;
            if(currentIndex != 0){
                delayCount += layer.keyframe[currentIndex-1].duration;
            }
            delayCount == 0 && (delayCount=1);
            setTimeout(function(){
                if($($element).has($(layer.dom)).length===0){
                    $(layer.dom).appendTo($element);
                }
                if(layer.keyframe[currentIndex].duration != 0){
                    $(layer.dom).css({'-webkit-animation-duration':layer.keyframe[currentIndex].duration+'ms'});
                    $(layer.dom).css({'animation-duration':layer.keyframe[currentIndex].duration+'ms'});
                }

                $.each(layer.keyframe,function(index,val){//清除其它动画
                    var classNameArr = val.className.split('|');
                    $.each(classNameArr,function(key,item){
                            layer.dom.removeClass(item)
                    });
                })

                layer.beforeChange.call(layer,layer.keyframe[currentIndex],currentIndex);

                (function(layer,currentIndex,delayCount){
                    setTimeout(function(){
                        layer.endChange.call(layer,layer.keyframe[currentIndex],currentIndex);
                    }, delayCount + layer.keyframe[currentIndex].duration);
                })(layer,currentIndex,delayCount)

                var classNameArrCurr = layer.keyframe[currentIndex].className.split('|');
                    $.each(classNameArrCurr,function(key,item){
                            layer.dom.addClass(item)
                    });
                currentIndex++;
                setup();
            },delayCount);
        }
    }
    setup();
    return layer;
}
keyframeJS.prototype.setupPageFrame = function(index){
    var _self = this;
    if(typeof(_self.keyframeArr[index])!='undefined'){
        var pageInfo = _self.keyframeArr[index];
        if(pageInfo.element!=''){
            $.each(pageInfo.layers,function(index,item){
                item.dom.remove();
            });
            if(pageInfo.background!=''){
                $(pageInfo.element).css('background',pageInfo.background);
            }
            if(pageInfo.backgroundSize!=''){
                $(pageInfo.element).css('background-size',pageInfo.backgroundSize);
            }
            $.each(pageInfo.layers,function(index,layer){
                _self.setupKeyFrame(layer,pageInfo.element);
            })

        }
    }
}
keyframeJS.prototype.deletePageFrame = function(index){
    var _self = this;
    if(typeof(_self.keyframeArr[index])!='undefined'){
        var pageInfo = _self.keyframeArr[index];
        if(pageInfo.element!=''){
            $.each(pageInfo.layers,function(index,item){
                item.dom.remove();
            });
        }
    }
}

