/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slug from 'vietnamese-slug';
import VND from './../function/ConverstVND'
import Loading from './Loading';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import axios from 'axios';
const getSanpham = async (id) => await axios.get("/items/" + id)
const SweetAlert = withSwalInstance(swal);
const putWishlist = async (id, wishlist) => await axios.put("/users/" + id, { wishlist });
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkload: false,
      showAlert: false,
      title: "",
      type: "",
      text: "",
    }
  }
  Compare = () => {
    this.setState({
      showAlert: true,
      title: "Đang UPDATE modun",
      type: "warning",
    });
  }
  AddWishlist = (value) => {
    // if (!this.props.user) {
    //   return this.setState({ showAlert: true, title: "Đăng nhập để sử dụng chức năng này", type: "warning" });
    // }
    // var wishlist = this.props.user.wishlist
    // var WishlistLocal = this.props.WishlistLocal
    // if (!wishlist.includes(value._id)) {
    //   wishlist.push(value._id)
    //   getSanpham(value._id).then((res) => WishlistLocal.push(res.data.payload))
    // }
    // putWishlist(this.props.user._id, wishlist).then((res) => {
    //   this.props.GET_USER(res.data.payload)
    //   this.props.UPDATE_WISHLIST(WishlistLocal)
    //   this.setState({ showAlert: true, title: "Success", type: "success" });
    // })
  }
  render() {
    return (
      this.props.sanphams.map((value, key) => {
        return <div key={key} className={this.props.name}>
          {this.state.checkload ? <Loading></Loading> : null}
          {
            this.state.showAlert ? <SweetAlert
              show={true}
              title={this.state.title}
              type={this.state.type}
              text={this.state.text}
              // type="success"
              onConfirm={() => this.setState({ showAlert: false })}
            /> : null
          }
          <div className="product">
            <div className="product-thumb">
              <Link onClick={this.props.GET_ITEMcothebancungthich ? () => this.props.GET_ITEMcothebancungthich(value._id) : null} to={"sanpham." + slug(value.title) + "." + value._id} className="image">
                <span className="product-badges">
                  {value.quantity == 0 ? <span className="outofstock"><i className="fal fa-frown" /></span> : null}
                  {value.status == "HOT" ? <span className="hot">hot</span> : null}
                  {value.sale > 0 ? <span className="onsale">-{value.sale}%</span> : null}
                </span>
                <img src={value.imgs[0]} alt="Product Image" style={{maxHeight: '349px'}} />
                <img className="image-hover " src={value.imgs[1]} alt="Product Image" style={{maxHeight: '349px'}} />
              </Link>
              <a className={this.props.user && this.props.user.wishlist.includes(value._id) ? "add-to-wishlist hintT-left wishlist-added" : "add-to-wishlist hintT-left"} data-hint="Add to wishlist" onClick={() => this.AddWishlist(value)}><i className={this.props.user && this.props.user.wishlist.includes(value._id) ? "fa-heart fas" : "far fa-heart"} /></a>
            </div>
            <div className="product-info">
              <h6 className="title"><Link to={"sanpham." + slug(value.title) + "." + value._id}>{value.title}</Link></h6>
              <span className="price">
                {value.sale > 0 ? (<><span className="old">{VND(value.price_old)}</span><span className="new">{VND(value.price_new)}</span></>) : VND(value.price_new)} VNĐ
              </span>
              <div className="product-buttons">
                <a href="#quickViewModal" data-toggle="modal" className="product-button hintT-top" data-hint="Quick View" onClick={() => { this.props.GET_ITEM(value) }}><i className="fal fa-search" /></a>
                <a href="#quickViewModal" data-toggle="modal" className="product-button hintT-top" data-hint="Add to Cart" onClick={() => { this.props.GET_ITEM(value) }}><i className="fal fa-shopping-cart" /></a>
                {/* <a  className="product-button hintT-top" data-hint="Add to Cart"><i className="fal fa-shopping-cart" /></a> */}
                <a onClick={() => this.Compare()} className="product-button hintT-top" data-hint="Compare"><i className="fal fa-random" /></a>
              </div>
            </div>
          </div>
        </div>

      })
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.QLUser.user,
    WishlistLocal: state.QLUser.WishlistLocal,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    GET_ITEM: (GET_ITEM) => {
      dispatch({
        type: "GET_ITEM",
        GET_ITEM
      })
    },
    GET_USER: (GET_USER) => {
      dispatch({
        type: "GET_USER",
        GET_USER
      })
    },
    UPDATE_WISHLIST: (UPDATE_WISHLIST) => {
      dispatch({
        type: "UPDATE_WISHLIST",
        UPDATE_WISHLIST
      })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)
