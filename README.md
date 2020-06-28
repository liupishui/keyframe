# keyframe
keyframe

[js]

    //logo动画
    var keyframeArr=[
        {//page
            element:$(".header .logo"),
            background:'',
            backgroundSize:'',
            layers:[//图层
                {
                    dom:$("<span>q</span>"),
                    keyframe:[
                        {
                            className:'slideInDown',
                            delay:0,
                            duration:1000
                        }
                    ]
                },
                {
                    dom:$("<span>k</span>"),
                    keyframe:[
                        {
                            className:'slideInDown',
                            delay:100,
                            duration:0
                        }
                    ]
                },
                {
                    dom:$("<span>6</span>"),
                    keyframe:[
                        {
                            className:'slideInDown',
                            delay:200,
                            duration:0
                        }
                    ]
                },
                {
                    dom:$("<span>0</span>"),
                    keyframe:[
                        {
                            className:'slideInDown',
                            delay:400,
                            duration:0
                        }
                    ]
                },
                {
                    dom:$("<span>8</span>"),
                    keyframe:[
                        {
                            className:'slideInDown',
                            delay:500,
                            duration:0
                        }
                    ]
                },
                {
                    dom:$("<span>0</span>"),
                    keyframe:[
                        {
                            className:'slideInDown',
                            delay:600,
                            duration:0
                        }
                    ]
                }
            ]
        },

    ];
    var keyframejs = new keyframeJS(keyframeArr);
    $(".header .logo img").remove();
    keyframejs.setupPageFrame(0);
    setInterval(function(){
        keyframejs.deletePageFrame(0);
        keyframejs.setupPageFrame(0);
    },2000);

