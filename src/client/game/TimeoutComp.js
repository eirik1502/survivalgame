import Component from './engine/core/Component';

export default class TimeoutComp extends Component {
  constructor(lifetime) {
    super();

    this.lifetime = lifetime;
    this.currLifetime = 0;
  }

  //override
  update() {
    super.update();

    if (this.currLifetime++ >= this.lifetime) {
      this.engine.removeGameObject(this.owner);
    }
  }
}
