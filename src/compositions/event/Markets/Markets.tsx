"use client";

import {
  useActiveMarkets,
  useBetsSummaryBySelection,
  useResolvedMarkets,
} from "@azuro-org/sdk";
import { type GameMarkets, GameStatus } from "@azuro-org/toolkit";
import cx from "classnames";
import dayjs from "dayjs";
import type React from "react";
import { useEffect, useState } from "react";
import { XBlock, XMasonry } from "react-xmasonry";
import { useAccount } from "wagmi";

import { Tooltip } from "components/feedback";
import { Icon } from "components/ui";
import EmptyContent from "compositions/EmptyContent/EmptyContent";
import OutcomeButton from "compositions/OutcomeButton/OutcomeButton";

import Headline from "./components/Headline/Headline";
import ResultButton from "./components/ResultButton/ResultButton";

import useCollapse from "./utils/useCollapse";
import useView from "./utils/useView";

import messages from "./messages";

export const MarketsSkeleton: React.FC = () => {
	return (
		<div className="bg-gradient-to-br from-purple-900 to-pink-900 p-4 rounded-lg shadow-lg shadow-purple-500/50">
			<div className="bone rounded-full w-full h-[2.875rem] bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
			{new Array(3).fill(0).map((_, index) => (
				<div key={index} className="mt-4">
					<div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-800 to-pink-800 rounded-lg">
						<div className="bone h-[1.125rem] w-24 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
					</div>
					<div className="space-y-2 bg-gradient-to-br from-purple-700 to-pink-700 rounded-lg p-2 mt-2">
						<div className="flex justify-between">
							<div className="flex gap-2 w-full">
								<div className="bone h-10 w-full rounded-min bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
								<div className="bone h-10 w-full rounded-min bg-gradient-to-r from-pink-500 to-yellow-400 animate-pulse" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

type ContentProps = {
	markets: GameMarkets;
	betsSummary?: Record<string, string>;
	isResult?: boolean;
};

const Content: React.FC<ContentProps> = (props) => {
	const { markets, betsSummary, isResult } = props;

	const { areAllCollapsed, collapsedMarketIds, collapse, collapseAll } =
		useCollapse(markets);
	const { activeView, changeView } = useView();

	return (
		<div className="bg-gradient-to-br from-purple-900 to-pink-900 p-4 rounded-lg shadow-lg shadow-purple-500/50">
			<Headline
				activeView={activeView}
				isCollapsed={areAllCollapsed}
				onChangeView={changeView}
				onCollapse={collapseAll}
			/>
			<div className="-mx-2">
				<XMasonry maxColumns={10} targetBlockWidth={478}>
					{markets.map(({ name, description, outcomeRows, marketKey }) => {
						const isCollapsed = collapsedMarketIds.includes(marketKey);

						return (
							<XBlock key={name} width={activeView === "columns" ? 1 : 2}>
								<div className="px-2 mt-4">
									<button
										className={cx(
											"flex items-center justify-between p-4 w-full group cursor-pointer bg-gradient-to-r from-purple-800 to-pink-800 rounded-t-lg",
											{
												"border-b border-b-pink-500": isCollapsed,
												"rounded-b-lg": isCollapsed,
											},
										)}
										onClick={() => collapse(marketKey)}
									>
										<div className="flex items-center">
											<div className="text-caption-14 font-semibold text-yellow-300">
												{name}
											</div>
											{Boolean(description) && (
												<Tooltip
													text={description}
													placement="bottom"
													width={400}
												>
													<div className="w-fit ml-1 cursor-pointer text-pink-300 hover:text-yellow-300 transition-colors duration-300">
														<Icon
															className="size-4"
															name="interface/info-circle"
														/>
													</div>
												</Tooltip>
											)}
										</div>
										<div className="px-2 bg-purple-700 text-pink-300 group-hover:bg-pink-700 group-hover:text-yellow-300 rounded-ssm transition-colors duration-300">
											<Icon
												className="size-4"
												name={
													isCollapsed
														? "interface/chevron_down"
														: "interface/chevron_up"
												}
											/>
										</div>
									</button>
									{!isCollapsed && (
										<div className="space-y-2 bg-gradient-to-br from-purple-700 to-pink-700 rounded-b-lg p-2">
											{outcomeRows.map((outcomes, index) => (
												<div
													key={`${index}-${outcomes.length}`}
													className="flex justify-between"
												>
													<div className="flex gap-2 w-full">
														{outcomes.map((outcome) => {
															const key = outcome.outcomeId;

															if (isResult) {
																return (
																	<ResultButton
																		key={key}
																		outcome={outcome}
																		summary={betsSummary?.[key]}
																		size={40}
																	/>
																);
															}

															return (
																<OutcomeButton
																	key={key}
																	outcome={outcome}
																	size={40}
																/>
															);
														})}
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</XBlock>
						);
					})}
				</XMasonry>
			</div>
		</div>
	);
};

type MarketsProps = {
	gameId: string;
	gameStatus: GameStatus;
	startsAt: string;
};

const ResolvedMarkets: React.FC<MarketsProps> = ({ gameId, gameStatus }) => {
	const { address } = useAccount();
	const { groupedMarkets, loading } = useResolvedMarkets({ gameId });
	const { betsSummary } = useBetsSummaryBySelection({
		account: address!,
		gameId,
		gameStatus,
	});

	if (loading) {
		return <MarketsSkeleton />;
	}

	if (!groupedMarkets?.length) {
		return <div>Empty</div>;
	}

	return (
		<Content markets={groupedMarkets} betsSummary={betsSummary} isResult />
	);
};

const WAIT_TIME = 600000;

const ActiveMarkets: React.FC<MarketsProps> = ({
	gameId,
	gameStatus,
	startsAt,
}) => {
	const { loading, markets } = useActiveMarkets({
		gameId,
		gameStatus,
		livePollInterval: 10000,
	});
	const isLive = gameStatus === GameStatus.Live;

	const startDate = +startsAt * 1000;
	const shouldWait = () => isLive && dayjs().diff(startDate) < WAIT_TIME;
	const [waitingTime, setWaitingTime] = useState(
		shouldWait() ? WAIT_TIME - dayjs().diff(startDate) : 0,
	);

	useEffect(() => {
		if (shouldWait() && !markets?.length) {
			const interval = setInterval(() => {
				const newWaitingTime = Math.max(WAIT_TIME - dayjs().diff(startDate), 0);

				if (newWaitingTime === 0) {
					clearInterval(interval);
				}
				setWaitingTime(newWaitingTime);
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}, [gameStatus, markets]);

	if (loading) {
		return <MarketsSkeleton />;
	}

	if (!markets) {
		if (isLive) {
			if (waitingTime) {
				const time = dayjs.duration(waitingTime).format("mm:ss");

				return (
					<EmptyContent
						image="/images/illustrations/smile_sad.png"
						title={messages.livePending.title}
						text={{ ...messages.livePending.text, values: { time } }}
					/>
				);
			} else {
				return (
					<EmptyContent
						image="/images/illustrations/smile_sad.png"
						title={messages.empty.live.title}
						text={messages.empty.live.text}
					/>
				);
			}
		}

		return (
			<EmptyContent
				className="py-20"
				image="/images/illustrations/smile_sad.png"
				title={messages.empty.prematch.title}
				text={messages.empty.prematch.text}
			/>
		);
	}

	return <Content markets={markets} />;
};

const Markets: React.FC<MarketsProps> = (props) => {
	const { gameStatus } = props;

	if (gameStatus === GameStatus.Resolved) {
		return <ResolvedMarkets {...props} />;
	}

	if (
		gameStatus === GameStatus.Canceled ||
		gameStatus === GameStatus.PendingResolution
	) {
		return (
			<EmptyContent
				className="py-20"
				image="/images/illustrations/smile_sad.png"
				title={messages.ended.title}
				text={messages.ended.text}
			/>
		);
	}

	return <ActiveMarkets {...props} />;
};

export default Markets;
