import Component from './Component';

export default class GameObject {
  constructor(name) {
    this.name = name;
    this.components = new Map();
  }

  //when added to engine
  addedToEngine(e) {
    this.engine = e;

    //let componens know that we have been added to engine
    this.componentsSafeForEach(c => c.addedToEngine(e));
  }

  //when in engine and engine is running
  start() {
    //let components know that object is started
    this.componentsSafeForEach(c => c.start());
  }

  //removed from engine
  end() {
    //We dont call the removeComponent methode as it is explicit for removing while object is alive

    //let components know we have been removed
    this.componentsSafeForEach(o => o.end());

    //remove components
    this.components.clear();
  }

  addComponent(comp) {
    //check if object given is actually a component
    if (!(comp instanceof Component))
      throw new Error('Argument not a component');

    this.components.set(comp.constructor, comp);

    //let component know that it is attatched
    comp.addedToObject(this);
  }

  //remove a component while object is alive
  removeComponent(compType) {
    //let component know it has been explicitly removed from objecct
    this.components.get(compType).removedFromObject();

    return this.components.delete(compType);
  }

  update() {
    this.componentsSafeForEach(o => o.update());
  }

  //updates in reverse order, such that elements may bee removed in the loop
  componentsSafeForEach(predicate) {
    let compValues = Array.from(this.components.values());
    let i = compValues.length;
    while (i-- > 0) {
      predicate(compValues[i]);
    }
  }
}
