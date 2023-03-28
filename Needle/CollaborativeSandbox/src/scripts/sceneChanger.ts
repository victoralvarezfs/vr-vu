import { Behaviour, serializable, AssetReference, GameObject, serializeable } from "@needle-tools/engine";
import { InputField } from "@needle-tools/engine/engine-components/ui/InputField";
import { getParam, setParamWithoutReload } from "@needle-tools/engine/engine/engine_utils";

export class sceneChanger extends Behaviour {
    // tell the component compiler that we want to reference an array of SceneAssets
    // @type UnityEditor.SceneAsset[]
    @serializable(AssetReference)
    myScenes?: AssetReference[];
    rootScene?: GameObject;
    @serializeable(InputField)
    roomURL?: InputField;

    private currentIndex: number = -1;
    private currentScene: AssetReference | undefined = undefined;

    async awake() {
        return;
    }

    start(){
        return;
        const level = getParam("level");
        if (typeof level === "string") {
            const index = parseInt(level as string);
            this.select(index);
        }
        else this.select(0);
    }

    select(index: number) {
        if (!this.myScenes?.length) return;
        if (index < 0) index = this.myScenes.length - 1;
        if (index >= this.myScenes.length) index = 0;
        const scene = this.myScenes[index];
        console.log("load scene: "+index);
        this.switchScene(scene);
    }

    async switchScene(newScene: AssetReference)
    {
        if(newScene === this.currentScene) return;
        if (this.currentScene)
            GameObject.remove(this.currentScene.asset);
        const index = this.currentIndex = this.myScenes?.indexOf(newScene) ?? -1;
        this.currentScene = newScene;
        console.log("about to load");
        await newScene.loadAssetAsync();
        if (!newScene.asset) return;
        if (this.currentIndex === index) {
            GameObject.add(newScene.asset, this.gameObject);
            // save the loaded level as an url parameter
            setParamWithoutReload("level", index.toString());
        }
        console.log("loaded?");
    }

    async loadScene(index:number)
    {
        if (!this.myScenes) {
            return;
        }
        console.log("load scene",index);
        var scene = this.myScenes[index];
        const myScene = await scene.loadAssetAsync();
        this.gameObject.add(myScene);
        console.log("boa a esperar");
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        await sleep(4000);
        this.rootScene?.removeFromParent();
        console.log("die bart die");
    }

    async goToURL()
    {        
        if(this.roomURL == null || this.roomURL.text == "") return;
        window.open(this.roomURL.text, "_self");
    }

    onDestroy(): void {
        if (!this.myScenes) return;
        for (const scene of this.myScenes) {
            scene?.unload();
        }
    }
} 