"use client";

import type React from "react";

import { Icon } from "components/ui";
import ChangeOddsView from "compositions/ChangeOddsView/ChangeOddsView";

import { View, type ViewProps } from "./components";

type HeadlineProps = {
	isCollapsed: boolean;
	onCollapse: () => void;
} & ViewProps;

const Headline: React.FC<HeadlineProps> = (props) => {
	const { activeView, isCollapsed, onChangeView, onCollapse } = props;

	return (
		<div className="bg-gradient-to-r from-purple-600 to-pink-500 p-px rounded-lg shadow-lg shadow-purple-500/50">
			<div className="py-2 px-4 flex items-center justify-between bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg">
				<div />
				<div className="flex items-center space-x-2">
					<View activeView={activeView} onChangeView={onChangeView} />
					<button
						className="p-1 text-yellow-300 hover:text-pink-300 transition-colors duration-300 bg-purple-800 hover:bg-pink-800 rounded-full"
						onClick={onCollapse}
					>
						<Icon
							className="size-5 animate-pulse"
							name={isCollapsed ? "interface/expand" : "interface/collapse"}
						/>
					</button>
					<ChangeOddsView />
				</div>
			</div>
		</div>
	);
};

export default Headline;