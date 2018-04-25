'use strict';

const TIME_INTERVAL = 3600000;
// const MAX_HEALTH = 100;
// let evolutionInterval = undefined;
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
    chrome.storage.local.get(`monster`, (data) => {
      if (typeof data.monster !== `undefined`) {
        globalState = data.monster;
        resolve(data.monster);
      } else {
          console.log("DEBUG: GETSTORAGE ELSE");
          const status = {
            // hp: MAX_HEALTH,
            // evolutionLevel: 0,
            // evolutionStage: 0,
            // evolutionTimestamp: 0,
            monster: ``,
            monsterStatus: ``,
            tabCount: 0
          };

          getTabsCount().then(tabCount => {
            status.tabCount = tabCount;
            return chrome.storage.local.set({monster: status});
          }).then(() => {
            globalState = status;
            resolve(status);
          });
      }
    });
  });
}

// function clearEvolutionTimer() {
//     clearInterval(evolutionInterval);
//     evolutionInterval = undefined;
// }

// function handleEvolutionTimer() {

//   // if more than 5 tabs, kill evolution timer else start it if it hasnt already been.
//   // remove pending blink animation on next evolution segment.

//   const tabCount = globalState.tabCount;

//   if (tabCount > 5) {
//     clearEvolutionTimer();
//     return;
//   }

//   const now = Date.now();
//   const canUpdate = now - globalState.evolutionTimestamp >= TIME_INTERVAL ? true : false;

//   if (tabCount < 6 && typeof evolutionInterval === `undefined` && canUpdate) {
//     evolutionInterval = setInterval(() => {

//       if (globalState.evolutionLevel < 2) {
//         if (globalState.evolutionStage < 9) {
//           globalState.evolutionStage++;
//           globalState.evolutionTimestamp = Date.now();
//         } else if (globalState.evolutionStage === 9) {
//           globalState.evolutionStage = 0;
//           globalState.evolutionLevel++;
//           globalState.evolutionTimestamp = Date.now();
//         }
//       } else if (globalState.evolutionLevel === 2) {
//         globalState.evolutionStage = 9;
//         globalState.evolutionTimestamp = Date.now();
//         clearEvolutionTimer();
//       }

//       globalState.lastUpdatedAt = Date.now();
//       chrome.storage.local.set({monster: globalState});
//       // console.log(`DEBUG: evolution timer started`, evolutionInterval, status);
//     }, TIME_INTERVAL);
//   }
// }

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
      status.monsterStatus = `You are a boss of tabs... and that's a good thing :)`;
    } else if (status.tabCount <= 5 && status.tabCount >= 2) {
      text = [`Damn son, not bad`, `Chill with the tabs`];
      status.monsterStatus = text[randIndex];
    } else if (status.tabCount <= 9 && status.tabCount >= 6) {
      text = [ `I c u with all them tabs`, `So, how many tabs r u gonna make? 6? 7? 8? -_-`];
      status.monsterStatus = text[randIndex];
    } else if (status.tabCount <= 13 && status.tabCount >= 10) {
      text = [`Um.. are you serious?`, `Chill and close some tabs yo.`];
      status.monsterStatus = text[randIndex];
    } else if (status.tabCount <= 17 && status.tabCount >= 14) {
      text = [`If you can tell me the 3rd tab from the left, I respect you. If not, close that $***`, `Please press COMMAND+W till I'm happy`];
      status.monsterStatus = text[randIndex];
    } else if (status.tabCount <= 21 && status.tabCount >= 18) {
      text = [`At this point, uninstall chrome :>`, `At this point, uninstall chrome :>`];
      status.monsterStatus = text[randIndex];
    } else if (status.tabCount != 33 && status.tabCount >=22) {
      status.monsterStatus = `You are confused.`;
    } else if (status.tabCount = 33) {
      status.monsterStatus = 'Welcome to the elite Po-Tah-To clan. Achievement unlocked: Hidden 33. '
    }

    chrome.storage.local.set({monster: status}, () => {
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


