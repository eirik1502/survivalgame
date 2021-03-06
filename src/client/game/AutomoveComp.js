import Component from './engine/core/Component';
import TransformComp from './engine/core/TransformComp';

export default class AutomoveComp extends Component {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  //override
  update() {
    let transComp = this.owner.components.get(TransformComp);

    transComp.x += this.x;
    transComp.y += this.y;
  }
}
