import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slug from 'vietnamese-slug';
const getdataBrands = async() => await axios.get("/brands");
class BrandSection extends Component {
  componentDidMount() {
    if(this.props.brands.length==0){
      getdataBrands().then((res)=>this.props.GET_BRAND(res.data.payload))
    }
  }
  brand=(i)=>{
    return  <div key={i} className={i===1?"carousel-item active":"carousel-item"}>
              <div className="slick-track" >
                {
                  this.props.brands.map((value,key)=>{
                    if((key+1)>=(i-1)*4+1&&(key+1)<=(i-1)*4+4){
                      return <div key={key} className="slick-slide slick-cloned" >
                        <div className="col" style={{width: '100%', display: 'inline-block'}}>
                          <div className="brand-item">
                            <Link to={"/sanphams"} ><img src={value.img} alt="Brands Image" /></Link>
                          </div>
                        </div>
                      </div>
                    }
                  })
                }
              </div>
            </div>
  }
  renderitem=()=>{
    if(this.props.brands){
      var x=[]
      for (let i = 0; i < Math.ceil(this.props.brands.length/4); i++){
          x.push(this.brand(i+1))
      }
      return x
    }
  }
    render() {
        return (
            <div className="section section-fluid section-padding bg-white border-top-dashed border-bottom-dashed">
  <div className="container">
    {/* Section Title Start */}
    <div className="section-title text-center">
      <h2 className="title title-icon-both">Shop by brands</h2>
    </div>
    {/* Section Title End */}
    
    <div id="demo2" className="carousel slide" data-ride="carousel">
    <div className="brand-carousel slick-initialized slick-slider">
      {/* <button className="slick-prev slick-arrow" style={{}}><i className="ti-angle-left" /></button> */}
      <div className="slick-list draggable">

  <div className="carousel-inner">
    {
      this.renderitem()
    }
  </div>

  <a className="slick-prev slick-arrow" href="#demo2" data-slide="prev">
    <i className="ti-angle-left" />
  </a>
  <a className="slick-next slick-arrow" href="#demo2" data-slide="next">
    <i className="ti-angle-right" />
  </a>


        
        
        
        
        
        
        
      
      
      
      
      
      </div>
        {/* <button className="slick-next slick-arrow" style={{}}><i className="ti-angle-right" /></button> */}
      </div>
  
  </div>
</div>
</div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    brands: state.QLSanpham.brands
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    GET_BRAND: (GET_BRAND) => {
      dispatch({
        type:"GET_BRAND",
        GET_BRAND
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BrandSection)
