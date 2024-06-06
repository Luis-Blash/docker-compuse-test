import { useNavigate } from "react-router-dom";

export const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="fixed top-0 w-full h-full">
			<div className="h-full w-full bg-black flex justify-center items-center">
				<span
					onClick={() => {
						navigate("/");
					}}
					className="text-white text-3xl bg-red-500 p-4"
				>
					NotFound
				</span>
			</div>
		</div>
	);
};
