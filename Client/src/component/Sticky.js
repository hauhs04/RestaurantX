import React, { Component } from 'react';
import Header from './Header';

class Sticky extends Component {
    render() {
        return (
            <Header className="sticky-header section bg-white section-fluid d-none d-xl-block"></Header>
        );
    }
}

export default Sticky;