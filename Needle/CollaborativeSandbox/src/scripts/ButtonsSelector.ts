import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
import { WaitForSeconds } from "@needle-tools/engine/engine/engine_coroutine";

/*
    Summary:

*/
export class ButtonsSelector extends Behaviour
{
    //#region Fields and Properties
    @serializable(GameObject)
    collapsableMenu : GameObject | null = null;
    @serializable(GameObject)
    buttons : GameObject[] | null = null;
    @serializable(GameObject)
    selectedButtons : GameObject[] | null = null;

    selectedColor : THREE.Color | null = null;
    nonSelectedColor : THREE.Color | null = null;

    private selected : number | null = null;
    //#endregion
    
    //#region Needle Engine Implementation
    onEnable()
    {
        this.Expand();
    }
    //#endregion

    //#region Private Methods
    private *waitForCollapsingMenu() {
        while (!this.destroyed && this.enabled) 
        {
            yield WaitForSeconds(5);

            this.Collapse();
            
            break;
        }
        // console.log("STOP WAITING", this.name, this.destroyed);
    }

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

    Collapse()
    {
        if(!this.collapsableMenu) return;
        this.collapsableMenu.activeSelf = false;
    }

    //#endregion

    //#region Public Methods

    //
    //
    //
    select(index : number)
    {
        this.selected = index;
        if(!this.buttons) return;
        this.buttons[index].activeSelf = false;
        if(!this.selectedButtons) return;
        this.selectedButtons[index].activeSelf = true;
    }

    //
    //
    //
    selectButton(index : number)
    {
        this.selected = index;
        if(!this.buttons) return;
        //get the image of the button and apply the selected color
        if(!this.selectedButtons) return;
        //this.selectedButtons[index].activeSelf = true;
    }
    //#endregion
}