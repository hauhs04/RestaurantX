import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import vietnameseSlug from 'vietnamese-slug';
import VND from './../function/ConverstVND';
const putWishlist = async(id,wishlist) => await axios.put("/users/"+id,{wishlist});
class Wishlist extends Component {
    Delete=(id)=>{
        var wishlist = this.props.user.wishlist
        wishlist= wishlist.filter(item=>item!=id)
        var WishlistLocal = this.props.WishlistLocal
        WishlistLocal= WishlistLocal.filter( item=>item._id != id)
        putWishlist(this.props.user._id,wishlist).then((res)=>{
          this.props.GET_USER(res.data.payload)
          this.props.UPDATE_WISHLIST(WishlistLocal)
        })
      }
    render() {
        return (
            <div id="offcanvas-wishlist"  className={this.props.wishlist?"offcanvas offcanvas-wishlist offcanvas-open":"offcanvas offcanvas-wishlist"}>
                <div className="inner">
                <div className="head">
                    <span className="title">Wishlist</span>
                    <button className="offcanvas-close" onClick={()=>this.props.WISHLIST()}>×</button>
                </div>
                <div className="body customScroll">
                      {this.props.user?<ul className="minicart-product-list">
                        {
                            this.props.WishlistLocal.reverse().map((value,key)=>{
                                return <li key={key}>
                                <Link to={"sanpham."+vietnameseSlug(value.title)+"."+value._id}  className="image"><img src={value.imgs[0]} alt="Cart product Image" /></Link>
                                <div className="content">
                                <Link to={"sanpham."+vietnameseSlug(value.title)+"."+value._id}  className="title">{value.title}</Link>
                                <span className="quantity-price"><span className="amount">{VND(value.price_new)} VNĐ</span></span>
                                <a onClick={()=>this.Delete(value._id)} className="remove">×</a>
                                </div>
                                </li>
                    
                            })
                        }
                    </ul>:null}
                </div>
                <div className="foot">
                    <div className="buttons">
                    <Link to="/wishlist" onClick={()=>this.props.WISHLIST()} className="btn btn-dark btn-hover-primary">view wishlist</Link>
                    </div>
                </div>
                </div>
            </div>
  
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        wishlist: state.QLClick.wishlist,
        user: state.QLUser.user,
        WishlistLocal: state.QLUser.WishlistLocal,
    }
  }
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      WISHLIST: () => {
        dispatch({
          type:"WISHLIST"
        })
      },
      GET_USER: (GET_USER) => {
        dispatch({
            type:"GET_USER",
            GET_USER
        })
    },
    UPDATE_WISHLIST: (UPDATE_WISHLIST) => {
      dispatch({
          type:"UPDATE_WISHLIST",
          UPDATE_WISHLIST
      })
    },
    GET_ITEM: (GET_ITEM) => {
      dispatch({
          type:"GET_ITEM",
          GET_ITEM 
      })
    },
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Wishlist)
