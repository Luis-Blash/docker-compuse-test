import gsap from "gsap";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export class CubeSelect extends Mesh {
	constructor(name = "", color = 0x99ff33, size = 1) {
		super();
		this.geometry = new BoxGeometry(size, size, size);
		const uploadMaterial = new MeshStandardMaterial({
			color: color,
		});
		uploadMaterial.transparent = true;
		this.material = uploadMaterial;
		this.name = `cube${name}`;
		this.renderOrder = 1;
	}

	entryAnimation() {
		// gsap.to(this.position, { y: this.axisY, duration: 0.8 });
	}

	clearAnimation() {
		if (this.animationOpacity) {
			this.animationOpacity.kill();
			this.animationOpacity = null;
			this.material.opacity = 0.8;
		}

		if (this.animationEmessive) {
			this.animationEmessive.kill();
			this.animationEmessive = null;
			this.material.emissiveIntensity = 1;
		}
	}

	onAnimateEmissive() {
		this.clearAnimation();

		this.animationEmessive = gsap.to(this.material, {
			emissiveIntensity: 25,
			yoyo: true,
			repeat: -1,
			duration: 0.8,
			ease: "power1.inOut",
		});
	}

	onAnimationOpacity() {
		this.clearAnimation();

		// Creamos un objeto con la propiedad de opacidad para poder animarla
		const opacityObject = { opacity: 0.4 };

		// Animación de opacidad de 0.6 a 0.4 y viceversa en bucle
		this.animationOpacity = gsap.to(opacityObject, {
			opacity: 0.8,
			yoyo: true,
			repeat: -1,
			duration: 1,
			ease: "power1.inOut",
			onUpdate: () => {
				// Actualizamos la opacidad del material en cada fotograma
				this.material.opacity = opacityObject.opacity;
			},
		});
	}
}
