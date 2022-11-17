# imageGrabber


**Summary**
"GRAB NOW" button. When a user presses this button, the extension injects a script to a web page, opened on a current browser tab, which grabs all <img> tags from this page, extract URLs of all images, and returns it back to the extension.

Next it opens a web page with a list of images and a "Download" button allowing the user to select which images to download. 

Finally, when pressing the "Download" button on that page, a script will download all selected images, compress them to an archive with the name images.zip, and will prompt the user to save this archive to a local computer.

**Get information about active browser tab**
grab button uses chrome.tabs.query(queryObject,callback) which gets all the tabs that have specified properties, and returns an array of those tabs in a callback which is a function that does something when query complete

chrome.tabs.query(
  queryInfo: object,
  callback?: function,
)

in our case we chrome.tabs.query({ active: true }, tabs => { tells us which tabs are active. 

only one tab can be active, so we can assume that this is the first and only item of the tabs array

**Grab images from the current page**
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


