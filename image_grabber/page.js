/**
 * listener passes a message to to addImagesToContainer function which creates
 * HTML markup that displays images
 */
/** 
 chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  addImagesToContainer(request);
  sendResponse("OK");
  
});
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  addImagesToContainer(request);
  sendResponse("OK");
});

/**
 * Displays the list of images
 * @param {} urls -Array of image URLS
 */
function addImagesToContainer(urls) {
  if (!urls || !urls.length) {
    alert("no urls");
    return;
  }
  //query DOM to get a node of the div element with the container class
  const container = document.querySelector(".container");
  urls.forEach(url => addImageNode(container, url));
}

/**
 * dynamically add a div with image and checkbox to select it to container div
 * @param {*} container -DOM node of a container div
 * @param {*} url -URL of image
 */
function addImageNode(container, url) {
  const div = document.createElement("div");
  div.className = "imageDiv";
  const img = document.createElement("img");
  img.src = url;
  div.appendChild(img);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("url", url);
  div.appendChild(checkbox);
  container.appendChild(div);
}
