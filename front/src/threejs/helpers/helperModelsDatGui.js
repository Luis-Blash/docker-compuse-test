import { GUI } from "dat.gui";

const gui = new GUI();

export const dataGuiModalsBasic = (object = null, limit = 10) => {
	if (!object) {
		return;
	}
	const folderGui = gui.addFolder(object.name);
	folderGui.add(object.position, "x", -limit, limit).step(0.0001).name("Position X");
	folderGui.add(object.position, "y", -limit, limit).step(0.0001).name("Position Y");
	folderGui.add(object.position, "z", -limit, limit).step(0.0001).name("Position Z");
	folderGui.add(object.rotation, "x", -5, 5).step(0.0001).name("Rotation X");
	folderGui.add(object.rotation, "y", -5, 5).step(0.0001).name("Rotation Y");
	folderGui.add(object.rotation, "z", -5, 5).step(0.0001).name("Rotation Z");
	folderGui.add(object.scale, "x", 0, 5).step(0.01).name("Scale X");
	folderGui.add(object.scale, "y", 0, 5).step(0.01).name("Scale Y");
	folderGui.add(object.scale, "z", 0, 5).step(0.01).name("Scale Z");
};
