import React, {Component} from 'react';
import TimeDateHeader from "./TimeDateHeader";
import AGGrid from "./AGGrid";
import MbtaAPIService from "../../services/MbtaAPIService";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class BoardContainer extends Component {
    constructor() {
        super();
        this.state = {
            checkedSouth: true,
            checkedNorth: true,
            time: '',
            date: '',
            stations: ['North Station', 'South Station'],
            direction: 'Departure',
            data: {
                columnDefs: [
                    {headerName: "Station", field: "station", cellRenderer: this.stationCellRenderer, filter: false, minWidth: 60},
                    {headerName: "Carrier", field: "carrier"},
                    {headerName: "Time", field: "time", minWidth: 62},
                    {headerName: "Destination", field: "destination", minWidth: 75},
                    {headerName: "Train No.", field: "train", minWidth: 50},
                    {headerName: "Track No.", field: "track"},
                    {headerName: "Status", field: "status", cellRenderer: this.statusCellRenderer, minWidth: 60}],
                rowData: [],
                baseRowData: [],
                components: {
                    statusCellRenderer: this.statusCellRenderer,
                    stationCellRenderer: this.stationCellRenderer
                }
            }
        };
    };

    componentDidMount() {
        this.tickTock();
        this.setDate();
        this.getDepartureData();
    };

    getDepartureData() {
        MbtaAPIService.getNorthSouthStationDepartures()
            .then(res => {
                const rowData = [];
                res.data.forEach(route => {
                    const idTokens = route.id.split('-');
                    rowData.push({
                        station: idTokens[6],
                        carrier: "MTBA",
                        time: new Date(route.attributes.departure_time).toLocaleTimeString(),
                        destination: route.relationships.route.data.id.substring(3, route.relationships.route.data.id.length),
                        train: idTokens[5],
                        track: idTokens[7] !== 'undefine' || idTokens[7] !== null ? idTokens[7] : "TBD",
                        status: route.attributes.status
                    });
                })

                this.setState({
                    ...this.state,
                    data: {
                        ...this.state.data,
                        rowData: rowData,
                        baseRowData: rowData
                    }
                })
            });
    };

    stationCellRenderer = (param) => {
        let value = param.value === '' || param.value === null ? 'NA' : param.value;
        if (param.value !== 'South Station') {
            value = `<span style='color:#0073e6; font-weight:bold;'>${value}</span>`
        } else {
            value = `<span style='color:#004d99; font-weight:bold;'>${value}</span>`
        }
        return value;
    };

    statusCellRenderer = (param) => {
        let value = param.value === '' || param.value === null ? 'NA' : param.value;
        if (param.value !== 'On time') {
            value = `<span style='color:#FF0000; font-weight:bolder;'>${value}</span>`
        } else {
            value = `<span style='color:#00cc00;font-weight:bold'>${value}</span>`
        }
        return value;
    };

    setDate() {
        let date = new Date();
        let dateString = DAYS[date.getDay()] + ' ' + (date.getMonth() + 1)
            + '-' + date.getDate() + '-' + date.getFullYear();
        this.setState({...this.state, date: dateString});
    };

    tickTock() {
        setInterval(() => {
            let now = new Date().toLocaleTimeString();
            this.setState({...this.state, time: now})
        }, 1000)
    };

    handleSwitchChanged = (event) => {
        let station = event.target.value;
        let checked = event.target.checked;

        if (checked) {
            if (station === 'checkedNorth' && this.state.checkedSouth) {
                this.setState({
                    ...this.state,
                    [station]: checked,
                    stations: ['North Station', 'South Station'],
                    data: {
                        ...this.state.data,
                        rowData: this.state.data.baseRowData
                    }
                })
            }
            if (station === 'checkedSouth' && this.state.checkedNorth) {
                this.setState({
                    ...this.state,
                    [station]: checked,
                    stations: ['North Station', 'South Station'],
                    data: {
                        ...this.state.data,
                        rowData: this.state.data.baseRowData
                    }
                })
            }
        } else if (!checked) {
            if (station === 'checkedNorth' && this.state.checkedSouth) {
                const filteredData = this.state.data.rowData.filter(route => {
                    return route.station !== 'North Station'
                })

                this.setState({
                    ...this.state,
                    [station]: checked,
                    stations: ['South Station'],
                    data: {
                        ...this.state.data,
                        rowData: filteredData
                    }
                })
            }
            if (station === 'checkedSouth' && this.state.checkedSouth) {
                const filteredData = this.state.data.rowData.filter(route => {
                    return route.station !== 'South Station'
                })

                this.setState({
                    ...this.state,
                    [station]: checked,
                    stations: ['North Station'],
                    data: {
                        ...this.state.data,
                        rowData: filteredData
                    }
                })
            }
        }
    };

    render() {
        return (
            <div className='board-container'>
                <TimeDateHeader data={this.state} handleChange={this.handleSwitchChanged}/>
                <AGGrid data={this.state.data}/>
            </div>
        );
    };
};

export default BoardContainer;
