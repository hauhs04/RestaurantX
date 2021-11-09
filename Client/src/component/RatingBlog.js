import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import Loading from './Loading';
import RAMDOM_IMGS from './../function/RandomImgs'
import axios from 'axios';
import { connect } from 'react-redux';
const SweetAlert = withSwalInstance(swal);
const putdata = async(id,data) => await axios.put("/blogs/"+id,data);
class RatingBlog extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:"",
            email:"",
            review:"",
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
        if(this.state.name.length<2 || this.state.email.length <2 ||this.state.review.length <2 ){
            return this.setState({showAlert:true,type:"error",title:"Không được spam bạn eey !"})
        }if(!this.state.email.includes("@")){
            return this.setState({showAlert:true,type:"error",title:"Email ghi sai r !"})
        }
        var d = new Date();
        var time = d.getDate()+'/'+(d.getMonth()+1)+"/"+d.getFullYear();
        let cmt = this.props.itemBlog.cmt
        cmt.push({
          "name":this.state.name,
          "email":this.state.email,
          "review":this.state.review,
          "time":time
        })
        var data={
          "cmt":cmt
        }
        putdata(this.props.itemBlog._id,data).then(async(res)=>{
          await this.props.GET_BLOG(res.data.payload)
          this.setState({checkLoad:false,showAlert:true,type:"success",title:"Gửi thành công",text:"Cảm ơn đã góp ý !!!!"})
        })
    }
    render() {
        return (
            <div className="col-xl-9 col-lg-10 col-12 mx-auto">
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
            <div className="Comments-wrapper">
              <div className="block-title pb-0 border-bottom-0">
                <h2 className="title">Comments <span className="text-muted">({this.props.itemBlog.cmt.length})</span></h2>
              </div>
              <ul className="comment-list">
                  {
                      this.props.itemBlog.cmt.reverse().map((value,key)=>{
                          return <li>
                                    <div className="comment">
                                        <div className="thumbnail">
                                        <img src={RAMDOM_IMGS()} alt="true" />
                                        </div>
                                        <div className="content">
                                        <h4 className="name">{value.name}</h4>
                                        <p>{value.review}</p>
                                        <div className="actions">
                                            <span className="date"> DATE : {value.time}</span>
                                            {/* <a className="reply-link" href="#">Reply</a> */}
                                        </div>
                                        </div>
                                    </div>
                                        {/* <ul className="child-comment">
                                            <li>
                                            <div className="comment">
                                                <div className="thumbnail">
                                                <img src="assets/images/comment/comment-3.jpg" alt="true" />
                                                </div>
                                                <div className="content">
                                                <h4 className="name">Edna Watson</h4>
                                                <p>Thanks for always keeping your WordPress themes up to date. Your level of support and dedication is second to none.</p>
                                                <div className="actions">
                                                    <span className="date">April 22, 2020 at 2:10 am</span>
                                                    <a className="reply-link" href="#">Reply</a>
                                                </div>
                                                </div>
                                            </div>
                                            </li>
                                        </ul> */}
                                    </li>
                      })
                  }
                </ul>
              <div className="block-title pb-0 border-bottom-0">
                <h2 className="title">Để lại suy nghĩ của bạn ở đây</h2>
              </div>
              <div className="comment-form">
                <form >
                  <div className="row learts-mb-n20">
                    <div className="col-md-6 col-12 learts-mb-20">
                      <input onChange={(event)=>this.isChange(event)} name="name" type="text" placeholder="Your name (*)" />
                    </div>
                    <div className="col-md-6 col-12 learts-mb-20">
                      <input onChange={(event)=>this.isChange(event)} name="email" type="text" placeholder="Mail (*)" />
                    </div>
                    <div className="col-12 learts-mb-20">
                      <textarea onChange={(event)=>this.isChange(event)} name="review" placeholder="Message" defaultValue={""} />
                    </div>
                    <div className="col-12 text-center learts-mb-20 learts-mt-20">
                      <button type="button" onClick={()=>this.Send()} className="btn btn-dark btn-outline-hover-dark">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
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
        GET_BLOG: (GET_BLOG) => {
            dispatch({
                type:"GET_BLOG",
                GET_BLOG
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RatingBlog)
