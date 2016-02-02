/************
 * onrequest
 ***********/

// chrome.extension.onRequest.addListener
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var message_pay_load      = JSON.parse(request.message_payload);
    //var now = new Date();
    //now = (parseFloat)(now.getTime()) / 1000;
    //trace((String)(now) + request.message_type)
    
    if (typeof sender.tab == "undefined"){
      sender.tab = {id: null, url: null, windowId: null};
    }
    
    message_pay_load["tabId"] = sender.tab.id;
    message_pay_load["tabUrl"] = sender.tab.url;
    message_pay_load["winId"] = sender.tab.windowId;

    switch(request.message_type){
      case "CIA_START_":
        console.log("receive:---"+JSON.stringify(message_pay_load));
        chrome.browserAction.setPopup({popup: "/html/popup.html"});
        sendResponse({});
        break;
      case "BACK_DATA_REQUEST":
        CIA.update(message_pay_load);
        sendResponse({});
        break;
      default:
        sendResponse({}); // snub them.
    }
  }
);
