import { useEffect, useState } from "react";
import { browserName, isDesktop, isMobile, isTablet, osName, osVersion } from "react-device-detect";
import packageInfo from "../../../package.json";

export const Versioner = () => {
	const [device, setDevice] = useState("");
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	const updateDimensions = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	useEffect(() => {
		if (isMobile) {
			setDevice("Mobile");
		} else if (isTablet) {
			setDevice("Tablet");
		} else if (isDesktop) {
			setDevice("Desktop");
		}
	}, [setDevice]);

	return (
		<div className="text-white fixed bottom-0 left-0  z-50 p-1 text-start bg-gray-500 bg-opacity-50">
			<div className=" right-0  text-xs font-mono text-white h-5 w-5 rounded-full flex items-center justify-center bg-gray-700 sm:bg-pink-500 md:bg-purple-500 lg:bg-green-500 xl:bg-blue-500">
				<div className="block sm:hidden md:hidden lg:hidden xl:hidden">al</div>
				<div className="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
				<div className="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
				<div className="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
				<div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">xl</div>
				<div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">2xl</div>
			</div>

			<p className="text-[10px] text-white ">
				{" "}
				{device}-(W-{width} | H-{height}){" "}
			</p>
			<p className="text-[10px] text-white "> {browserName} </p>
			<p className="text-[10px] text-white ">
				{" "}
				{osName}-{osVersion}{" "}
			</p>
			<p className="text-[10px] font-bold text-white "> Version: {packageInfo.version} </p>
		</div>
	);
};
