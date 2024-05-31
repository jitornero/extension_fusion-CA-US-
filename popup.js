const sendMessageId = document.getElementById("sendmessageid");
if (sendMessageId) {
  sendMessageId.onclick = function() {
    // do something
  };
}

const greeting = {
  hello:"hello from popup",
  options: true,
}

document.getElementById('options').addEventListener('click', function() {
  console.log(' options Clicked!');

  chrome.runtime.sendMessage(greeting);
});

document.getElementById('specs').addEventListener('click', function() {
  console.log(' specs Clicked!');
  greeting.options = false;
  chrome.runtime.sendMessage(greeting);
});

console.log('hello ')