import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const BasicTabs = ({ data, onClickTime }) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	function convertTime(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const formattedHours = String(hours).padStart(2, '0');
		const formattedMinutes = String(minutes).padStart(2, '0');
		const formattedSeconds = String(remainingSeconds).padStart(2, '0');

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs example'>
					<Tab label='Topics' {...a11yProps(0)} />
					<Tab label='Item Two' {...a11yProps(1)} />
					<Tab label='Item Three' {...a11yProps(2)} />
				</Tabs>
			</Box>

			<CustomTabPanel value={value} index={0}>
				<div style={{maxHeight:'400px',overflow:'auto'}}>
					{Object.entries(data?.topic).map(([key, value]) => {
						return (
							<div
								onClick={() => onClickTime(Math.round(value[0].start_time))}
								style={{
									display: 'flex',
									gap: '10px',
									justifyContent: 'space-between',
									margin: '10px',
									textTransform: 'capitalize',
									background: '#ccdff1',
									padding: '10px',
									alignItems: 'center',
									cursor: 'pointer',
									fontWeight: 600,
								}}>
								<Typography align='left' style={{ fontWeight: 600 }}>
									{key}
								</Typography>
								<Typography
									style={{
										background: '#000000',
										color: '#FFFFFF',
										padding: '5px',
										borderRadius: '50px',
										fontWeight: '600',
									}}>
									{convertTime(Math.round(value[0].start_time))}
								</Typography>
							</div>
						);
					})}
				</div>
			</CustomTabPanel>
			<CustomTabPanel value={ value } index={1}>
				Tab 2
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				Tab 3
			</CustomTabPanel>
		</Box>
	);
};

export default BasicTabs;
