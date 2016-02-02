/**********************
 * CIA
 **********************/
var CIA = {
    init: function(event) {
        console.log("init CIA...");

        //查询google浏览器当前激活的页面
        chrome.tabs.query({active: true}, function(t){
            if (CIA.okUrl(t.url)){
                CIA.preUpdate(t.id);
            }
        });

        // 通过chrome相关API，获取相应的数据。
        // chrome.webNavigation.onCompleted.addListener(CIA.webNavigationOnComoleted);
        // chrome.tabs.onUpdated.addListener(CIA.tabsOnUpdate);
        // chrome.tabs.onSelectionChanged.addListener(CIA.updateOnSelectChange);
        // chrome.windows.onFocusChanged.addListener(CIA.updateOnWindowChange);
        // chrome.webRequest.onCompleted.addListener(CIA.naviComp, {urls: ["http://*/*", "https://*/*"], "types": ["main_frame"]});
        // chrome.webRequest.onBeforeSendHeaders.addListener(CIA.setHttpHeaders, {urls: ["http://*/*", "https://*/*"]}, ["requestHeaders", "blocking"]);
    },
    okUrl: function(url){
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0){
            return true;
        }else{
            return false;
        }
    },
    webNavigationOnComoleted: function(loadobj){
        console.log("webNavigationOnComoleted:"+JSON.stringify(loadobj));
        if (loadobj.frameId == 0){
            CIA.preUpdate(loadobj.tabId);
        }
    },
    tabsOnUpdate: function (){

    },
    preUpdate: function(tabId){
        trace("preUpdate:")
        chrome.tabs.executeScript(tabId, {file: "js/content/dc.js"});
    },
    update: function(payload){
        var tabId = payload.tabId;
        console.log("its here:" + tabId);
    },
    tracking: function(){
        console.log("trace <reco></reco>rd");
    },
    offduty: function(){
        console.log("offduty");
    }
}

window.addEventListener( "load", function(event) { CIA.init(event); }, false );
window.addEventListener( "unload", function(event) { CIA.offduty(event); }, false);
