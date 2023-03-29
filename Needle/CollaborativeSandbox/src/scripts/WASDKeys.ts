import { Behaviour, GameObject } from "@needle-tools/engine";
import { Camera } from "@needle-tools/engine/src/engine-components/Camera";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Object3D } from "three";
//import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.122/examples/jsm/controls/OrbitControls.js';

const cameraControls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false
  };
let vel;

export class WASDKeys extends Behaviour {

    targetElement: HTMLElement | null = null;
    _cameraObject: Object3D | null = null;
    private _controls: ThreeOrbitControls | null = null;

    start()
    {
      window.document.addEventListener("keydown", evt => {
        //console.log(evt.key)
        switch(evt.key)
        {
          case 'w':
            console.log("w")
            //zdir = 1;
            cameraControls.moveForward = true;
          break;
          case 'a':
            console.log("a")
            //xdir = 1;
            cameraControls.moveLeft = true;
          break;
          case 's':
            console.log("s")
            //zdir = -1;
            cameraControls.moveBackward = true;
          break;
          case 'd':
            console.log("d")
            //xdir = -1;
            cameraControls.moveRight = true;
          break;
        }
      })

      window.document.addEventListener("keyup", evt => {
        //console.log(evt.key)
        switch(evt.key)
        {
          case 'w':
            console.log("w")
            //zdir = 0;
            cameraControls.moveForward = false;
          break;
          case 'a':
            console.log("a")
            //xdir = 0;
            cameraControls.moveLeft = false;
          break;
          case 's':
            console.log("s")
            //zdir = 0;
            cameraControls.moveBackward = false;
          break;
          case 'd':
            console.log("d")
            //xdir = 0;
            cameraControls.moveRight = false;
          break;
        }
      })
      vel = 0.1;
    }

    onEnable()
    {
        const camGo = GameObject.getComponent(this.gameObject, Camera);
        const cam = camGo?.cam;
        const element = this.targetElement ?? this.context.domElement;  
        if (cam)
          this._cameraObject = cam;
    }

    update(){
      let cam = /*this.cubito;*/ this._cameraObject;
      if(!cam) return;
      if (cameraControls.moveForward) cam.position.z -= vel;
      if (cameraControls.moveBackward) cam.position.z += vel;
      if (cameraControls.moveLeft) cam.position.x -= vel;
      if (cameraControls.moveRight) cam.position.x += vel;

    }

    onBeforeRender(){
      if (this.context.input.getPointerDown(0) || this.context.input.getPointerDown(1) || this.context.input.getPointerDown(2)) {
        console.log("get pointer down ");
      }
    }
    
}
