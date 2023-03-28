import { Behaviour, serializable, GameObject, WebXR, Button} from "@needle-tools/engine";
import { Object3D } from "three";
import { isMobileDevice, isiOS, isMozillaXR, isSafari, isQuest, getParam }
from "@needle-tools/engine/engine/engine_utils";
import { VRButton }from "./VRButton";

enum Platform {
  Desktop,
  Mobile,
  Quest
}

export class UISelector extends Behaviour
{
	@serializable(WebXR)
	webxr : WebXR | null = null;

	@serializable(Object3D) 
    player: Object3D | null = null;

	@serializable(GameObject) 
    worldObject: GameObject | null = null;

	@serializable(Object3D) 
    uiObjects: Object3D[] | null = null;

	//@serializable() 
    //mobileUIs: UIScreen[] | null = null;

	data: string = "";
	enteredVR?: boolean = false;

	platform: Platform | null = null;	

	@serializable()
	_vrButton?: VRButton;

	@serializable()
	currentScreen:number = 0;

	start()
	{
		if(!this.uiObjects) return;
		if(this.uiObjects.length < 4) 
		{
			console.log("Assign the ui objects");
			return;
		}
		this.data = window.navigator.userAgent;
		console.log("user agent: "+window.navigator.userAgent);
		console.log("is mobile device: ",isMobileDevice());
		console.log("is Mozilla XR: ",isMozillaXR());
		console.log("is quest: ",isQuest());				
	}

	onEnable()
	{
		this.checkPlatform();
	}

	async checkPlatform()
	{
		const sleep = (ms) => new Promise(r => setTimeout(r,ms));
		await sleep(1000);
		if(!this.uiObjects) return;
		GameObject.setActive(this.uiObjects[0]!, false);
		GameObject.setActive(this.uiObjects[1]!, false);
		GameObject.setActive(this.uiObjects[2]!, false);
		GameObject.setActive(this.uiObjects[3]!, false);

		if(isMobileDevice())
		{
			if(isQuest())
			{
				// Oculus Quest
				if(!this.webxr) return;
				if(!this.webxr.IsInVR)
				{
					// Displays "Enter VR" Button
					this._vrButton = document.getElementById('VRButton');
					if(this._vrButton != null)
					{
						this._vrButton.addEventListener('click', this.clickedEnterVR);
					}
					// Turn off Quest instructions
					this.platform = Platform.Quest;
				}
			}
			else
			{
				// Mobile 
				this.platform = Platform.Mobile;
				// Check device orientation
				this.checkOrientation();
			}
		}else
		{
			// Desktop
			this.platform = Platform.Desktop;
			GameObject.setActive(this.uiObjects[0]!, true);
		}
	}

	update()
	{		
		//var devOrientation = this.orientation();
		if(this.platform == Platform.Mobile) this.checkOrientation();
		if(!this.webxr) return;
		if(this.platform == Platform.Quest && this.webxr.IsInVR && !this.enteredVR) this.setVRInstructions();
		//this.switchUI(devOrientation);
	}

	orientation(): boolean
    {
		//console.log("current platform: ", this.platform);
		if(this.platform == 1)
		{
        this.data = window.navigator.userAgent;
        var height = window.innerHeight; //window.screen.height * window.devicePixelRatio;
        var width = window.innerWidth;  //window.screen.width * window.devicePixelRatio;
		
        var orientation = false;

        if(height > width)
            return true;
        else
            return false;
		}
		else return false;
    }

	checkOrientation()
	{
		var portrait = this.orientation();
		if(!this.uiObjects) return;
		GameObject.setActive(this.uiObjects[1]!, portrait);
		GameObject.setActive(this.uiObjects[2]!, !portrait);		
	}
	
	clickedEnterVR()
	{
		console.log("ya no se hace nada");
		//UISelector.setVRInstructions;
	}

	setVRInstructions()
	{
		this.enteredVR = true;
		//var p = this.player.worldToLocal(this.player.position);
		if(!this.worldObject) return;
		this.worldObject.position.set(0,0,0);
		GameObject.setActive(this.worldObject, true);
	}

	openOtherRoom()
	{
		//window.location.href = "webxr";
		//window.open("webxrurl", "_self");
		//window.open("https://humorous-gilded-donkey.glitch.me/?room=mighty_dragon_400", "_self");
		var webxr = "https://diamond-odd-microceratops.glitch.me/?room=smol_pig_569";
		console.log("updates the href: "+webxr);
		window.location.href = webxr;
		window.open(webxr);
		//window.location.href = "https://humorous-gilded-donkey.glitch.me/?room=shiny_turtle_832";
	}
}