import $ from '@lib/CreateElement';

function Render () {

  const placeholderGrid = document.getElementById('placeholder-grid');
  
  for (const position in [...Array(16)]) placeholderGrid.append($('div', { className: 'cell', position }))

}

export default Render;