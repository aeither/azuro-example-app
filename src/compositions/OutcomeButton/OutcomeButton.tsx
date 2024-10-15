"use client";

import type { GameMarkets } from "@azuro-org/toolkit";
import cx from "classnames";
import type React from "react";
import { useRef } from "react";

import { Icon } from "components/ui";
import OddsValue from "compositions/OddsValue/OddsValue";

import useButton from "./utils/useButton";

type OutcomeButtonProps = {
	outcome: GameMarkets[0]["outcomeRows"][0][0];
	size?: 28 | 40;
};

const OutcomeButton: React.FC<OutcomeButtonProps> = ({
	outcome,
	size = 28,
}) => {
	const { selectionName } = outcome;

	const nodeRef = useRef<HTMLDivElement>(null);
	const { odds, isActive, isLocked, onClick } = useButton({ outcome, nodeRef });

	const buttonClassName = cx(
		"group/button w-full relative flex items-center justify-between ds:px-3 mb:px-2 overflow-hidden",
		"text-caption-13 font-semibold border-none rounded-min select-none transition-all duration-300",
		{
			"hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 hover:text-purple-900 hover:shadow-md hover:shadow-yellow-400/50":
				!isLocked && !isActive,
			"bg-gradient-to-r from-yellow-400 to-pink-500 text-purple-900 shadow-md shadow-yellow-400/50":
				isActive,
			"bg-gradient-to-r from-purple-800 to-pink-800": !isActive,
			"bg-gradient-to-r from-gray-700 to-gray-600 cursor-not-allowed": isLocked,
			"h-7": size === 28,
			"h-10": size === 40,
		},
	);
	const titleClassName = cx("text-left whitespace-normal", {
		"group-hover/button:text-purple-900": !isLocked && !isActive,
		"text-purple-900": isActive,
		"text-pink-300": !isActive,
		"text-gray-400": isLocked,
	});
	const oddsClassName = cx("group/odds flex items-center");
	const arrowClassName = cx(
		"size-4 text-transparent transition-all duration-300",
		"group-[.increased]/odds:text-green-400 group-[.increased]/odds:animate-pulse",
		"group-[.decreased]/odds:text-red-400 group-[.decreased]/odds:rotate-180 group-[.decreased]/odds:animate-pulse",
	);
	const valueClassName = cx(
		"transition-all duration-300",
		"group-[.increased]/odds:text-green-400 group-[.increased]/odds:animate-pulse",
		"group-[.decreased]/odds:text-red-400 group-[.decreased]/odds:animate-pulse",
	);

	return (
		<button className={buttonClassName} disabled={isLocked} onClick={onClick}>
			<div className="flex items-center">
				{isLocked && (
					<Icon className="mr-1 size-4 text-gray-400" name="interface/lock" />
				)}
				<div className={titleClassName}>{selectionName}</div>
			</div>
			<div ref={nodeRef} className={oddsClassName}>
				<Icon className={arrowClassName} name="interface/caret_up" />
				<OddsValue className={valueClassName} odds={odds} />
			</div>
		</button>
	);
};

export default OutcomeButton;