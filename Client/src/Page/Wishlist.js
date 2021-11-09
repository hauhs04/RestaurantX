import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import vietnameseSlug from 'vietnamese-slug';
import getCookie from './../function/Getcookie'
import VND from './../function/ConverstVND';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import Loading from '../component/Loading';
const SweetAlert = withSwalInstance(swal);
const getUser = async() => await axios.get("/users/get/user");
const getSanpham = async(id) => await axios.get("/items/"+id);
const putWishlist = async(id,wishlist) => await axios.put("/users/"+id,{wishlist});
class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state={
      showAlert:false,
      checkload:false
    }
  }
  
  componentDidMount() {
    if(getCookie("userEmail").length==0){console.log("ok"); return this.props.history.push("/login")}
    // console.log(this.props.user);
    // var x=[]
    // getUser().then(async(res)=>{
    //   this.props.GET_USER (res.data.payload)
    //   await res.data.payload.wishlist.map((value)=>{
    //       return getSanpham(value).then((res)=>{x.push(res.data.payload);this.props.UPDATE_WISHLIST(x)})
    //   })
    // }).catch()
  }
  Delete=(id)=>{
    this.setState({checkload:true});
    var wishlist = this.props.user.wishlist
    wishlist= wishlist.filter(item=>item!=id)
    var WishlistLocal = this.props.WishlistLocal
    WishlistLocal= WishlistLocal.filter( item=>item._id != id)
    putWishlist(this.props.user._id,wishlist).then((res)=>{
      this.props.GET_USER(res.data.payload)
      this.props.UPDATE_WISHLIST(WishlistLocal)
      this.setState({showAlert:true,title:"Success",type:"success"});
    })
  }
    render() {
        return (
            this.props.user? <div className="section section-padding wishlist">
              {this.state.checkload?<Loading></Loading>:null}
              {
              this.state.showAlert?<SweetAlert
                                    show={true}
                                    title={this.state.title}
                                    type={this.state.type}
                                    confirmButtonColor= {this.state.collorbutton}
                                    onConfirm={() => this.setState({checkload:false, showAlert: false })}
                                  />:null
            }
  <div className="container">
    <div className="cart-wishlist-tablediv">
      <table className="cart-wishlist-table table">
        <thead>
          <tr>
            <th className="name"  colSpan={2}>Sản phẩm</th>
            <th className="price">Giá</th>
            <th className="add-to-cart">&nbsp;</th>
            <th className="remove">&nbsp;</th>
          </tr>
        </thead>
        <tbody> 
          {
            this.props.WishlistLocal.reverse().map((value,key)=>{ 
              return <tr key = { key}>
                        <td className="thumbnail"><Link to={"sanpham."+vietnameseSlug(value.title)+"."+value._id}><img src={value.imgs[0]} /></Link></td>
                        <td className="name"> <Link to={"sanpham."+vietnameseSlug(value.title)+"."+value._id}>{value.title}</Link></td>
                        <td className="price"><span>{VND(value.price_new)} VNĐ</span></td>
                        <td className="add-to-cart"><a href="#" href="#quickViewModal" data-toggle="modal" className="btn btn-light btn-hover-dark" data-hint="Quick View" onClick={()=>{this.props.GET_ITEM(value)}} ><i className="fal fa-shopping-cart mr-2" />Add to Cart</a></td>
                        <td className="remove" ><a onClick={()=>this.Delete(value._id)} className="btn">×</a></td>
                    </tr>
            })
          }
          
        </tbody>
      </table>
      </div>
      <div className="row">
        <div className="col text-center mb-n3">
          <Link className="btn btn-light btn-hover-dark mr-3 mb-3" to="/sanphams">Tiếp tục mua sắm</Link>
          <Link className="btn btn-dark btn-outline-hover-dark mb-3" to="/cart">Xem giỏ hàng</Link>
        </div>
      </div>
  </div>
</div>:null

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
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
