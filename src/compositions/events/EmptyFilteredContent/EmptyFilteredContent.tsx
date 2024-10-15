import { Message } from "@locmod/intl";
import { useFilterByTime } from "compositions/events/TimeFilter/TimeFilter";
import messages from "./messages";

const EmptyContent: React.FC = () => {
	const { resetFilterByTime } = useFilterByTime();

	return (
		<div className="flex items-center text-caption-13 font-medium bg-gradient-to-r from-purple-900 to-pink-900 px-4 py-3 rounded-md shadow-lg shadow-purple-500/50">
			<Message className="mr-2 text-pink-300" value={messages.text} />
			<button
				className="cursor-pointer bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 animate-neon-pulse"
				onClick={resetFilterByTime}
			>
				<Message value={messages.reset} />
			</button>
		</div>
	);
};

export default EmptyContent;