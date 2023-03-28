import { Behaviour, GameObject, Camera } from "@needle-tools/engine";
  import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
//import { FirstPersonControls } from "./FirstPersonControls.js";
import { Object3D } from "three";

export class FPSControls extends Behaviour
{
    fpsControls : FirstPersonControls | null = null;
    targetElement: HTMLElement | null = null;
    _cameraObject: Object3D | null = null;
    delta : number | null = null;
    clicking : boolean | null = null;

    start()
    {
      console.log("***start");
      this.clicking = false;
        const camGo = GameObject.getComponent(this.gameObject, Camera);
        const cam = camGo?.cam;
        const element = this.targetElement ?? this.context.domElement;  
        if (cam)
          this._cameraObject = cam;
        this.fpsControls = new FirstPersonControls(this._cameraObject as THREE.Camera, this.context.domElement);
        this.fpsControls.enabled = true;
        this.delta = 1;
        this.fpsControls.movementSpeed = .1;
        this.fpsControls.lookSpeed  = 0.001;
        this.fpsControls.mouseDragOn = false;
        //this.fpsControls.activeLook = false;
        this.fpsControls.update(this.delta);
        this.fpsControls.heightMax = 0;
        this.fpsControls.constrainVertical = true;
        //this.fpsControls.
    }

    update(){
      if(!this.fpsControls) return;
      if(!this.delta) return;
      if (this.context.input.getPointerDown(0) || this.context.input.getPointerDown(1) || this.context.input.getPointerDown(2)) {
        console.log("get pointer down ");
        //this.fpsControls.lookSpeed = 0;
        this.clicking = true;
        this.fpsControls.activeLook = true;
      }
      if (this.context.input.getPointerUp(0) || this.context.input.getPointerUp(1) || this.context.input.getPointerUp(2)) {
        console.log("get pointer up ");
        this.clicking = false;
        //this.fpsControls.lookSpeed = 0;
        this.fpsControls.activeLook = false;
      }
      this.fpsControls.update(this.delta);
    }
}