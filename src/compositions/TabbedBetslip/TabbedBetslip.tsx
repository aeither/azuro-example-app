"use client";

import { Message } from "@locmod/intl";
import cx from "classnames";
import type React from "react";
import { useState } from "react";

import AcceptedBets from "compositions/AcceptedBets/AcceptedBets";
import Betslip from "compositions/Betslip/Betslip";

import messages from "./messages";

const tabs = ["betslip", "myBets"] as const;

const TabbedBetslip: React.FC = () => {
	const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("betslip");

	return (
		<div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg shadow-lg shadow-purple-500/50 p-4">
			<div className="bg-gradient-to-r from-purple-800 to-pink-800 rounded-md border border-pink-500 p-1 flex items-center mb-4">
				{tabs.map((tab) => {
					const isActive = activeTab === tab;

					return (
						<button
							key={tab}
							className={cx(
								"w-full p-2 text-center rounded-sm transition-all duration-300",
								{
									"text-pink-300 hover:text-yellow-300": !isActive,
									"text-yellow-300 bg-gradient-to-r from-yellow-400 to-pink-500 shadow-md shadow-yellow-400/50":
										isActive,
								},
							)}
							onClick={() => setActiveTab(tab)}
						>
							<Message value={messages[tab]} />
						</button>
					);
				})}
			</div>
			<div className="relative">
				<div
					className={cx("transition-opacity duration-300", {
						"opacity-100": activeTab === "betslip",
						"opacity-0 absolute inset-0 pointer-events-none":
							activeTab !== "betslip",
					})}
				>
					<Betslip />
				</div>
				<div
					className={cx("transition-opacity duration-300", {
						"opacity-100": activeTab === "myBets",
						"opacity-0 absolute inset-0 pointer-events-none":
							activeTab !== "myBets",
					})}
				>
					<AcceptedBets />
				</div>
			</div>
		</div>
	);
};

export default TabbedBetslip;