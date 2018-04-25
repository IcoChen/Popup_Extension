'use strict';

document.addEventListener(`DOMContentLoaded`, () => {
  let status;
  const elements = {
    body: document.getElementById(`popup`),
    preloader: document.getElementById(`preloader-container`),
    pet: document.querySelector(`#pet a img`),
    petStatus: document.getElementById(`pet-text`),
    tabCount: document.getElementById(`tab-count`),
    tips: document.querySelectorAll(`.tip`),
    tipModals: {
    pet: document.getElementById(`pet-tip`)
    }
  };

  chrome.storage.onChanged.addListener((changes, areaName) => {
    status = changes.pet.newValue;

    helper.setUI(elements, status);

    elements.preloader.style.display = `none`;
  });

  elements.pet.addEventListener(`click`, e => {
    e.preventDefault();
    elements.pet.style.marginTop = `-50px`;
    setTimeout(() => {
      elements.pet.style.marginTop = `0px`;
    }, 250);
  });


  // tip modals - click, mouseover, mouseout
  elements.tips.forEach(tip => {
    tip.addEventListener(`click`, e => {
      e.preventDefault();
    });

    tip.addEventListener(`click`, e => {
      e.preventDefault();
      const anchor = e.currentTarget;

      // prevent spamming
      if (anchor.classList.contains(`transition`)) {
        return;
      }
      {
        elements.tipModals.pet.style.display = `block`;
      }

      anchor.classList.add(`transition`);
    });

    tip.addEventListener(`mouseleave`, e => {
      e.preventDefault();
      const anchor = e.currentTarget;
      {
        elements.tipModals.pet.style.display = `none`;
      }

      anchor.classList.remove(`transition`);
    });
  });
});
