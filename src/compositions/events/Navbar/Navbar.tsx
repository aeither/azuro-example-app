"use client";

import { useLive } from "@azuro-org/sdk";
import { Message } from "@locmod/intl";
import cx from "classnames";
import { useParams } from "next/navigation";
import type React from "react";

import { Icon, type IconName } from "components/ui";
import ChangeOddsView from "compositions/ChangeOddsView/ChangeOddsView";
import TimeFilter, {
  FilterByTimeProvider,
} from "compositions/events/TimeFilter/TimeFilter";

import messages from "./messages";

export const NavbarSkeleton: React.FC = () => {
	return (
		<div className="border-b border-b-pink-700 -mx-2 ds:px-6 mb:px-3 py-3 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900">
			<div className="flex items-center">
				<div className="bone size-6 rounded-full mr-3 bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse" />
				<div className="bone rounded-full h-8 w-32 bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
			</div>
		</div>
	);
};

const Navbar: React.CFC = ({ children }) => {
	const { isLive } = useLive();
	const params = useParams();

	const sportSlug = (params.sportSlug as string) || "top";
	const icon: IconName =
		sportSlug === "top" ? "interface/top" : (`sport/${sportSlug}` as IconName);
	const isTimeFilterVisible = !isLive && sportSlug !== "unique";

	const className = cx(
		"border-b border-b-pink-700 -mx-2 ds:px-6 mb:px-3 flex mb:flex-col ds:items-center justify-between ds:sticky top-0 z-20 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 shadow-lg shadow-purple-500/50",
		{
			"py-3": !isTimeFilterVisible,
		},
	);

	return (
		<FilterByTimeProvider>
			<div className={className}>
				<div className="flex items-center">
					<Icon
						className="size-6 mr-3 text-yellow-300 filter drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
						name={icon}
					/>
					<Message
						className="text-heading-h2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400"
						value={messages[sportSlug] || sportSlug}
					/>
				</div>
				<div className="flex items-center space-x-2">
					{isTimeFilterVisible && <TimeFilter className="ds:h-14 mb:h-10" />}
					<ChangeOddsView />
				</div>
			</div>
			{children}
		</FilterByTimeProvider>
	);
};

export default Navbar;