"use client";

import { useGameStatus, useLive } from "@azuro-org/sdk";
import { GameStatus } from "@azuro-org/toolkit";
import { useEntryListener } from "@locmod/intersection-observer";
import cx from "classnames";
import { getGameDateTime } from "helpers/getters";
import type { Sport } from "hooks";
import type React from "react";
import { useState } from "react";

import { OpponentLogo } from "components/dataDisplay";
import { Href } from "components/navigation";
import { LiveLabel } from "components/ui";
import Markets, { MarketsSkeleton } from "compositions/events/Markets/Markets";

export const GameSkeleton: React.FC<{ className?: string }> = ({
	className,
}) => {
	const rootClassName = cx(
		"flex mb:flex-col ds:items-center justify-between py-2 px-4 bg-gradient-to-r from-purple-900 to-pink-900 last-of-type:rounded-b-md shadow-md shadow-purple-500/30",
		className,
	);

	return (
		<div className={rootClassName}>
			<div className="flex items-center">
				<div className="bone size-7 -mt-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse" />
				<div className="bone size-7 -mb-2 -ml-2 z-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse" />
				<div className="ml-3">
					<div className="mb-[2px] flex items-center">
						<div className="bone h-4 w-8 mr-1 rounded-md bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
						<span className="bone h-[0.875rem] w-20 rounded-md bg-gradient-to-r from-pink-500 to-yellow-400 animate-pulse" />
					</div>
					<div className="bone h-4 w-24 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse" />
				</div>
			</div>
			<div className="w-full max-w-[26.25rem] mb:mt-2">
				<MarketsSkeleton />
			</div>
		</div>
	);
};

type GameProps = {
	className?: string;
	leagueUrl: string;
	game: Sport["leagues"][0]["games"][0];
	withTopRadius?: boolean;
	isUnique?: boolean;
};

const Game: React.FC<GameProps> = ({
	className,
	leagueUrl,
	game,
	withTopRadius,
	isUnique,
}) => {
	const { gameId, title, participants, startsAt } = game;
	const { date, time } = getGameDateTime(+startsAt * 1000);

	const [isMarketsVisible, setMarketsVisible] = useState(false);
	const [ref] = useEntryListener(
		(entry) => {
			if (entry.isIntersecting) {
				setMarketsVisible(true);
			}
		},
		{
			once: true,
			observerProps: {
				rootMargin: "0px 0px 30% 0px",
			},
		},
	);

	const { isLive } = useLive();
	const { status } = useGameStatus({
		graphStatus: game.status,
		startsAt: +game.startsAt,
		isGameExistInLive: isLive,
	});

	const isInLive = status === GameStatus.Live;

	const rootClassName = cx(
		"group flex mb:flex-col ds:items-center justify-between",
		"py-2 ds:px-4 mb:px-2 bg-gradient-to-r from-purple-900 to-pink-900 last-of-type:rounded-b-md relative shadow-md shadow-purple-500/30",
		className,
		{
			"first-of-type:rounded-t-md": withTopRadius || isUnique,
		},
	);
	const liveClassName = cx(
		"border-l-[2px] border-l-accent-red absolute h-full",
		"left-0 top-0 bg-gradient-to-r from-red-600 to-red-500 opacity-50 w-[30%] group-last-of-type:rounded-b-md",
		{
			"group-first-of-type:rounded-t-md": withTopRadius,
		},
	);

	return (
		<div className={rootClassName} ref={ref}>
			{isInLive && <div className={liveClassName} />}
			<Href
				to={`${leagueUrl}/${gameId}`}
				className="flex items-center relative z-10 group/game-link"
			>
				{!isUnique && (
					<>
						{participants.map(({ name, image }, index) => (
							<OpponentLogo
								className={cx({ "-mt-2": !index, "-mb-2 -ml-2 z-20": !!index })}
								key={name}
								image={image}
							/>
						))}
					</>
				)}
				<div className="ml-3">
					<div className="mb-[2px]">
						{isInLive ? (
							<LiveLabel className="mr-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded animate-pulse" />
						) : (
							<>
								<span className="text-caption-13 font-semibold text-yellow-300 mr-1">
									{time}
								</span>
								<span className="text-caption-12 text-pink-300">{date}</span>
							</>
						)}
					</div>
					<div className="text-caption-13 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 group-hover/game-link:underline">
						{title}
					</div>
				</div>
			</Href>
			<div className="w-full ds:max-w-[26.25rem] mb:mt-2">
				{isMarketsVisible ? (
					<Markets gameId={gameId} gameStatus={status} />
				) : (
					<MarketsSkeleton />
				)}
			</div>
		</div>
	);
};

export default Game;