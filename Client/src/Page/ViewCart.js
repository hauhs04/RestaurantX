import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import vietnameseSlug from 'vietnamese-slug';
import VND from './../function/ConverstVND';
const getdataSize = async() => await axios.get("/sizes/");
const getdataCollor = async() => await axios.get("/colors/");
class ViewCart extends Component {
  constructor(props) {
    super(props);
    this.state={
      sizes:[],
      colors:[]
    }
  }
  
  componentDidMount() {
    getdataCollor().then((res)=>{this.setState({colors:res.data.payload});})
    getdataSize().then((res)=>{this.setState({sizes:res.data.payload});})
  }
  
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
    // this.props.CART()
  }
    render() {
        return (
            <div className="section section-padding cart">
  <div className="container">
    <form className="cart-form" >
      <table className="cart-wishlist-table table">
        <thead>
          <tr>
            <th className="name" colSpan={2}>Sản phẩm</th>
            <th className="price">Giá</th>
            <th className="quantity">Số lượng</th>
            <th className="size">Size</th>
            <th className="color">Color</th>
            <th className="subtotal">Tổng</th>
            <th className="remove">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {
            this.props.SanphamLocal.map((value,key)=>{
              return <tr key={key}>
                      <td className="thumbnail"><Link to={"sanpham."+vietnameseSlug(value.title)+"."+value._id}><img src={value.img} alt="true"/></Link></td>
                      <td className="name"> <Link to={"sanpham."+vietnameseSlug(value.title)+"."+value._id}>{value.title}</Link></td>
                      <td className="price"><span>{VND(value.price)} VNĐ</span></td>
                      <td className="quantity">
                        <div className="product-quantity">
                          <input type="number" min="1" readOnly className="input-qty" defaultValue={value.quantity} />
                        </div>
                      </td>
                      {
                        this.state.sizes.map((value2,key2)=>{
                          if(value2._id==value.size){
                            return <td key={key} className="size"><span>{value2.name} </span></td>
                          }
                        })
                      }
                      {
                        this.state.colors.map((value2,key2)=>{
                          if(value2._id==value.collor){
                            return <td key={key} className="size"><span>{value2.name} </span></td>
                          }
                        })
                      }
                      <td className="subtotal"><span>{value.price*value.quantity}</span></td>
                      <td className="remove"><a onClick={()=>this.Delete(value._id)} className="btn">×</a></td>
                    </tr>
            })
          }
        </tbody>
      </table>
      <div className="row justify-content-between mb-n3">
        <div className="col-auto mb-3">
          <div className="cart-coupon">
            <input type="text" placeholder="Enter your coupon code" />
            <button type="button" className="btn"><i className="fal fa-gift" /></button>
          </div>
        </div>
        <div className="col-auto">
          <Link className="btn btn-light btn-hover-dark mr-3 mb-3" to="/sanphams">Tiếp tục mua</Link>
        </div>
      </div>
    </form>
    <div className="cart-totals mt-5">
      <h2 className="title">Tổng giỏ hàng</h2>
      <table>
        <tbody>
          <tr className="subtotal">
            <th>Tạm tính</th>
            <td><span className="amount">{VND(this.total())} VNĐ</span></td>
          </tr>
          <tr className="total">
            <th>Tổng</th>
            <td><strong><span className="amount">{VND(this.total())} VNĐ</span></strong></td>
          </tr>
        </tbody>
      </table>
      <Link to="/checkout" className="btn btn-dark btn-outline-hover-dark">Checkout</Link>
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
export default connect(mapStateToProps,mapDispatchToProps)(ViewCart)
