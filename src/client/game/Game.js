import Engine from './core/Engine';
import GameObject from './core/GameObject';
import TransformComp from './core/TransformComp';
import ShapeRenderComp from './renderEngine/ShapeRenderComp';
import { rect } from './renderEngine/Shape';
import AutomoveComp from './AutomoveComp';
import PlayerComp from './PlayerComp';

export default class Game {
  constructor() {
    this.engine = new Engine();

    //create a GameObject
    let char = new GameObject('char');
    char.addComponent(new TransformComp(100, 100));
    char.addComponent(new ShapeRenderComp(rect, 'rgb(255,0,0)'));
    //char.addComponent(new AutomoveComp(0.07, 0.04));
    char.addComponent(new PlayerComp());

    setTimeout(() => this.engine.remove);

    this.engine.addGameObject(char);

    this.engine.start();
  }
}
