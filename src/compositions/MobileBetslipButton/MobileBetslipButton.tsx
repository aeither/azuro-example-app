"use client";

import { useBaseBetslip } from "@azuro-org/sdk";
import { openModal } from "@locmod/modal";
import dynamic from "next/dynamic";
import type React from "react";

import { Button } from "components/inputs";
import { Media } from "components/layout";

import messages from "./messages";

const BetslipModal = dynamic(
	() => import("./components/BetslipModal/BetslipModal"),
);

const MobileBetslipButton: React.FC = () => {
	const { items } = useBaseBetslip();

	return (
		<>
			<Button
				className="fixed right-2 bottom-2 z-[40] bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/50 animate-neon-pulse"
				title={messages.title}
				style="primary"
				leftIcon="interface/betslip"
				rightNode={
					items.length ? (
						<div className="bg-yellow-300 text-caption-13 font-semibold px-1 min-w-8 h-8 ml-2 text-purple-900 rounded-min flex items-center justify-center -mr-3 shadow-md shadow-yellow-300/50">
							{items.length}
						</div>
					) : undefined
				}
				size={40}
				onClick={() => openModal("BetslipModal")}
			/>
			<Media narrow mobile>
				<BetslipModal />
			</Media>
		</>
	);
};

export default MobileBetslipButton;