const grabBtn = document.getElementById("grabBtn");
grabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true }, tabs => {
    const tab = tabs[0];
    if (tab) {
      execScript(tab);
    } else {
      alert("There are no active tabs");
    }
  });
});

/**
 * execute a function on a page of current tab and process result
 * param tab -a tab to execute script on
 * */
function execScript(tab) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id, allFrames: true },
      func: grabImages
    },
    onResult
  );
}

//query all images on target page and return array of URLs
function grabImages() {
  const images = document.querySelectorAll("img");
  return Array.from(images).map(image => image.src);
}

/**
 * combine returned array of image URLs, join in a single string and copy to clipboard
 * executed on remote page
 * param {InjectionResult} frames Array of grabImage() function results
 **/
function onResult(frames) {
  //if script fails alert
  if (!frames || !frames.length) {
    alert("Could not retrieve images from page");
    return;
  }

  //combine arrays of image urls -each frame is a single array
  const imageUrls = frames
    .map(frame => frame.result)
    .reduce((r1, r2) => r1.concat(r2));

  //copy to clipboard delimited by carriage return
  window.navigator.clipboard.writeText(imageUrls.join("\n")).then(() => {
    //close the extension popup after data copied
    window.close();
  });
}
