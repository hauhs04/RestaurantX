import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
const getdataSlices = async() => await axios.get("/banners");
class Slice extends Component {
    componentDidMount() {
        getdataSlices().then((res)=>{this.props.GET_SLICE(res.data.payload)})
    }
    
    render() {
        return (
            <div id="demo" className="carousel slide  section section-fluid bg-white " data-ride="carousel">
                <div className="container-fluid home3-slider ">
            
            {/* The slideshow */}
            <div className="carousel-inner swiper-wrapper ">
                {
                    this.props.slices.map((value,key)=>{
                        return <div key={key} className={key==0?"carousel-item active":"carousel-item"}>
                                    <img src={value.img} className="img-fluid banner" style={{width: '100%'}} alt="Los Angeles" />
                                </div>
                    })
                }          
                </div>
                    {/* Left and right controls */}
                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <i className="ti-angle-left" />
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next">
                        <i className="ti-angle-right" />
                    </a>  
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        slices: state.QLSanpham.slices
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GET_SLICE: (GET_SLICE) => {
            dispatch({
                type:"GET_SLICE",
                GET_SLICE
            })
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Slice)
