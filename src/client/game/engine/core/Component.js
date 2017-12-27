export default class Component {
  constructor() {}

  addedToObject(o) {
    this.owner = o;
  }

  //called when the corresponding gameObject is added to an engine
  addedToEngine(e) {
    this.engine = e;
  }

  //called when object added to engine, and engine is running
  start() {}

  //called when this is removed from the object while object is still alive
  removedFromObject() {}

  //called when lifetime ends, either this removed or object removed
  end() {}

  update() {
    //should be overridden
  }
}
