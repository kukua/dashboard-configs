// PUT /userGroups/demo/config/dashboards
process.stdout.write(JSON.stringify({
	value: [
		{
			id: 'demo-graphs',
			name: 'Device Graphs',
			description: 'Weather condition graphs for stations.',
			default: true,
			widgets: [
				{
					columns: 4,
					type: 'controls',
					fromURL: true,
					dateRange: {
						start: '-2d',
						end: 'now',
					},
					interval: {
						default: '2h',
						options: [
							['5m', '5 minutes'],
							['30m', '30 minutes'],
							['1h', '1 hour'],
							['2h', '2 hours'],
							['4h', '4 hours'],
							['1d', '1 day'],
						],
					},
				},
				{
					columns: 1,
					type: 'device-picker',
					fromURL: true,
					filterDeviceGroups: [
						'dashboardDemo',
					],
					defaultFilter: {
						allDevices: true,
					},
				},
				{
					columns: 3,
					type: 'filter-graph',
					filter: {
						fields: [
							{
								name: 'temp',
								aggregator: 'avg',
								label: 'Average temperature (°C)',
							},
							{
								name: 'humid',
								aggregator: 'avg',
								label: 'Relative humidity (%)',
							},
							{
								name: 'rain',
								aggregator: 'avg',
								label: 'Rainfall (mm)',
							},
							{
								name: 'pressure',
								aggregator: 'avg',
								label: 'Pressure (hPa)',
							},
							{
								name: 'solarIrrad',
								aggregator: 'avg',
								label: 'Solar radiation',
							},
							{
								name: 'windDir',
								aggregator: 'avg',
								label: 'Wind direction (°)',
							},
							{
								name: 'windSpeed',
								aggregator: 'avg',
								label: 'Wind speed (km/h)',
							},
							{
								name: 'gustDir',
								aggregator: 'avg',
								label: 'Gust direction (°)',
							},
							{
								name: 'gustSpeed',
								aggregator: 'avg',
								label: 'Gust speed (km/h)',
							},
							{
								name: 'battery',
								aggregator: 'avg',
								label: 'Battery level (mV)',
							},
						],
					},
				},
			],
		},
	],
}))

