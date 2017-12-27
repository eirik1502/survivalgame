import Component from './engine/core/Component';
import Input from './engine/core/Input';

import GameObject from './engine/core/GameObject';
import TransformComp from './engine/core/TransformComp';
import ShapeRenderComp from './engine/renderEngine/ShapeRenderComp';
import { rect } from './engine/renderEngine/Shape';
import AutomoveComp from './AutomoveComp';
import TimeoutComp from './TimeoutComp';

export default class PlayerComp extends Component {
  constructor() {
    super();

    this.shootTime = 30;
    this.shootTimer = 0;
  }

  //override
  update() {
    super.update();

    var transComp = this.owner.components.get(TransformComp);

    this.transform(transComp);
    this.shoot(transComp);
  }
  transform(transComp) {
    let speed = 1;

    //calculate movement
    let deltaX =
      (Input.isKeyHeld(Input.KEY_D) ? 1 : 0) -
      (Input.isKeyHeld(Input.KEY_A) ? 1 : 0);
    let deltaY =
      (Input.isKeyHeld(Input.KEY_S) ? 1 : 0) -
      (Input.isKeyHeld(Input.KEY_W) ? 1 : 0);
    deltaX *= speed;
    deltaY *= speed;

    //calculate rotation
    let rot = Math.atan2(
      Input.getMouseY() - transComp.getGlobalY(),
      Input.getMouseX() - transComp.getGlobalX()
    );

    //apply transformation
    transComp.rot = rot;
    transComp.x += deltaX;
    transComp.y += deltaY;
  }

  shoot(transComp) {
    if (
      this.shootTimer++ >= this.shootTime &&
      Input.isMouseHeld(Input.MOUSE_LEFT)
    ) {
      //reset shootTimer
      this.shootTimer = 0;

      //create bullet
      let bulletSpeed = 2;

      let b = new GameObject('bullet');
      b.addComponent(
        new TransformComp(
          transComp.getGlobalX(),
          transComp.getGlobalY(),
          transComp.getGlobalRot()
        )
      );
      b.addComponent(new ShapeRenderComp(rect, 'rgb(0,80,200)'));
      b.addComponent(new TimeoutComp(120));
      b.addComponent(
        new AutomoveComp(
          Math.cos(transComp.rot) * bulletSpeed,
          Math.sin(transComp.rot) * bulletSpeed
        )
      );

      //add bullet to Engine
      this.engine.addRootChild(b);

      let c = new GameObject('test bullet child');
      this.engine.addChild(b, c);
    }
  }
}
