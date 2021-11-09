import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemBlog from './ItemBlog';

const getdataBlogs = async() => await axios.get("/blogs");


class BlogSection extends Component {
    componentDidMount() {
      if(this.props.blogs.length==0){
        getdataBlogs().then((res)=>{this.props.GET_BLOG(res.data.payload)})
      }
    }
    render() {
        return (
            <div className="section section-fluid section-padding bg-white">
    <div className="container">
      {/* Section Title Start */}
      <div className="section-title text-center">
        <h2 className="title title-icon-both">Our blog update</h2>
      </div>
      {/* Section Title End */}
      <div className="row row-cols-xl-4 row-cols-md-2 row-cols-1 learts-mb-n40">
        <ItemBlog blogs={this.props.blogs} name={"col learts-mb-40"}></ItemBlog>
        
          
      </div>
      <div className="row learts-mt-50">
        <div className="col text-center">
          <Link to="/baiviets" className="btn btn-dark btn-hover-primary">Tất cả bài viết</Link>
        </div>
      </div>
    </div>
  </div>
  
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.QLSanpham.blogs
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
export default connect(mapStateToProps, mapDispatchToProps)(BlogSection)
