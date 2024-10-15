"use client";

import { Message } from "@locmod/intl";
import type { Sport } from "hooks";
import type React from "react";

import { Href } from "components/navigation";
import { Icon, type IconName } from "components/ui";
import messages from "./messages";

export const SportSkeleton: React.CFC = ({ children }) => {
	return (
		<div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg shadow-lg shadow-purple-500/50 mb-4">
			<div className="flex items-center justify-between py-3 px-4">
				<div className="flex items-center">
					<div className="bone size-6 mr-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse" />
					<div className="bone h-6 w-20 rounded-md bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse" />
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};

type SportProps = {
	sport: Sport;
	isPage?: boolean;
};

const Sport: React.CFC<SportProps> = ({ children, sport, isPage = false }) => {
	const { slug, name } = sport;

	return (
		<div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg shadow-lg shadow-purple-500/50 mb-4">
			<div className="flex items-center justify-between py-3 px-4">
				{isPage ? (
					<Message
						className="text-heading-h4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400"
						value={{ ...messages.sport, values: { sportName: name } }}
					/>
				) : (
					<div className="flex items-center">
						<Icon
							className="size-6 mr-3 text-yellow-300 filter drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
							name={`sport/${slug}` as IconName}
						/>
						<div className="text-heading-h4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400">
							{name}
						</div>
					</div>
				)}
				{!isPage && (
					<Href
						to={`/${slug}`}
						className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-yellow-300 hover:text-white border border-pink-400 size-6 flex items-center justify-center transition-all duration-300 shadow-md shadow-purple-500/50"
					>
						<Icon className="size-4" name="interface/chevron_right" />
					</Href>
				)}
			</div>
			<div>{children}</div>
		</div>
	);
};

export default Sport;