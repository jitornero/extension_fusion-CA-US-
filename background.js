function getCurrentTab(section) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError)
    console.error(chrome.runtime.lastError);
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    send(tab, section);
  });
}

function send (tab, section){
    console.log("background.js");
    console.log(tab.id)
    chrome.scripting.executeScript({
      target : {tabId : tab.id},
      files : [ `${section}` ],
    });
};

let section;

chrome.runtime.onMessage.addListener(function(greeting){

  console.log('chayyane received', greeting);
  if (greeting.options == true){
    section = "content_options.js";
    console.log('options it is true');
    getCurrentTab(section);
  }
  else {
    section = "content_specs.js";
    console.log('specs it is true');
    getCurrentTab(section);
  }

});


