"use client";

import type React from "react";

import { Logo } from "components/ui";
import LiveSwitcher from "compositions/LiveSwitcher/LiveSwitcher";
import Navigation from "compositions/Navigation/Navigation";

const LeftSidebar: React.FC = () => {
	return (
		<div className="h-full bg-gradient-to-b from-purple-900 via-pink-900 to-purple-900">
			<div className="px-4 py-5 sticky top-0 bg-gradient-to-r from-purple-800 to-pink-800 shadow-md shadow-purple-500/50">
				<Logo className="h-6 filter drop-shadow-[0_0_5px_rgba(236,72,153,0.8)] animate-neon-pulse" />
			</div>
			<div className="overflow-auto wd:h-[calc(100vh_-_4rem)] no-scrollbar">
				<LiveSwitcher />
				<Navigation className="mt-2" />
			</div>
		</div>
	);
};

export default LeftSidebar;