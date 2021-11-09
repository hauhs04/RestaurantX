import React, { Component } from 'react';
import RAMDOM_IMGS from './../function/RandomImgs'

class Loading extends Component {
    render() {
        return (
            <div className="offcanvas-overlay" style={{display:'flex'}}>
                <div className="loadding">
                  <img src={RAMDOM_IMGS()} alt="true" />
                  <div className="spinner-grow text-muted" />
                  <div className="spinner-grow text-primary" />
                  <div className="spinner-grow text-success" />
                  <div className="spinner-grow text-info" />
                  <div className="spinner-grow text-warning" />
                  <div className="spinner-grow text-danger" />
                  <div className="spinner-grow text-secondary" />
                  <div className="spinner-grow text-dark" />
                  <div className="spinner-grow text-light" />
                </div>
              </div>
        );
    }
}

export default Loading;