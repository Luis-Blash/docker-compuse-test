import { useState } from "react";
import { getExampleEndpoints } from "../../api";

let idSelect = 0;
export const ExampleApi = () => {
	const [copyApi, setCopyApi] = useState("");

	const getApiData = async () => {
		if (idSelect === 30) {
			idSelect = 0;
		} else {
			idSelect++;
		}
		const { payload } = await getExampleEndpoints(idSelect);
		setCopyApi(`${payload?.id}-${payload?.name}`);
	};

	return (
		<div className="m-10 flex gap-4">
			<div onClick={getApiData} className="bg-orange-400 p-2 flex items-center justify-center cursor-pointer">
				Api rick and morty
			</div>
			<div className={`bg-emerald-400 p-2 flex items-center justify-center`}>{copyApi}</div>
		</div>
	);
};
