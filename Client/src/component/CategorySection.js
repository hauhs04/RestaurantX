import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slug from 'vietnamese-slug';

class CategorySection extends Component {
    render() {

        return (
            <div className="section section-fluid section-padding bg-white">
    <div className="container">
      {/* Section Title Start */}
      <div className="section-title text-center">
        <h3 className="sub-title">Shop by categories</h3>
        <h2 className="title title-icon-both">Making &amp; crafting</h2>
      </div>
      {/* Section Title End */}
      <div className="row row-cols-xl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 learts-mb-n40">
        {
          this.props.categorys.map((value,key)=>{
            
            return (value.home=="ON")?<div key={key} className="col learts-mb-40">
            <div className="category-banner5">
              <Link to={"/sanphams."+slug(value.name)+"."+value._id} className="inner">
                <div className="image"><img src={value.img} alt="true" /></div>
                <div className="content">
                  <h3 className="title">{value.name}</h3>
                </div>
              </Link>
            </div>
          </div>:null
          })
        }
        </div>
    </div>
  </div>
  
        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    categorys: state.QLSanpham.categorys,
  }
}
export default connect(mapStateToProps)(CategorySection)
