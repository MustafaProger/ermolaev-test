import React from "react";
import arrowIcon from "../../assets/icons/Vector.svg";
import "./CallsBlock.scss";
import type { CallsBlockProps } from "../../interface/interface";

const CallsBlock: React.FC<CallsBlockProps> = ({ calls = 2, going = 3 }) => {
	const items = [
		{
			key: "calls",
			label: "ЗОВЫ",
			colorClass: "calls-block__dot--green",
			count: calls,
		},
		{
			key: "going",
			label: "ИДУ",
			colorClass: "calls-block__dot--orange",
			count: going,
		},
	];

	return (
		<div className='calls-block'>
			{items.map((item, idx) => (
				<React.Fragment key={item.key}>
					<div className='calls-block__row'>
						<span className={`calls-block__dot ${item.colorClass}`} />
						<span className='calls-block__label'>{item.label}</span>
						<span className='calls-block__count'>{item.count}</span>
						<img
							src={arrowIcon}
							alt='arrow'
							className='calls-block__arrow'
						/>
					</div>
					{idx === 0 && <div className='calls-block__divider' />}
				</React.Fragment>
			))}
		</div>
	);
};

export default CallsBlock;
