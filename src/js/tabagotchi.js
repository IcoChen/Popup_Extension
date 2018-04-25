'use strict';

document.addEventListener(`DOMContentLoaded`, () => {
  let status;
  const elements = {
    body: document.getElementById(`tabagotchi`),
    preloader: document.getElementById(`preloader-container`),
    // evolutionState: document.getElementById(`evolution-status`),
    // evolutionUISegments: document.querySelectorAll('.evolution-segment'),
    // evolutionSilhouettes: document.getElementById('evolution-silhouettes'),
    // hpProgressBar: document.getElementById(`hp-indicator`),
    // hpState: document.getElementById(`hp-indicator-text`),
    // poop: {
    //   poop1: document.getElementById(`poop-1`),
    //   poop2: document.getElementById(`poop-2`),
    //   poop3: document.getElementById(`poop-3`),
    //   poop4: document.getElementById(`poop-4`),
    //   poop5: document.getElementById(`poop-5`),
    //   poop6: document.getElementById(`poop-6`)
    // },
    monster: document.querySelector(`#monster a img`),
    monsterStatus: document.getElementById(`monster-text`),
    tabCount: document.getElementById(`tab-count`),
    tips: document.querySelectorAll(`.tip`),
    tipModals: {
      // evolution: document./*g*/etElementById(`evolution-tip`),
      // health: document.getElementById(`health-tip`),
      monster: document.getElementById(`monster-tip`)
    }
  };

  chrome.storage.onChanged.addListener((changes, areaName) => {
    status = changes.monster.newValue;

    // preemptively call function to update UI based on evolution progress from prior tab/session
    // helper.updateEvolutionUI(elements, status);

    // call handleEvolutionTimer to see if we meet tab count requirements
    // helper.handleEvolutionTimer(elements, status);

    // set UI
    helper.setUI(elements, status);

    // hide preloader
    elements.preloader.style.display = `none`;
  });

  // event handlers
  // monster - click
  elements.monster.addEventListener(`click`, e => {
    e.preventDefault();
    elements.monster.style.marginTop = `-50px`;
    setTimeout(() => {
      elements.monster.style.marginTop = `0px`;
    }, 250);
  });


  // tip modals - click, mouseover, mouseout
  elements.tips.forEach(tip => {
    tip.addEventListener(`click`, e => {
      e.preventDefault();
    });

    tip.addEventListener(`mouseenter`, e => {
      e.preventDefault();
      const anchor = e.currentTarget;

      // prevent spamming
      if (anchor.classList.contains(`transition`)) {
        return;
      }
      {
        elements.tipModals.monster.style.display = `block`;
      }

      anchor.classList.add(`transition`);
    });

    tip.addEventListener(`mouseleave`, e => {
      e.preventDefault();
      const anchor = e.currentTarget;

      // if (anchor.classList.contains(`evolution`)) {
      //   elements.tipModals.evolution.style.display = `none`;
      {
        elements.tipModals.monster.style.display = `none`;
      }

      anchor.classList.remove(`transition`);
    });
  });
});
