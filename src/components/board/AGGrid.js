import React, {Component} from 'react';
import {AgGridReact} from "ag-grid-react";
import './AGGrid.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default class AGGrid extends Component {

    onGridSizeChanged = (params) => {
        let gridWidth = document.getElementById("myGrid").offsetWidth;
        let columnsToShow = [];
        let columnsToHide = [];
        let totalColsWidth = 0;
        let allColumns = params.columnApi.getAllColumns();
        for (let i = 0; i < allColumns.length; i++) {
            let column = allColumns[i];
            totalColsWidth += column.getMinWidth();
            if (totalColsWidth > gridWidth) {
                columnsToHide.push(column.colId);
            } else {
                columnsToShow.push(column.colId);
            }
        }
        params.columnApi.setColumnsVisible(columnsToShow, true);
        params.columnApi.setColumnsVisible(columnsToHide, false);
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <div id="myGrid" className="grid-wrapper ag-theme-balham">
                <AgGridReact
                    columnDefs={this.props.data.columnDefs}
                    rowData={this.props.data.rowData}
                    onGridReady={this.onGridReady}
                    onGridSizeChanged={this.onGridSizeChanged}
                    components={this.props.data.components}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        headerComponentParams: {
                            menuIcon: 'fa-bars'
                        }
                    }}
                />
            </div>
        );
    }
}

