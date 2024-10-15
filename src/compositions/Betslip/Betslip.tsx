"use client";

import {
  useBaseBetslip,
  useBetTokenBalance,
  useChain,
  useDetailedBetslip,
} from "@azuro-org/sdk";
import { Message } from "@locmod/intl";
import cx from "classnames";
import type React from "react";
import { useState } from "react";

import { Icon } from "components/ui";
import {
  AmountInput,
  BetButton,
  Card,
  Chips,
  FreeBet,
  QuickBet,
  Slippage,
  Warning,
} from "./components";
import messages from "./messages";

const EmptyContent: React.FC = () => {
	return (
		<div className="max-w-64 text-center mx-auto mt-6">
			<img
				className="size-16 mx-auto filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
				src="/images/illustrations/betslip.png"
				alt=""
			/>
			<Message
				className="text-heading-h5 font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400"
				value={messages.empty.title}
				tag="p"
			/>
			<Message
				className="text-caption-13 mt-2 text-pink-300"
				value={messages.empty.text}
				tag="p"
			/>
		</div>
	);
};

type SettingsProps = {
	onClose: () => void;
};

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
	return (
		<div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg shadow-lg shadow-purple-500/50 p-4">
			<div className="flex items-center justify-between mb-4">
				<Message
					className="text-caption-14 font-semibold text-yellow-300"
					value={messages.settings}
				/>
				<button
					className="text-pink-300 hover:text-yellow-300 transition-colors duration-300"
					onClick={onClose}
				>
					<Icon className="size-5" name="interface/close" />
				</button>
			</div>
			<div className="space-y-4">
				<Slippage />
				<QuickBet />
			</div>
		</div>
	);
};

type TabProps = {
	title: Intl.Message;
	isActive: boolean;
	onClick: () => void;
};

const Tab: React.FC<TabProps> = ({ title, isActive, onClick }) => {
	return (
		<button
			className={cx("pb-3 relative transition-colors duration-300", {
				"text-yellow-300": isActive,
				"text-pink-300 hover:text-yellow-300": !isActive,
			})}
			onClick={onClick}
		>
			<Message className="text-caption-14 font-semibold" value={title} />
			{isActive && (
				<div className="absolute w-full bottom-0 left-0 h-0.5 bg-yellow-300 rounded-t-full animate-pulse" />
			)}
		</button>
	);
};

type ContentProps = {
	openSettings: () => void;
};

const Content: React.FC<ContentProps> = ({ openSettings }) => {
	const { betToken } = useChain();
	const { items, clear } = useBaseBetslip();
	const {
		odds,
		statuses,
		minBet,
		maxBet,
		disableReason,
		selectedFreeBet,
		betAmount,
		batchBetAmounts,
		isOddsFetching,
		isStatusesFetching,
		isBatch,
		changeBatch,
		changeBatchBetAmount,
	} = useDetailedBetslip();
	const { balance, loading: isBalanceFetching } = useBetTokenBalance();

	console.log(statuses, "statuses");

	const itemsLength = items.length;
	const isSingle = itemsLength === 1;

	const isEnoughBalance =
		isBalanceFetching || !Boolean(+betAmount)
			? true
			: Boolean(+balance! > +betAmount);

	return (
		<div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg shadow-lg shadow-purple-500/50 p-4">
			<div
				className={cx("flex justify-between", {
					"mb-3": isSingle,
					"mb-3": !isSingle,
				})}
			>
				{isSingle ? (
					<button className="cursor-default">
						<Message
							className="text-caption-14 font-semibold text-yellow-300"
							value={messages.single}
						/>
					</button>
				) : (
					<div className="flex items-center space-x-4">
						<Tab
							title={{ ...messages.batch, values: { count: itemsLength } }}
							isActive={isBatch}
							onClick={() => changeBatch(true)}
						/>
						<Tab
							title={{ ...messages.combo, values: { count: itemsLength } }}
							isActive={!isBatch}
							onClick={() => changeBatch(false)}
						/>
					</div>
				)}
				<div
					className={cx("flex items-center space-x-3 h-fit", {
						"pt-0.5": !isSingle,
					})}
				>
					<button
						className="text-pink-300 hover:text-yellow-300 transition-colors duration-300"
						onClick={openSettings}
					>
						<Icon className="size-5" name="interface/settings" />
					</button>
					<button
						className="text-pink-300 hover:text-yellow-300 transition-colors duration-300"
						onClick={clear}
					>
						<Icon className="size-5" name="interface/delete" />
					</button>
				</div>
			</div>
			<div
				className={cx("space-y-2 max-h-[24rem] overflow-auto no-scrollbar", {
					"pb-6": !isSingle,
					"pb-2": isSingle,
				})}
			>
				{items.map((item) => {
					const { conditionId, outcomeId, coreAddress } = item;

					return (
						<Card
							key={`${conditionId}-${outcomeId}-${coreAddress}`}
							item={item}
							batchBetAmount={batchBetAmounts[`${conditionId}-${outcomeId}`]}
							status={statuses[conditionId]}
							odds={odds?.[`${conditionId}-${outcomeId}`]}
							isStatusesFetching={isStatusesFetching}
							isOddsFetching={isOddsFetching}
							isBatch={isBatch}
							onBatchAmountChange={(value) => changeBatchBetAmount(item, value)}
						/>
					);
				})}
			</div>
			<FreeBet />
			<div
				className={cx(
					"bg-gradient-to-br from-purple-800 to-pink-800 p-3 rounded-lg z-10 relative",
					{
						"-mt-4": !isSingle,
						"shadow-lg shadow-purple-500/50": items.length > 2,
					},
				)}
			>
				{Boolean(!selectedFreeBet && !isBatch) && (
					<>
						<AmountInput isEnoughBalance={isEnoughBalance} />
						<Chips />
					</>
				)}
				{Boolean(disableReason) && (
					<Warning
						className="mt-3"
						text={{
							...messages.warnings[disableReason!],
							values: { minBet, maxBet, symbol: betToken.symbol },
						}}
					/>
				)}
				{isBatch && (
					<div className="flex items-center justify-between mb-3">
						<Message
							className="text-caption-12 text-pink-300"
							value={messages.totalBet}
						/>
						<div className="text-caption-13 text-yellow-300">
							{betAmount} {betToken.symbol}
						</div>
					</div>
				)}
				<BetButton
					isEnoughBalance={isEnoughBalance}
					isBalanceFetching={isBalanceFetching}
				/>
			</div>
		</div>
	);
};

const Betslip: React.FC = () => {
	const { items } = useBaseBetslip();
	const [isSettingsVisible, setSettingsVisible] = useState(false);

	if (!items.length) {
		return <EmptyContent />;
	}

	return (
		<div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg shadow-lg shadow-purple-500/50 p-2">
			{isSettingsVisible ? (
				<Settings onClose={() => setSettingsVisible(false)} />
			) : (
				<Content openSettings={() => setSettingsVisible(true)} />
			)}
		</div>
	);
};

export default Betslip;