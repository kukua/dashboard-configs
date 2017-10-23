// PUT /jobs/ihsMeasurementThresholds
process.stdout.write(JSON.stringify({
	trigger: {
		schedule: {
			interval: '1h',
		},
	},
	input: {
		config: {
			user_group_config: {
				where: {
					user_group_id: 'ihs',
					id: 'measurementThresholds',
				},
			},
		},
		measurements: {
			measurement_filter: {
				grouped: false,
				device_groups: [
					'ihsAbuja', 'ihsAsaba', 'ihsEnugu', 'ihsIbadan',
					'ihsKano', 'ihsLagos', 'ihsPortHarcourt',
				],
				fields: [
					{ name: 'timestamp' },
					{ name: 'temp', aggregator: 'max' },
					{ name: 'rain', aggregator: 'max' },
					{ name: 'windSpeed', aggregator: 'max' },
					{ name: 'gustSpeed', aggregator: 'max' },
				],
				interval: 3600,
				from: '-1h',
				to: 'now',
				limit: 1,
				sort: [
					{ name: 'timestamp', order: -1 },
				],
			},
		},
	},
	transform: {
		check_thresholds: {
			// VM2 with input variables, underscore and sift
			script: {
				require: ['underscore', 'sift'],
				fn: `
					var results = data.results = {}
					var allThresholds = data.config.measurementThresholds

					_.forEach(data.measurements, (values, udid) => {
						if (values.length === 0) return

						_.forEach(allThresholds, (thresholds, column) => {
							_.forEach(thresholds, (threshold, type) => {
								if ( ! sift(threshold)(values[0][column + '_max'])) return
								var result = results[udid] = (results[udid] || {})
								result[column] = type
							})
						})
					})

					delete data.config
					delete data.measurements
				`.replace(/\t/g, ''),
			},
		},
	},
	//actions: {},
}))
