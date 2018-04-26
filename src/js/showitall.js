//get count of tabs in current window. Required for the popoup display box.
document.addEventListener('DOMContentLoaded', () => {
function getCurrentWindowTabCount() {
  chrome.tabs.query({currentWindow:true}, function(tabs) {
    lenText = 'Number of tabs on this window:<strong> ' + tabs.length + '</strong>';
    document.getElementById('windowTabs').innerHTML = lenText;
  });
}

//get tabs in current window
function getCurrentWindowTabs(callback) {
  chrome.tabs.query({currentWindow:true}, function(tabs) {
    callback(tabs);
  });
}

//get all tabs
function getAllTabs(callback) {
  chrome.tabs.query({}, function(tabs) {
    console.log(tabs)
    callback(tabs);
  });
}

function displayResults(tabs){
  getCurrentWindowTabCount();
  numTabs = tabs.length;
  var table = document.getElementById('tabsTable');

  for (var i=0; i<numTabs; i++) {
    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = "<span style=cursor:pointer><font color=green>X</font></span>";
    cell2.innerHTML = "<img src=" + tabs[i].favIconUrl + " width='16px' height='16px'>";
    cell3.innerHTML = "<span style=cursor:pointer title='" + tabs[i].url + "'>" +  tabs[i].title + "</span>";

    cell1.addEventListener("click", (function(tabID) {
      return function() {
        closeTab(tabID);
        console.log('closed');

        setTimeout(() => {
          table.innerHTML = '';
          getAllTabs(displayResults);
        }, 500);
      }
    })(tabs[i].id));

    cell3.addEventListener("click", (function(tabID, windowID) {
      return function() {
        openTab(tabID, windowID);
      }
    })(tabs[i].id, tabs[i].windowId));
  }
}

// function to display the selected tab
function openTab(tabID, windowID) {
  chrome.windows.update(windowID, {focused:true});
  chrome.tabs.update(tabID, {active:true});
}

// function to close the selected tab
function closeTab(tabID) {
  chrome.tabs.remove(tabID);
  // reload popup to refresh the count and links
  // window.location.reload();
}

var tabsDisplayOption = localStorage["popupDisplayOption"];
// if extension is just installed or reloaded, tabsDisplayOption will not be set
if (typeof tabsDisplayOption == "undefined" || tabsDisplayOption == "currentWindow") {
  getCurrentWindowTabs(displayResults);
} else {
  //getCurrentWindowTabCount();
  getAllTabs(displayResults);
}
});
