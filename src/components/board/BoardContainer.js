import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TimeDateHeader from "./TimeDateHeader";

class Board extends Component {

    constructor() {
        super();
        state = {

        };
    }



    render() {
        return (
            <div>
                <TimeDateHeader td-header-props={this.state.header}/>
                board
            </div>
        );
    }
}

Board.propTypes = {};

export default Board;
