import { useDispatch, useSelector } from "react-redux";
import { toggleActive } from "../store/slices/example/example";

export const useExampleRedux = () => {
	const example = useSelector((state) => state.exampleName);
	const dispatch = useDispatch();

	const changueColor = () => {
		dispatch(toggleActive(!example.isActive));
	};

	return {
		example,
		changueColor,
	};
};
