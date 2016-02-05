/******************
 * CIA Start      *
 ******************/

var CIA_START = {
    createRequestData: function(data_type, data_load){
        var _alx_data_payload_in = {
            message_type:     data_type,
            message_payload:  JSON.stringify(data_load)
        };
        return _alx_data_payload_in;
    },
    init:function(){
        console.log("CIA_START init!")
        CIA_START.go();
    },
    go:function(){
        console.log("CIA_START go!!")
        CIA_START.registeListener();
    },
    registeListener: function(){
            
        //滚动事件跟踪
        window.addEventListener("scroll", function(e) {
            //console.log("目前跟踪到："+window.scrollY);   
            var _alx_data = { y: window.scrollY};
            var _alx_data_obj = CIA_START.createRequestData("CIA_START_", _alx_data);
            chrome.runtime.sendMessage(_alx_data_obj,function() {});
        }, false);

        //接受来自后端的消息
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse){
                console.log("request-->"+JSON.stringify(request));
                console.log("sender-->"+JSON.stringify(sender));
                console.log("sender-->"+JSON.stringify(sendResponse));
            }
        );
    },
    data:null
};

CIA_START.go();