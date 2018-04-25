'use strict';

const TIME_INTERVAL = 3600000;
let globalState = {};

function getTabsCount() {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      let tabCount = tabs.length > 0 ? tabs.length - 1 : 0;
      resolve(tabCount);
    });
  });
}

function getStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(`pet`, (data) => {
      if (typeof data.pet !== `undefined`) {
        globalState = data.pet;
        resolve(data.pet);
      } else {
          console.log("DEBUG: GETSTORAGE ELSE");
          const status = {
            pet: ``,
            petStatus: ``,
            tabCount: 0
          };

          getTabsCount().then(tabCount => {
            status.tabCount = tabCount;
            return chrome.storage.local.set({pet: status});
          }).then(() => {
            globalState = status;
            resolve(status);
          });
      }
    });
  });
}


function updateMonsterState() {
  let status = {};

  getStorage().then(result => {
    status = result;
    return getTabsCount();
  }).then(tabCount => {
    status.tabCount = tabCount;
    // status.hp = MAX_HEALTH - 4 * tabCount;
    let text = [];
    const randIndex = Math.floor(Math.random() * (2));
    if (status.tabCount <= 2) {
      status.petStatus = `You are a boss of tabs... and that's a good thing :)`;
    } else if (status.tabCount <= 5 && status.tabCount >= 2) {
      text = [`Damn son, not bad`, `Chill with the tabs`];
      status.petStatus = text[randIndex];
    } else if (status.tabCount <= 9 && status.tabCount >= 6) {
      text = [ `I c u with all them tabs`, `So, how many tabs r u gonna make? 6? 7? 8? -_-`];
      status.petStatus = text[randIndex];
    } else if (status.tabCount <= 13 && status.tabCount >= 10) {
      text = [`Um.. are you serious?`, `Chill and close some tabs yo.`];
      status.petStatus = text[randIndex];
    } else if (status.tabCount <= 17 && status.tabCount >= 14) {
      text = [`If you can tell me the 3rd tab from the left, I respect you. If not, close that $***`, `Please press COMMAND+W till I'm happy`];
      status.petStatus = text[randIndex];
    } else if (status.tabCount <= 21 && status.tabCount >= 18) {
      text = [`At this point, uninstall chrome :>`, `At this point, uninstall chrome :>`];
      status.petStatus = text[randIndex];
    } else if (status.tabCount != 33 && status.tabCount >=22) {
      status.petStatus = `You are confused.`;
    } else if (status.tabCount = 33) {
      status.petStatus = 'Welcome to the elite Po-Tah-To clan. Achievement unlocked: Hidden 33. '
    }

    chrome.storage.local.set({pet: status}, () => {
      globalState = status;
      // handleEvolutionTimer();
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  getStorage().then(status => {
    // handleEvolutionTimer();

    chrome.tabs.create({
       url: "index.html"
    });
  });
});

chrome.tabs.onCreated.addListener(() => {
  updateMonsterState();
});

chrome.tabs.onRemoved.addListener(() => {
  updateMonsterState();
});

chrome.tabs.onUpdated.addListener(() => {
  updateMonsterState();
});


