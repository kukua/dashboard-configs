// PUT /userGroups/{id}/config/dashboards
const fields = [
	{
		name: 'temp',
		aggregator: 'avg',
		label: 'Temperature (°C)',
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
]

process.stdout.write(JSON.stringify({
	value: [
		{
			id: 'ihs-alerts',
			name: 'Alerts',
			description: 'Overview of warnings and critical alerts about weather conditions of sites.',
			default: true,
			widgets: [
				{
					columns: 1,
					type: 'device-picker',
					fromURL: true,
					groupsOnly: true,
				},
				{
					columns: 3,
					type: 'alert-overview',
					filter: {
						jobID: 'ihsMeasurementThresholds',
						dateRange: {
							start: '-7d',
							end: 'now',
						},
					},
					active: {
						dateRange: {
							start: '-2d',
							end: 'now',
						},
					},
					types: {
						// Most important first
						critical: {
							style: 'danger',
							messageFormat: 'Extreme :column at :device (:device_group).',
						},
						warning: {
							style: 'warning',
							messageFormat: 'High :column at :device (:device_group).',
						},
					},
					link: {
						label: 'Show graph',
						to: '/dashboards/ihs-graphs',
						devicePickerWidgetParams: true,
						controlsWidgetParams: true,
					},
				},
			],
		},
		{
			id: 'ihs-graphs',
			name: 'Site Graphs',
			description: 'Weather condition graphs for regions and sites.',
			widgets: [
				{
					columns: 1,
					type: 'device-picker',
					fromURL: true,
					defaultFilter: {
						allDevices: false,
					},
				},
				{
					columns: 3,
					type: 'controls',
					fromURL: true,
					dateRange: {
						start: '-2d',
						end: 'now',
					},
					interval: {
						default: '2h',
						options: [
							['1h', '1 hour'],
							['2h', '2 hours'],
							['4h', '4 hours'],
							['1d', '1 day'],
						],
					},
				},
				{
					columns: 4,
					type: 'filter-graph',
					filter: {
						defaultField: 'temp',
						fields,
					},
				},
				{
					columns: 4,
					type: 'filter-graph',
					filter: {
						defaultField: 'windSpeed',
						fields,
					},
				},
			],
		},
		{
			id: 'ihs-downloads',
			name: 'Downloads',
			description: 'Create measurement spreadsheets.',
			widgets: [
				{
					columns: 1,
					type: 'device-picker',
					fromURL: true,
					defaultFilter: {
						allDevices: false,
					}
				},
				{
					columns: 3,
					type: 'download',
					fromURL: true,
					fromDevicePicker: true,
					fields: 'timestamp,temp:avg',
					dateRange: {
						start: '-2d',
						end: 'now',
					},
					interval: {
						default: '2h',
						options: [
							['1h', '1 hour'],
							['2h', '2 hours'],
							['4h', '4 hours'],
							['1d', '1 day'],
						],
					},
					sorting: '-timestamp',
					//limit: 100,
				},
			],
		},
		{
			id: 'ihs-config',
			name: 'Configuration',
			description: 'Configure dashboards.',
			widgets: [
				{
					columns: 2,
					type: 'measurement-thresholds-config',
					userGroup: 'ihs',
					configKey: 'measurementThresholds',
				},
			],
		},
	],
}))

