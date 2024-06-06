import { useExampleRedux } from "../../hooks/useExampleRedux";

export const ExampleRedux = () => {
	const {
		example: { isActive },
		changueColor,
	} = useExampleRedux();
	return (
		<div className="m-10 flex gap-4">
			<div
				onClick={() => {
					changueColor();
				}}
				className="bg-orange-300 p-2 flex items-center justify-center cursor-pointer"
			>
				ExampleRedux
			</div>
			<div className={`${isActive ? "bg-red-400" : "bg-green-300"} p-2 flex items-center justify-center`}>state redux</div>
		</div>
	);
};
