import React, {Fragment} from 'react';
import './TimeDateHeader.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';

function TimeDateHeader(props) {
    let date = props.data.date;
    let stations = props.data.stations;
    let station = stations.length > 1 ? stations[0] + ' / ' + stations[1] : stations[0];

    return (
        <Fragment>
            <div className='td-header-container'>
                <div className='td-date'>
                    <h4>{date.substr(0, date.indexOf(' '))}</h4>
                    {date.substr(date.indexOf(' '), date.length + 1)}
                </div>
                <div className='td-station'>
                    <h2>
                        {station}
                    </h2>
                    ({props.data.direction} Times)
                </div>
                <div className='td-time'>
                    <h4>Current Time</h4>
                    {props.data.time}
                </div>
            </div>
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Station Filter
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className='station-filter'>
                            <div>
                                <Switch
                                    checked={props.data.checkedNorth}
                                    onChange={props.handleChange}
                                    value="checkedNorth"
                                    color="primary"
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                /> <label className='north-label'>North Station</label>
                            </div>
                            <div>
                                <Switch
                                    checked={props.data.checkedSouth}
                                    onChange={props.handleChange}
                                    value="checkedSouth"
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                /><label className='south-label'>South Station</label>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        </Fragment>
    );
}

export default TimeDateHeader;
