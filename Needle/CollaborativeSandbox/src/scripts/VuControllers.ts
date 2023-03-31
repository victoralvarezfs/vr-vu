import { Behaviour, serializable } from "@needle-tools/engine"

export class VuControllers extends Behaviour
{    
    public enableLocomotion : boolean | null = null;

    public Locomotion():boolean
    {
        if(this.enableLocomotion) return this.enableLocomotion;
        else return false;
    }
}