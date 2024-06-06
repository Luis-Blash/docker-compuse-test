import { Clock, LoadingManager, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module";
// comunes
import { CameraController } from "../common/CameraController";
// scenas
import { MainScene } from "./scenes/mainSceneBasic";
import ObserverEmitter, { EVENTS } from "../../emitter";

let deltasum = 0;
let interval = 1 / 60;
export class App {
	constructor(container) {
		this.container = container;
		this.loadingManager = new LoadingManager();
		this.clock = new Clock();

		this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);

		this.container.appendChild(this.renderer.domElement);

		this.camera = new CameraController(
			60,
			this.container.clientWidth / this.container.clientHeight,
			0.1,
			500,
			this.container,
			this.renderer.domElement
		);
		this.camera.position.set(0, 0, 5);

		//* Escenas
		this.mainScene = new MainScene(this.loadingManager);

		//? Stasts FPS
		this.stats = new Stats();
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);

		//* metodos
		this.onResized();
		this.loadingProyectEvents();
		window.addEventListener(
			"resize",
			() => {
				this.onResized();
			},
			{ passive: true }
		);
	}

	loadingProyectEvents() {
		//! SI ESTAS USANDO EL LOADING COMENTA EL DE ABAJO
		this.render();

		/**
		 * ! RECUERDA QUE SI UTILIZAS MODELOS DESDE EL INICIO
		 * ! TIENES QUE USAR EL LOADER GLOBAL PARA MOSTAR UNA PANTALLA DE CARGA
		 */
		this.loadingManager.onProgress = () => {
			ObserverEmitter.emit(EVENTS.loader3D.onProgress);
		};
		this.loadingManager.onLoad = () => {
			ObserverEmitter.emit(EVENTS.loader3D.onLoad);
			this.render();
		};
	}

	onResized() {
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
	}

	onClockSceneRender() {
		const delta = this.clock.getDelta();
		deltasum += delta;
		//* el clock
		if (deltasum > interval) {
			this.renderer.render(this.mainScene, this.camera);
			this.mainScene.renderAnimations(deltasum);
			//* objetos
			this.camera.update(deltasum);
			this.stats.update();

			deltasum = deltasum % interval;
		}
	}

	cleanup() {
		if (this.renderer) {
			this.renderer.setAnimationLoop(null);
			this.renderer.dispose();
		}
		if (this.stats) {
			document.body.removeChild(this.stats.dom);
			this.stats = null;
		}
		this.container.removeChild(this.renderer.domElement);

		this.camera.dispose();
	}

	render() {
		this.onClockSceneRender();
		this.renderer.setAnimationLoop(() => this.render());
	}
}
