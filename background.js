chrome.action.onClicked.addListener((tab) => {
  console.log("background.js");
  console.log(tab.id)
  chrome.scripting.executeScript({
    target : {tabId : tab.id},
    files : [ "content.js" ],
  });
  
  // chrome.runtime.onMessage.addListener((message) => {
  //   console.log("Received data from content script:", message.data);
  //   // Do whatever you want with the data received from the content script.
  //   // For example, you can store it, manipulate it, or send it to a server.
 
  // });
 
});
