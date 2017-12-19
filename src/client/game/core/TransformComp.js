import Component from './Component';

/*
This component contains data regarding position and rotation
No logic
*/
export default class TransformComp extends Component {
  constructor(x = 0, y = 0, rot = 0) {
    super();

    this.x = x;
    this.y = y;
    this.rot = rot;
  }

  //override
  update() {
    super.update();
  }
}
