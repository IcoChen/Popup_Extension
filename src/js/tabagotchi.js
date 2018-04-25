'use strict';

document.addEventListener(`DOMContentLoaded`, () => {
  let status;
  const elements = {
    body: document.getElementById(`tabagotchi`),
    preloader: document.getElementById(`preloader-container`),
    monster: document.querySelector(`#monster a img`),
    monsterStatus: document.getElementById(`monster-text`),
    tabCount: document.getElementById(`tab-count`),
    tips: document.querySelectorAll(`.tip`),
    tipModals: {
      monster: document.getElementById(`monster-tip`)
    }
  };

  chrome.storage.onChanged.addListener((changes, areaName) => {
    status = changes.monster.newValue;

    helper.setUI(elements, status);

    elements.preloader.style.display = `none`;
  });

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
      {
        elements.tipModals.monster.style.display = `none`;
      }

      anchor.classList.remove(`transition`);
    });
  });
});
