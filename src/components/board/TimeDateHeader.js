import React from 'react';
import './TimeDateHeader.css';
import PropTypes from 'prop-types';

function TimeDateHeader () {
        return (
            <div className='td-header-container'>
                <div className='td-time'>
                    {this.props.time}
                </div>
                <div  className='td-station'>
                    {this.props.station}
                </div>
                <div className='td-date'>
                    {this.props.date}
                </div>
            </div>
        );
}

TimeDateHeader.propTypes = {};

export default TimeDateHeader;
