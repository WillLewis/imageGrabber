# imageGrabber
grab button uses chrome.tabs.query(queryObject,callback) which gets all the tabs that have specified properties, and returns an array of those tabs in a callback which is a function that does something when query complete

chrome.tabs.query(
  queryInfo: object,
  callback?: function,
)

in our case we chrome.tabs.query({ active: true }, tabs => { tells us which tabs are active. 