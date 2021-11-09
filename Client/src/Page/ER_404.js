import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ER_404 extends Component {
    render() {
        return (
            <div className="section-404 section" data-bg-image="assets/images/bg/bg-404.jpg">
                <div className="container">
                    <div className="content-404">
                    <h1 className="title">Oops!</h1>
                    <h2 className="sub-title">Không tìm thấy trang bạn yêu cầu!</h2>
                    <div className="buttons">
                        <Link className="btn btn-primary btn-outline-hover-dark" to="/" >Go back</Link>
                        <Link className="btn btn-dark btn-outline-hover-dark" to="/" >Homepage</Link>
                    </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ER_404;