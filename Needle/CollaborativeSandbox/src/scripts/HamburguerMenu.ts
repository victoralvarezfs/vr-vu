import { Behaviour, serializable, EventList, GameObject } from "@needle-tools/engine";
import { timeout } from "@needle-tools/engine/node_modules/async";
import { ButtonsSelector }from "./ButtonsSelector";

export declare interface IMenu 
{
    Expand();
    Collapse(); 
}

/* 
    Summary:
    This class implements the IMenu interface in order
    to switch two states for the menu. This class has 
    a timer to auto collapse after a given time in ms.
*/
export class HamburguerMenu extends Behaviour implements IMenu
{
    //#region Fields and Properties
    @serializable(ButtonsSelector)
    buttonSelector : ButtonsSelector | null = null;
    @serializable(GameObject)
    buttons : GameObject[] | null = null;
    collapsed : boolean | null = null;
    
    private collapseTimeout: timeout | null = null;
    //#endregion

    //#region Public Methods

    /**
     * Collapses or expands the menu
     * based on a boolean which is inverted each
     * time the method is invoked.
     */
    switchMenu()
    {
        if(this.collapsed)
            this.Expand();
        else
            this.Collapse();        
    }

    /**
     * Switches the menu buttons and invokes
     * the Expand event on the button selector
     */
    Expand()
    {
        this.collapsed = false;
        if(!this.buttons) return;
        this.buttons[0].activeSelf = false;
        this.buttons[0].visible = false;
        this.buttons[1].activeSelf = true;
        this.buttons[1].visible = true;
        this.buttonSelector?.Expand();
    }

    /**
     * Switches the menu buttons and invokes
     * the Collapse event on the button selector
     */
    Collapse()
    {
        this.collapsed = true;
        if(!this.buttons) return;
        this.buttons[0].activeSelf = true;
        this.buttons[0].visible = true;
        this.buttons[1].activeSelf = false;
        this.buttons[1].visible = false;
        this.buttonSelector?.Collapse();
    }    

    /**
     * Cancels a delay if any and starts the
     * timer to collapse the menu after a 
     * given amount of time in ms.
     */
    startDelay(delayInMs: number) 
    {
        this.cancelCollapseDelay();
        this.collapseAfterDelay(delayInMs);
    }
    //#endregion

    //#region Private Methods
    private collapseAfterDelay(delayInMs: number) 
    {
        this.collapseTimeout = setTimeout(() => 
        {
            this.Collapse();
            this.collapseTimeout = null;
        }, delayInMs);
    }

    private cancelCollapseDelay() 
    {
        if (this.collapseTimeout !== null) 
        {
            clearTimeout(this.collapseTimeout);
            this.collapseTimeout = null;
        }
    }
    //#endregion
}