import RenderComponent from './RenderComponent';
import TransformComp from '../core/TransformComp';

export default class RenderEngine {
  constructor() {
    this.renderComps = new Set();

    //get canvas
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addRenderComp(rendComp) {
    if (!(rendComp instanceof RenderComponent))
      throw new Error('Argument was not a render comp');

    this.renderComps.add(rendComp);
  }
  removeRenderComp(rendComp) {
    this.renderComps.delete(rendComp);
  }

  render() {
    //clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //render all components
    for (let comp of this.renderComps) {
      //retrieve the position and rotation of the object
      const transComp = comp.owner.components.get(TransformComp);

      //transform
      this.ctx.translate(transComp.x, transComp.y);
      this.ctx.rotate(transComp.rot);
      this.ctx.scale(1, 1);

      //render
      comp.render(this.ctx);

      //reset transform
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}
