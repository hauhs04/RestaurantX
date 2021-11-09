import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import VND from './../function/ConverstVND';

class Cart extends Component {
  total=()=>{
    var gia=0
    this.props.SanphamLocal.map((value,key)=>{
        gia+=value.price*value.quantity
    })
    return gia
  }
  Delete=(id)=>{
    var datas = JSON.parse(localStorage.getItem("SanPham"))
    datas= datas.filter(data=>data._id!=id)
    localStorage.setItem("SanPham",JSON.stringify(datas))
    this.props.UPDATE_LOCAL(datas)
  }
    render() {
        return (
            <div id="offcanvas-cart" className={this.props.cart?"offcanvas offcanvas-cart offcanvas-open":"offcanvas offcanvas-cart"}>
    <div className="inner">
      <div className="head">
        <span className="title">Cart</span>
        <button className="offcanvas-close" onClick={()=>this.props.CART()}>×</button>
      </div>
      <div className="body customScroll">
        <ul className="minicart-product-list">
          {
            this.props.SanphamLocal.reverse().map((value,key)=>{ 
              return <li key={key}>
                        <a   className="image"><img src={value.img} alt="Cart product Image" /></a>
                        <div className="content">
                          <a  className="title">{value.title}</a>
                          <span className="quantity-price">{value.quantity} x <span className="amount">{VND(value.price) + " VNĐ"}</span></span>
                          <a onClick={()=>{this.Delete(value._id)}} className="remove">×</a>
                        </div>
                      </li>
            })
          }
          </ul>
      </div>
      <div className="foot">
        <div className="sub-total">
          <strong>Tổng :</strong>
          <span className="amount">{
            VND(this.total()) + " VNĐ"
          }</span>
        </div>
        <div className="buttons">
          <Link to="/cart" onClick={()=>this.props.CART()} className="btn btn-dark btn-hover-primary">Xem giỏ hàng</Link>
          <Link to="/checkout" onClick={()=>this.props.CART()} className="btn btn-outline-dark">checkout</Link>
        </div>
        <p className="minicart-message">Free Shipping với đơn hàng trên 500k = ))))))))!</p>
      </div>
    </div>
  </div>
  
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.QLClick.cart,
    SanphamLocal:state.QLLocal.SanphamLocal,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    CART: () => {
      dispatch({
        type:"CART"
      })
    },
    UPDATE_LOCAL: (UPDATE_LOCAL) => {
      dispatch({
          type:"UPDATE_LOCAL",
          UPDATE_LOCAL
      })
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
