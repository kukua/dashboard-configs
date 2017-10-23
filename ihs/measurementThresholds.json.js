// PUT /userGroups/{id}/config/measurementThresholds
process.stdout.write(JSON.stringify({
	value: {
		temp: {
			warning: { $gte: 35, $lt: 40 },
			critical: { $gte: 40 },
		},
		rain: {
			warning: { $gte: 8, $lt: 12 },
			critical: { $gte: 12 },
		},
		windSpeed: {
			warning: { $gte: 10, $lt: 20 },
			critical: { $gte: 20 },
		},
		gustSpeed: {
			warning: { $gte: 10, $lt: 20 },
			critical: { $gte: 20 },
		},
	},
}))
