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
        chrome.webNavigation.onCompleted.addListener(CIA.webNavigationOnCompleted);
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
    webNavigationOnCompleted: function(loadobj){
        console.log("webNavigationOnComoleted:"+JSON.stringify(loadobj));
        if (loadobj.frameId == 0){
            CIA.preUpdate(loadobj.tabId);
        }
    },
    naviComp: function(details){
        if (details && details.frameId == 0 && details.tabId != -1){
            console.log("naviComp-details-"+JSON.stringify(details));
            // var data = ALX_NS_PH_SPARKLINE.getPageInfo(details.tabId);
            // if (data == null){
            //     data = {};
            // }

            // if (!data.reqmeta){
            //     data["reqmeta"] = {};
            //     data["reqmeta"]["method"] = details.method;
            //     data["reqmeta"]["statusCode"] = details.statusCode;
            //     ALX_NS_PH_SPARKLINE.setPageInfo(details.tabId, JSON.stringify(data));
            // }
        }
    },
    updateOnWindowChange: function(winId){
        if (winId){
            chrome.tabs.query({windowId: winId, windowType: "normal"}, function(tabs){
                for(var i = 0; i < tabs.length; ++i){
                    var t = tabs[i];
                    if (t.selected && CIA.okUrl(t.url)){
                        console.log("updateOnWindowChange:"+JSON.stringify(t));
                    }
                    //ALX_NS_PH_SPARKLINE.updateOnSelectChange(t.id);
                } 
            });
        }
    },
    updateOnSelectChange:function(tabId, selectInfo){
        console.log("tabsOnUpdate-selectInfo:"+JSON.stringify(selectInfo));
    },
    tabsOnUpdate: function (tabId, changeInfo, tab){
        console.log("tabsOnUpdate-changeInfo:"+JSON.stringify(changeInfo));
        console.log("tabsOnUpdate:"+JSON.stringify(tab));
    },
    preUpdate: function(tabId){
        chrome.tabs.executeScript(tabId, {file: "js/content/dc.js"});
    },
    update: function(payload){
        // console.log("update:---"+JSON.stringify(payload));

        var cnt = 1 ;
        
        var cdtArr = [ 
        "rq=" + cnt, 
        "wid=" + payload.tabId, 
        "t=" + (payload.referer ? "1" : "0"), 
        "ss=" + screen.width + "x" + screen.height, 
        "bw=" + payload.winWidth, 
        "winid=" + payload.winId ];

        if (payload.loadTime){
            cdtArr.push("cttl=" + payload.loadTime); 
        }
        
        //method:GET status:200
        cdtArr.push("m=GET"); 
        cdtArr.push("s=200");

        var cdt=cdtArr.join("&");
        var inurl = payload.url.href;
        var ref=payload.referer ?payload.referer: "" ;

        var alexa_data= {
            cdt:cdt,
            url:inurl,
            ref:ref
        };

        console.log("test--"+JSON.stringify(alexa_data));

        $.ajax({
            type: "POST",
            url: "http://collectd.cia.im/collectd",
            contentType:'application/json; charset=utf-8',
            dataType: 'json',
            //headers: {_uid:$cookieUid, _token:$cookieToken},
            data: JSON.stringify(alexa_data),
            cache: false,
            timeout: 10000,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //confirmShow('','reloadPage');
            },
            success: function (json) {
                //no-ops.
            }
        });
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
