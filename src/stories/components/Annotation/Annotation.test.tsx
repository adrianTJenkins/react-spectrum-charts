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
import React from 'react';

import '@matchMediaMock';
import { act, findAllMarksByGroupName, findChart, render } from '@test-utils';

import { BarChart, FixedWidthBar } from './Annotation.story';

describe('Bar', () => {
	test('Bar Chart renders properly', async () => {
		render(<BarChart {...BarChart.args} />);
		const chart = await findChart();
		expect(chart).toBeInTheDocument();

		// get bars
		const bars = await findAllMarksByGroupName(chart, 'bar0');
		expect(bars.length).toEqual(9);

		// get text annotations
		const labels = await findAllMarksByGroupName(chart, 'bar0_annotationText', 'text');
		expect(labels.length).toEqual(9);
	});
	test('Fixed Width Bar Chart renders properly', async () => {
		render(<FixedWidthBar {...FixedWidthBar.args} />);
		const chart = await findChart();
		expect(chart).toBeInTheDocument();

		// get bars
		const bars = await findAllMarksByGroupName(chart, 'bar0');
		expect(bars.length).toEqual(9);

		// get text annotations
		const labels = await findAllMarksByGroupName(chart, 'bar0_annotationText', 'text');
		expect(labels.length).toEqual(9);

		// backgrounds have width of 48px
		for (const label of labels) {
			act(async () => {
				const background = await findAllMarksByGroupName(label, 'bar0_annotationBackground', 'rect');
				expect(background.length).toEqual(1);
				expect(background[0].getAttribute('width')).toEqual('48');
			});
		}
	});
});
