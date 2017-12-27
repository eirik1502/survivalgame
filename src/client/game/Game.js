import Engine from './engine/core/Engine';
import GameObject from './engine/core/GameObject';
import TransformComp from './engine/core/TransformComp';
import ShapeRenderComp from './engine/renderEngine/ShapeRenderComp';
import { rect } from './engine/renderEngine/Shape';
import AutomoveComp from './AutomoveComp';
import PlayerComp from './PlayerComp';

export default class Game {
  constructor() {
    this.engine = new Engine();

    //create a GameObject
    let p = new GameObject('player');
    p.addComponent(new TransformComp(100, 100));
    p.addComponent(new ShapeRenderComp(rect, 'rgb(255,0,0)'));
    //char.addComponent(new AutomoveComp(0.07, 0.04));
    p.addComponent(new PlayerComp());

    let p2 = new GameObject('player');
    p2.addComponent(new TransformComp(100, 100));
    p2.addComponent(new ShapeRenderComp(rect, 'rgb(255,0,0)'));
    //char.addComponent(new AutomoveComp(0.07, 0.04));
    p2.addComponent(new PlayerComp());

    this.engine.addRootChild(p);
    this.engine.addChild(p, p2);

    //add some more nodes
    // let a = new GameObject('a');
    // let b = new GameObject('b');
    // let c = new GameObject('c');
    //
    // this.engine.addChild(p, a);
    // this.engine.addRootChild(b);
    // this.engine.addChild(p, c);

    this.engine.start();

    // console.log(this.engine.gameObjects, this.engine.gameObjects.size);
    // console.log(this.engine.namedGameObjects);
    // //traverse
    // console.log('pre traversing scene graph:');
    // this.engine.preTraverseSceneGraph(this.engine.root, o => {
    //   console.log(o.name);
    // });
    // console.log('post traversing scene graph:');
    // this.engine.postTraverseSceneGraph(this.engine.root, o => {
    //   console.log(o.name);
    // });
    //
    // this.engine.removeGameObject(p);
    //
    // console.log(this.engine.gameObjects, this.engine.gameObjects.size);
  }
}
