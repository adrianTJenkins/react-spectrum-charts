/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { clickNthElement, findAllMarksByGroupName, findChart, render } from '@test-utils';
import { Donut } from 'rc/components/Donut';

import { Basic, OnClick } from './Donut.story';
import { basicDonutData } from './data';

describe('Donut', () => {
	// Donut is not a real React component. This is test just provides test coverage for sonarqube
	test('Donut pseudo element', () => {
		render(<Donut />);
	});

	test('Basic renders properly', async () => {
		render(<Basic {...Basic.args} />);
		const chart = await findChart();
		expect(chart).toBeInTheDocument();

		// donut data has 7 segments
		const bars = await findAllMarksByGroupName(chart, 'donut0');
		expect(bars.length).toEqual(7);
	});

	test('should call onClick callback when selecting a donut item', async () => {
		const onClick = jest.fn();
		render(<OnClick {...OnClick.args} onClick={onClick} />);
		const chart = await findChart();
		const donutItems = await findAllMarksByGroupName(chart, 'donut0');

		await clickNthElement(donutItems, 0);
		expect(onClick).toHaveBeenCalledWith(expect.objectContaining(basicDonutData[0]));

		await clickNthElement(donutItems, 1);
		expect(onClick).toHaveBeenCalledWith(expect.objectContaining(basicDonutData[1]));

		await clickNthElement(donutItems, 2);
		expect(onClick).toHaveBeenCalledWith(expect.objectContaining(basicDonutData[2]));

		await clickNthElement(donutItems, 3);
		expect(onClick).toHaveBeenCalledWith(expect.objectContaining(basicDonutData[3]));

		await clickNthElement(donutItems, 4);
		expect(onClick).toHaveBeenCalledWith(expect.objectContaining(basicDonutData[4]));

		await clickNthElement(donutItems, 5);
		expect(onClick).toHaveBeenCalledWith(expect.objectContaining(basicDonutData[5]));

		await clickNthElement(donutItems, 6);
		expect(onClick).toHaveBeenCalledWith(expect.objectContaining(basicDonutData[6]));
	});
});
