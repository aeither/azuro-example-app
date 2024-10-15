"use client";

import type React from "react";

import { openModal } from "@locmod/modal";
import { useAccount } from "wagmi";

import { Button, buttonMessages } from "components/inputs";
import TabbedBetslip from "compositions/TabbedBetslip/TabbedBetslip";

import Controls from "../Controls/Controls";

const RightSidebar: React.FC = () => {
	const { address } = useAccount();

	return (
		<>
			<div className="px-6 py-3 sticky top-0 z-20 bg-gradient-to-r from-purple-900 to-pink-900 shadow-md shadow-purple-500/50">
				{Boolean(address) ? (
					<Controls className="ml-auto" />
				) : (
					<Button
						className="ml-auto bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/50 animate-neon-pulse"
						title={buttonMessages.connectWallet}
						size={40}
						onClick={() => openModal("ConnectModal")}
					/>
				)}
			</div>
			<div className="bg-gradient-to-br from-purple-800 to-pink-800 border border-pink-500 rounded-r-md -ml-px overflow-auto wd:h-[calc(100vh_-_4.5rem)] no-scrollbar px-2 pt-1 shadow-lg shadow-purple-500/50">
				<TabbedBetslip />
			</div>
		</>
	);
};

export default RightSidebar;