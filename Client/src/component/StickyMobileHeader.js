import React, { Component } from 'react';
import MobileHeader from './MobileHeader';

class StickyMobileHeader extends Component {
    render() {
        return (
            <MobileHeader className="mobile-header sticky-header bg-white section d-xl-none"></MobileHeader>
           
        );
    }
}

export default StickyMobileHeader;