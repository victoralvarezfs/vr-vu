import { Behaviour, GameObject, serializable } from "@needle-tools/engine";
import { Object3D } from "three"

//@serializable()
export class UIScreen extends Behaviour
{
	@serializable(Object3D) 
    uiObjects: Object3D[] | null = null;

	public updatePanels(index: number)
	{
		for(let i=0; i<3; i++)
		{
			var active = i != index ? false : true; 
			//GameObject.setActive(this.uiObjects, active);
		}
	}
}