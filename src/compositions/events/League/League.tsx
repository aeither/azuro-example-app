"use client";

import type { Sport } from "hooks";
import type React from "react";

import { Flag } from "components/dataDisplay";
import { Href } from "components/navigation";

import Game, { GameSkeleton } from "compositions/events/Game/Game";

export const LeagueSkeleton: React.FC<{ isPage?: boolean }> = ({
	isPage = false,
}) => {
	return (
		<div className="mt-1 first-of-type:mt-0">
			{isPage ? (
				<div className="py-3 px-4 bg-gradient-to-r from-purple-900 to-pink-900 rounded-t-md shadow-md shadow-purple-500/30">
					<div className="bone h-[1.375rem] w-44 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
				</div>
			) : (
				<div className="rounded-t-md flex items-center justify-between py-2 px-4 bg-gradient-to-r from-purple-900 to-pink-900 mb-[2px] shadow-md shadow-purple-500/30">
					<div className="flex items-center">
						<div className="bone size-4 mr-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse" />
						<div className="bone h-[0.875rem] w-[8rem] rounded-md bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
						<div className="size-1 rounded-full mx-2 bg-yellow-300" />
						<div className="bone h-[0.875rem] w-[4rem] rounded-md bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse" />
					</div>
				</div>
			)}
			<div className="space-y-[2px]">
				{new Array(3).fill(0).map((_, index) => (
					<GameSkeleton
						key={index}
						className={isPage ? "first-of-type:rounded-t-md" : ""}
					/>
				))}
			</div>
		</div>
	);
};

type LeagueProps = {
	sportSlug: string;
	league: Sport["leagues"][0];
	isPage?: boolean;
};

const League: React.FC<LeagueProps> = ({
	sportSlug,
	league,
	isPage = false,
}) => {
	const { slug, name, countryName, countrySlug, games } = league;

	const leagueUrl = `/${sportSlug}/${countrySlug}/${slug}`;

	return (
		<div className="mt-1 first-of-type:mt-0">
			{isPage ? (
				<div className="py-3 px-4 bg-gradient-to-r from-purple-900 to-pink-900 rounded-t-md shadow-md shadow-purple-500/30">
					<div className="text-heading-h4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400">
						{name}
					</div>
				</div>
			) : (
				<div className="rounded-t-md flex items-center justify-between py-2 px-4 bg-gradient-to-r from-purple-900 to-pink-900 mb-[2px] shadow-md shadow-purple-500/30">
					<Href
						to={leagueUrl}
						className="flex items-center hover:underline group"
					>
						<Flag className="mr-2" country={countrySlug} />
						<div className="text-caption-12 text-pink-300 group-hover:text-yellow-300 transition-colors duration-300">
							{countryName}
						</div>
						<div className="size-1 rounded-full mx-2 bg-yellow-300" />
						<div className="text-caption-12 text-yellow-300 group-hover:text-pink-300 transition-colors duration-300">
							{name}
						</div>
					</Href>
				</div>
			)}
			<div className="space-y-[2px]">
				{games.map((game) => (
					<Game
						key={game.gameId}
						leagueUrl={leagueUrl}
						game={game}
						withTopRadius={isPage}
					/>
				))}
			</div>
		</div>
	);
};

export default League;