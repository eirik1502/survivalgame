/*
Handles user input, and contains static methods to check input
*/

export default class Input {
  constructor() {}

  static init() {
    //some keycodes
    Input.KEY_A = 65;
    Input.KEY_D = 68;
    Input.KEY_W = 87;
    Input.KEY_S = 83;

    Input.MOUSE_LEFT = 0;
    Input.MOUSE_MIDDLE = 1;
    Input.MOUSE_RIGHT = 2;

    //an array to hold true indicies that correspond to keycodes of held keys
    Input.keyHeld = new Array(250);
    Input.keyHeld.fill(false);

    //Array for the mouse buttons
    Input.mouseHeld = new Array(6);
    Input.mouseHeld.fill(false);

    //mouse coordinates
    Input.mouseX = 0;
    Input.mosueY = 0;

    //add listeners for events
    document.addEventListener(
      'keydown',
      e => (Input.keyHeld[e.keyCode] = true),
      false
    );
    document.addEventListener(
      'keyup',
      e => (Input.keyHeld[e.keyCode] = false),
      false
    );
    document.addEventListener(
      'mousedown',
      e => (Input.mouseHeld[e.button] = true),
      false
    );
    document.addEventListener(
      'mouseup',
      e => (Input.mouseHeld[e.button] = false),
      false
    );
    document.addEventListener(
      'mousemove',
      e => {
        Input.mouseX = e.clientX;
        Input.mouseY = e.clientY;
      },
      false
    );

    //block default behaviour

    document.addEventListener('contextmenu', event => event.preventDefault());

    // //do nothing in the event handler except canceling the event
    // window.ondragstart = function(e) {
    //   if (e && e.preventDefault) {
    //     e.preventDefault();
    //   }
    //   if (e && e.stopPropagation) {
    //     e.stopPropagation();
    //   }
    //   return false;
    // };
    //
    // // do nothing in the event handler except canceling the event
    // window.onselectstart = function(e) {
    //   if (e && e.preventDefault) {
    //     e.preventDefault();
    //   }
    //   if (e && e.stopPropagation) {
    //     e.stopPropagation();
    //   }
    //   return false;
    // };
  }

  static isKeyHeld(key) {
    return Input.keyHeld[key];
  }
  static isMouseHeld(button) {
    return Input.mouseHeld[button];
  }
  static getMouseX() {
    return Input.mouseX;
  }
  static getMouseY() {
    return Input.mouseY;
  }
}
