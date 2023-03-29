import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
import * as THREE from "three";
import { AvatarMarker } from "@needle-tools/engine/src/engine-components/WebXRAvatar";
import { WaitForSeconds } from "@needle-tools/engine/src/engine/engine_coroutine";
import { IModel, SendQueue } from "@needle-tools/engine/src/engine/engine_networking_types";
import { AvatarColor } from "./AvatarColor";
import { delay } from "@needle-tools/engine/src/engine/engine_utils";
//import { delay } from "@needle-tools/engine/node_modules/core-js/library/fn/delay.js";
//import { Console } from "console";
//import { isModuleNamespaceObject } from "util/types";

export class AvatarColorUpdate implements IModel{
    guid : string = "";
    myColor : number = 0;
    constructor(public connId : string, public color : number){}
}

/*
    Summary: 

    The purpose of this class is to apply the received color
    to the avatar component.
*/
export class Avatar extends Behaviour
{
    //#region Fields and Properties
    connId : string | null = null;

    guid: string = "";
    myColor:number = 0;
    dontSave?: boolean;

    private _didAssignPlayerColor: boolean = false;
    private selectedColor : THREE.Color | null = null;
    private hasSelectedColor : boolean | null = null;
    private isReady = false;
    //#endregion

    //#region Needle Engine Implementation
    async onEnable() 
    {     
        console.log("==OnEnable==");
        //this.startCoroutine(this.waitForConnection());
        await delay(1000);
        this.context.connection.beginListen("test", (data) => {
            console.log("received: "+data);
        });
        const myData = {
            time: Date.now(),
        };
        console.log("SEND");
        this.context.connection.send("test", myData);        
    }

    
    
    onDestroy()
    {
        this.context.connection.stopListening("avatarColorUpdate", null);
    }
    //#endregion



    //#region Public Methods
    /*
        Receives the new color to be applied to the avatar
        and a connection Id to make sure the color will be
        applied only to the user's avatar that picked the 
        color.
    */
    public applyColor(newColor : THREE.Color, connID : string)
    {
        const marker = GameObject.getComponentInParent(this.gameObject, AvatarMarker);
        if(this.connId != connID || this.hasSelectedColor) return;
        
        if (marker && marker.connectionId) 
        {
            this.assignUserColor(marker.connectionId, newColor);
        }
        else
            console.log("no marker or connection id");
        
    }

    public static hashCode(str: string) 
    {
        var hash = 0, i, chr;
        if (str.length === 0) return hash;

        for (i = 0; i < str.length; i++) 
        {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    public HasSelectedColor()
    {        
        this._didAssignPlayerColor = true;
    }
    //#endregion

    //#region Private Methods
    private *waitForConnection() 
    {
        while (!this.destroyed && this.enabled) {
            yield WaitForSeconds(.2);
            if(this.tryGetConnID()) 
            {
                this.context.connection.beginListen("avatarColorUpdate", (data) => {
                    let rdata = data as AvatarColorUpdate;
                    console.log("===1==="+rdata.connId+"_"+rdata.color);
                    console.log("===2==="+rdata.guid+"_"+rdata.myColor);
                    console.log('received: ${JSON.stringify(data)}');
                });
                break;            
            }
        }
    }

    private tryGetConnID():boolean
    {
        const marker = GameObject.getComponentInParent(this.gameObject, AvatarMarker);
        
        if (marker && marker.connectionId) 
        {
            this._didAssignPlayerColor = true;
            this.connId = marker.connectionId;
            this.guid = this.connId;
            this.dontSave = false;
            return true;
        }
        return false;
    }

    private async waitForReady(): Promise<void>
    {
        while(!this.isReady)
        {
            await new Promise((resolve) => setTimeout(resolve, 10));
        }
    }  

    private assignUserColor(id: string, uiColor: THREE.Color) 
    {
       const hash = Avatar.hashCode(id);
       const color = uiColor;
       if (this.gameObject.type === "Mesh") 
       {
           const mesh: THREE.Mesh = this.gameObject as any;
           this.assignColor(color, id, mesh);
       }
       else if (this.gameObject.children) 
       {
           for (const ch of this.gameObject.children) 
           {
               const obj = ch as any;
               if (obj.material && obj.material.color) 
               {
                   this.assignColor(color, id, obj);
               }
           }
       }
    }    

    private assignColor(col: THREE.Color, id: string, mesh: THREE.Mesh) 
    {
        let mat = mesh.material as THREE.Material;
        if (!mat) return;

        if (mat["_playerMaterial"] !== id) 
        {
            mat = mat.clone();
            mat["_playerMaterial"] = id;
            mesh.material = mat;
        }
        else 
            console.log("DONT CLONE", mat);
        mat["color"] = col;
        // Replicate the change to the network
        if(!this.connId) return;
        
        const packedColor = ((col.r * 255) << 16) | ((col.g * 255) << 8) | (col.b * 255);
        let myData = new AvatarColorUpdate(this.connId, packedColor);
        console.log("will broadcast: "+myData.connId+" and "+myData.color);
        this.context.connection.send("avatarColorUpdate", myData, SendQueue.Immediate);
        //this.context.connection.send(this.connId, this.gameObject as IModel, SendQueue.Immediate);
    }
    //#endregion
}
