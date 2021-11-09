import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import Loading from './Loading';
import axios from 'axios';
import { connect } from 'react-redux';
import RAMDOM_IMGS from './../function/RandomImgs'
const SweetAlert = withSwalInstance(swal);
const putdata = async(id,data) => await axios.put("/items/"+id,data);
class RatingItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:"",
      email:"",
      review:"",
      rate:0,
      checkLoad:false,
      
    }
  }
  
  
  isChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  Send=()=>{
    this.setState({checkLoad:true});
    if(this.state.name.length<2 || this.state.email.length <2 ||this.state.review.length <2 ||this.state.rate==0){
        return this.setState({showAlert:true,type:"error",title:"Không được spam bạn eey !",checkLoad:false})
    }if(!this.state.email.includes("@")){
        return this.setState({showAlert:true,type:"error",title:"Email ghi sai r !",checkLoad:false})
    }
    var d = new Date();
    var time = d.getDate()+'/'+(d.getMonth()+1)+"/"+d.getFullYear();
    let cmt = this.props.item.cmt
    // let rate = this.props.item.rate==0 ? 5:this.props.item.rate
    // rate = (rate+this.state.rate)/2
    let rate = Number(this.props.item.rate)+Number(this.state.rate)
    cmt.push({
      "name":this.state.name,
      "email":this.state.email,
      "review":this.state.review,
      "rate":this.state.rate,
      "time":time
    })
    var data={
      "rate":rate,
      "cmt":cmt
    }
    putdata(this.props.item._id,data).then(async(res)=>{
      await this.props.GET_SANPHAM(res.data.payload)
      await this.props.UPDATE_CMT()
      this.setState({checkLoad:false,showAlert:true,type:"success",title:"Gửi thành công",text:"Cảm ơn đã góp ý !!!!"})
    })
     
  }
    render() {
      console.log(this.state);
        return (
            <div className="product-review-wrapper">
              {
                this.state.showAlert?<SweetAlert
                                      show={true}
                                      title={this.state.title}
                                      type={this.state.type}
                                      text={this.state.text}
                                      // type="success"
                                      onConfirm={() => this.setState({ showAlert: false })}
                                    />:null
              }
              {this.state.checkLoad?<Loading></Loading>:null}
              
            <span className="title">ĐÁNH GIÁ</span>
            <ul className="product-review-list">
              {
                this.props.item.cmt.reverse().map((value,key)=>{
                  return <li key = {key}>
                    <div className="product-review">
                      <div className="thumb"><img src={RAMDOM_IMGS()} alt="true"/></div>
                      <div className="content">
                        <div className="ratings">
                          <span className="star-rating">
                            <span className="rating-active" style={{width: value.rate*100/5+'%'}}>ratings</span>
                          </span>
                        </div>
                        <div className="meta">
                          <h5 className="title">{value.name}</h5>
                          <span className="date">{value.time}</span>
                        </div>
                        <p>{value.review}</p>
                      </div>
                    </div>
                  </li>
              
                })
              }
              </ul>
            <span className="title">Thêm đánh giá</span>
            <div className="review-form">
              <p className="note">Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được đánh dấu *</p>
              <form >
                <div className="row learts-mb-n30">
                  <div className="col-md-6 col-12 learts-mb-30"><input onChange={(event)=>this.isChange(event)} type="text" name="name" placeholder="Name *" /></div>
                  <div className="col-md-6 col-12 learts-mb-30"><input onChange={(event)=>this.isChange(event)} type="email" name="email" placeholder="Email *" /></div>
                  <div className="col-12 learts-mb-10">
                    <div className="form-rating">
                      <span className="title">Đánh giá của bạn</span>
                     
                      <div className="starss">
                          <input onChange={(event)=>this.isChange(event)}  className="stars stars-5" defaultValue={5} id="star-5" type="radio" name="rate" /> 
                          <label className="stars stars-5" htmlFor="star-5" />
                          <input onChange={(event)=>this.isChange(event)}  className="stars stars-4"defaultValue={4} id="star-4" type="radio" name="rate" />
                          <label className="stars stars-4" htmlFor="star-4" />
                          <input onChange={(event)=>this.isChange(event)}  className="stars stars-3"defaultValue={3} id="star-3" type="radio" name="rate" />
                          <label className="stars stars-3" htmlFor="star-3" />
                          <input onChange={(event)=>this.isChange(event)}  className="stars stars-2"defaultValue={2} id="star-2" type="radio" name="rate" />
                          <label className="stars stars-2" htmlFor="star-2" />
                          <input onChange={(event)=>this.isChange(event)}  className="stars stars-1"defaultValue={1} id="star-1" type="radio" name="rate" />
                          <label className="stars stars-1" htmlFor="star-1" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 learts-mb-30"><textarea onChange={(event)=>this.isChange(event)}  placeholder="Your Review *" name="review" defaultValue={""} /></div>
                  <div className="col-12 text-center learts-mb-30"><button onClick={()=>this.Send()} type="button" className="btn btn-dark btn-outline-hover-dark">Submit</button></div>
                </div>
              </form>
            </div>
          </div>
        
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    GET_SANPHAM: (GET_SANPHAM) => {
      dispatch({
        type:"GET_SANPHAM",
        GET_SANPHAM
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RatingItem)
