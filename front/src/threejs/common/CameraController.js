import { GUI } from "dat.gui";
import { gsap } from "gsap";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
export class CameraController extends PerspectiveCamera {
	constructor(fov, relation, near, far, container, doomElement) {
		super();
		if (CameraController.instance) {
			return CameraController.instance;
		}
		CameraController.instance = this;
		this.doomElement = doomElement;
		this.fov = fov;
		this.aspect = relation;
		this.far = far;
		this.near = near;
		this.orbitsEnabled = true;
		this.createControls(container);
		// this.helper();
	}

	createControls(container) {
		this.control = new OrbitControls(this, container);
		this.control.target.set(0.34, -0.51, 0.09);
		this.control.rotateSpeed = 0.4;
		this.control.dampingFactor = 0.5;
	}

	disabledOrbitControls() {
		this.control.enabled = false;
		this.orbitsEnabled = false;
	}

	enabledOrbitControls() {
		this.control.enabled = true;
		this.orbitsEnabled = true;
	}

	// enableFirstPersonCamera() {
	// 	this.fpControlsEnabled = true;
	// 	this.fpControls = new FirstPersonControls(this, this.doomElement);
	// 	this.fpControls.activeLook = false;
	// 	this.fpControls.mouse
	// 	this.fpControls.movementSpeed = 5;
	// 	this.fpControls.lookSpeed = 0.01;
	// }

	helper() {
		const gui = new GUI();
		const cameraControls = gui.addFolder("camera");
		cameraControls.add(this.position, "x", -300, 300).step(0.0001).listen();
		cameraControls.add(this.position, "y", -1000, 1000).step(0.0001).listen();
		cameraControls.add(this.position, "z", -900, 100).step(0.0001).listen();
		cameraControls.add(this.rotation, "x", -5.0, 5.0).step(0.0001).listen();
		cameraControls.add(this.rotation, "y", -5.0, 5.0).step(0.0001).listen();
		cameraControls.add(this.rotation, "z", -5.0, 5.0).step(0.0001).listen();
		// cameraControls.open();
		const controls = gui.addFolder("controls");
		controls.add(this.control.target, "x", -300, 300).step(0.001).listen();
		controls.add(this.control.target, "y", -700, 700).step(0.001).listen();
		controls.add(this.control.target, "z", -300, 300).step(0.001).listen();
		controls.add(this.control, "maxAzimuthAngle", -4, 4).step(0.001).listen();
		controls.add(this.control, "minAzimuthAngle", -4, 4).step(0.001).listen();
		// Control de zoom (minDistance y maxDistance)
		controls.add(this.control, "minDistance", -10, 10).step(0.1).name("Min Distance").listen();
		controls.add(this.control, "maxDistance", -10, 10).step(0.1).name("Max Distance").listen();
		// controls.open();
	}

	moveCameraToPoint(point, duration = 1, targe, callBack = () => {}) {
		const endPosition = point.clone();

		const timeline = gsap.timeline();

		timeline.to(this.position, {
			duration,
			x: endPosition.x,
			y: endPosition.y,
			z: endPosition.z,
			onComplete: () => {
				callBack();
			},
		});
		timeline.to(
			this.control.target,
			{
				duration,
				x: targe.x,
				y: targe.y,
				z: targe.z,
			},
			`-=${duration}`
		);

		timeline.play();
	}

	update(delta) {
		if (this.orbitsEnabled) {
			this.control.update();
		}
	}

	dispose() {
		if (this.control) {
			this.control.dispose();
			CameraController.instance = null;
		}
	}
}
