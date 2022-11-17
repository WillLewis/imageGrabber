# imageGrabber


**Summary**
"GRAB NOW" button. When a user presses this button, the extension injects a script to a web page, opened on a current browser tab, which grabs all <img> tags from this page, extract URLs of all images, and returns it back to the extension.

Next it opens a web page with a list of images and a "Download" button allowing the user to select which images to download. 

Finally, when pressing the "Download" button on that page, a script will download all selected images, compress them to an archive with the name images.zip, and will prompt the user to save this archive to a local computer.

**Chrome API: Get information about active browser tab**
grab button uses chrome.tabs.query(queryObject,callback) which gets all the tabs that have specified properties, and returns an array of those tabs in a callback which is a function that does something when query complete

chrome.tabs.query(
  queryInfo: object,
  callback?: function,
)

in our case we chrome.tabs.query({ active: true }, tabs => { tells us which tabs are active. 

only one tab can be active, so we can assume that this is the first and only item of the tabs array

**Chrome API: inject a script into a page and do something**
it uses chrome.scripting API to inject a script into the webpage on the current tab. 

chrome.scripting.executeScript(injectSpec,callback)

injectSpec - specifies how to inject the script 
target - is used to specify where to inject the script
id -is the id of active tab returned from the tabs.query

The script can be injected as:
file or files - in this case, need to specify an array of Javascript files to inject. The files should exist in the extension folder.
function - in this case, need to specify a function to inject. The function should exist in the same (popup.js) file.

our script is simple- its used to grab all the imnages in a file -so we use the function option

so inject looks like:
{
    target:{ tabId: tab.id, allFrames: true },
    func: grabImages,
}

the callback in this case is an array of objects of the InjectionResult (https://developer.chrome.com/docs/extensions/reference/scripting/#type-InjectionResult)

for more see https://developer.chrome.com/docs/extensions/reference/scripting/


**Chrome API: open a new tab with a specified url**
chrome.tabs.create(createProperties,callback) is used to create a new tab in a browser with a specified URL

createProperties is an object with parameters, that tell Chrome, which tab to open and how. In particular, it has the url parameter, that will be used to specify which page to open in the tab

callback is a function that will be called after the tab is created. This function has a single argument tab, that contains an object of the created tab, which, among others, contains an id parameter of this tab to communicate with it later.

**Chrome API: activate a tab**

activating a tab means updating the tab status

chrome.tabs.update(tabId,updateProperties, callback)

tabId - is the id of a tab to update
updateProperties - defines which properties of the tab to update.
callback - function called after update operation finished

or simply activate it chrome.tabs.update(tab.id,{active:true});


**ChromeAPI: messaging used to send data from one part of extension to another**

used to send the url image array from the popup.js to openedPage.js

chrome.tabs.sendMessage(tabId, message, responseFn)

tabId - an id of tab to which message will be sent
message - the message itself. Can be any Javascript object.
callback -  a function, that is called when the received party responded to that message. This function has only one argument responseObject which contains anything, that receiver sent as a response.

**addIMageNode**
constructs the following HTML for each image url:
<div class="imageDiv">
    <img src={url}/>
    <input type="checkbox" url={url}/>
</div>


