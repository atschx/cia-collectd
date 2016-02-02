/**********************
 * CIA
 **********************/
var CIA = {
    init: function(event) {
        
        console.log("init CIA...");

        //query all active tab (cross tabs) 
        //https://developer.chrome.com/extensions/tabs
        chrome.tabs.query({active: true}, function(tabs){
            //fix multi window 
            for (var i = tabs.length - 1; i >= 0; i--) {
                var tab = tabs[i];
                console.log(JSON.stringify(tab));
                if (CIA.okUrl(tab.url+"")){
                    CIA.preUpdate(tab.id);
                }
            };
        });

        console.log("CIA init finish.");
        // chrome api https://developer.chrome.com/extensions/webNavigation
        // chrome.webNavigation.onCompleted.addListener(CIA.webNavigationOnComoleted);
        // chrome.tabs.onUpdated.addListener(CIA.tabsOnUpdate);
        // chrome.tabs.onSelectionChanged.addListener(CIA.updateOnSelectChange);
        // chrome.windows.onFocusChanged.addListener(CIA.updateOnWindowChange);
        // chrome.webRequest.onCompleted.addListener(CIA.naviComp, {urls: ["http://*/*", "https://*/*"], "types": ["main_frame"]});
        // chrome.webRequest.onBeforeSendHeaders.addListener(CIA.setHttpHeaders, {urls: ["http://*/*", "https://*/*"]}, ["requestHeaders", "blocking"]);
    },
    okUrl: function(taburl){
        if (taburl.indexOf("http://") == 0 || taburl.indexOf("https://") == 0){
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

window.addEventListener("load", function(event){CIA.init(event);}, false );
window.addEventListener("unload", function(event){CIA.offduty(event);}, false);
