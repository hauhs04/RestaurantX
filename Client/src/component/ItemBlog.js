import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import slug from 'vietnamese-slug';

import ReactHtmlParser from 'react-html-parser'
import { connect } from 'react-redux';
import axios from 'axios';
const getdataBlog = async(id) => await axios.get("/blogs/"+id);
class ItemBlog extends Component {
  getitemblog=(id)=>{
    getdataBlog(id).then((res)=>this.props.GET_ITEMBLOG(res.data.payload))
  }
    render() {
        return (
            this.props.blogs.map((value,key)=>{
                return <div key={key} className={this.props.name}>
                <div className="blog">
                  <div className="image">
                    <Link onClick={()=>this.getitemblog(value._id)} to={"/baiviet."+slug(value.title)+"."+value._id}><img src={value.img} alt="Blog Image" /></Link>
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li><i className="far fa-calendar" /><Link onClick={()=>this.getitemblog(value._id)} to={"/baiviet."+slug(value.title)+"."+value._id}>{value.date}</Link></li>
                    </ul>
                    <h5 className="title"><Link onClick={()=>this.getitemblog(value._id)} to={"/baiviet."+slug(value.title)+"."+value._id}>{value.title}</Link></h5>
                    <div className="desc">
                      {ReactHtmlParser(value.description)}
                    </div>
                    <Link onClick={()=>this.getitemblog(value._id)} to={"/baiviet."+slug(value.title)+"."+value._id} className="link">Đọc thêm ...</Link>
                  </div>
                </div>
              </div>
              
              })
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
    GET_ITEMBLOG: (GET_ITEMBLOG) => {
      dispatch({
        type:"GET_ITEMBLOG",
        GET_ITEMBLOG
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps, )(ItemBlog)
