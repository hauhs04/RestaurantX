/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import slug from 'vietnamese-slug'
import Loading from './Loading';
const getdataCategorys = async() => await axios.get("/categorys");
const getdataTags = async() => await axios.get("/tags");
const getdataBrands = async() => await axios.get("/brands");
const getdataItem = async(req="") => await axios.get("/items"+req);
const getdataBlog = async(req="") => await axios.get("/blogs"+req);
class Header extends Component {
    constructor(props) {
        super(props);
        this.state={checkload:false}
    }
    componentWillMount() {
        console.log('header');
    }
    componentDidMount() {
        Promise.all([ 
            getdataCategorys().then((res)=>{this.props.GET_CATEGORY(res.data.payload)}),
            getdataTags().then((res)=>this.props.GET_TAG(res.data.payload)),
            getdataBrands().then((res)=>this.props.GET_BRAND(res.data.payload)),
        ])
    }
    getBlogs=(id)=>{
        this.setState({checkload:true});
        getdataBlog("?tag="+id).then((res)=>{this.props.GET_BLOG(res.data.payload,res.data.length);this.setState({checkload:false});})
    }
    render() {
        return (
            <div className={this.props.className}>
                {this.state.checkload?<Loading></Loading>:null}
                <div className="container">
                <div className="row align-items-center">
                    {/* Header Logo Start */} 
                    <div className="col-auto">
                    <div className="header-logo">
                        <Link to="/"><img src="assets/images/logo/logo-2.png" alt="Learts Logo" /></Link>
                    </div>
                    </div>
                    {/* Header Logo End */}
                    {/* Search Start */}
                    <div className="col-auto mr-auto">
                    <nav className="site-main-menu site-main-menu-left menu-height-100 justify-content-center">
                        <ul>
                        <li className="has-children home"><Link to="."><span className="menu-text">Trang chủ</span></Link></li>
                        <li className="has-children"><Link to="/sanphams"><span className="menu-text">Sản phẩm</span></Link>
                            {/* <ul className=" sub-menu">
                                {this.props.categorys.map((value,key)=>{
                                    return <li key={key}><Link onClick={()=>this.GET_SANPHAM(0,value._id)} to={"/sanphams."+slug(value.name)+"."+value._id}><span className="menu-text">{value.name}</span></Link></li>
                                })}   
                            </ul> */}
                        </li>

                        <li className="has-children"><Link to="#"><span className="menu-text">Liên hệ|Hỗ trợ</span></Link></li>
                        <li className="has-children page"><a href="#"><span className="menu-text">Page</span></a></li>
                        </ul>
                    </nav>
                    </div>
                    {/* Search End */}
                    {/* Header Tools Start */}
                    <div className="col-auto">
                    <div className="header-tools justify-content-end">
                        <div className="header-login">
                        <Link to="/login"><i className="fal fa-user" /></Link>
                        </div>
                        <div className="header-search d-none d-sm-block">
                        <a className="offcanvas-toggle" onClick={()=>this.props.SEARCH()}><i className="fal fa-search"  /></a>
                        </div>
                        <div className="header-wishlist">
                        <a  className="offcanvas-toggle"><span className="wishlist-count">0</span><i className="fal fa-heart" /></a>
                        </div>
                        <div className="header-cart">
                        <a  onClick={()=>this.props.CART()} className="offcanvas-toggle"><span className="cart-count">{this.props.SanphamLocal.length}</span><i className="fal fa-shopping-cart" /></a>
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
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)
