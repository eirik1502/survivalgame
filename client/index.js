import Character from './game/Character';
/*
    Webpack entry file
*/

const canvas = document.getElementById('mainCanvas');
const canvasContext = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log('Game running', canvas);

//input handling
// document.getElementsByTagName('body').on('keydown', e => {
//   switch (e.which) {
//     case 37:
//       console.log('left arrow');
//       break;
//   }
// });

var char = new Character();

char.render(canvasContext);
