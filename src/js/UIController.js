import anime from 'animejs/lib/anime.es.js';
import List from '@lib/List';
import CreateElement from '@lib/CreateElement'
import textures from '../json/textures.json';

function UIController () {
  
  const animations = new List();

  const dom = {
    score: document.getElementById('score'),
    highScore: document.getElementById('high-score'),
    gameOver: document.getElementById('game-over'),
    activeGrid: document.getElementById('active-grid'),
    placeholderGrid: document.getElementById('placeholder-grid'),
    restartButton: document.getElementById('restart-button')
  }

  function addCell (position, value, colorID) {

    const placeholder = dom.placeholderGrid.querySelector(`[position="${position}"]`);

    /*
      <div style="top: {placeholder.offsetTop}; left: {placeholder.offsetLeft}" position="{position}">
        <div class="cell" style="transform: scale(0,0); background-color: {texture.backgroundColor[colorID]}; color: {texture.color[colorID]}">
          {value}
        </div>
      </div>
    */

    const element = CreateElement('div', { style: `top: ${placeholder.offsetTop}px; left: ${placeholder.offsetLeft}px;`, position: position }, [ CreateElement('div', { class: 'cell', style: `background-color: ${textures.backgroundColor[colorID]}; color: ${textures.color[colorID]}; transform: scale(0,0);`, textContent: value }) ]);

    element.color = colorID;
    dom.activeGrid.append(element);
    animations.add(anime({
      targets: element.children[0],
      scale: '100%',
      duration: 120,
      easing: 'easeOutQuad'
    }));
  }

  function moveCell (before, after) {

    const element = dom.activeGrid.querySelector(`[position="${before}"]`);
    const placeholder = dom.placeholderGrid.querySelector(`[position="${after}"]`);
    element.setAttribute('position', after);

    animations.add(anime({
      targets: element,
      top: placeholder.offsetTop + 'px',
      left: placeholder.offsetLeft + 'px',
      duration: 120,
      easing: 'easeOutQuad'
    }));
  }

  function mergeCell (before, after) {

    const beforeEl = dom.activeGrid.querySelector(`[position="${before}"]`);
    const afterEl = dom.activeGrid.querySelector(`[position="${after}"]`);
    const placeholder = dom.placeholderGrid.querySelector(`[position="${after}"]`);

    beforeEl.style.zIndex = '0', afterEl.style.zIndex = '1';
    beforeEl.removeAttribute('position');

    animations.add(anime({
      targets: beforeEl,
      top: placeholder.offsetTop + 'px',
      left: placeholder.offsetLeft + 'px',
      duration: 120,
      easing: 'easeOutQuad',
      complete: function () {
        beforeEl.remove();
        afterEl.children[0].innerText *= 2;
        afterEl.color++;
        afterEl.children[0].style.backgroundColor = textures.backgroundColor[afterEl.color];
        afterEl.children[0].style.color = textures.color[afterEl.color];
      }
    }));
  }

  function gameOver () {
    dom.gameOver.style.display = 'flex';
    anime({
      targets: dom.gameOver,
      easing: 'linear',
      opacity: 1,
      duration: 1000,
      delay: 500
    })
  }

  function initialize () {
    dom.gameOver.style.display == 'flex' && (dom.gameOver.style.display = 'none', dom.gameOver.style.opacity = '0');
    for (const cell of Array.from(dom.activeGrid.children)) cell.remove();
    animations.destroy();
  }

  function completeAnimations () {
    animations.iterate(anim => anim.seek(anim.duration));
    animations.destroy();
  }

  function setScore (score) {
    dom.score.textContent = score;
  }

  function setHighScore (highScore) {
    dom.highScore.textContent = highScore;
  }

  return {
    addCell,
    moveCell,
    mergeCell,
    initialize,
    completeAnimations,
    setScore,
    setHighScore,
    dom,
    gameOver
  }

}

export default UIController;