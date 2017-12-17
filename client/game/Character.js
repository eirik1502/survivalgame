export default class Character {
  constructor() {
    this.x = 50;
    this.y = 50;
  }

  render(canvasContext) {
    canvasContext.fillRect(this.x, this.y, 50, 50);
  }
}
