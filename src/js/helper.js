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
      ]
    };

    if (status.tabCount <= 2) {
      elements.pet.src = stateAssets.state1;
    } else if (status.tabCount <= 5 && status.tabCount >= 2) {
      elements.pet.src = stateAssets.state1;
    } else if (status.tabCount <= 9 && status.tabCount >= 6) {
      elements.pet.src = stateAssets.state2;
    } else if (status.tabCount <= 13 && status.tabCount >= 10) {
      elements.pet.src = stateAssets.state3;
    } else if (status.tabCount <= 17 && status.tabCount >= 14) {
      elements.pet.src = stateAssets.state4;
    } else if (status.tabCount <= 21 && status.tabCount >= 18) {
      elements.pet.src = stateAssets.state5;
    } else if (status.tabCount != 33 && status.tabCount >=22) {
      elements.pet.src = stateAssets.state6;
    } else if (status.tabcount = 33) {
      elements.pet.src = stateAssets.state7;
    }
  },

  setUI: (elements, status) => {
    elements.petStatus.innerText = `${status.petStatus}`;
    // elements.tabCount.innerText = `You have ${status.tabCount} tabs open`;
    helper.setRandomAsset(elements, status);
  }
};
