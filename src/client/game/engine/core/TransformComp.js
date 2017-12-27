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

    this.cachedGlobalX = null;
    this.cachedGlobalY = null;
    this.cachedGlobalRot = null;
  }

  //override
  update() {
    super.update();

    //delete cached values on update
    this.cachedGlobalX = null;
    this.cachedGlobalY = null;
    this.cachedGlobalRot = null;
  }

  getGlobalX() {
    //if no cached value exists, cache it
    if (this.cachedGlobalX == null) {
      this.cacheGlobalAttribute('x', 'cachedGlobalX', o => Math.cos(o));
    }
    //return the cached value
    return this.cachedGlobalX;
  }
  getGlobalY() {
    if (this.cachedGlobalY == null) {
      this.cacheGlobalAttribute('y', 'cachedGlobalY', o => Math.sin(o));
    }
    return this.cachedGlobalY;
  }
  getGlobalRot() {
    if (this.cachedGlobalRot == null) {
      this.cacheGlobalAttribute('rot', 'cachedGlobalRot');
    }
    return this.cachedGlobalRot;
  }

  //private
  cacheGlobalAttribute(
    attribute,
    cachedGlobalAttribute,
    rotDependency = o => 0 //no rotation dependency by default
  ) {
    let currNode = this.owner;
    let cachedValue = this[attribute];

    while (this.engine.parentOf(currNode) != null) {
      let parNode = this.engine.parentOf(currNode);
      let transComp = parNode.getComponent(TransformComp);
      cachedValue += transComp[attribute] * rotDependency(transComp.rot);
      currNode = parNode;
    }

    this[cachedGlobalAttribute] = cachedValue;
  }
}
