export default class Character {
  constructor() {
    this.x = 50;
    this.y = 50;
  }

  render(ctx) {
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillRect(this.x, this.y, 50, 50);
  }
}
