import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import BasicTabs from './Panel';
import JSONDATA from './Data.json';
import Video from './videoplayback.mp4';
import './Style.css';
const VideoPlayer = () => {
	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);

	const handleTimeTabClick = (time) => {
		videoRef.current.currentTime = time;
		setCurrentTime(time);
	};

	const handleTimeUpdate = () => {
		setCurrentTime(videoRef.current.currentTime);
	};

	return (
		<div style={{ marginTop: '20px' }}>
			<Grid container>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<video
						ref={videoRef}
						width={'80%'}
						height={350}
						onTimeUpdate={handleTimeUpdate}
						controls>
						<source src={Video} type='video/mp4' />
						<source src={Video} type='video/webm' />
						<source src={Video} type='video/ogg' />
					</video>
				</Grid>
				<Grid>
					<BasicTabs data={JSONDATA} onClickTime={handleTimeTabClick} />
				</Grid>
			</Grid>
		</div>
	);
};
export default VideoPlayer;
