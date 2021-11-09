import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Topbar extends Component {
    
    componentWillMount() {
        console.log('topbar');
    }
    
    render() {
        return (
            <div className="topbar-section section section-fluid">
                <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-auto col-12">
                    <p className="text-center text-md-left my-2"></p>
                    </div>
                    <div className="col-auto d-none d-md-block">
                    <div className="topbar-menu d-flex flex-row-reverse">
                        <ul>
                            <li><Link to="/contac"><i className="fa fa-map-marker-alt" />Địa chỉ cửa hàng</Link></li>
                            <li><Link to="/dashbroad"><i className="fa fa-truck" />Đơn hàng</Link></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
  
        );
    }
}

export default Topbar;