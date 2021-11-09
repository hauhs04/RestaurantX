import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class MobileHeader extends Component {
    componentWillMount() {
        console.log('mobileheader');
    }
    render() {
        return (
            <div className={this.props.className}>
                <div className="container">
                <div className="row align-items-center">
                    {/* Header Logo Start */}
                    <div className="col">
                    <div className="header-logo">
                        <Link to="/"><img src="assets/images/logo/logo-2.png" alt="Learts Logo" /></Link>
                    </div>
                    </div>
                    {/* Header Logo End */}
                    {/* Header Tools Start */}
                    <div className="col-auto">
                    <div className="header-tools justify-content-end">
                        <div className="header-login d-none d-sm-block">
                        <Link to="/login"><i className="fal fa-user" /></Link>
                        </div>
                        <div className="header-wishlist d-none d-sm-block">
                        <a onClick={()=>this.props.WISHLIST()} className="offcanvas-toggle "><span className="wishlist-count">{this.props.user?this.props.user.wishlist.length:0}</span><i className="fal fa-heart" /></a>
                        </div>
                        <div className="header-cart">
                        <a onClick={()=>this.props.CART()} className="offcanvas-toggle"><span className="cart-count">{this.props.SanphamLocal.length}</span><i className="fal fa-shopping-cart" /></a>
                        </div>
                        <div className="mobile-menu-toggle">
                        <a onClick={()=>this.props.SIBAR_MOBILE()} className={this.props.sidebarMobile?"offcanvas-toggle close":"offcanvas-toggle"}>
                            <svg viewBox="0 0 800 600">
                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top" />
                            <path d="M300,320 L540,320" id="middle" />
                            <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) " />
                            </svg>
                        </a>
                        </div>
                    </div>
                    </div>
                    {/* Header Tools End */}
                </div>
                </div>
                <div className="offcanvas-overlay" onClick={()=>this.props.OFF_OVERLAY()} style={{display: this.props.over_lay?'block':'none'}}></div>
            </div>
  
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        categorys: state.QLSanpham.categorys,
        tags:state.QLSanpham.tags,
        over_lay:state.QLClick.over_lay,
        SanphamLocal:state.QLLocal.SanphamLocal,
        sidebarMobile:state.QLClick.sidebarMobile,
        user:state.QLUser.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        CART: () => {
            dispatch({
                type:"CART",
            })
        },
        WISHLIST: () => {
            dispatch({
                type:"WISHLIST",
            })
        },
        OFF_OVERLAY: () => {
            dispatch({
                type:"OFF_OVERLAY",
            })
        },
        SIBAR_MOBILE: () => {
            dispatch({
                type:"SIBAR_MOBILE",
            })
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MobileHeader)
