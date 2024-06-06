import EventEmitter from "eventemitter3";

export const EVENTS = {
	examples: {
		moveCamare: "examplemoveCamare",
		loadCharacter: "exapleloadCharacter",
	},
	loader3D: {
		onProgress: "loader3DOnPress",
		onLoad: "loader3DOnLoad",
	},
};

const ObserverEmitter = new EventEmitter();
export default ObserverEmitter;
