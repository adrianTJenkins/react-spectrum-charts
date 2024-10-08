/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { ReactElement, ReactNode } from 'react';

import { COLOR_SCALE, LINE_TYPE_SCALE, OPACITY_SCALE } from '@constants';
import useChartProps from '@hooks/useChartProps';
import {
	Axis,
	Chart,
	ChartColors,
	ChartPopover,
	ChartProps,
	ChartTooltip,
	Datum,
	Legend,
	LegendProps,
	Scatter,
	ScatterProps,
	Title,
} from '@rsc';
import { characterData } from '@stories/data/marioKartData';
import { StoryFn } from '@storybook/react';
import { bindWithProps } from '@test-utils';

import { Content, Flex } from '@adobe/react-spectrum';

const marioDataKeys = [
	...Object.keys(characterData[0])
		.filter((key) => key !== 'character')
		.sort((a, b) => {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		}),
	undefined,
];

export default {
	title: 'RSC/Scatter',
	component: Scatter,
	argTypes: {
		dimension: {
			control: 'select',
			options: marioDataKeys,
		},
		metric: {
			control: 'select',
			options: marioDataKeys,
		},
		color: {
			control: 'select',
			options: marioDataKeys,
		},
		size: {
			control: 'select',
			options: marioDataKeys.filter((key) => key !== 'weightClass'),
		},
	},
};

type MarioDataKey = keyof (typeof characterData)[0];

const marioKeyTitle: Record<Exclude<MarioDataKey, 'character'>, string> = {
	weightClass: 'Weight class',
	speedNormal: 'Speed (normal)',
	speedAntigravity: 'Speed (antigravity)',
	speedWater: 'Speed (water)',
	speedAir: 'Speed (air)',
	acceleration: 'Acceleration',
	weight: 'Weight',
	handlingNormal: 'Handling (normal)',
	handlingAntigravity: 'Handling (antigravity)',
	handlingWater: 'Handling (water)',
	handlingAir: 'Handling (air)',
	grip: 'Grip',
	miniTurbo: 'Mini-turbo',
};

const defaultChartProps: ChartProps = { data: characterData, height: 500, width: 500, lineWidths: [1, 2, 3] };

const getLegendProps = (args: ScatterProps): LegendProps => {
	const facets = [COLOR_SCALE, LINE_TYPE_SCALE, OPACITY_SCALE, 'size'];
	const legendKey = args[facets.find((key) => args[key] !== undefined) ?? COLOR_SCALE];
	const legendProps: LegendProps = {
		position: 'right',
		title: marioKeyTitle[legendKey],
	};
	if (typeof args.opacity === 'object') {
		legendProps.opacity = args.opacity;
	}
	return legendProps;
};

const ScatterStory: StoryFn<typeof Scatter> = (args): ReactElement => {
	const colors: ChartColors = args.colorScaleType === 'linear' ? 'sequentialViridis5' : 'categorical16';
	const chartProps = useChartProps({ ...defaultChartProps, colors });
	const legendProps = getLegendProps(args);

	return (
		<Chart {...chartProps}>
			<Axis position="bottom" grid ticks baseline title={marioKeyTitle[args.dimension as MarioDataKey]} />
			<Axis position="left" grid ticks baseline title={marioKeyTitle[args.metric as MarioDataKey]} />
			<Scatter {...args} />
			<Legend {...legendProps} highlight />
			<Title text="Mario Kart 8 Character Data" />
		</Chart>
	);
};

const dialog = (item: Datum): ReactNode => {
	return (
		<Content>
			<Flex direction="column">
				<div style={{ fontWeight: 'bold' }}>{(item.character as string[]).join(', ')}</div>
				<div>
					{marioKeyTitle.speedNormal}: {item.speedNormal}
				</div>
				<div>
					{marioKeyTitle.handlingNormal}: {item.handlingNormal}
				</div>
			</Flex>
		</Content>
	);
};

const defaultProps: ScatterProps = {
	dimension: 'speedNormal',
	metric: 'handlingNormal',
	onClick: undefined,
}

const Basic = bindWithProps(ScatterStory);
Basic.args = {
	...defaultProps
};

const Color = bindWithProps(ScatterStory);
Color.args = {
	...defaultProps,
	color: 'weightClass',
};

const ColorScaleType = bindWithProps(ScatterStory);
ColorScaleType.args = {
	...defaultProps,
	color: 'weight',
	colorScaleType: 'linear',
};

const LineType = bindWithProps(ScatterStory);
LineType.args = {
	...defaultProps,
	lineType: 'weightClass',
	lineWidth: { value: 2 },
	opacity: { value: 0.5 },
};

const Opacity = bindWithProps(ScatterStory);
Opacity.args = {
	...defaultProps,
	opacity: 'weightClass',
};

const Popover = bindWithProps(ScatterStory);
Popover.args = {
	...defaultProps,
	color: 'weightClass',
	children: [
		<ChartTooltip key="0">{dialog}</ChartTooltip>,
		<ChartPopover key="1" width="auto">
			{dialog}
		</ChartPopover>,
	],
};

const Size = bindWithProps(ScatterStory);
Size.args = {
	...defaultProps,
	size: 'weight',
};

const Tooltip = bindWithProps(ScatterStory);
Tooltip.args = {
	...defaultProps,
	color: 'weightClass',
	children: <ChartTooltip>{dialog}</ChartTooltip>,
};

const OnClick = bindWithProps(ScatterStory);
OnClick.args = {
	dimension: 'speedNormal',
	metric: 'handlingNormal',
}

export { Basic, Color, ColorScaleType, LineType, Opacity, Popover, Size, Tooltip, OnClick };
