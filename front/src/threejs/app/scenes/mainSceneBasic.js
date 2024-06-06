import { AmbientLight, GridHelper, Scene, Vector3 } from "three";
import { CameraController } from "../../common/CameraController";
import { CubeSelect } from "../../objects/CubeSelect";
import ObserverEmitter, { EVENTS } from "../../../emitter";
import { CharacterExample } from "../../objects/CharacterExample";

import { HelperTranformModels } from "../../helpers/HelperTranformModels";

export class MainScene extends Scene {
	constructor(loadingManager) {
		super();
		//* camara es singleton
		this.camera = new CameraController();
		//* loading general
		this.loadingManager = loadingManager;

		this.create();
		this.light();
		this.listenEmitters();
	}

	create() {
		this.cubeSelect = new CubeSelect("1");
		this.add(this.cubeSelect);

		//* transform controller
		this.add(new GridHelper(5, 10, 0x888888, 0x444444));
		this.add(new HelperTranformModels(this.cubeSelect, 10));

		// this.loadingModelCharacter();
	}

	light() {
		this.ambient = new AmbientLight(0xff4040, 2);
		this.add(this.ambient);
	}

	loadingModelCharacter() {
		if (this.characterExample) {
			return;
		}
		this.characterExample = new CharacterExample(this.loadingManager);
		this.characterExample.position.y = -2;
		this.characterExample.position.z = -2;
		this.add(this.characterExample);
	}

	listenEmitters() {
		// mover camara
		ObserverEmitter.on(EVENTS.examples.moveCamare, (value = 0) => {
			this.camera.control.maxAzimuthAngle = Infinity;
			this.camera.control.minAzimuthAngle = Infinity;
			if (value === 0) {
				this.camera.moveCameraToPoint(new Vector3(0.2493, -0.0504, 4.9935), 1, new Vector3(0, 0, 0), () => {
					this.camera.enabledOrbitControls();
				});
			} else {
				this.camera.moveCameraToPoint(new Vector3(0.2493, -0.0504, 7.9935), 1, new Vector3(0, 0, 0), () => {
					this.camera.enabledOrbitControls();
				});
			}
		});

		// loader de modelo
		ObserverEmitter.on(EVENTS.examples.loadCharacter, () => {
			this.loadingModelCharacter();
		});
	}

	renderAnimations(delta) {
		if (this.characterExample) {
			this.characterExample.renderAnimations(delta);
		}
	}

	dispose() {}
}
