/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../component/Loading';
import VND from './../function/ConverstVND';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import axios from 'axios';
const SweetAlert = withSwalInstance(swal);
const putdataUser = async(id,order) => await axios.put("/users/order/"+id,{order});
const postdataOrder = async(data) => await axios.post("/orders",data);
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:"",
      email:this.props.user?this.props.user.email:"",
      adress:"",
      phone:"",
      checkLoad:false,
      showAlert:false
    }
  }
  componentDidMount() {
    if(this.props.SanphamLocal.length==0) return this.props.history.push("/")
  }
  
  isChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
    
  }
  total=()=>{
    var x=0
    this.props.SanphamLocal.map((value)=>{
      x+=(Number(value.quantity)*Number(value.price))
    })
    return x
  }
  dathang=()=>{
    this.setState({checkLoad:true});
    if(this.state.name.length<1||this.state.email.length<1||this.state.adress.length<1||this.state.phone.length<9){
      return this.setState({showAlert:true,type:"error",title:"Xem lại thông tin !"})
    }
    if(!this.state.email.includes("@")){
      return this.setState({showAlert:true,type:"error",title:"Email ghi sai r !"})
    }
    var d = new Date();
    var time = d.getDate()+'/'+(d.getMonth()+1)+"/"+d.getFullYear();
    var data={
      "date":time,
      "userID":this.props.user?this.props.user._id:null,
      "name":this.state.name,
      "phone":this.state.phone,
      "adress":this.state.adress,
      "node":this.state.node,
      "email":this.state.email,
      "cart":this.props.SanphamLocal,
      "price":this.total()
    }
    Promise.all([
      this.props.user?putdataUser(this.props.user._id,data).then((res)=>this.props.GET_USER(res.data.payload)).catch():null,
      postdataOrder(data).then().catch()
    ]).then(()=>{
      localStorage.setItem("SanPham", JSON.stringify([]));
      this.props.UPDATE_LOCAL([])
      this.setState({showAlert:true,type:"success",title:"Đặt thành công kiểm tra Email",text:"cảm ơn bạn đã mua hàng"});
      return this.props.history.push("/")
    })
  }
    render() {
      console.log(this.props.user);
        return (
            <div className="section section-padding checkout">
              {
                this.state.showAlert?<SweetAlert
                                      show={true}
                                      title={this.state.title}
                                      type={this.state.type}
                                      text={this.state.text}
                                      // type="success"
                                      onConfirm={() => this.setState({ checkLoad:false,showAlert: false })}
                                    />:null
              }
              {this.state.checkLoad?<Loading></Loading>:null}
  <div className="container">
    <div className="checkout-coupon">
      <p className="coupon-toggle">Have a coupon? <a href="#checkout-coupon-form" data-toggle="collapse">Click here to enter your code</a></p>
      <div id="checkout-coupon-form" className="collapse">
        <div className="coupon-form">
          <p>If you have a coupon code, please apply it below.</p>
          <form  className="learts-mb-n10">
            <input className="learts-mb-10" type="text" placeholder="Coupon code" />
            <button type="button" className="btn btn-dark btn-outline-hover-dark learts-mb-10">apply coupon</button>
          </form>
        </div>
      </div>
    </div>
    <div className="section-title2">
      <h2 className="title">Chi tiết thanh toán</h2>
    </div>
    <form  className="checkout-form learts-mb-50">
      <div className="row">
        <div className="col-md-6 col-12 learts-mb-20">
          <label htmlFor="bdFirstName">Tên <abbr className="required">*</abbr></label>
          <input onChange={(event)=>this.isChange(event)} name="name" type="text" id="bdFirstName" />
        </div>
        <div className="col-md-6 col-12 learts-mb-20">
          <label htmlFor="adress">Địa chỉ <abbr className="required">*</abbr></label>
          <input onChange={(event)=>this.isChange(event)}  name="adress" type="text" id="adress" />
        </div>
        <div className="col-md-6 col-12 learts-mb-20">
          <label  htmlFor="bdEmail">Email <abbr className="required">*</abbr></label>
          <input onChange={(event)=>this.isChange(event)}  name="email" defaultValue={this.props.user?this.props.user.email:null} type="text" id="bdEmail" />
        </div>
        <div className="col-md-6 col-12 learts-mb-30">
          <label htmlFor="bdPhone">Phone <abbr className="required">*</abbr></label>
          <input onChange={(event)=>this.isChange(event)}  name="phone" type="number" id="bdPhone" />
        </div>
       <div className="col-12 learts-mb-20">
          <label htmlFor="bdOrderNote"> Notes (optional)</label>
          <textarea onChange={(event)=>this.isChange(event)}  name="node" id="bdOrderNote" placeholder="Notes about your order, e.g. special notes for delivery." defaultValue={""} />
        </div>
      </div>
    </form>
    <div className="section-title2 text-center">
      <h2 className="title">Your order</h2>
    </div>
    <div className="row learts-mb-n30">
      <div className="col-lg-6 order-lg-2 learts-mb-30">
        <div className="order-review">
          <table className="table">
            <thead>
              <tr>
                <th className="name">Product</th>
                <th className="total">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.SanphamLocal.map((value,key)=>{
                  return  <tr>
                            <td className="name">{value.title}&nbsp; <strong className="quantity">×&nbsp;{value.quantity}</strong></td>
                            <td className="total"><span>{VND(value.quantity*value.price)} VNĐ</span></td>
                          </tr>
                })
              }
            </tbody>
            <tfoot>
              <tr className="subtotal">
                <th>Tạm tính</th>
                <td><span>{VND(this.total())} VNĐ</span></td>
              </tr>
              <tr className="total">
                <th>Tổng số</th>
                <td><strong><span>{VND(this.total())} VNĐ</span></strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="col-lg-6 order-lg-1 learts-mb-30">
        <div className="order-payment">
          <div className="payment-method">
            <div className="accordion" id="paymentMethod">
              <div className="card active">
                <div className="card-header">
                  <button data-toggle="collapse" data-target="#checkPayments">Check payments</button>
                </div>
                <div id="checkPayments" className="collapse show" data-parent="#paymentMethod">
                  <div className="card-body">
                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <button data-toggle="collapse" data-target="#cashkPayments">Cash on delivery </button>
                </div>
                <div id="cashkPayments" className="collapse" data-parent="#paymentMethod">
                  <div className="card-body">
                    <p>Pay with cash upon delivery.</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <button data-toggle="collapse" data-target="#payPalPayments">PayPal <img src="assets/images/others/pay-2.png" alt="true" /></button>
                </div>
                <div id="payPalPayments" className="collapse" data-parent="#paymentMethod">
                  <div className="card-body">
                    <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="payment-note">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            <button type="button" onClick={()=>this.dathang()} className="btn btn-dark btn-outline-hover-dark">Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.QLUser.user,
    SanphamLocal:state.QLLocal.SanphamLocal,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    UPDATE_LOCAL: (UPDATE_LOCAL) => {
      dispatch({
          type:"UPDATE_LOCAL",
          UPDATE_LOCAL
      })
    },
    GET_USER: (GET_USER) => {
      dispatch({
          type:"GET_USER",
          GET_USER
      })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
