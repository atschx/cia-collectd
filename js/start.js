/******************
 * CIA Start *
 ******************/

var CIA_START = {
    createRequestData: function(data_type, data_load)
    {
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
    registeListener: function()
    {
        //窗口的滚动事件跟踪
        window.addEventListener("scroll", function(e) {
            console.log("目前跟踪到："+window.scrollY);
            // if (window.scrollY>=150) {
            //     window.scrollTo(window.scrollX, 31);
            // };
        //1.创建数据CIA_START数据对象
        //if (window.scrollY <= 150)
        // {
        var _alx_data = { y: window.scrollY};
        var _alx_data_obj = CIA_START.createRequestData("CIA_START_", _alx_data);
        chrome.runtime.sendMessage(_alx_data_obj,function() {});
        //   chrome.extension.sendRequest(_alx_data_obj, function() {});
        //   //window.scrollTo(window.scrollX, 31);
        // }
        
        }, false);

        //页面开始加载时也需要与后台通讯
        chrome.extension.onRequest.addListener(
            function(request, sender, sendResponse){
                var message_pay_load = JSON.parse(request.message_payload);
                switch(request.message_type){
                  case "API_SET_API_DATA":
                    ALX_NS_PH_TB_API_IN.setApiData(message_pay_load);
                    sendResponse({});
                    break;
                  default:
                    break;
                }
          }
        );
    },
    data:null
};

CIA_START.go();