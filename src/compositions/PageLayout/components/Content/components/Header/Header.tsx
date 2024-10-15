"use client";

import { openModal } from "@locmod/modal";
import { useFreezeBodyScroll } from "hooks";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";

import { Button, buttonMessages } from "components/inputs";
import { Icon, Logo } from "components/ui";
import LiveSwitcher from "compositions/LiveSwitcher/LiveSwitcher";
import Navigation from "compositions/Navigation/Navigation";

import Controls from "../Controls/Controls";

const Content: React.FC = () => {
	useFreezeBodyScroll();

	return (
		<div className="fixed top-14 bottom-0 left-0 nr:w-[22.5rem] mb:w-full bg-gradient-to-br from-purple-900 to-black overflow-auto no-scrollbar">
			<LiveSwitcher />
			<Navigation className="mt-2" />
		</div>
	);
};

const Header: React.FC = () => {
	const { address } = useAccount();
	const pathname = usePathname();
	const [isVisible, setVisibility] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setVisibility((v) => !v);
	};

	useEffect(() => {
		if (isVisible) {
			const handleOutsideClick = (event: MouseEvent) => {
				const composedPath = event.composedPath();

				if (!composedPath.includes(containerRef.current!)) {
					setVisibility(false);
				}
			};

			document.addEventListener("click", handleOutsideClick, { capture: true });

			return () => {
				document.removeEventListener("click", handleOutsideClick, {
					capture: true,
				});
			};
		}
	}, [isVisible]);

	useEffect(() => {
		setVisibility(false);
	}, [pathname]);

	return (
		<div
			ref={containerRef}
			className="py-2 px-5 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 shadow-lg shadow-purple-500/50"
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div onClick={handleClick} className="cursor-pointer">
						<Icon
							className="text-yellow-300 h-6 w-6 mr-3 hover:text-pink-300 transition-colors duration-300"
							name={isVisible ? "interface/close" : "interface/burger_menu"}
						/>
					</div>
					<Logo className="h-4 filter drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
				</div>
				{Boolean(address) ? (
					<Controls />
				) : (
					<Button
						className="ml-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-md shadow-purple-500/50 transition-all duration-300"
						title={buttonMessages.connectWallet}
						size={32}
						onClick={() => openModal("ConnectModal")}
					/>
				)}
			</div>
			{isVisible && <Content />}
		</div>
	);
};

export default Header;