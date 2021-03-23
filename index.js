const express = require('express');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const app = express();

app.get('/', (_, res) => {
	try {
		const saveDir = path.join(__dirname, 'files', 'recorded-audio.mp3');
		const webRadioStreamUrl = 'https://servidor24-5.brlogic.com:8810/live?1616536113247';

		const recordDuration = 20;

		console.log('Gravação iniciada');

		ffmpeg(webRadioStreamUrl)
			.noVideo()
			.audioChannels(1)
			.audioBitrate(128)
			.duration(recordDuration)
			.on('end', () => {
				console.log('Gravação finalizada');

				return res.json({ success: true });
			})
			.on('error', () => {
				throw new Error(error);
			})
			.save(saveDir);
	} catch (error) {
		console.error(error);
	}
});

app.listen(3000, () => console.log('App on'));
