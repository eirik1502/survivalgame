import RenderComp from './RenderComp';
import TransformComp from '../core/TransformComp';
import Validation from '../utils/Validation';
import GameObject from '../core/GameObject';

export default class RenderEngine {
  constructor(engine) {
    this.engine = engine;

    //map renderable objects to a set of its render components
    this.renderObjects = new Map();

    //get canvas
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d');

    //set canvas properties
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  end() {}

  addRenderComp(renderObject, renderComp) {
    Validation.validateType(renderObject, GameObject);
    Validation.validateType(renderComp, RenderComp);

    //if the given object is not already assigned with a render comp, create a new entry
    if (!this.renderObjects.has(renderObject)) {
      this.renderObjects.set(renderObject, new Set());
    }
    //add the component to the object given
    this.renderObjects.get(renderObject).add(renderComp);

    console.log(this.renderObjects);
  }

  removeRenderComp(renderObject, renderComp) {
    //validate arguments
    Validation.validateType(renderObject, GameObject);
    Validation.validateType(renderComp, RenderComp);
    //check if object and comp is assigned
    if (!this.renderObjects.has(renderObject)) throw new Error();
    if (!this.renderObjects.get(renderObject).has(renderComp))
      throw new Error();

    //if the entry only contains one component, remove the entry
    if (this.renderObjects.get(renderObject).size <= 1) {
      this.renderObjects.delete(renderObject);
    } else {
      this.renderObjects.get(renderObject).delete(renderComp);
    }
  }

  render() {
    //clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //render sceneGraph in pre-order, children last
    this.engine.traverseSceneGraph(
      this.engine.root,
      o => {
        let transComp = o.getComponent(TransformComp);

        //save currTransform before transforming
        this.ctx.save();

        //apply transformations
        this.ctx.translate(transComp.x, transComp.y);
        this.ctx.rotate(transComp.rot);
        this.ctx.scale(1, 1);

        //render
        if (this.renderObjects.has(o)) {
          //the object is renderable
          //for each render comp attached, render the comp with the current transform
          for (let renderComp of this.renderObjects.get(o)) {
            renderComp.render(this.ctx);
          }
        }
      },
      o => {
        //pop transform
        this.ctx.restore();
      }
    );

    //reset identity matrix
    //this.ctx.currentTransform = currTransforms.pop();

    // //render all components
    // for (let comp of this.renderComps) {
    //   //retrieve the position and rotation of the object
    //   const transComp = comp.owner.components.get(TransformComp);
    //
    //   //transform
    //   this.ctx.translate(transComp.x, transComp.y);
    //   this.ctx.rotate(transComp.rot);
    //   this.ctx.scale(1, 1);
    //
    //   //render
    //   comp.render(this.ctx);
    //
    //   //reset transform
    //   this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // }
  }
}
