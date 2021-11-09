import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import getCookie from './../function/Getcookie'
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import Loading from './../component/Loading';
import Cookies from 'js-cookie'
import md5 from 'md5'
import { Link } from 'react-router-dom';
const SweetAlert = withSwalInstance(swal);
const getUser = async() => await axios.get("/users/get/user");
const putUser = async(id,data) => await axios.put("/users/"+id,data);
class Dashbroad extends Component {
    constructor(props) {
        super(props);
        this.state={
          checkErr:false,
          checkLoad:false,
          title:"",
          type:"",
          pass_old:"",
          pass_new1:"",
          pass_new2:"",
        }
      }
    componentWillMount() {
        if(getCookie("userEmail").length==0){return this.props.history.push("/login")}
        getUser()
                .then((res)=>{this.props.GET_USER(res.data.payload)})
                .catch((er)=>{
                    this.setState({
                        checkLoad:true,
                        checkErr:true,
                        title:"Hack thành công =}}}",
                        type:"success",
                      });
                      console.log(er);
                })
    }
    Logout=()=>{
      Cookies.remove("userEmail")
      this.props.GET_USER(null)
      return this.props.history.push("/login")
    }
    isChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      });
    }
    Send=()=>{
      if(this.state.pass_new1.length>1||this.state.pass_new2.length>1||this.state.pass_old.length>1){
        if(this.state.pass_new1!=this.state.pass_new2){
          return this.setState({
            checkLoad:true,
            checkErr:true,
            title:"Nhập sai Password mới",
            type:"error",
          });
        }
        if(md5(this.state.pass_old)!=this.props.user.password){
          return this.setState({
            checkLoad:true,
            checkErr:true,
            title:"Nhập sai Password ",
            type:"error",
          });
        }
      }
      var data={
        "_id":this.props.user._id,
        "email":this.props.user.email,
        "password":this.state.pass_old,
        "password_new1":this.state.pass_new1,
        "password_new2":this.state.pass_new2,
      }
      return putUser(this.props.user._id,data).then((res)=>{
                                                this.props.GET_USER(res.data.payload);
                                                return this.setState({
                                                  checkLoad:true,
                                                  checkErr:true,
                                                  title:"Đổi mật khẩu thành công",
                                                  type:"success",
                                                });
                                              })
                                              .catch(()=>{
                                                return this.setState({
                                                  checkLoad:true,
                                                  checkErr:true,
                                                  title:"Lỗi thử lại sau",
                                                  type:"error",
                                                });
                                              })
    }
    viewcart=(value)=>{
      this.props.UPDATE_LOCAL(value)
      // console.log(value);
      return this.props.history.push("/cart")
    }
    render() {
        return (
            this.props.user?<div className="section section-padding dashbroad">
                {
                this.state.checkErr?<SweetAlert
                                      show={true}
                                      title={this.state.title}
                                      type={this.state.type}
                                      // type="success"
                                      onConfirm={() => this.setState({checkLoad:false,checkErr:false})}
                                    />:null
              }
              
              {this.state.checkLoad?<Loading></Loading>:null}
  <div className="container">
    <div className="row learts-mb-n30">
      {/* My Account Tab List Start */}
      <div className="col-lg-4 col-12 learts-mb-30">
        <div className="myaccount-tab-list nav">
          <a href="#dashboad" className="active" data-toggle="tab">Dashboard <i className="far fa-home" /></a>
          <a href="#orders" data-toggle="tab">Đơn hàng <i className="far fa-file-alt" /></a>
          <a href="#account-info" data-toggle="tab">Tài khoản <i className="far fa-user" /></a>
          <a onClick={()=>this.Logout()}>Logout <i className="far fa-sign-out-alt" /></a>
        </div>
      </div>
      {/* My Account Tab List End */}
      {/* My Account Tab Content Start */}
      <div className="col-lg-8 col-12 learts-mb-30">
        <div className="tab-content">
          {/* Single Tab Content Start */}
          <div className="tab-pane fade show active" id="dashboad">
            <div className="myaccount-content dashboad">
              <p>Hello <strong>{this.props.user.email}</strong> (<a onClick={()=>this.Logout()}>Log out</a>)</p>
              <p>From your account dashboard you can view your <span>recent orders</span>, manage your <span>shipping and billing addresses</span>, and <span>edit your password and account details</span>.</p>
            </div>
          </div>
          {/* Single Tab Content End */}
          {/* Single Tab Content Start */}
          <div className="tab-pane fade" id="orders">
            <div className="myaccount-content order">
              <div className="table-responsive order">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Ngày</th>
                      {/* <th>Trạng thái</th> */}
                      {/* <th>Tổng</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.user.order.reverse().map((value,key)=>{
                        return  <tr key={key}>
                                  <td>{key}</td>
                                  <td>{value.date}</td>
                                  {/* <td>{value.status?value.status:"Chưa xác nhận"}</td> */}
                                  {/* <td>{value.price?value.price:"Hệ thống đang tính toán"}</td> */}
                                  <td><a onClick={()=>this.viewcart(value.cart)}>View</a></td>
                                </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Single Tab Content End */}
          {/* Single Tab Content Start */}
          <div className="tab-pane fade" id="account-info">
            <div className="myaccount-content account-details">
              <div className="account-details-form">
                <form >
                  <div className="row learts-mb-n30">
                    <div className="col-12 learts-mb-30">
                      <label htmlFor="email">Email Addres <abbr className="required">*</abbr></label>
                      <input type="email" id="email" readOnly defaultValue={this.props.user.email} />
                    </div>
                    <div className="col-12 learts-mb-30 learts-mt-30">
                      <fieldset>
                        <legend>Password change</legend>
                        <div className="row learts-mb-n30">
                          <div className="col-12 learts-mb-30">
                            <label htmlFor="current-pwd">Current password (leave blank to leave unchanged)</label>
                            <input onChange={(event)=>this.isChange(event)} name="pass_old" type="password" id="current-pwd" />
                          </div>
                          <div className="col-12 learts-mb-30">
                            <label htmlFor="new-pwd">New password (leave blank to leave unchanged)</label>
                            <input  onChange={(event)=>this.isChange(event)} name="pass_new1" type="password" id="new-pwd" />
                          </div>
                          <div className="col-12 learts-mb-30">
                            <label htmlFor="confirm-pwd">Confirm new password</label>
                            <input  onChange={(event)=>this.isChange(event)} name="pass_new2" type="password" id="confirm-pwd" />
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="col-12 learts-mb-30">
                      <button onClick={()=>this.Send()} type="reset" className="btn btn-dark btn-outline-hover-dark">Save Changes</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> {/* Single Tab Content End */}
        </div>
      </div> {/* My Account Tab Content End */}
    </div>
  </div>
</div>: <>
            {
                this.state.checkErr?<SweetAlert
                                      show={true}
                                      title={this.state.title}
                                      type={this.state.type}
                                      // type="success"
                                      onConfirm={() => this.setState({checkErr:false})}
                                    />:null
              }
              {this.state.checkLoad?<Loading></Loading>:null}
        </>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.QLUser.user,
        
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        GET_USER: GET_USER => {
            dispatch({
                type:"GET_USER",
                GET_USER
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashbroad)
