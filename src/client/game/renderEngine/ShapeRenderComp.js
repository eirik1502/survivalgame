import RenderComponent from './RenderComponent';

export default class ShapeRenderComp extends RenderComponent {
  //shape is a shape object, fill is a "rgb(255,255,255)" string
  constructor(shape, fillStyle) {
    super();
    this.shape = shape;
    this.fillStyle = fillStyle;
  }

  //override
  render(ctx) {
    super.render();
    ctx.fillStyle = this.fillStyle;
    this.shape(ctx);
  }
}
