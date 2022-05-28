import Render from './Render';
import UIController from './UIController';
import GameController from './GameController';
import GlobalController from './GlobalController';

document.addEventListener('DOMContentLoaded', function () {

  Render();

  const App = GlobalController(UIController(), GameController());

  App.initialize(), console.log('API:', App);

});