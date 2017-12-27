import Component from '../core/Component';

export default class RenderComp extends Component {
  constructor() {
    super();
  }

  //override
  addedToEngine(e) {
    super.addedToEngine(e);
    this.engine.renderEngine.addRenderComp(this.owner, this);
  }

  start() {
    super.start();
  }

  //override
  end() {
    super.end();

    this.engine.renderEngine.removeRenderComp(this.owner, this);
  }

  //overridden, takes a canvas 2d context as argument
  render(ctx) {}
}
