import { AnimationMixer, Mesh } from "three";
import { setDracoLoading } from "../helpers/dracoHelper";
import { modelsAssets } from "../../assets/models";

export class CharacterExample extends Mesh {
	constructor(loadingManager, model = modelsAssets.modelAndatti, name = "") {
		super();
		const loader = setDracoLoading(loadingManager);
		this.name = `${name}`;
		//* animacion
		this.mixer = null;

		//* metodos
		this.onLoadModels(loader, model);
	}

	onLoadModels(loader, model) {
		loader.load(model, (gltf) => {
			this.add(gltf.scene);
			const animations = gltf.animations;
			if (animations && animations.length) {
				this.mixer = new AnimationMixer(gltf.scene);
				this.idle = animations.find((anim) => anim.name === "Idle 1");
				this.idle2 = animations.find((anim) => anim.name === "Idle 2");
				this.saludo = animations.find((anim) => anim.name === "Saludo");
				this.festejo = animations.find((anim) => anim.name === "Festejo");
				this.pena = animations.find((anim) => anim.name === "Pena");
				this.pensativo = animations.find((anim) => anim.name === "Pensativo");

				this.mixer.clipAction(this.idle).play(); // Reproducir la primera animación
			}
		});
	}

	// TODO: Animaciones
	onAnimateIdle() {
		this.mixer.stopAllAction();
		this.mixer.clipAction(this.idle).play();
	}
	onAnimateIdleTwo() {
		this.mixer.stopAllAction();
		this.mixer.clipAction(this.idle2).play();
	}
	onAnimateSaludo() {
		this.mixer.stopAllAction();
		this.mixer.clipAction(this.saludo).play();
	}
	onAnimationFestejo() {
		this.mixer.stopAllAction();
		this.mixer.clipAction(this.festejo).play();
	}
	onAnimationPena() {
		this.mixer.stopAllAction();
		this.mixer.clipAction(this.pena).play();
	}
	onAnimationPensativo() {
		this.mixer.stopAllAction();
		this.mixer.clipAction(this.pensativo).play();
	}

	//* render
	renderAnimations(delta, camera = null) {
		if (camera) {
			this.lookAt(camera.position);
			this.onPositionCharacterInFront(camera);
		}
		if (this.mixer) {
			this.mixer.update(delta);
		}
	}
}
