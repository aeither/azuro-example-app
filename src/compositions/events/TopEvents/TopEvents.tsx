"use client";

import { useActiveMarkets, useGames } from "@azuro-org/sdk";
import { GameStatus, Game_OrderBy, type GamesQuery } from "@azuro-org/toolkit";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { Message } from "@locmod/intl";
import cx from "classnames";
import { getGameDateTime } from "helpers/getters";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect, useRef } from "react";

import { OpponentLogo } from "components/dataDisplay";
import { Href } from "components/navigation";
import { Icon, type IconName } from "components/ui";
import OutcomeButton from "compositions/OutcomeButton/OutcomeButton";

import messages from "./messages";

const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={cx("bone h-[12.125rem] w-full rounded-md", className)} />
	);
};

type CardProps = {
	game: GamesQuery["games"][0];
};

const Card: React.FC<CardProps> = ({ game }) => {
	const {
		sport: { slug: sportSlug },
		league: {
			name: leagueName,
			slug: leagueSlug,
			country: { name: countryName, slug: countrySlug },
		},
		gameId,
		participants,
		startsAt,
		title,
	} = game;

	const { date, time } = getGameDateTime(+startsAt * 1000);

	const { markets, loading } = useActiveMarkets({
		gameId: game.gameId,
		gameStatus: GameStatus.Created,
	});

	const marketsRow = markets?.[0]?.outcomeRows?.[0];

	return (
		<div className="bg-gradient-to-br from-purple-600 to-pink-500 p-px rounded-md overflow-hidden shadow-lg shadow-purple-500/50">
			<div className="p-4 bg-black bg-opacity-80 rounded-md">
				<Href
					to={`${sportSlug}/${countrySlug}/${leagueSlug}/${gameId}`}
					className="flex items-center justify-center text-pink-300 text-caption-13 hover:underline"
				>
					<Icon
						className="size-4 mr-2 flex-none"
						name={`sport/${sportSlug}` as IconName}
					/>
					<span className="text-ellipsis whitespace-nowrap overflow-hidden">
						{countryName}
					</span>
					<div className="size-[2px] rounded-full bg-pink-400 mx-1" />
					<span className="text-ellipsis whitespace-nowrap overflow-hidden">
						{leagueName}
					</span>
				</Href>
				<div className="mt-3 flex items-center justify-between px-7">
					<OpponentLogo image={participants[0].image} size={48} />
					<div className="text-caption-12 text-center">
						<div className="text-pink-300">{date}</div>
						<div className="font-semibold mt-[2px] text-yellow-300">{time}</div>
					</div>
					<OpponentLogo image={participants[1].image} size={48} />
				</div>
				<div className="mt-5 text-caption-13 font-semibold text-center text-ellipsis whitespace-nowrap overflow-hidden text-yellow-300">
					{title}
				</div>
				<div className="mt-3 flex items-center space-x-2">
					{loading ? (
						<>
							<div className="bone w-full h-7 rounded-sm bg-gradient-to-r from-purple-400 to-pink-400" />
							<div className="bone w-full h-7 rounded-sm bg-gradient-to-r from-pink-400 to-yellow-400" />
							<div className="bone w-full h-7 rounded-sm bg-gradient-to-r from-yellow-400 to-purple-400" />
						</>
					) : (
						marketsRow.map((outcome) => (
							<OutcomeButton key={outcome.outcomeId} outcome={outcome} />
						))
					)}
				</div>
			</div>
		</div>
	);
};

const sliderConfiguration = {
	gap: 8,
	perView: 3,
	startAt: 0,
	focusAt: 0,
	autoplay: 5000,
	bound: true,
	breakpoints: {
		802: {
			perView: 1.1,
		},
	},
};

const Events: React.FC = () => {
	const { games, loading } = useGames({
		filter: {
			limit: 9,
		},
		orderBy: Game_OrderBy.Turnover,
	});
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!games?.length) {
			return;
		}

		const slider = new Glide(containerRef.current, sliderConfiguration);

		slider.mount();

		return () => {
			slider?.destroy();
		};
	}, [games]);

	if (loading) {
		return (
			<div className="flex items-center justify-between mt-6 space-x-2">
				<CardSkeleton />
				<CardSkeleton className="mb:hidden" />
				<CardSkeleton className="mb:hidden" />
			</div>
		);
	}

	return (
		<div ref={containerRef} className="glide !static group mt-6">
			<div className="glide__track" data-glide-el="track">
				<ul className="glide__slides">
					{games?.map((game, index) => (
						<li key={index} className="glide__slide overflow-hidden">
							<Card game={game} />
						</li>
					))}
				</ul>
			</div>
			<div
				className="absolute top-6 right-6 flex items-center"
				data-glide-el="controls"
			>
				<button
					className="w-8 h-6 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 rounded-tl-full rounded-tr-1 rounded-br-1 rounded-bl-full border border-pink-300 text-yellow-300 hover:text-white transition shadow-md shadow-purple-500/50"
					data-glide-dir="<"
				>
					<Icon className="size-5" name="interface/chevron_left" />
				</button>
				<button
					className="w-8 h-6 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-tl-1 rounded-tr-full rounded-br-full rounded-bl-1 border border-pink-300 text-yellow-300 hover:text-white transition ml-1 shadow-md shadow-purple-500/50"
					data-glide-dir=">"
				>
					<Icon className="size-5" name="interface/chevron_right" />
				</button>
			</div>
		</div>
	);
};

const TopEvents: React.FC = () => {
	const params = useParams();
	const sport = messages[params.sportSlug as string];

	return (
		<div className="relative pt-6 bg-gradient-to-br from-purple-900 to-black">
			<div className="px-4">
				<Message
					className="text-caption-13 text-pink-300 uppercase"
					value={messages.title}
				/>
				<h1 className="text-heading-h1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400">
					<Message className="text-yellow-300" value={messages.top} />
					{Boolean(sport) && <Message className="ml-2" value={sport} />}
					<Message className="ml-2" value={messages.events} />
				</h1>
			</div>
			<Events />
		</div>
	);
};

export default TopEvents;