import Component from './core/Component';
import Input from './core/Input';

import GameObject from './core/GameObject';
import TransformComp from './core/TransformComp';
import ShapeRenderComp from './renderEngine/ShapeRenderComp';
import { rect } from './renderEngine/Shape';
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
      Input.getMouseY() - transComp.y,
      Input.getMouseX() - transComp.x
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
        new TransformComp(transComp.x, transComp.y, transComp.rot)
      );
      b.addComponent(new ShapeRenderComp(rect, 'rgb(200,100,50)'));
      b.addComponent(new TimeoutComp(120));
      b.addComponent(
        new AutomoveComp(
          Math.cos(transComp.rot) * bulletSpeed,
          Math.sin(transComp.rot) * bulletSpeed
        )
      );

      //add bullet to Engine
      this.engine.addGameObject(b);
    }
  }
}
