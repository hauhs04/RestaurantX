import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import Loading from './../component/Loading';
import axios from 'axios';
import { connect } from 'react-redux';
import getCookie from './../function/Getcookie'
const SweetAlert = withSwalInstance(swal);
const register = async(data) => await axios.post("/users/register",data);
const login = async(data) => await axios.post("/users/login",data);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:"",
      dkemail:"",
      dkpassword:"",
      checkErr:false,
      checkLoad:false,
      title:"",
      type:"",
    }
  }
  
  componentDidMount() {
    if(getCookie("userEmail").length>0){this.props.history.push("/dashbroad")}
  }
  isChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  Dangky=()=>{
    this.setState({checkLoad:true});
    var d = new Date();
    var time = d.getDate()+'/'+(d.getMonth()+1)+"/"+d.getFullYear();
    var user={
      "date":time,
      "email":this.state.dkemail,
      "password":this.state.dkpassword,
    }
    register(user)
                  .then(()=>{
                    this.setState({
                      checkLoad:false,
                      checkErr:true,
                      title:"Đăng ký thành công",
                      type:"success",
                    });
                  })
                  .catch(()=>{
                    this.setState({
                      checkLoad:false,
                      checkErr:true,
                      title:"Đã tồn tại Email",
                      type:"error",
                    });
                  })
  }
  Dangnhap=()=>{
    var user={
      "email":this.state.email,
      "password":this.state.password,
    }
    login(user).then((res)=>this.props.history.push("/dashbroad"))
              .catch((res)=>{
                this.setState({
                  checkLoad:false,
                  checkErr:true,
                  title:"Sai email or password",
                  type:"error",
                });
              })
  }
  Confirm=()=>{
    if(this.state.type=="error"){
      return this.setState({ checkErr: false })
    }
    this.setState({ checkErr: false })
    return this.props.history.push("/dashbroad")
  }
    render() {
        return (
            <div className="section section-padding login">
              {
                this.state.checkErr?<SweetAlert
                                      show={true}
                                      title={this.state.title}
                                      type={this.state.type}
                                      // type="success"
                                      onConfirm={() => this.Confirm()}
                                    />:null
              }
              
              {this.state.checkLoad?<Loading></Loading>:null}
  <div className="container">
    <div className="row no-gutters">
      <div className="col-lg-6">
        <div className="user-login-register bg-light">
          <div className="login-register-title">
            <h2 className="title">Đăng nhập</h2>
            <p className="desc">Great to have you back!</p>
          </div>
          <div className="login-register-form">
            <form >
              <div className="row learts-mb-n50">
                <div className="col-12 learts-mb-50">
                  <label htmlFor="email">Email <abbr className="required">*</abbr></label>
                  <input onChange={(event)=>this.isChange(event)} name="email" type="email"  />
                </div>
                <div className="col-12 learts-mb-50">
                  <label htmlFor="password">Password <abbr className="required">*</abbr></label>
                  <input onChange={(event)=>this.isChange(event)} name="password"  type="password"  /></div>
                <div className="col-12 text-center learts-mb-50">
                  <button onClick={()=>this.Dangnhap()} type="button" className="btn btn-dark btn-outline-hover-dark">Đăng nhập</button>
                </div>
                <div className="col-12 learts-mb-50">
                  <div className="row learts-mb-n20">
                    <div className="col-12 learts-mb-20">
                    </div>
                    <div className="col-12 learts-mb-20">
                      <a href="lost-password.html" className="fw-400">Quên mật khẩu</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="user-login-register">
          <div className="login-register-title">
            <h2 className="title">Đăng ký</h2>
            <p className="desc">Nếu bạn chưa có tài khoản, hãy đăng ký ngay!</p>
          </div>
          <div className="login-register-form">
            <form >
              <div className="row learts-mb-n50">
                <div className="col-12 learts-mb-50">
                  <label htmlFor="registerEmail">Email <abbr className="required">*</abbr></label>
                  <input onChange={(event)=>this.isChange(event)} name="dkemail" type="email" id="registerEmail" />
                </div>
                <div className="col-12 learts-mb-50">
                  <label htmlFor="registerPassword">Password <abbr className="required">*</abbr></label>
                  <input onChange={(event)=>this.isChange(event)} name="dkpassword" type="password"  />
                </div>
                {/* <div className="col-12 learts-mb-50">
                  <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
                </div> */}
                <div className="col-12 text-center learts-mb-50">
                  <button onClick={()=>this.Dangky()} type="button" className="btn btn-dark btn-outline-hover-dark">Đăng ký</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        );
    }
}
export default (Login)
