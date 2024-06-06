import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import { App } from "../../threejs/app/appThree";
import ObserverEmitter, { EVENTS } from "../../emitter";

let moveCamareType = 0;
export const Example3D = () => {
	const containerAppThree = useRef(null);

	useEffect(() => {
		if (!containerAppThree.current.iscreated) {
			containerAppThree.current.iscreated = true;
			const container = containerAppThree.current;
			const app = new App(container);
			app.onResized();

			// return () => {
			// 	app.cleanup();
			// };
		}

		// eslint-disable-next-line
	}, []);

	return (
		<div className="h-[600px] w-full flex gap-3 relative">
			<LoaderModel />
			{/* borrame si necesitas hacer otras pruebas */}
			<div className="w-[200px] h-full bg-black bg-opacity-15 text-[14px] flex flex-col gap-4 p-2">
				<p>Da click para ver como funciona en el observer</p>
				<div className="flex flex-col gap-4">
					<div
						onClick={() => {
							moveCamareType = moveCamareType === 0 ? 1 : 0;
							ObserverEmitter.emit(EVENTS.examples.moveCamare, moveCamareType);
						}}
						className="bg-red-300 cursor-pointer"
					>
						<p>Mover camara</p>
					</div>
					<div
						onClick={() => {
							ObserverEmitter.emit(EVENTS.examples.loadCharacter);
						}}
						className="bg-red-300 cursor-pointer"
					>
						<p>Cargar modelo</p>
					</div>
				</div>
			</div>
			{/* canvas */}
			<div className="w-[calc(100%-400px)] h-full bg-black bg-opacity-15 relative ">
				<div ref={containerAppThree} id="container" className="absolute z-10 h-full w-full"></div>
			</div>
			{/* borrame si necesitas hacer mas pruebas */}
			<div className="w-[200px] h-full bg-black bg-opacity-15 p-2">
				<Outlet />
			</div>
		</div>
	);
};

const LoaderModel = () => {
	const [loader, setLoader] = useState(false);

	ObserverEmitter.on(EVENTS.loader3D.onProgress, (value) => {
		setLoader(true);
	});

	ObserverEmitter.on(EVENTS.loader3D.onLoad, (value) => {
		setLoader(false);
	});

	return (
		<div className={`${loader ? "absolute" : "hidden"} h-full w-full z-50 flex justify-center items-center bg-red-950`}>
			<span>Loader</span>
		</div>
	);
};
