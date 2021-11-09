import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SibarMobile extends Component {
    render() {
        return (
            <div id="offcanvas-mobile-menu" className={this.props.sidebarMobile?"offcanvas offcanvas-mobile-menu offcanvas-open":"offcanvas offcanvas-mobile-menu"}>
    <div className="inner customScroll">
      <div className="offcanvas-menu-search-form">
        {/* <form action="#">
          <input type="text" placeholder="Search..." />
          <button><i className="fal fa-search" /></button>
        </form> */}
      </div>
      <div className="offcanvas-menu">
        <ul>
          <li><Link to="/" onClick={()=>this.props.SIBAR_MOBILE()}><span className="menu-text">Home</span></Link>
          </li>
          <li><Link to="/sanphams"onClick={()=>this.props.SIBAR_MOBILE()}><span className="menu-text">Sản phẩm</span></Link>
          </li>
          <li><Link to="/baiviets"onClick={()=>this.props.SIBAR_MOBILE()}><span className="menu-text">Bài viết</span></Link>
          </li>
          <li><Link to="/contac"onClick={()=>this.props.SIBAR_MOBILE()}><span className="menu-text">Liên hệ</span></Link>
          </li>
          <li><a href="/"><span className="menu-text">Fanpage</span></a>
          </li>
        </ul>
      </div>
      <div className="offcanvas-buttons">
        <div className="header-tools">
          <div className="header-login">
            <Link to="/login"onClick={()=>this.props.SIBAR_MOBILE()}><i className="fal fa-user" /></Link>
          </div>
          <div className="header-wishlist">
            <Link to="/wishlist"onClick={()=>this.props.SIBAR_MOBILE()}><span>{this.props.user?this.props.user.wishlist.length:0}</span><i className="fal fa-heart" /></Link>
          </div>
          <div className="header-cart">
            <Link to="/cart"onClick={()=>this.props.SIBAR_MOBILE()}><span className="cart-count">{this.props.SanphamLocal.length}</span><i className="fal fa-shopping-cart" /></Link>
          </div>
        </div>
      </div>
      <div className="offcanvas-social">
        <a href="#"><i className="fab fa-facebook-f" /></a>
        <a href="#"><i className="fab fa-twitter" /></a>
        <a href="#"><i className="fab fa-instagram" /></a>
        <a href="#"><i className="fab fa-youtube" /></a>
      </div>
    </div>
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
      GET_CATEGORY: (GET_CATEGORY) => {
          dispatch({
              type:"GET_CATEGORY",
              GET_CATEGORY
          })
      },
      GET_BLOG: (GET_BLOG,length) => {
          dispatch({
              type:"GET_BLOG",
              GET_BLOG,
              length
          })
      },
      GET_BRAND: (GET_BRAND) => {
          dispatch({
              type:"GET_BRAND",
              GET_BRAND
          })
      },
      GET_TAG: (GET_TAG) => {
          dispatch({
              type:"GET_TAG",
              GET_TAG
          })
      },
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
      SEARCH: () => {
          dispatch({
              type:"SEARCH",
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
export default connect(mapStateToProps,mapDispatchToProps)(SibarMobile)
