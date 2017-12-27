import PhysicsEngine from '../physicsEngine/PhysicsEngine';
import RenderEngine from '../renderEngine/RenderEngine';
import GameObject from './GameObject';
import Input from './Input';
import Validation from '../utils/Validation';

export default class Engine {
  constructor() {
    this.isRunning = false;

    this.physicsEngine = new PhysicsEngine();
    this.renderEngine = new RenderEngine(this);
    //setup input listeners
    Input.init();

    //A tree of parent-children objects
    this.root = null; //the root
    this.gameObjects = new Map(); //a flat structure for gameObjects, mapped with a parent and a list of children
    //hash game objects on name
    this.namedGameObjects = new Map();

    //add a default root node
    this.setRoot(new GameObject('root'));
  }

  setRoot(object) {
    Validation.validateType(object, GameObject, 'given root not a game object');

    //assign the root object
    this.root = object;
    this.addGameObject(object);
    //notify
    this.notifyAddedObject(object);
  }

  addRootChild(child) {
    this.addChild(this.root, child);
  }

  addChild(parent, child) {
    //validate parent
    if (!this.gameObjects.has(parent))
      throw new Error('Given parent not assigned in engine');

    this.addGameObject(child);
    //add parent to the newly created node
    this.gameObjects.get(child).parent = parent;
    //add the child to the parent node
    this.gameObjects.get(parent).children.add(child);

    //notify
    this.notifyAddedObject(child);
  }

  //private
  addGameObject(object) {
    //validate
    Validation.validateType(
      object,
      GameObject,
      'child given not a game object'
    );

    //add the child with no children
    this.gameObjects.set(object, { parent: null, children: new Set() });
    //add the object hashed on name
    if (object.name !== '') this.namedGameObjects.set(object.name, object);
  }

  //private
  notifyAddedObject(object) {
    //let object know its added
    object.addedToEngine(this);
    if (this.isRunning) {
      object.start();
    }
  }

  parentOf(object) {
    return this.gameObjects.get(object).parent;
  }

  childrenOf(object) {
    return this.gameObjects.get(object).children;
  }
  hasChild(parent, child) {
    return childrenOf(parent).has(child);
  }
  hasParent(child, parent) {
    return parentOf(child) === parent;
  }

  //Remove this and all predecessor children
  //
  removeGameObject(object) {
    Validation.validateType(object, GameObject);

    const removeSingleNode = object => {
      //engine should be running, so the start method should have been called
      object.end();
      //remove from parents children list
      this.childrenOf(this.parentOf(object)).delete(object);
      //remove from main list
      this.gameObjects.delete(object);
      //remove name hash
      if (object.name !== '') this.namedGameObjects.delete(object.name);
    };

    //remove children by post-order traversal
    this.postTraverseSceneGraph(object, removeSingleNode);
  }

  update() {
    //What happens if scenegraph is modified during update?
    //Might have a problem if an update leads to a different node beeing removed,
    //  due to the traversal implementation
    this.preTraverseSceneGraph(this.root, o => o.update());

    //update physics

    //update rendering
    this.renderEngine.render();
  }

  start() {
    this.isRunning = true;

    //tell added objects that we are starting
    this.preTraverseSceneGraph(this.root, o => o.start());

    //loop
    this.interval = setInterval(this.update.bind(this), 1.0 / 60.0);
  }

  //end engine run
  end() {
    //stop loop
    clearInterval(this.interval);

    //let objects know
    this.postTraverseSceneGraph(this.root, o => o.end());

    //end engine parts
    physicsEngine.end();
    renderEngine.end();
  }

  //recursively traverse scene graph implisitly given by the gameObjects structure
  preTraverseSceneGraph(rootNode, func) {
    func(rootNode);
    if (!this.gameObjects.has(rootNode)) return; //might have been deleted during execution

    let nodeQueue = new Set(this.childrenOf(rootNode)); //shallow copy
    for (let child of nodeQueue) {
      this.preTraverseSceneGraph(child, func);
    }
  }
  postTraverseSceneGraph(rootNode, func) {
    let nodeQueue = new Set(this.childrenOf(rootNode));
    for (let child of nodeQueue) {
      this.postTraverseSceneGraph(child, func);
    }

    //Dont think this is needed
    //if (!this.gameObjects.has(rootNode)) return;
    func(rootNode);
  }
  traverseSceneGraph(rootNode, preFunc = null, postFunc = null) {
    if (preFunc != null) preFunc(rootNode);
    if (!this.gameObjects.has(rootNode)) return; //might have been deleted during execution

    let nodeQueue = new Set(this.childrenOf(rootNode)); //shallow copy
    for (let child of nodeQueue) {
      this.traverseSceneGraph(child, preFunc, postFunc);
    }

    if (postFunc != null) postFunc(rootNode);
  }
}
