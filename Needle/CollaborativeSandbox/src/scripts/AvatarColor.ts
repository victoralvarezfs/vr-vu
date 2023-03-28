import { Behaviour, serializable, GameObject, Renderer, WebXR } from "@needle-tools/engine";
import * as THREE from "three";
import { Avatar } from "./Avatar";

/*
    Summary:

    The purpose of this class is to set a color for the 
    user' avatar. 
*/

export class AvatarColor extends Behaviour
{
    //#region Fields and Properties

    @serializable(Avatar)
    public avatars: Avatar[] | null = null;
    public currentUserConnID : string | null = null;
    //#endregion

    cubito : GameObject | null = null;

    //#region Needle Engine Implementation
    onEnable()
    {
        var avatarColors = GameObject.findObjectsOfType(AvatarColor);
        //if(avatarColors.length > 1) this.destroy();
    }
    //#endregion

    //#region Public Methods
    /*
        Receives a color string and applies the color to the avatar
    */
    tryColor(color : string)
    {
        switch(color)
        {
            case "red":
                this.selectColor(new THREE.Color(0xFF0000));
                break;
            case "blue":
                this.selectColor(new THREE.Color(0x0000FF));
                break;
            case "yellow":
                this.selectColor(new THREE.Color(0xFFFF00));
                break;
            case "purple":
                this.selectColor(new THREE.Color(0x800080));
                break;
            case "green":
                this.selectColor(new THREE.Color(0x00FF00));
                break;
            case "gray":
                this.selectColor(new THREE.Color(0x808080));
                break;
            case "orange":
                this.selectColor(new THREE.Color(0xFF8800));
                break;
            default:
                this.selectColor(new THREE.Color(0x000000));
                break;
        }
    }

    public setColor()
    {
        if(!this.avatars) return;
        var connId = this.context.connection.connectionId;
        this.avatars.forEach(function(value)
        {
            //console.log("for each: "+value.gameObject.name+" conn id: "+value.connId);
            if(value.connId == connId) value.HasSelectedColor();
        });
    }
    //#endregion

    //#region Private Methods
    /*
        Finds all the avatar's components in the scene and applies the 
        selected color only to the avatar's components with the same
        connection id as well as the Oculus UI connection id that invoked
        the "selectColor" method.
    */ 
    private selectColor(newColor : THREE.Color)
    {
        this.avatars = GameObject.findObjectsOfType(Avatar);
        if(!this.avatars) return;
        var connId = this.context.connection.connectionId;
        this.currentUserConnID = connId as string;
        this.avatars.forEach(function(value)
        {
            if(value.connId == connId) value.applyColor(newColor, connId as string);
        });
    }
    //#endregion

    //#region Delete this region
    red()
    {
        var color = new THREE.Color(1,0,0);
        const mesh: THREE.Mesh = this.cubito as any;
        let mat = mesh.material as THREE.Material;
        mat["color"] = color;        
    }

    green()
    {
        var color = new THREE.Color(0,1,0);
        const mesh: THREE.Mesh = this.cubito as any;
        let mat = mesh.material as THREE.Material;
        mat["color"] = color;        
    }

    blue()
    {
        var color = new THREE.Color(0,0,1);
        const mesh: THREE.Mesh = this.cubito as any;
        let mat = mesh.material as THREE.Material;
        mat["color"] = color;        
    }
    //#endregion

}