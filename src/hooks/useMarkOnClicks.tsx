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
import { createElement, useMemo } from 'react';

import { getAllMarkElements } from '@utils';

import { Chart } from '../Chart';
import { Area } from '../components/Area';
import { Bar } from '../components/Bar';
import { Donut } from 'rc/components';
import { Line } from '../components/Line';
import { Scatter } from '../components/Scatter';
import { AreaElement, BarElement, ChartChildElement, Datum, DonutElement, LineElement, ScatterElement } from '../types';

type MappedMarkElement = { name: string; element: AreaElement | BarElement | DonutElement | LineElement | ScatterElement };

export type MarkDetail = {
	markName?: string;
    onClick?: (datum: Datum) => void;
};

export default function useMarkOnClicks(children: ChartChildElement[]): MarkDetail[] {
    const markElements = useMemo(
		() => getAllMarkElements(createElement(Chart, { data: [] }, children), [Area, Bar, Donut, Line, Scatter], []) as MappedMarkElement[],
		[children]
	);
	return useMemo(
		() => 
			markElements
				.filter((mark) => mark.element.props.onClick)
				.map((mark) => ({
					markName: mark.name,
					onClick: mark.element.props.onClick,
				})) as MarkDetail[],
		[markElements]
	);
}