import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
import { WaitForSeconds } from "@needle-tools/engine/src/engine/engine_coroutine";
import { IMenu } from "./HamburguerMenu";

/*
    Summary:
    This class implements the IMenu interface in order to
    switch two states for the menu. This class provides a
    highlight effect to the selected button.
*/
export class ButtonsSelector extends Behaviour implements IMenu
{
    //#region Fields and Properties
    @serializable(GameObject)
    collapsableMenu : GameObject | null = null;
    @serializable(GameObject)
    buttons : GameObject[] | null = null;
    @serializable(GameObject)
    selectedButtons : GameObject[] | null = null;

    private selected : number | null = null;    
    //#endregion
    
    //#region Needle Engine Implementation
    onEnable()
    {
        this.Expand();
    }
    //#endregion

    //#region Private Methods

    // try setting up a boolean within the while condition
    // and then try changing that value in runtime to see if it 
    // cancels the async method
    private *waitForCollapsingMenu() {
        while (!this.destroyed && this.enabled) 
        {
            yield WaitForSeconds(5);

            this.Collapse();
            
            break;
        }
        // console.log("STOP WAITING", this.name, this.destroyed);
    }

    /**
     * Turns on the collapsable menu and highlights the
     * current selected button. Selects the last in the
     * array by default if any is selected.
     */
    Expand()
    {
        if(!this.collapsableMenu) return;
        this.collapsableMenu.activeSelf = true;
        this.selectedButtons?.forEach(function(value)
        {
            value.activeSelf = false;
        });

        if(!this.buttons) return;
        var selectedButton = this.selected === null ? (this.buttons?.length - 1) : this.selected;
        this.select(selectedButton);
    }

    /**
     * Turns off the collapsable menu. 
     */
    Collapse()
    {
        if(!this.collapsableMenu) return;
        this.collapsableMenu.activeSelf = false;
    }

    //#endregion

    //#region Private Methods
    private select(index : number)
    {     
        if(!this.buttons) return;

        if(this.selected != null)
        {
            if(!this.selectedButtons) return;
            this.selectedButtons[this.selected].activeSelf = false;
            this.selectedButtons[this.selected].visible = false;
            this.buttons[this.selected].activeSelf = true;
            this.buttons[this.selected].visible = true;
        }

        this.buttons[index].activeSelf = false;
        this.buttons[index].visible = false;
        if(!this.selectedButtons) return;
        this.selectedButtons[index].activeSelf = true;
        this.selectedButtons[index].visible = true;
        this.selected = index;
    }
    //#endregion

    
}
