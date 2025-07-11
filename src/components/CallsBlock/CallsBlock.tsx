import React, { useState } from "react";
import arrowIcon from "../../assets/icons/arrow.svg";
import "./CallsBlock.scss";

import type { CallsBlockProps } from "../../interface/interface";

const CallsBlock: React.FC<CallsBlockProps> = ({ calls = 2, going = 3 }) => {
	const items = [
		{
			key: "calls",
			label: "ЗОВЫ",
			colorClass: "calls-block__dot--green",
			count: calls,
			content: ["Пользователь А позвал вас", "Пользователь B позвал вас"],
		},
		{
			key: "going",
			label: "ИДУ",
			colorClass: "calls-block__dot--orange",
			count: going,
			content: [
				"Вы идёте к пользователю C",
				"Вы идёте к пользователю D",
				"Вы идёте к пользователю E",
			],
		},
	];

	const [openKey, setOpenKey] = useState<string | null>(null);

	const toggleItem = (key: string) => {
		setOpenKey((prev) => (prev === key ? null : key));
	};

	return (
		<div className='calls-block'>
			{items.map((item) => (
				<React.Fragment key={item.key}>
					<div
						className='calls-block__row'
						onClick={() => toggleItem(item.key)}>
						<span className={`calls-block__dot ${item.colorClass}`} />
						<span className='calls-block__label'>{item.label}</span>
						<span className='calls-block__count'>{item.count}</span>
						<img
							src={arrowIcon}
							alt='arrow'
							className={`calls-block__arrow ${
								openKey === item.key ? "calls-block__arrow--rotated" : ""
							}`}
						/>
					</div>
					{openKey === item.key && (
						<div className='calls-block__content'>
							{item.content.map((text, index) => (
								<div
									key={index}
									className='calls-block__content-item'>
									{text}
								</div>
							))}
						</div>
					)}
					{item.key !== items[items.length - 1].key && (
						<div className='calls-block__divider' />
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default CallsBlock;
