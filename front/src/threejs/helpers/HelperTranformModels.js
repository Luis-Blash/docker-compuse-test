import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { CameraController } from "../common/CameraController";
import { GUI } from "dat.gui";

const gui = new GUI();

let instanceDom = false;

const methodCopy = (data = {}) => {
	const stringData = JSON.stringify(data, null, 2);
	navigator.clipboard
		.writeText(stringData)
		.then(() => {
			console.log("Variables copiadas a la clipboard", stringData);
		})
		.catch((error) => {
			console.error("Error al copiar las variables:", error);
		});
};

export class HelperTranformModels {
	constructor(object = null, limit = 10) {
		if (!object) {
			return;
		}

		if (!instanceDom) {
			instanceDom = true;
			this.domInstruction();
		}

		this.camera = new CameraController();
		this.transformHelper = new TransformControls(this.camera, this.camera.doomElement);
		this.add(object, limit);
		this.transformHelper.addEventListener("dragging-changed", (e) => {
			if (e.value) {
				this.camera.disabledOrbitControls();
			} else {
				this.camera.enabledOrbitControls();
			}
		});
		this.keyActivesEnable();

		return this.transformHelper;
	}

	keyActivesEnable() {
		const onKeyDown = (event) => {
			const keyActions = {
				81: () => {
					const spaceTransform = this.transformHelper.space === "local" ? "world" : "local";
					this.transformHelper.setSpace(spaceTransform);
					const htmlTempSpan = document.getElementById("tempSpan-0");
					htmlTempSpan.innerHTML = "Q Space " + spaceTransform;
				},
				87: () => this.transformHelper.setMode("translate"),
				69: () => this.transformHelper.setMode("rotate"),
				82: () => this.transformHelper.setMode("scale"),
				32: () => (this.transformHelper.enabled = !this.transformHelper.enabled),
			};

			const action = keyActions[event.keyCode];
			if (action) action();
		};

		window.addEventListener("keydown", onKeyDown);
	}

	domInstruction() {
		const tempDiv = document.createElement("div");
		tempDiv.style.cssText = `
			padding: 16px;
			position: fixed;
			z-index: 50;
			bottom: 0;
			right: 0;
			background-color: #000000;
			opacity: 0.5;
			display: flex;
			flex-direction: column;
			gap: 8px;
			`;

		["Q Space", "W Translate", "E Rotate", "R Scale", "Spacebar Toggle Ennable"].forEach((spanText, index) => {
			const tempSpan = document.createElement("span");
			tempSpan.style.cssText = `
				color: white;
				font-size: 10px;
			`;
			tempSpan.textContent = `${spanText} ${index === 0 && "world"}`;
			tempSpan.id = `tempSpan-${index}`;
			tempDiv.appendChild(tempSpan);
		});

		document.body.appendChild(tempDiv);
	}

	add(object = null) {
		const folderGui = gui.addFolder(object.name || "object");

		// Position
		folderGui.add(object.position, "x").step(0.0001).name("P: X").listen();
		folderGui.add(object.position, "y").step(0.0001).name("P: Y").listen();
		folderGui.add(object.position, "z").step(0.0001).name("P: Z").listen();

		folderGui
			.add(
				{
					copy: () => {
						methodCopy({
							x: object.position.x,
							y: object.position.y,
							z: object.position.z,
							type: "posicion",
						});
					},
				},
				"copy"
			)
			.name("Copy Position");

		// Rotation
		folderGui.add(object.rotation, "x").step(0.0001).name("R: X").listen();
		folderGui.add(object.rotation, "y").step(0.0001).name("R: Y").listen();
		folderGui.add(object.rotation, "z").step(0.0001).name("R: Z").listen();

		folderGui
			.add(
				{
					copy: () => {
						methodCopy({
							x: object.rotation.x,
							y: object.rotation.y,
							z: object.rotation.z,
							type: "rotacion",
						});
					},
				},
				"copy"
			)
			.name("Copy Rotation");

		// Scale
		folderGui.add(object.scale, "x").step(0.0001).name("S: X").listen();
		folderGui.add(object.scale, "y").step(0.0001).name("S: Y").listen();
		folderGui.add(object.scale, "z").step(0.0001).name("S: Z").listen();

		folderGui
			.add(
				{
					copy: () => {
						methodCopy({
							x: object.scale.x,
							y: object.scale.y,
							z: object.scale.z,
							type: "Escala",
						});
					},
				},
				"copy"
			)
			.name("Copy Scale");

		this.transformHelper.attach(object);
	}
}
