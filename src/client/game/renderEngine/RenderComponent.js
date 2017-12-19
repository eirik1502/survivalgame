import Component from '../core/Component';

export default class RenderComponent extends Component {
  constructor() {
    super();
  }

  //override
  addedToEngine(e) {
    super.addedToEngine(e);
    this.engine.renderEngine.addRenderComp(this);
  }

  //override
  end() {
    super.end();

    this.engine.renderEngine.removeRenderComp(this);
  }

  //overridden, takes a canvas 2d context as argument
  render(ctx) {}
}
