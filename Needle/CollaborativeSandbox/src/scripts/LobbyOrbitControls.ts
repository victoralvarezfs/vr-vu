import { Behaviour, GameObject } from "@needle-tools/engine";
import { Camera } from "@needle-tools/engine/engine-components/Camera";
import { LookAtConstraint } from "@needle-tools/engine/engine-components//LookAtConstraint";
import { getWorldPosition, slerp } from "@needle-tools/engine/engine/engine_three_utils";
import { RaycastOptions } from "@needle-tools/engine/engine/engine_physics";
import { serializable } from "@needle-tools/engine/engine/engine_serialization_decorator";
import { getParam, isMobileDevice } from "@needle-tools/engine/engine/engine_utils";

import { Box3, Object3D, PerspectiveCamera, Vector2, Vector3 } from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { EventSystem, EventSystemEvents } from "@needle-tools/engine/engine-components/ui/EventSystem";
import { transformWithEsbuild } from "vite";
import { PointerLockControls } from "@needle-tools/engine/node_modules/three/examples/jsm/controls/PointerLockControls";



const freeCam = getParam("freecam");

const disabledKeys = { LEFT: "", UP: "", RIGHT: "", BOTTOM: "" };
let defaultKeys: any = undefined;
let vel;
const cameraControls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false
};


export class LobbyOrbitControls extends Behaviour {
    public get controls() {
        return this._controls;
    }

    public get controllerObject(): Object3D | null {
        return this._cameraObject;
    }

    public onStartInteraction(func: Function) {
        this.controls?.addEventListener("start", func as any);
    }

    autoRotate: boolean = false;
    autoRotateSpeed: number = 1.0;
    enableKeys: boolean = true;
    enableDamping: boolean = true;
    dampingFactor: number = 0.1;
    enableZoom: boolean = true;
    minZoom: number = 0;
    maxZoom: number = Infinity;
    enablePan: boolean = true;
    @serializable(LookAtConstraint)
    lookAtConstraint: LookAtConstraint | null = null;
    lookAtConstraint01: number = 1;
    middleClickToFocus: boolean = true;
    doubleClickToFocus: boolean = true;

    // remove once slerp works correctly
    useSlerp: boolean = true;

    debugLog: boolean = false;
    targetLerpSpeed = 5;
    @serializable(Object3D)
    cubito: Object3D | null = null;

    private _lookTargetPosition!: Vector3;
    private _controls: ThreeOrbitControls | null = null;
    private _cameraObject: Object3D | null = null;

    private _lerpToTargetPosition: boolean = false;
    private _lerpCameraToTarget: boolean = false;
    private _cameraTargetPosition: Vector3 | null = null;

    private _inputs: number = 0;
    private _enableTime: number = 0; // use to disable double click when double clicking on UI
    private _startedListeningToKeyEvents: boolean = false;

    private _eventSystem?: EventSystem;
    private _afterHandleInputFn?: any;

    targetElement: HTMLElement | null = null;

    awake(): void {
        this._lookTargetPosition = new Vector3();
        this._startedListeningToKeyEvents = false;
    }

    start() {
        this._eventSystem = EventSystem.get(this.context) ?? undefined;      
        
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

    update()
    {
        let cam = /*this.cubito;*/ this._cameraObject;
        if(!cam) return;
        if (cameraControls.moveForward) cam.position.z -= vel;
        if (cameraControls.moveBackward) cam.position.z += vel;
        if (cameraControls.moveLeft) cam.position.x -= vel;
        if (cameraControls.moveRight) cam.position.x += vel;

    }

    onDestroy() {
        this._controls?.dispose();
        this._eventSystem?.removeEventListener(EventSystemEvents.AfterHandleInput, this._afterHandleInputFn!);
    }

    onEnable() {
        const camGo = GameObject.getComponent(this.gameObject, Camera);
        const cam = camGo?.cam;
        if (!this._controls) {
            console.assert(cam !== null && cam !== undefined, "Missing camera", this);
            if (cam)
                this._cameraObject = cam;
            // Using the parent if possible to make it possible to disable input on the canvas
            // for having HTML content behind it and still receive input
            const element = this.targetElement ?? this.context.domElement;
            this._controls = new ThreeOrbitControls(cam!, element);
            this._controls.target.set(this.cubito?.position.x as number, this.cubito?.position.y as number, this.cubito?.position.z as number);
        }

        if (this._controls) {
            
            if (!this._startedListeningToKeyEvents) {
                this._startedListeningToKeyEvents = true;
                this._controls.listenToKeyEvents(window.document.body);
            }
        }

    }

    onDisable() {
        if (this._controls) {
            this._controls.enabled = false;
            this._controls.autoRotate = false;
            // this._controls.reset();
        }
    }
    

    onBeforeRender() {
        if (!this._controls) return;

        if (this._controls && !this.context.isInXR) {
            if (this.debugLog)
                this._controls.domElement = this.context.renderer.domElement;

            this._controls.update();
        }
    }

}

    