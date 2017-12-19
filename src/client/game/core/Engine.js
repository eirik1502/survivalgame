import PhysicsEngine from '../physicsEngine/PhysicsEngine';
import RenderEngine from '../renderEngine/RenderEngine';
import GameObject from './GameObject';
import Input from './Input';

export default class Engine {
  constructor() {
    this.isRunning = false;

    this.physicsEngine = new PhysicsEngine();
    this.renderEngine = new RenderEngine();
    //setup input listeners
    Input.init();

    this.gameObjects = new Map();
  }

  addGameObject(o) {
    //check argument
    if (!(o instanceof GameObject))
      throw new Error('Argument is not a GameObject');
    if (o.name === undefined)
      throw new Error('trying to add a gameObject without a name');

    this.gameObjects.set(o.name, o);

    //let object know its added
    o.addedToEngine(this);

    if (this.isRunning) {
      o.start();
    }
  }

  removeGameObject(o) {
    if (!(o instanceof GameObject))
      throw new Error('object given not a GameObject');

    //engine should be running
    o.end();
    this.gameObjects.delete(o.name);
  }

  update() {
    // this.i = this.i === undefined ? (this.i = 0) : this.i++;
    // if (this.i % 30 == 0) {
    //   console.log('mouse buttons: ', Input.mouseHeld);
    //   console.log('mouse left:', Input.isMouseHeld(Input.MOUSE_LEFT));
    //   console.log('key a:', Input.isKeyHeld(Input.KEY_A));
    // }

    //update objects
    this.objectsSafeForEach(o => o.update());

    //update physics

    //update rendering
    this.renderEngine.render();
  }

  start() {
    this.isRunning = true;

    //tell added objects that we are starting
    this.objectsSafeForEach(o => o.start());

    //loop
    this.interval = setInterval(this.update.bind(this), 1.0 / 60.0);
  }

  //end engine run
  end() {
    //stop loop
    clearInterval(this.interval);

    //let objects know
    this.objectsSafeForEach(o => o.end());

    //end engine parts
    physicsEngine.stop();
    renderEngine.stop();
  }

  objectsSafeForEach(predicate) {
    let gobjValues = Array.from(this.gameObjects.values());
    let i = gobjValues.length;
    while (i-- > 0) {
      predicate(gobjValues[i]);
    }
  }
}
