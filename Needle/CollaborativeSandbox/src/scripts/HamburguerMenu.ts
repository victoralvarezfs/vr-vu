import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Object3D } from "three";

export class HamburguerMenu extends Behaviour
{
    @serializable(Object3D)
    menuIcons : Object3D[] | null = null;
    collapsed : boolean | null = null;
    @serializable(EventList)
    expand? : EventList;
    @serializable(EventList)
    collapse? : EventList;

    switchMenu()
    {
        if(this.collapsed)
            this.Expand();
        else
            this.Collapse();        
    }

    private Expand()
    {
        this.collapsed = false;
        this.expand?.invoke();
    }

    private Collapse()
    {
        this.collapsed = true;
        this.collapse?.invoke();
    }
}