'use strict';

const helper = {
  setRandomAsset: (elements, status) => {
    const randIndex = Math.floor(Math.random() * 3);
    const stateAssets = {
      state1: [
      `../../assets/green/alien_green_celebrate.gif`
      ],
      state2: [
      `/../../assets/green/alien_green_dance.gif`
      ],
      state3: [
      `../../assets/green/alien_green_thanks.gif`
      ],
      state4: [
      `../../assets/green/alien_green_idle.gif`
      ],
      state5: [
      `../../assets/green/alien_green_sad.gif`
      ],
      state6: [
      `../../assets/green/alien_green_eat.gif`
      ],
      state7: [
      `../../assets/green/alien_green_attack.gif`
      ],
      state8: [
      `../../monster-status-1-variant-1.gif`
      ]
    };

    if (status.tabCount <= 2) {
      elements.monster.src = stateAssets.state1;
    } else if (status.tabCount <= 5 && status.tabCount >= 2) {
      elements.monster.src = stateAssets.state1;
    } else if (status.tabCount <= 9 && status.tabCount >= 6) {
      elements.monster.src = stateAssets.state2;
    } else if (status.tabCount <= 13 && status.tabCount >= 10) {
      elements.monster.src = stateAssets.state3;
    } else if (status.tabCount <= 17 && status.tabCount >= 14) {
      elements.monster.src = stateAssets.state4;
    } else if (status.tabCount <= 21 && status.tabCount >= 18) {
      elements.monster.src = stateAssets.state5;
    } else if (status.tabCount != 33 && status.tabCount >=22) {
      elements.monster.src = stateAssets.state6;
    } else if (status.tabcount = 33) {
      elements.monster.src = stateAssets.state7;
    }
  },
  /*
  * handleEvolutionTimer
  *
  * Start the interval timer that will be used to evolve based on tab count
  * over a period of time.
  */
  // handleEvolutionTimer: (elements, status) => {
  //   // if more than 5 tabs, kill evolution timer else start it if it hasnt already been.
  //   // remove pending blink animation on next evolution segment.
  //   if (status.tabCount > 5) {
  //     const uiSegments = elements.evolutionUISegments;
  //     for (let idx = 0; idx < uiSegments.length; idx++) {
  //       uiSegments[idx].classList.remove(`toggle`);
  //     }
  //   }
  // },
  /*
  * updateEvolutionUI
  *
  * Update evolution UI.
  */
  // updateEvolutionUI: (elements, status) => {
  //   const evolutionLevel = status.evolutionLevel;
  //   const numberOfSegments = status.evolutionStage;
  //   const uiSegments = elements.evolutionUISegments;

  //   // we either havent evolved or are on a new evolution stage. turn off all evolution segments.
  //   if (numberOfSegments === 0 && evolutionLevel < 2) {
  //     for (let idx = 0; idx < uiSegments.length; idx++) {
  //       uiSegments[idx].classList.remove(`on`);
  //       uiSegments[idx].classList.remove(`toggle`);
  //       uiSegments[idx].classList.add(`off`);
  //     }

  //     uiSegments[0].classList.add(`toggle`);
  //   } else {
  //     // we have evolved, turn on required number of segments.
  //     for (let idx = 0; idx <= numberOfSegments; idx++) {
  //       uiSegments[idx].classList.remove(`off`);
  //       uiSegments[idx].classList.remove(`toggle`);
  //       uiSegments[idx].classList.add(`on`);
  //     }

  //     if (numberOfSegments < 10 && evolutionLevel < 2) {
  //       uiSegments[numberOfSegments].classList.add(`toggle`);
  //     }
  //   }

  //   elements.evolutionSilhouettes.classList.remove(`level-0`);
  //   elements.evolutionSilhouettes.classList.remove(`level-1`);
  //   elements.evolutionSilhouettes.classList.add(`level-${status.evolutionLevel}`);

  //   // helper.setUI(elements, status);
  // },
  /*
  * setUI
  *
  * set the UI based on current status
  */
  setUI: (elements, status) => {
    // const hp = status.hp <= 0 ? 0 : status.hp;

    // // handle hp update
    // // elements.evolutionState.innerText = `${status.evolutionStage}/10`;
    // elements.hpProgressBar.style.width = `${hp}%`;
    // elements.hpState.innerText = `${hp}/100`;
    elements.monsterStatus.innerText = `${status.monsterStatus}`;
    elements.tabCount.innerText = `You have ${status.tabCount} tabs open`;

    // set random monster asset from the variants
    helper.setRandomAsset(elements, status);

    // to poop or not to poop, that is the question
    // helper.poop(elements, status);
  }
};
