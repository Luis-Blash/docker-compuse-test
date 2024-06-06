import { WebGLRenderer } from "three";
import { Scene } from "three";
import { PerspectiveCamera } from "three";
import { Vector2 } from "three";
import { Raycaster } from "three";

let mouse = new Vector2();
let raycaster = new Raycaster();
export class MouseEvents {
	/**
	 * this class helps you to controller events mouse
	 *
	 */
	constructor(container, renderer = WebGLRenderer, camera = PerspectiveCamera, scene = Scene) {
		this.container = container;
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
		this.objectsToValue = this.scene.children;
		this.distanceDrag = 0;
		this.previosTouch = null;
		this.isCliked = false;
		this.defaultInteractions();
	}
	_getInteractionMouse(e) {
		const canvasBounds = this.renderer.domElement.getBoundingClientRect();
		mouse.x = ((e.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
		mouse.y = -((e.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
		raycaster.setFromCamera(mouse, this.camera);
		let intersects = raycaster.intersectObjects(this.objectsToValue, true);
		return intersects;
	}
	/**
	 * @param [callback=1] — return object to mouse pointer.
	 */
	onPoinertMove(callBack = Function) {
		this.container.onpointermove = (e) => {
			e.preventDefault();
			this.distanceDrag++;
			callBack(this._getInteractionMouse(e));
		};
		this.container.ontouchmove = (e) => {
			e.preventDefault();
			this.distanceDrag++;
			callBack(this._getInteractionMouse(e));
		};
	}
	onPointerUp(callBack = Function) {
		this.container.onpointerup = (e) => {
			e.preventDefault();
			this.isCliked = false;
			if (this.distanceDrag < 7) {
				callBack(this._getInteractionMouse(e));
			}
		};
		this.container.touchend = (e) => {
			e.preventDefault();
			this.isCliked = false;
			if (this.distanceDrag < 7) {
				callBack(this._getInteractionMouse(e));
			}
		};
	}

	onPointerDrag(callback = Function) {
		// * esta funcion desabilita onPointerMove
		this.container.onpointermove = (e) => {
			this.distanceDrag++;
			if (this.isCliked) {
				e.preventDefault();
				callback(e);
			}
		};

		this.container.ontouchmove = (e) => {
			const touch = e.touches[0];
			if (this.previosTouch) {
				e.movementX = touch.clientX - this.previosTouch.clientX;
				e.movementY = touch.clientY - this.previosTouch.clientY;
			}
			this.distanceDrag++;
			if (this.isCliked) {
				this.previosTouch = touch;
				e.preventDefault();
				callback(e);
			}
		};
	}

	defaultInteractions() {
		this.container.onpointerdown = (e) => {
			e.preventDefault();
			this.isCliked = true;
			this.distanceDrag = 0;
			this.previosTouch = null;
		};
		this.container.onpointermove = (e) => {
			e.preventDefault();
			this.distanceDrag++;
		};
		this.container.ontouchmove = (e) => {
			e.preventDefault();
			this.distanceDrag++;
		};
	}

	disposeInteractions() {
		this.defaultInteractions();
		this.container.onpointerup = () => { };
	}
}
