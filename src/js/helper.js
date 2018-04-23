'use strict';


// function updateMonsterState() {
//   let state = {};
//   getStorage()
//   .then(result => {
//     state = result;
//     return getTabsCount();
//   })
//   .then(tabCount => {
//     state.tabCount = tabCount;
//     state.hp = MAX_HEALTH - 4 * tabCount;
//     let text = [];
//     const randIndex = Math.floor(Math.random() * (2));
//     if (state.tabCount <= 2) {
//       state.monsterStatus = `"You are a boss of tabs... and that's a good thing :)"`;
//     } else if (state.tabCount <= 5 && state.tabCount >= 2) {
//       text = [`"Damn son, not bad"`, `"Chill with the tabs"`];
//       state.monsterStatus = text[randIndex];
//     } else if (state.tabCount <= 9 && state.tabCount >= 6) {
//       text = [ `"I c u with all them tabs"`, `"So, how many tabs r u gonna make? 6? 7? 8? -_-"`];
//       state.monsterStatus = text[randIndex];
//     } else if (state.tabCount <= 13 && state.tabCount >= 10) {
//       text = [`"Um.. are you serious?"`, `"Is it you, Dounan?."`];
//       state.monsterStatus = text[randIndex];
//     } else if (state.tabCount <= 17 && state.tabCount >= 14) {
//       text = [`"If you can tell me the 3rd tab from the left, I respect you. If not, close that $***"`, `"Hi, Forrest! Chill. bro. chill.`];
//       state.monsterStatus = text[randIndex];
//     } else if (state.tabCount <= 21 && state.tabCount >= 18) {
//       text = [`"At this point, uninstall chrome :>"`, `"l2t you newb. psst..! it means Learn to Tab u scrub"`];
//       state.monsterStatus = text[randIndex];
//     } else if (state.tabCount != 33 && state.tabCount >=22) {
//       state.monsterStatus = `"Ting is as confused."`;
//     } else if (state.tabCount = 33) {
//       state.monsterStatus = '"Welcome to the elite Po-Tah-To clan. You can now add this to your resume. Achievement unlocked: Hidden :33 (kisses) "'
//     }

//           });
// }

const helper = {

  poop: (elements, status) => {
    const allPoops = [elements.poop.poop1, elements.poop.poop2, elements.poop.poop3,
      elements.poop.poop4, elements.poop.poop5, elements.poop.poop6];
    let displayPoops = [];

    // reset poops
    allPoops.forEach(elem => {
      elem.style.display = `none`;
    });

    // level 1 and level 2 have color thus we need colorized poops
    if (status.evolutionLevel > 0) {
      allPoops.forEach(elem => {
        elem.classList.add(`color`);
      });
    }

    if (status.hp <= 59 && status.hp >= 40) {
      // monster is angry, show 4 poops
      displayPoops = allPoops.slice(0,1);
    } else if (status.hp <= 39 && status.hp >= 20) {
      // monster is sick, show 5 poops
      displayPoops = allPoops.slice(0,3);
    } else if (status.hp <= 19 && status.hp >= 1) {
      // monster is dying, show 6 poops
      // no need to reassign poops array if all shown
      displayPoops = allPoops;
    }

    // display the poops
    displayPoops.forEach(elem => {
      elem.style.display = `block`;
    });
  },
  /*
  * setRandomAsset
  *
  * Pick one of the three assets randomly, at each status. Diversified graphics to keep the
  * user entertained.
  */
  setRandomAsset: (elements, status) => {
    const randIndex = Math.floor(Math.random() * 3);
    const stateAssets = {
      state1: [
        `../../assets/evolution/alien_green_celebrate.gif`
      ],
      state2: [
        `/../../assets/evolution/alien_green_dance.gif`
      ],
      state3: [
        `../../assets/evolution/alien_green_thanks.gif`
      ],
      state4: [
        `../../assets/evolution/alien_green_idle.gif`
      ],
      state5: [
        `../../assets/evolution/alien_green_sad.gif`
      ],
      state6: [
        `../../assets/evolution/alien_green_eat.gif`
      ],
      state7: [
        `../../assets/evolution/alien_green_attack.gif`
      ],
      state8: [
        `../../monster-status-1-variant-1.gif`
      ]
    };

    if (status.hp === 100) {
      // monster is full health
      elements.monster.src = stateAssets.state1;
    } else if (status.hp <= 99 && status.hp >= 80) {
      // monster is content
      elements.monster.src = stateAssets.state1;
    } else if (status.hp <= 79 && status.hp >= 60) {
      // monster is irritated
      elements.monster.src = stateAssets.state2;
    } else if (status.hp <= 59 && status.hp >= 40) {
      // monster is angry
      elements.monster.src = stateAssets.state3;
    } else if (status.hp <= 39 && status.hp >= 20) {
      // monster is sick
      //TODO: CHANGE THIS TO status 4
      elements.monster.src = stateAssets.state4;
    } else if (status.hp <= 19 && status.hp >= 1) {
      // monster is dying
      //TODO: CHANGE THIS TO status 5
      elements.monster.src = stateAssets.state5;
    } else if (status.hp <= 0) {
      // monster is dead (RIP)
      //TODO: CHANGE THIS TO status 6
      elements.monster.src = stateAssets.state6;
    }
  },
  /*
  * handleEvolutionTimer
  *
  * Start the interval timer that will be used to evolve based on tab count
  * over a period of time.
  */
  handleEvolutionTimer: (elements, status) => {
    // if more than 5 tabs, kill evolution timer else start it if it hasnt already been.
    // remove pending blink animation on next evolution segment.
    if (status.tabCount > 5) {
      const uiSegments = elements.evolutionUISegments;
      for (let idx = 0; idx < uiSegments.length; idx++) {
        uiSegments[idx].classList.remove(`toggle`);
      }
    }
  },
  /*
  * updateEvolutionUI
  *
  * Update evolution UI.
  */
  updateEvolutionUI: (elements, status) => {
    const evolutionLevel = status.evolutionLevel;
    const numberOfSegments = status.evolutionStage;
    const uiSegments = elements.evolutionUISegments;

    // we either havent evolved or are on a new evolution stage. turn off all evolution segments.
    if (numberOfSegments === 0 && evolutionLevel < 2) {
      for (let idx = 0; idx < uiSegments.length; idx++) {
        uiSegments[idx].classList.remove(`on`);
        uiSegments[idx].classList.remove(`toggle`);
        uiSegments[idx].classList.add(`off`);
      }

      uiSegments[0].classList.add(`toggle`);
    } else {
      // we have evolved, turn on required number of segments.
      for (let idx = 0; idx <= numberOfSegments; idx++) {
        uiSegments[idx].classList.remove(`off`);
        uiSegments[idx].classList.remove(`toggle`);
        uiSegments[idx].classList.add(`on`);
      }

      if (numberOfSegments < 10 && evolutionLevel < 2) {
        uiSegments[numberOfSegments].classList.add(`toggle`);
      }
    }

    elements.evolutionSilhouettes.classList.remove(`level-0`);
    elements.evolutionSilhouettes.classList.remove(`level-1`);
    elements.evolutionSilhouettes.classList.add(`level-${status.evolutionLevel}`);

    // helper.setUI(elements, status);
  },
  /*
  * setUI
  *
  * set the UI based on current status
  */
  setUI: (elements, status) => {
    const hp = status.hp <= 0 ? 0 : status.hp;

    // handle hp update
    elements.evolutionState.innerText = `${status.evolutionStage}/10`;
    elements.hpProgressBar.style.width = `${hp}%`;
    elements.hpState.innerText = `${hp}/100`;
    elements.monsterStatus.innerText = `${status.monsterStatus}`;
    elements.tabCount.innerText = `You have ${status.tabCount} tabs open`;

    // set random monster asset from the variants
    helper.setRandomAsset(elements, status);

    // to poop or not to poop, that is the question
    helper.poop(elements, status);
  }
};
