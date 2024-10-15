"use client";

import cx from "classnames";
import type React from "react";

import { Media } from "components/layout";
import MobileBetslipButton from "compositions/MobileBetslipButton/MobileBetslipButton";
import { Header, LeftSidebar, RightSidebar } from "./components";

import ns from "./Narrow.module.scss";
import ws from "./Wide.module.scss";

const Content: React.CFC = ({ children }) => {
	const rootClassName = cx(
		"h-full flex flex-col wd:flex-row min-h-screen mx-auto wd:px-2 wd:pb-2 bg-gradient-to-br from-purple-900 to-pink-900",
		ws.root,
	);
	const mainClassName = cx(
		ns.main,
		ws.main,
		"mx-auto flex-1 w-full wd:h-auto",
		{
			[ws.withRightSidebar]: true,
		},
	);
	const sidebarClassName = "sticky top-0 z-[100] shrink-0 no-scrollbar";

	return (
		<div className={rootClassName}>
			<Media
				className={cx(
					"h-screen",
					ws.leftSidebar,
					sidebarClassName,
					"pr-2 overflow-auto",
				)}
				wide
			>
				<LeftSidebar />
			</Media>
			<Media className="sticky top-0 z-[100]" narrow mobile>
				<Header />
			</Media>
			<main className={mainClassName}>
				{/* search block */}
				<Media className="h-16" wide />
				<div className="flex flex-col bg-gradient-to-br from-purple-800 to-pink-800 border border-pink-500 wd:rounded-l-md -wd:rounded-t-md px-2 min-h-[calc(100vh_-_4.5rem)] shadow-lg shadow-purple-500/50">
					{children}
				</div>
			</main>
			<Media
				className={cx(
					"h-[calc(100vh_-_0.5rem)]",
					ws.rightSidebar,
					sidebarClassName,
				)}
				wide
			>
				<RightSidebar />
			</Media>
			<Media narrow mobile>
				<MobileBetslipButton />
			</Media>
		</div>
	);
};

export default Content;